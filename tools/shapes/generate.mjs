//
// Copyright © 2025 Hermana AS
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

//
// Shape-path generator. Run via `npm run gen:shapes`. Writes
// components/shape/_paths.generated.scss with one map entry per shape; the
// SCSS partial then looks up the path strings without doing any math at
// compile time.
//
// This file is a faithful port of the Sass math that previously lived in
// styles/shapes.scss / components/shape/index.scss. Numeric output is
// formatted to match Sass's default $number-precision: 10 with trailing
// zeros stripped, so the emitted `d` strings are byte-identical to the
// Sass-rendered ones.
//

const __dirname  = path.dirname(fileURLToPath(import.meta.url));
const targetPath = path.resolve(__dirname, '../../components/shape/_paths.generated.scss');

// Sass's default precision is 10 decimal places. Match that, then strip
// trailing zeros so e.g. 50.0000000000 → 50, 3.1400000000 → 3.14.
function toCss(n) {
    if (Number.isInteger(n)) return String(n);
    let s = n.toFixed(10);
    s = s.replace(/(\.\d*?)0+$/, '$1');
    s = s.replace(/\.$/, '');
    // Sass renders -0 as 0 — match that to avoid spurious diffs.
    if (s === '-0') return '0';
    return s;
}

function segmentsLength(segments) {
    let t = 0;
    for (const s of segments) t += s.len;
    return t;
}

function pointAt(segments, total, t) {
    const target = t * total;
    let acc = 0;
    for (const s of segments) {
        if (acc + s.len >= target) {
            const local = s.len === 0 ? 0 : (target - acc) / s.len;
            if (s.type === 'line') {
                return [s.x1 + local * (s.x2 - s.x1), s.y1 + local * (s.y2 - s.y1)];
            }
            if (s.type === 'arc') {
                const a = s.a1 + local * (s.a2 - s.a1);
                return [s.cx + s.r * Math.cos(a), s.cy + s.r * Math.sin(a)];
            }
            if (s.type === 'cubic') {
                const u  = 1 - local;
                const u2 = u * u, u3 = u2 * u;
                const t2 = local * local, t3 = t2 * local;
                const bx = u3 * s.p0x + 3 * u2 * local * s.p1x + 3 * u * t2 * s.p2x + t3 * s.p3x;
                const by = u3 * s.p0y + 3 * u2 * local * s.p1y + 3 * u * t2 * s.p2y + t3 * s.p3y;
                return [bx, by];
            }
        }
        acc += s.len;
    }
    return [0, 0];
}

// Emits a closed SVG path string from N (x, y) sample points (assumed CW).
// Rotates the array so the path begins at the sample closest to top-centre
// (50, 0). Combined with every shape traversing CW, this keeps point-index k
// mapping to the same relative position across shapes — so `transition: d`
// interpolates smoothly.
function emitAlignedPath(points, n) {
    // Find the sample closest to (50, 0). Symmetric shapes (e.g. clover-4)
    // have multiple samples at exactly the same distance; ULP-level differences
    // in float arithmetic would otherwise let later samples nudge ahead of
    // earlier ones non-deterministically. Tolerate ULP-scale differences so
    // the first tied sample wins, matching Sass's tie-break behaviour.
    const EPS = 1e-9;
    let bestI = 0, bestD = 999999;
    for (let i = 0; i < n; i++) {
        const dx = points[i][0] - 50;
        const dy = points[i][1];
        const dist = dx * dx + dy * dy;
        if (dist < bestD - EPS) { bestD = dist; bestI = i; }
    }
    let d = '';
    for (let j = 0; j < n; j++) {
        const idx = (bestI + j) % n;
        const p = points[idx];
        d += (j === 0 ? 'M' : 'L') + ' ' + toCss(p[0]) + ' ' + toCss(p[1]) + ' ';
    }
    return d + 'Z';
}

function buildPath(segments, n) {
    const total = segmentsLength(segments);
    const points = [];
    for (let i = 0; i < n; i++) {
        points.push(pointAt(segments, total, i / n));
    }
    return emitAlignedPath(points, n);
}

// --- generic M3 rounded polygon --------------------------------------------

function roundedPolygonPath(n, vertices, normalize = true) {
    // Step 0: deduplicate consecutive identical vertices.
    let dedup = [];
    for (const curr of vertices) {
        if (dedup.length > 0) {
            const prev = dedup[dedup.length - 1];
            const dx = curr[0] - prev[0];
            const dy = curr[1] - prev[1];
            if (Math.sqrt(dx * dx + dy * dy) < 0.01) continue;
        }
        dedup.push(curr);
    }
    if (dedup.length > 1) {
        const first = dedup[0];
        const last  = dedup[dedup.length - 1];
        const dx = first[0] - last[0];
        const dy = first[1] - last[1];
        if (Math.sqrt(dx * dx + dy * dy) < 0.01) {
            dedup = dedup.slice(0, -1);
        }
    }
    // Drop collinear vertices.
    const straight = [];
    const dc = dedup.length;
    for (let i = 0; i < dc; i++) {
        const prev = dedup[(i - 1 + dc) % dc];
        const curr = dedup[i];
        const next = dedup[(i + 1) % dc];
        const cross = (curr[0] - prev[0]) * (next[1] - curr[1]) -
                      (curr[1] - prev[1]) * (next[0] - curr[0]);
        if (Math.abs(cross) > 0.5) straight.push(curr);
    }
    vertices = straight;
    const count = vertices.length;

    // Step 1: per-vertex flanking-curve geometry (port of M3's
    // _RoundedCorner.getCubics from AndroidX).
    const corners = [];
    for (let i = 0; i < count; i++) {
        const vp = vertices[(i - 1 + count) % count];
        const vc = vertices[i];
        const vn = vertices[(i + 1) % count];

        const px = vp[0], py = vp[1];
        const vx = vc[0], vy = vc[1], rBase = vc[2];
        const smoothingSpec = vc.length >= 4 ? vc[3] : 0;
        const nx = vn[0], ny = vn[1];

        let d1x = px - vx, d1y = py - vy;
        const d1Len = Math.sqrt(d1x * d1x + d1y * d1y);
        d1x /= d1Len; d1y /= d1Len;

        let d2x = nx - vx, d2y = ny - vy;
        const d2Len = Math.sqrt(d2x * d2x + d2y * d2y);
        d2x /= d2Len; d2y /= d2Len;

        let cosAngle = d1x * d2x + d1y * d2y;
        if (cosAngle >  1) cosAngle =  1;
        if (cosAngle < -1) cosAngle = -1;
        const sinSq    = 1 - cosAngle * cosAngle;
        const sinAngle = sinSq <= 0 ? 0 : Math.sqrt(sinSq);

        let expectedRoundCut = 0;
        if (sinAngle > 0.001) {
            expectedRoundCut = rBase * (1 + cosAngle) / sinAngle;
        }
        const expectedCut = (1 + smoothingSpec) * expectedRoundCut;

        const allowed0   = d1Len / 2;
        const allowed1   = d2Len / 2;
        const allowedCut = Math.min(allowed0, allowed1);

        let sm0 = 0;
        if (allowed0 > expectedCut) sm0 = smoothingSpec;
        else if (allowed0 > expectedRoundCut && expectedCut > expectedRoundCut) {
            sm0 = smoothingSpec * (allowed0 - expectedRoundCut) / (expectedCut - expectedRoundCut);
        }
        let sm1 = 0;
        if (allowed1 > expectedCut) sm1 = smoothingSpec;
        else if (allowed1 > expectedRoundCut && expectedCut > expectedRoundCut) {
            sm1 = smoothingSpec * (allowed1 - expectedRoundCut) / (expectedCut - expectedRoundCut);
        }

        const actualRoundCut = Math.min(allowedCut, expectedRoundCut);
        const actualR        = expectedRoundCut < 0.001 ? 0 : rBase * actualRoundCut / expectedRoundCut;

        let bx = d1x + d2x, by = d1y + d2y;
        const bLen = Math.sqrt(bx * bx + by * by);
        bx /= bLen; by /= bLen;
        const centerDist = Math.sqrt(actualR * actualR + actualRoundCut * actualRoundCut);
        const cx = vx + bx * centerDist;
        const cy = vy + by * centerDist;

        const t1x = vx + d1x * actualRoundCut, t1y = vy + d1y * actualRoundCut;
        const t2x = vx + d2x * actualRoundCut, t2y = vy + d2y * actualRoundCut;
        const mx = (t1x + t2x) * 0.5, my = (t1y + t2y) * 0.5;

        // Side 1 (incoming flanking curve)
        const cs1x = vx + d1x * actualRoundCut * (1 + sm0);
        const cs1y = vy + d1y * actualRoundCut * (1 + sm0);
        const p1x  = t1x + (mx - t1x) * sm0;
        const p1y  = t1y + (my - t1y) * sm0;
        const dp1x = p1x - cx, dp1y = p1y - cy;
        const dp1Len = Math.sqrt(dp1x * dp1x + dp1y * dp1y);
        let ce1x = cx, ce1y = cy;
        if (dp1Len > 0.0001) {
            ce1x = cx + actualR * dp1x / dp1Len;
            ce1y = cy + actualR * dp1y / dp1Len;
        }

        const tan1x = -(ce1y - cy);
        const tan1y =  (ce1x - cx);
        const det1  = d1x * tan1y - d1y * tan1x;
        let ae1x = t1x, ae1y = t1y;
        if (Math.abs(det1) > 0.0001) {
            const tt1 = ((ce1x - px) * tan1y - (ce1y - py) * tan1x) / det1;
            ae1x = px + tt1 * d1x;
            ae1y = py + tt1 * d1y;
        }
        const as1x = (cs1x + 2 * ae1x) / 3;
        const as1y = (cs1y + 2 * ae1y) / 3;

        // Side 2 (outgoing flanking curve)
        const cs2x = vx + d2x * actualRoundCut * (1 + sm1);
        const cs2y = vy + d2y * actualRoundCut * (1 + sm1);
        const p2x  = t2x + (mx - t2x) * sm1;
        const p2y  = t2y + (my - t2y) * sm1;
        const dp2x = p2x - cx, dp2y = p2y - cy;
        const dp2Len = Math.sqrt(dp2x * dp2x + dp2y * dp2y);
        let ce2x = cx, ce2y = cy;
        if (dp2Len > 0.0001) {
            ce2x = cx + actualR * dp2x / dp2Len;
            ce2y = cy + actualR * dp2y / dp2Len;
        }

        const tan2x = -(ce2y - cy);
        const tan2y =  (ce2x - cx);
        const det2  = d2x * tan2y - d2y * tan2x;
        let ae2x = t2x, ae2y = t2y;
        if (Math.abs(det2) > 0.0001) {
            const tt2 = ((ce2x - nx) * tan2y - (ce2y - ny) * tan2x) / det2;
            ae2x = nx + tt2 * d2x;
            ae2y = ny + tt2 * d2y;
        }
        const as2x = (cs2x + 2 * ae2x) / 3;
        const as2y = (cs2y + 2 * ae2y) / 3;

        // Arc start/end angles. Convex traverses increasing θ, concave decreasing.
        const cross = d1x * d2y - d1y * d2x;
        let a1 = Math.atan2(ce1y - cy, ce1x - cx);
        let a2 = Math.atan2(ce2y - cy, ce2x - cx);
        if (cross < 0) {
            if (a2 < a1) a2 += 2 * Math.PI;
        } else {
            if (a2 > a1) a2 -= 2 * Math.PI;
        }

        corners.push({
            cs1x, cs1y, as1x, as1y, ae1x, ae1y, ce1x, ce1y,
            cx, cy, actualR, a1, a2,
            ce2x, ce2y, ae2x, ae2y, as2x, as2y, cs2x, cs2y,
        });
    }

    // Step 2: emit segments per corner.
    const segments = [];
    for (let i = 0; i < count; i++) {
        const cprev = corners[(i - 1 + count) % count];
        const c     = corners[i];

        const edgeLen = Math.sqrt((c.cs1x - cprev.cs2x) ** 2 + (c.cs1y - cprev.cs2y) ** 2);
        segments.push({ len: edgeLen, type: 'line',
            x1: cprev.cs2x, y1: cprev.cs2y, x2: c.cs1x, y2: c.cs1y });

        const c1Len = (
            Math.sqrt((c.as1x - c.cs1x) ** 2 + (c.as1y - c.cs1y) ** 2) +
            Math.sqrt((c.ae1x - c.as1x) ** 2 + (c.ae1y - c.as1y) ** 2) +
            Math.sqrt((c.ce1x - c.ae1x) ** 2 + (c.ce1y - c.ae1y) ** 2) +
            Math.sqrt((c.ce1x - c.cs1x) ** 2 + (c.ce1y - c.cs1y) ** 2)
        ) / 2;
        segments.push({ len: c1Len, type: 'cubic',
            p0x: c.cs1x, p0y: c.cs1y, p1x: c.as1x, p1y: c.as1y,
            p2x: c.ae1x, p2y: c.ae1y, p3x: c.ce1x, p3y: c.ce1y });

        const arcLen = Math.abs(c.a2 - c.a1) * c.actualR;
        segments.push({ len: arcLen, type: 'arc',
            cx: c.cx, cy: c.cy, r: c.actualR, a1: c.a1, a2: c.a2 });

        const c2Len = (
            Math.sqrt((c.ae2x - c.ce2x) ** 2 + (c.ae2y - c.ce2y) ** 2) +
            Math.sqrt((c.as2x - c.ae2x) ** 2 + (c.as2y - c.ae2y) ** 2) +
            Math.sqrt((c.cs2x - c.as2x) ** 2 + (c.cs2y - c.as2y) ** 2) +
            Math.sqrt((c.cs2x - c.ce2x) ** 2 + (c.cs2y - c.ce2y) ** 2)
        ) / 2;
        segments.push({ len: c2Len, type: 'cubic',
            p0x: c.ce2x, p0y: c.ce2y, p1x: c.ae2x, p1y: c.ae2y,
            p2x: c.as2x, p2y: c.as2y, p3x: c.cs2x, p3y: c.cs2y });
    }

    // Step 3: optionally normalize bounds to fit 100×100. Collect samples
    // during the bounds-finding pass and reuse them for the rescale, so each
    // parameter t is only sampled once (was: twice per shape).
    if (normalize) {
        const total = segmentsLength(segments);
        const samples = new Array(n);
        let minX =  9999, maxX = -9999, minY =  9999, maxY = -9999;
        for (let i = 0; i < n; i++) {
            const p = pointAt(segments, total, i / n);
            samples[i] = p;
            const x = p[0], y = p[1];
            if (x < minX) minX = x;
            if (x > maxX) maxX = x;
            if (y < minY) minY = y;
            if (y > maxY) maxY = y;
        }
        const w = maxX - minX, h = maxY - minY;
        const larger = Math.max(w, h);
        const scale  = 100 / larger;
        const offsetX = (100 - w * scale) / 2 - minX * scale;
        const offsetY = (100 - h * scale) / 2 - minY * scale;
        const points = new Array(n);
        for (let i = 0; i < n; i++) {
            const [x, y] = samples[i];
            points[i] = [x * scale + offsetX, y * scale + offsetY];
        }
        return emitAlignedPath(points, n);
    }
    return buildPath(segments, n);
}

// Faithful port of MaterialShapes._doRepeat. Polar coordinates so the
// rotate/mirror algorithm preserves CW order.
function repeatedPattern(pattern, repeat, mirror = false) {
    const cx = 50, cy = 50;
    const vertices = [];
    const np = pattern.length;

    if (mirror) {
        const measures = pattern.map(v => {
            const px = v[0] - cx, py = v[1] - cy;
            return [Math.atan2(py, px), Math.sqrt(px * px + py * py)];
        });
        const firstAngle  = measures[0][0];
        const actualReps  = 2 * repeat;
        const sectionAng  = 2 * Math.PI / actualReps;

        for (let r = 0; r < actualReps; r++) {
            const rEven = r % 2 === 0;
            for (let idx = 0; idx < np; idx++) {
                const i = rEven ? idx : np - 1 - idx;
                if (i > 0 || rEven) {
                    const [mAngle, mDist] = measures[i];
                    const a = rEven
                        ? sectionAng * r + mAngle
                        : sectionAng * r + (sectionAng - mAngle + 2 * firstAngle);
                    const px = cx + mDist * Math.cos(a);
                    const py = cy + mDist * Math.sin(a);
                    const orig = pattern[i];
                    const rVal = orig[2];
                    const smoothing = orig.length >= 4 ? orig[3] : 0;
                    vertices.push([px, py, rVal, smoothing]);
                }
            }
        }
    } else {
        const angleStep = 2 * Math.PI / repeat;
        for (let i = 0; i < np * repeat; i++) {
            const idx     = i % np;
            const repNum  = Math.floor(i / np);
            const rot     = repNum * angleStep;
            const cosR    = Math.cos(rot);
            const sinR    = Math.sin(rot);
            const v       = pattern[idx];
            const px = v[0] - cx, py = v[1] - cy;
            const rVal = v[2];
            const smoothing = v.length >= 4 ? v[3] : 0;
            const rx = px * cosR - py * sinR + cx;
            const ry = px * sinR + py * cosR + cy;
            vertices.push([rx, ry, rVal, smoothing]);
        }
    }
    return vertices;
}

function verticesOnCircle(numVertices, roundings, rotationDeg = 0) {
    const vertices = [];
    const rotRad = rotationDeg * Math.PI / 180;
    for (let i = 0; i < numVertices; i++) {
        const angle = 2 * Math.PI * i / numVertices + rotRad;
        const x = 50 + 50 * Math.cos(angle);
        const y = 50 + 50 * Math.sin(angle);
        const r = roundings[i] * 50;
        vertices.push([x, y, r]);
    }
    return vertices;
}

function starVertices(points, innerRatio, rounding, rotationDeg = -90) {
    const vertices = [];
    const outerR = 50;
    const innerR = 50 * innerRatio;
    const rounding100 = rounding * 50;
    const rotRad = rotationDeg * Math.PI / 180;
    for (let i = 0; i < points * 2; i++) {
        const angle = 2 * Math.PI * i / (points * 2) + rotRad;
        const r = i % 2 === 0 ? outerR : innerR;
        const x = 50 + r * Math.cos(angle);
        const y = 50 + r * Math.sin(angle);
        vertices.push([x, y, rounding100]);
    }
    return vertices;
}

function circlePath(n) {
    const points = [];
    for (let i = 0; i < n; i++) {
        const angle = 2 * Math.PI * i / n - Math.PI / 2;
        points.push([50 + 50 * Math.cos(angle), 50 + 50 * Math.sin(angle)]);
    }
    return emitAlignedPath(points, n);
}

// --- shape generators (one per shape) -------------------------------------

function heartPath(n) {
    return roundedPolygonPath(n, repeatedPattern([
        [ 50.0,  26.8,   1.6],
        [ 79.2,  -6.6,  95.8],
        [106.4,  27.6, 100.0],
        [ 50.1,  94.6,  12.9],
    ], 1, true));
}

function cookie4Path(n) {
    return roundedPolygonPath(n, repeatedPattern([
        [123.7, 123.6, 50.0],
        [ 50.0,  91.8, 35.0],
    ], 4));
}

function cookie6Path(n) {
    return roundedPolygonPath(n, repeatedPattern([
        [ 72.3,  88.4, 55.0],
        [ 50.0, 109.9, 55.0],
    ], 6));
}

function cookie7Path(n)  { return roundedPolygonPath(n, starVertices( 7, 0.75, 0.5)); }
function cookie9Path(n)  { return roundedPolygonPath(n, starVertices( 9, 0.8,  0.5)); }
function cookie12Path(n) { return roundedPolygonPath(n, starVertices(12, 0.8,  0.5)); }

function sunnyPath(n) { return roundedPolygonPath(n, starVertices(8, 0.8, 0.15, 0)); }

function verySunnyPath(n) {
    return roundedPolygonPath(n, repeatedPattern([
        [50.0, 108.0, 8.5],
        [35.8,  84.3, 8.5],
    ], 8));
}

function clover4Path(n) {
    const hpi     = Math.PI / 2;
    const quarter = Math.PI / 4;
    const D = 25, L = 25;
    const arcLen = L * Math.PI;

    const segments = [];
    for (let i = 0; i < 4; i++) {
        const theta = i * hpi - hpi + quarter;
        const cxL = 50 + D * Math.cos(theta);
        const cyL = 50 + D * Math.sin(theta);
        segments.push({ len: arcLen, type: 'arc', cx: cxL, cy: cyL, r: L, a1: theta - hpi, a2: theta + hpi });
    }
    return buildPath(segments, n);
}

function clover8Path(n) {
    const hpi     = Math.PI / 2;
    const section = Math.PI / 4;
    const D = 35;
    const L = D * Math.tan(Math.PI / 8);
    const arcLen = L * Math.PI;

    const segments = [];
    for (let i = 0; i < 8; i++) {
        const theta = i * section - hpi;
        const cxL = 50 + D * Math.cos(theta);
        const cyL = 50 + D * Math.sin(theta);
        segments.push({ len: arcLen, type: 'arc', cx: cxL, cy: cyL, r: L, a1: theta - hpi, a2: theta + hpi });
    }
    return buildPath(segments, n);
}

function softBurstPath(n) {
    return roundedPolygonPath(n, repeatedPattern([
        [19.3, 27.7, 5.3],
        [17.6,  5.5, 5.3],
    ], 10));
}

function burstPath(n) {
    return roundedPolygonPath(n, repeatedPattern([
        [50.0, -0.6, 0.6],
        [59.2, 15.8, 0.6],
    ], 12));
}

function boomPath(n) {
    return roundedPolygonPath(n, repeatedPattern([
        [45.7, 29.6, 0.7],
        [50.0, -5.1, 0.7],
    ], 15));
}

function softBoomPath(n) {
    return roundedPolygonPath(n, repeatedPattern([
        [73.3, 45.4,  0.0, 0],
        [83.9, 43.7, 53.2, 0],
        [94.9, 44.9, 43.9, 1],
        [99.8, 47.8, 17.4, 0],
    ], 16, true));
}

function pentagonPath(n) {
    return roundedPolygonPath(n, repeatedPattern([
        [ 50.0,  -0.9, 17.2],
        [103.0,  36.5, 16.4],
        [ 82.8,  97.0, 16.9],
    ], 1, true));
}

function diamondPath(n) {
    return roundedPolygonPath(n, repeatedPattern([
        [50.0, 109.6, 15.1, 0.524],
        [ 4.0,  50.0, 15.9, 0],
    ], 2));
}

function puffyDiamondPath(n) {
    const hpi    = Math.PI / 2;
    const D = 35, L = 35;
    const arcLen = L * Math.PI;

    const segments = [];
    for (let i = 0; i < 4; i++) {
        const theta = i * hpi - Math.PI / 4;
        const cxL = 50 + D * Math.cos(theta);
        const cyL = 50 + D * Math.sin(theta);
        segments.push({ len: arcLen, type: 'arc', cx: cxL, cy: cyL, r: L, a1: theta - hpi, a2: theta + hpi });
    }
    return buildPath(segments, n);
}

function ghostIshPath(n) {
    return roundedPolygonPath(n, repeatedPattern([
        [ 50.0,   0.0, 100.0],
        [100.0,   0.0, 100.0],
        [100.0, 114.0,  25.4],
        [ 57.5,  90.6,  25.3],
    ], 1, true));
}

function bunPath(n) {
    return roundedPolygonPath(n, repeatedPattern([
        [79.6,  50.0,   0.0],
        [85.3,  51.8, 100.0],
        [99.2,  63.1, 100.0],
        [96.8, 100.0, 100.0],
    ], 2, true));
}

function clamshellPath(n) {
    return roundedPolygonPath(n, repeatedPattern([
        [ 17.1, 84.1, 15.9],
        [ -2.0, 50.0, 14.0],
        [ 17.0, 15.9, 15.9],
    ], 2));
}

function gemPath(n) {
    return roundedPolygonPath(n, repeatedPattern([
        [49.9, 102.3, 24.1, 0.778],
        [-0.5,  79.2, 20.8, 0],
        [ 7.3,  25.8, 22.8, 0],
        [43.3,   0.0, 49.1, 0],
    ], 1, true));
}

function pillPath(n) {
    return roundedPolygonPath(n, [
        [90, 75, 50],
        [10, 75, 50],
        [10, 25, 50],
        [90, 25, 50],
    ]);
}

function slantedPath(n) {
    return roundedPolygonPath(n, repeatedPattern([
        [92.6,  97.0, 18.9, 0.811],
        [-2.1,  96.7, 18.7, 0.057],
    ], 2));
}

function flowerPath(n) {
    return roundedPolygonPath(n, repeatedPattern([
        [37.0, 18.7,  0.0],
        [41.6,  4.9, 38.1],
        [47.9,  0.1,  9.5],
    ], 8, true));
}

function arrowPath(n) {
    return roundedPolygonPath(n, repeatedPattern([
        [ 50.0,  89.2, 31.3, 0],
        [-21.6, 105.0, 20.7, 0],
        [ 49.9, -16.0, 21.5, 1],
        [122.5, 106.0, 21.1, 0],
    ], 1));
}

function fanPath(n) {
    return roundedPolygonPath(n, repeatedPattern([
        [100.4, 100.0, 14.8, 0.417],
        [  0.0, 100.0, 15.1, 0],
        [  0.0,  -0.3, 14.8, 0],
        [ 97.8,   2.0, 80.3, 0],
    ], 1));
}

function squarePath(n) {
    return roundedPolygonPath(n, [
        [100, 100, 30], [  0, 100, 30], [  0,   0, 30], [100,   0, 30],
    ]);
}

function trianglePath(n) {
    return roundedPolygonPath(n, verticesOnCircle(3, [0.2, 0.2, 0.2], -90));
}

function archPath(n) {
    return roundedPolygonPath(n, verticesOnCircle(4, [1, 1, 0.2, 0.2], -135));
}

function ovalPath(n) {
    const a = 50;
    const b = 50 * 0.64;
    const cos45 = Math.sqrt(2) / 2;
    const sin45 = -Math.sqrt(2) / 2;
    const points = [];
    for (let i = 0; i < n; i++) {
        const angle = 2 * Math.PI * i / n - Math.PI / 2;
        const x = a * Math.cos(angle);
        const y = b * Math.sin(angle);
        const rx = x * cos45 - y * sin45;
        const ry = x * sin45 + y * cos45;
        points.push([50 + rx, 50 + ry]);
    }
    return emitAlignedPath(points, n);
}

function pixelCirclePath(n) {
    return roundedPolygonPath(n, repeatedPattern([
        [ 50.0,   0.0, 0],
        [ 70.4,   0.0, 0],
        [ 70.4,   6.5, 0],
        [ 84.3,   6.5, 0],
        [ 84.3,  14.8, 0],
        [ 92.6,  14.8, 0],
        [ 92.6,  29.6, 0],
        [100.0,  29.6, 0],
    ], 2, true));
}

function pixelTrianglePath(n) {
    return roundedPolygonPath(n, repeatedPattern([
        [ 11.0,  50.0, 0],
        [ 11.3,   0.0, 0],
        [ 28.7,   0.0, 0],
        [ 28.7,   8.7, 0],
        [ 42.1,   8.7, 0],
        [ 42.1,  17.0, 0],
        [ 56.0,  17.0, 0],
        [ 56.0,  26.5, 0],
        [ 67.4,  26.5, 0],
        [ 67.5,  34.4, 0],
        [ 78.9,  34.4, 0],
        [ 78.9,  43.9, 0],
        [ 88.8,  43.9, 0],
    ], 1, true));
}

function puffyPath(n) {
    const puffs   = 6;
    const hpi     = Math.PI / 2;
    const section = 2 * Math.PI / puffs;
    const tanH    = Math.tan(Math.PI / puffs);
    const D = 50 / (1 + tanH);
    const L = D * tanH;
    const arcLen = L * Math.PI;

    const segments = [];
    for (let i = 0; i < puffs; i++) {
        const theta = i * section - hpi;
        const cxL = 50 + D * Math.cos(theta);
        const cyL = 50 + D * Math.sin(theta);
        segments.push({ len: arcLen, type: 'arc', cx: cxL, cy: cyL, r: L, a1: theta - hpi, a2: theta + hpi });
    }

    const total = segmentsLength(segments);
    const points = [];
    for (let i = 0; i < n; i++) {
        const [x, y] = pointAt(segments, total, i / n);
        points.push([x, 50 + (y - 50) * 0.742]);
    }
    return emitAlignedPath(points, n);
}

function semicirclePath(n) {
    const hpi  = Math.PI / 2;
    const r    = 16;
    const bot  = 75 + r / 2;
    const cy   = bot - r;
    const R    = 50;
    const halfArc   = hpi * R;
    const arcFillet = hpi * r;
    const flat      = 100 - 2 * r;

    const segments = [
        { len: halfArc,   type: 'arc',  cx: 50,        cy, r: R, a1: -hpi,        a2: 0 },
        { len: arcFillet, type: 'arc',  cx: 100 - r,   cy, r,    a1: 0,           a2: hpi },
        { len: flat,      type: 'line', x1: 100 - r,   y1: bot, x2: r, y2: bot },
        { len: arcFillet, type: 'arc',  cx: r,         cy, r,    a1: hpi,         a2: Math.PI },
        { len: halfArc,   type: 'arc',  cx: 50,        cy, r: R, a1: Math.PI,     a2: Math.PI + hpi },
    ];
    return buildPath(segments, n);
}

// --- entry point ----------------------------------------------------------

const SHAPE_GENERATORS = {
    'circle':         circlePath,
    'square':         squarePath,
    'slanted':        slantedPath,
    'arch':           archPath,
    'semicircle':     semicirclePath,
    'oval':           ovalPath,
    'pill':           pillPath,
    'triangle':       trianglePath,
    'arrow':          arrowPath,
    'fan':            fanPath,
    'diamond':        diamondPath,
    'clamshell':      clamshellPath,
    'pentagon':       pentagonPath,
    'gem':            gemPath,
    'very-sunny':     verySunnyPath,
    'sunny':          sunnyPath,
    'cookie-4':       cookie4Path,
    'cookie-6':       cookie6Path,
    'cookie-7':       cookie7Path,
    'cookie-9':       cookie9Path,
    'cookie-12':      cookie12Path,
    'clover-4':       clover4Path,
    'clover-8':       clover8Path,
    'burst':          burstPath,
    'soft-burst':     softBurstPath,
    'boom':           boomPath,
    'soft-boom':      softBoomPath,
    'flower':         flowerPath,
    'puffy':          puffyPath,
    'puffy-diamond':  puffyDiamondPath,
    'ghost-ish':      ghostIshPath,
    'pixel-circle':   pixelCirclePath,
    'pixel-triangle': pixelTrianglePath,
    'bun':            bunPath,
    'heart':          heartPath,
};

const DEFAULT_VERTEX_COUNT = 128;

export function generatePathsScss(vertexCount = DEFAULT_VERTEX_COUNT) {
    const longest = Math.max(...Object.keys(SHAPE_GENERATORS).map(s => s.length));
    const lines = [
        '//',
        '// GENERATED by tools/shapes/generate.mjs — do not edit by hand.',
        '// Regenerate with `npm run gen:shapes` after changing the generator',
        '// or any shape parameter. CI fails (`npm run check:shapes`) if this',
        '// file is out of date.',
        '//',
        '',
        '$paths: (',
    ];
    for (const [name, fn] of Object.entries(SHAPE_GENERATORS)) {
        const d = fn(vertexCount);
        const padding = ' '.repeat(longest - name.length);
        lines.push(`    ${name}:${padding} '${d}',`);
    }
    lines.push(');', '');
    return lines.join('\n');
}

export const TARGET_PATH = targetPath;

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
    const out = generatePathsScss();
    fs.writeFileSync(targetPath, out);
    console.log(`Wrote ${Object.keys(SHAPE_GENERATORS).length} shapes to ${path.relative(process.cwd(), targetPath)} (${out.length} bytes).`);
}

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

// Every per-component stylesheet in dist/ must be usable on its own (plus base.css and a
// theme). This check reads each compiled file and reports every fallback-less
// `var(--md-sys-*)` or `var(--md-ref-*)` reference whose custom property is defined neither
// in that file nor in base.css. Colour roles come from the theme and are skipped.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const distDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../dist');

const definitions = css => new Set(
    [...css.matchAll(/(?:^|[{;])\s*(--md-(?:sys|ref)-[\w-]+)\s*:/g)].map(m => m[1])
);

const references = css => new Set(
    [...css.matchAll(/var\((--md-(?:sys|ref)-[\w-]+)\)/g)]
        .map(m => m[1])
        .filter(name => !name.startsWith('--md-sys-color-'))
);

const base     = fs.readFileSync(path.join(distDir, 'base.css'), 'utf8');
const provided = definitions(base);
let failures   = 0;

for (const file of fs.readdirSync(distDir).filter(name => name.endsWith('.css')).sort()) {
    const css     = fs.readFileSync(path.join(distDir, file), 'utf8');
    const defined = definitions(css);
    const missing = [...references(css)].filter(name => !defined.has(name) && !provided.has(name));

    if (missing.length) {
        failures += missing.length;
        console.error(`✗ ${file}: ${missing.join(', ')}`);
    }
}

if (failures) {
    console.error(`\n${failures} undefined token reference(s). Add the matching @include to the component's SCSS.`);
    process.exit(1);
}

console.log('✓ Every per-component stylesheet defines the tokens it references.');

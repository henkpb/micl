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
import { generatePathsScss, TARGET_PATH } from './generate.mjs';

//
// CI staleness gate. Compares the on-disk components/shape/_paths.generated.scss
// against what the generator would produce now. Exits non-zero if they differ,
// instructing the developer to run `npm run gen:shapes` and commit the result.
//

const expected = generatePathsScss();
const actual   = fs.existsSync(TARGET_PATH) ? fs.readFileSync(TARGET_PATH, 'utf8') : '';

if (expected !== actual) {
    const rel = path.relative(process.cwd(), TARGET_PATH);
    console.error(`✗ ${rel} is out of date.`);
    console.error('  Run `npm run gen:shapes` and commit the regenerated file.');
    process.exit(1);
}

console.log('✓ Shape paths up to date.');

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

// Runs after the webpack build (npm "postbuild") and aligns the emitted declarations with the
// UMD scripts they describe:
// - dist/micl.js and dist/foundations/form/index.js export their object itself
//   (library.export 'default'), so their declarations use `export =`.
// - dist/<name>.js exports the component module; its declarations live under
//   dist/components/<name>/, so dist/<name>.d.ts re-exports them next to the script.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const distDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../dist');

const exportAssignment = file => {
    const target = path.join(distDir, file);
    const source = fs.readFileSync(target, 'utf8');
    const result = source
        .replace(/^import '.*';\n/gm, '')
        .replace(/^export default (\w+);$/m, 'export = $1;');

    if (!result.includes('export =')) {
        throw new Error(`${file}: no default export to convert`);
    }
    fs.writeFileSync(target, result);
};

exportAssignment('micl.d.ts');
exportAssignment('foundations/form/index.d.ts');

for (const name of fs.readdirSync(path.join(distDir, 'components'))) {
    if (!fs.existsSync(path.join(distDir, `${name}.js`))) {
        continue;
    }
    fs.writeFileSync(
        path.join(distDir, `${name}.d.ts`),
        `export * from './components/${name}/index';\nexport { default } from './components/${name}/index';\n`
    );
}

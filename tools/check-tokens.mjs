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

// Every per-component stylesheet in dist/ must be usable with base.css, a theme and the
// companion stylesheets its README tells consumers to import. This check reads each compiled
// file and reports every fallback-less `var()` reference to a system token (--md-sys-*,
// --md-ref-*), a private property (--_*) or a MICL property (--micl-*) that none of those
// files defines or registers with @property. Colour roles come from the theme, component
// tokens (--md-comp-*) are optional inputs, and --micl-* properties that the TypeScript sets
// are skipped.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distDir = path.join(rootDir, 'dist');

// Stylesheets that adjust another component's elements when both are loaded, and so read
// that component's private properties without depending on it.
const optional = {
    list: ['checkbox', 'radio']
};

const read = name => fs.readFileSync(path.join(distDir, `${name}.css`), 'utf8');

const definitions = css => new Set([
    ...[...css.matchAll(/(?:^|[{;])\s*(--[\w-]+)\s*:/g)].map(m => m[1]),
    ...[...css.matchAll(/@property\s+(--[\w-]+)/g)].map(m => m[1])
]);

const references = css => new Set(
    [...css.matchAll(/var\((--[\w-]+)\)/g)]
        .map(m => m[1])
        .filter(name => /^--(md-sys|md-ref|_|micl-)/.test(name) && !name.startsWith('--md-sys-color-'))
);

const scriptProperties = fs.globSync('{components,foundations}/**/*.ts', { cwd: rootDir })
    .flatMap(file => [...fs.readFileSync(path.join(rootDir, file), 'utf8').matchAll(/['"`](--micl-[\w-]+)/g)])
    .map(m => m[1]);

const setByScript = name => scriptProperties.some(property =>
    property === name || (property.endsWith('-') && name.startsWith(property)));

const companions = name => {
    const readme = ['components', 'foundations']
        .map(folder => path.join(rootDir, folder, name, 'README.md'))
        .find(file => fs.existsSync(file));
    const documented = readme
        ? [...fs.readFileSync(readme, 'utf8').matchAll(/\/dist\/([a-z]+)"/g)].map(m => m[1])
        : [];
    return [...documented, ...(optional[name] ?? [])]
        .filter(other => other !== name && fs.existsSync(path.join(distDir, `${other}.css`)));
};

const base   = definitions(read('base'));
let failures = 0;

for (const file of fs.readdirSync(distDir).filter(file => file.endsWith('.css')).sort()) {
    const name = path.basename(file, '.css');
    if (name === 'base') {
        continue;
    }
    const css      = read(name);
    const provided = new Set([
        ...base,
        ...definitions(css),
        ...companions(name).flatMap(other => [...definitions(read(other))])
    ]);
    const missing = [...references(css)].filter(property => !provided.has(property) && !setByScript(property));

    if (missing.length) {
        failures += missing.length;
        console.error(`✗ ${file}: ${missing.join(', ')}`);
    }
}

if (failures) {
    console.error(`\n${failures} undefined reference(s). Add the matching @include to the component's SCSS, or list the stylesheet that defines it in the component's README.`);
    process.exit(1);
}

console.log('✓ Every per-component stylesheet defines the properties it references, or its README imports the stylesheet that does.');

const path    = require('path');
const fs      = require('fs');
const glob    = require('glob');
const webpack = require('webpack');
const miniCss = require('mini-css-extract-plugin');
const distDir = path.resolve(__dirname, 'dist');
const docsDir = path.resolve(__dirname, 'docs');

const scssFiles = glob.sync('{./foundations/**/*.scss,./components/**/*.scss}');
const scssEntries = scssFiles.reduce((entries, filePath) => {
    // The shape gallery has two SCSS files: index.scss (the partial that
    // consumers @use to opt into individual shapes) and master.scss (the
    // dist-bundle entry that installs all shapes). Only the latter should
    // be compiled as a webpack entry.
    const normalized = filePath.replace(/\\/g, '/');
    if (normalized.endsWith('components/shapes/index.scss')) return entries;
    // Sass partials (leading underscore) are shared modules, not entry points.
    if (path.basename(normalized).startsWith('_')) return entries;
    const componentName = path.dirname(filePath).split('\\').pop();

    // Pair each component's stylesheet with its sibling TypeScript handler (if
    // present) so the standalone <component>.js contains the component logic
    // instead of an empty UMD stub. Foundations TS are built via tsEntries.
    const sources = ['./' + filePath];
    const tsSibling = path.dirname(normalized) + '/index.ts';
    if (normalized.startsWith('components/') && fs.existsSync(tsSibling)) {
        sources.push('./' + tsSibling);
    }

    entries[componentName] = sources.length > 1 ? sources : sources[0];
    return entries;
}, {});

const tsEntries = glob.sync('./foundations/**/*.ts').reduce((entries, filePath) => {
    const normalized = filePath.replace(/\\/g, '/').replace(/^\.\//, '');
    if (normalized.endsWith('.d.ts')) return entries;
    entries[normalized.replace(/\.ts$/, '')] = './' + normalized;
    return entries;
}, {});

module.exports = [{
    // Standalone per-component / per-foundation files. Built first and on its
    // own (clean: true) so the micl bundle below can scope-hoist component
    // modules instead of treating them as entry points.
    name: 'parts',
    mode: 'production',
    entry: {
        ...scssEntries,
        ...tsEntries
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    output: {
        path: distDir,
        filename: '[name].js',
        clean: true,
        library: {
            name: 'micl',
            type: 'umd'
        }
    },
    module: {
        rules: [{
            test: /\.scss$/,
            use : [
                miniCss.loader,
                'css-loader',
                'postcss-loader',
                'sass-loader'
            ]
        }, {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/
        }]
    },
    plugins: [
        new miniCss({
            filename: '[name].css'
        })
    ]
}, {
    // Full dist bundle. Separate compilation (after 'parts', without cleaning)
    // so component modules imported by micl.ts are concatenated into micl.js.
    name: 'bundle',
    dependencies: ['parts'],
    mode: 'production',
    entry: {
        micl: ['./styles.scss', './micl.ts']
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    output: {
        path: distDir,
        filename: '[name].js',
        clean: false,
        library: {
            name: 'micl',
            type: 'umd'
        }
    },
    module: {
        rules: [{
            test: /\.scss$/,
            use : [
                miniCss.loader,
                'css-loader',
                'postcss-loader',
                'sass-loader'
            ]
        }, {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/
        }]
    },
    plugins: [
        new miniCss({
            filename: '[name].css'
        })
    ]
}, {
    mode: 'production',
    entry: {
        micl: ['./styles.scss', './micl.ts'],
        shapes: './components/shapes/master.scss'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    output: {
        path: docsDir,
        filename: '[name].js',
        library: {
            name: 'micl',
            type: 'umd'
        }
    },
    module: {
        rules: [{
            test: /\.scss$/,
            use : [
                miniCss.loader,
                'css-loader',
                'postcss-loader',
                'sass-loader'
            ]
        }, {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/
        }]
    },
    plugins: [
        new miniCss({
            filename: '[name].css'
        })
    ]
}];

const path    = require('path');
const glob    = require('glob');
const webpack = require('webpack');
const miniCss = require('mini-css-extract-plugin');
const distDir = path.resolve(__dirname, 'dist');
const docsDir = path.resolve(__dirname, 'docs');

const scssFiles = glob.sync('{./foundations/**/*.scss,./components/**/*.scss}');
const scssEntries = scssFiles.reduce((entries, filePath) => {
    const componentName = path.dirname(filePath).split('\\').pop();
    entries[componentName] = './' + filePath;
    return entries;
}, {});

const tsEntries = glob.sync('./foundations/**/*.ts').reduce((entries, filePath) => {
    const normalized = filePath.replace(/\\/g, '/').replace(/^\.\//, '');
    if (normalized.endsWith('.d.ts')) return entries;
    entries[normalized.replace(/\.ts$/, '')] = './' + normalized;
    return entries;
}, {});

module.exports = [{
    mode: 'production',
    entry: {
        ...scssEntries,
        ...tsEntries,
        micl: ['./styles.scss', './micl.ts']
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
    mode: 'production',
    entry: {
        micl: ['./styles.scss', './micl.ts']
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

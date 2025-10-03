const path    = require('path');
const glob    = require('glob');
const webpack = require('webpack');
const miniCss = require('mini-css-extract-plugin');
const distDir = path.resolve(__dirname, 'dist');
const docsDir = path.resolve(__dirname, 'docs');

const scssFiles = glob.sync('{./layout/*.scss,./components/**/*.scss}');
const scssEntries = scssFiles.reduce((entries, filePath) => {
    const componentName = path.dirname(filePath).split('\\').pop();
    entries[componentName] = './' + filePath;
    return entries;
}, {});

module.exports = [{
    mode: 'production',
    entry: {
        ...scssEntries,
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

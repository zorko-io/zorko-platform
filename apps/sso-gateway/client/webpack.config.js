const debug = process.env.NODE_ENV !== "production";
const webpack = require('webpack');
const path = require('path');

const srcPath = path.join(__dirname, 'src');


module.exports = {
    mode: process.env.NODE_ENV,
    context: srcPath,
    devtool: debug ? "inline-sourcemap" : "",
    entry: {
        app: [
            "./js/client.js"
        ]
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: [
                    path.resolve(__dirname, "node_modules")
                ],
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }

            },
            { test: /\.html$/, loader: 'html-loader' },
        ]
    },
    node: {
        crypto: 'empty',
        net: 'empty',
        dns: 'empty',
        fs: "empty",
    },
    resolve: {
        modules: ['node_modules']
    },
    devServer: {
        publicPath: 'http://127.0.0.1:8086/',
        contentBase: "./src/",
        hot: true,
        inline: true,
        headers: { 'Access-Control-Allow-Origin': '*' }
    },
    output: {
        globalObject: 'this',
        path: srcPath,
        filename: 'client.min.js',
        chunkFilename: '[name].chunk.js',
    },
    optimization: {
        splitChunks: {
            chunks: "initial",
        },
    },
    externals:[{
        xmlhttprequest: '{XMLHttpRequest:XMLHttpRequest}'
    }]
};

const path = require('path')
const config = require('../config')
const webpack = require('webpack')
// 生成创建Html入口文件
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { commonLoader, eslintLoader } = require('./loader')
//将css提取到单独的文件中
const MiniCssExtract = require('mini-css-extract-plugin')
//压缩js文件
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const { resolve } = require('./utils')
require('../config/setEnv')

const MyPlugin = require('../myself/myPlugin')

module.exports = {
    mode: process.env.NODE_ENV,
    context: path.resolve(__dirname, '../'),
    entry: {
        app: resolve('/src/main.js'),
    },
    // 优化打包，以下文件外链
    externals: {
        jquery: '$',
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            '@': resolve('src'),
            utils: resolve('src/utils'),
            api: resolve('src/api'),
            components: resolve('src/components'),
            views: resolve('src/views'),
            services: resolve('src/services'),
        },
    },
    module: {
        rules: [...commonLoader, ...(config.dev.useEslint ? eslintLoader : [])],
    },
    plugins: [
        // 自动加载模块 可以在全局直接使用utils这样的
        new webpack.ProvidePlugin({
            $: 'jquery',
            utils: '../src/utils/index.js',
        }),
        new HtmlWebpackPlugin({
            title: 'wellxiao标题',
            template: resolve('/index.html'),
            filename: 'index.html',
            minify: {
                //移除空格
                collapseWhitespace: true, //移除注释
                removeComments: true,
            },
        }),
        new MiniCssExtract({
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
        new FriendlyErrorsWebpackPlugin(),
        new webpack.DllReferencePlugin({
            manifest: require(path.join(__dirname, '../static/dll', 'vendor-manifest.json')),
            name: '[name]_library',
        }),
        new MyPlugin(),
    ],
}

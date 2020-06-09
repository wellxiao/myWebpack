const path = require('path')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
//清除build/dist文件夹文件
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// 生成创建Html入口文件
const HtmlWebpackPlugin = require('html-webpack-plugin')
//将css提取到单独的文件中
const MiniCssExtract = require('mini-css-extract-plugin')
//压缩js文件
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
//   自动获取端口
const portfinder = require('portfinder')

function resolve(dir) {
    return path.join(__dirname, '../', dir)
}

const devWebpackConfig = merge(baseWebpackConfig, {
    // cheap-module-eval-source-map is faster for development
    devtool: 'source-map',

    // these devServer options should be customized in /config/index.js
    devServer: {
        // clientLogLevel: 'warning',
        historyApiFallback: true,
        hot: true,
        //开启gzip压缩
        compress: true,
        // 显示打包的进度
        progress: true,
        host: process.env.HOST || config.dev.host,
        port: process.env.PORT || config.dev.port,
        open: config.dev.open,
        // 在浏览器上全屏显示编译的errors或warnings。 既想显示erros也想显示warnings
        overlay: {
            warnings: false,
            errors: true,
        },
        publicPath: '/',
        proxy: config.dev.proxy,
        // 控制台中不输出打包的信息
        quiet: true, // necessary for FriendlyErrorsPlugin
        watchOptions: {
            poll: config.dev.poll,
        },
    },
    plugins: [
        // 定义环境变量
        new webpack.DefinePlugin({
            'process.env': require('../config/setEnv'),
        }),
        // 自动加载模块 可以在全局直接使用utils这样的
        new webpack.ProvidePlugin({
            $: 'jquery',
            utils: '../src/utils/index.js',
        }),
        //使用插件清除dist文件夹中的文件
        new CleanWebpackPlugin({
            path: resolve('/dist'),
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
    ],
})

module.exports = new Promise((resolve, reject) => {
    portfinder.basePort = process.env.PORT || config.dev.port
    portfinder.getPort((err, port) => {
        if (err) {
            reject(err)
        } else {
            // publish the new Port, necessary for e2e tests
            process.env.PORT = port
            devWebpackConfig.devServer.port = port

            devWebpackConfig.plugins.push(
                new FriendlyErrorsPlugin({
                    compilationSuccessInfo: {
                        messages: [`Your application is running here: http://${config.dev.host}:${port}`],
                    },
                    onErrors: '出错了',
                }),
            )

            resolve(devWebpackConfig)
        }
    })
})

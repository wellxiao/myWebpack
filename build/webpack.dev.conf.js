const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')

const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
//   自动获取端口
const portfinder = require('portfinder')

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

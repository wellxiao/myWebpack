const path = require('path')
const config = require('../config')
const { commonLoader, eslintLoader } = require('./loader')
const { resolve } = require('./utils')

module.exports = {
    context: path.resolve(__dirname, '../'),
    entry: {
        app: resolve('/src/main.js'),
    },
    output: {
        path: resolve('/dist'),
        filename: 'js/bundle.js',
        publicPath: '../',
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
}

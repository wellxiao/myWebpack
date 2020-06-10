const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
// const HtmlWebpackPlugin = require('html-webpack-plugin')
// 分割css代码
// const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

//清除build/dist文件夹文件
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
//将css提取到单独的文件中
const MiniCssExtract = require('mini-css-extract-plugin')
//压缩js文件
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const { resolve } = require('./utils')

const webpackConfig = merge(baseWebpackConfig, {
    // 正式环境不生成map文件
    devtool: false,
    output: {
        path: resolve('/dist'),
        filename: 'js/bundle.js',
        publicPath: '../',
    },
    optimization: {
        // minimizer: [
        // ],
    },
    plugins: [
        //使用插件清除dist文件夹中的文件
        new CleanWebpackPlugin({
            path: resolve('/dist'),
        }),
        new MiniCssExtract({
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
        // 不支持es6语法
        new UglifyJsPlugin({
            // test: /\.js(\?.*)?$/i,  //测试匹配文件,
            // include: /\/includes/, //包含哪些文件
            // excluce: /\/excludes/, //不包含哪些文件
            //允许过滤哪些块应该被uglified（默认情况下，所有块都是uglified）。
            //返回true以uglify块，否则返回false。
            //     // 使用 SourceMaps 将错误信息的位置映射到模块。这会减慢编译的速度。
            sourceMap: true, // config.build.productionSourceMap || false,
            cache: false, //是否启用文件缓存，默认缓存在node_modules/.cache/uglifyjs-webpack-plugin.目录
            parallel: true, //使用多进程并行运行来提高构建速度
        }),
    ],
})


module.exports = webpackConfig

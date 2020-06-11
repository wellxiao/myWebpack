const path = require('path')
const webpack = require('webpack')
//清除build/dist文件夹文件
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// 生成创建Html入口文件
const HtmlWebpackPlugin = require('html-webpack-plugin')
//将css提取到单独的文件中
const MiniCssExtract = require('mini-css-extract-plugin')
//css压缩
const OptimizeCss = require('optimize-css-assets-webpack-plugin')
//压缩js文件
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
console.log('1111')
console.log(path.resolve(__dirname, '../src/index.html'))

function resolve(dir) {
    return path.join(__dirname, '../', dir)
}

module.exports = {
    // mode下plugins里配置了
    mode: 'development',
    context: path.resolve(__dirname, '../'),
    entry: resolve('/src/main.js'),
    output: {
        path: resolve('/dist'),
        publicPath: '../',
        filename: 'js/bundle.js',
    },
    devServer: {
        publicPath: '/',
        port: 8099,
        //在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
        historyApiFallback: true,
        hot: true,
        contentBase: false,
        open: false,
        proxy: {},
        lazy: false, //启动的时候不打包, 访问到了再编译打包
        overlay: true, // 在打开的页面中,出现错误就显示遮罩,并显示错误
        https: false,
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            //别名
            '@': resolve('src'),
        },
    },
    devtool: 'source-map',
    optimization: {
        minimizer: [],
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
        // 不支持es6语法
        new UglifyJsPlugin({
            // test: /\.js(\?.*)?$/i,  //测试匹配文件,
            // include: /\/includes/, //包含哪些文件
            // excluce: /\/excludes/, //不包含哪些文件
            //     // 使用 SourceMaps 将错误信息的位置映射到模块。这会减慢编译的速度。
            sourceMap: false, // config.build.productionSourceMap || false,
            cache: false, //是否启用文件缓存，默认缓存在node_modules/.cache/uglifyjs-webpack-plugin.目录
            parallel: true, //使用多进程并行运行来提高构建速度
        }),
    ],
    // 优化打包，以下文件外链
    externals: {
        jquery: '$',
    },
    //loader加载器模块配置
    module: {
        rules: [
            {
                test: /\.js$/,
                // loader: 'babel-loader',
                exclude: /(node_modules|bower_components)/, // 优化处理加快速度
                use: {
                    loader: 'babel-loader',
                    options: {
                        // presets: ['@babel/preset-env'],
                        // plugins: ['@babel/transform-runtime'],
                    },
                },
            },
            {
                //正则表达式匹配.css为后缀的文件
                test: /\.css$/,
                //使用loader
                use: [
                    {
                        loader: MiniCssExtract.loader,
                        options: {
                            // 公共路径
                            // 默认情况下，使用的是webpackOptions.output中publicPath
                            publicPath: '../',
                            //开发环境配置热更新
                            hmr: process.env.NODE_ENV === 'development',
                        },
                    },
                    'css-loader',
                    // {
                    //     loader: 'postcss-loader',
                    // },
                ],
            },
        ],
    },
}

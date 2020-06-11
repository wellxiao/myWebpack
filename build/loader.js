//将css提取到单独的文件中
const MiniCssExtract = require('mini-css-extract-plugin')
const { resolve } = require('./utils')
const config = require('../config')

exports.commonLoader = [
    {
        test: /\.js$/,
        // loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/, // 优化处理加快速度
        use: [
            {
                loader: 'babel-loader',
                options: {
                    // presets: ['@babel/preset-env', 'stage-0'],
                    // plugins: ['@babel/transform-runtime'],
                },
            },
            {
                loader: resolve('./myself/myloader.js'),
                options: {
                    name: 'world', // 传递给loader的参数
                },
            },
        ],
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
]

exports.eslintLoader = [
    {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src'), resolve('test')],
        options: {
            formatter: require('eslint-friendly-formatter'),
            emitWarning: !config.dev.showEslintErrorsInOverlay,
        },
    },
]

const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

// dll文件存放的目录
const dllPath = '../static/dll'
module.exports = {
    // 入口文件
    entry: {
        vendor: ['axios'],
    },
    // 输出文件
    output: {
        path: path.join(__dirname, dllPath),
        filename: 'MyDll.[name].js',
        library: '[name]_[hash]',
    },
    plugins: [
        // 清除之前的dll文件
        new CleanWebpackPlugin(),
        new webpack.DllPlugin({
            path: path.join(__dirname, dllPath, '[name]-manifest.json'),
            name: '[name]_[hash]',
        }),
    ],
}

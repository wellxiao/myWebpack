module.exports = {
    dev: {
        publicPath: '/',
        // 地址
        host: '0.0.0.0',
        // 自定义的 是否打开浏览器
        open: false,
        // 端口号
        port: 8099,
        //在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
        historyApiFallback: true,
        // devtool用作调试 eval-source-map 原始代码 开发环境    source-map 原始代码 正式环境
        devtool: 'eval-source-map',
        hot: true,
        poll: false,
        // 代理
        proxy: {},
        // 开启eslint
        useEslint: false,
        lazy: false, //启动的时候不打包, 访问到了再编译打包
        overlay: true, // 在打开的页面中,出现错误就显示遮罩,并显示错误
        https: false,
    },
}

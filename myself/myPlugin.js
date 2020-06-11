class MyPlugin {
    // options 自定义插件配置
    constructor(options) {
        console.log('自定义插件被使用')
    }
    apply(compiler) {
        // 匹配所有 data-test 属性的正则
        const reg = /\s*data-test="(.*?)"/g

        console.log(compiler.hooks)

        // step3: 插入事件钩子，在回调中取到 compilation
        compiler.hooks.emit.tap('RemoveDataTest', compilation => {
            Object.keys(compilation.assets).forEach(filename => {
                // step4: 得到资源内容
                let content = compilation.assets[filename].source()
                // step5: 清除 html 文件中的 data-test 属性
                if (/\.html$/.test(filename)) {
                    content = content.replace(reg, '')
                }
                // step6: 更新 compilation.assets[filename] 对象
                compilation.assets[filename] = {
                    source() {
                        return content
                    },
                    size() {
                        return content.length
                    },
                }
            })
        })
    }
}
module.exports = MyPlugin

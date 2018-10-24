var htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: {
        main: './src/script/main.js',
        a: './src/script/a.js',
        b: './src/script/b.js',
        c: './src/script/c.js'
    },
    output: {
        path: __dirname + '/dist',
        filename: 'js/[name]-[chunkhash].js',
        // 打包生成的html文件中的引入会加上如下地址，变成先上地址
        publicPath: 'http://hello.com'
    },
    plugins: [
        new htmlWebpackPlugin({
            //定义打包生成的html文件名
            filename: 'a.html',
            // 所在根目录下的index.html
            template: 'index.html',
            //定义引入标签的位置，是在body中。
            inject: false,
            //指定生成对应的html时，只引入chunk为main和a的js
            chunks:['main','a'],
            title: 'A今天学习马马虎虎',
            // 压缩html的配置
            minify: {
                // 删除注释
                removeComments: true,
                // 删除空格
                collapseWhitespace: true
            }
        }),
        new htmlWebpackPlugin({
            filename: 'b.html',
            template: 'index.html',
            inject: false,
            chunks: ['b'],
            title: 'B今天学习马马虎虎'
        }),
        new htmlWebpackPlugin({
            filename: 'c.html',
            template: 'index.html',
            inject: false,
            excludeChunks: ['a','b'],
            title: 'C今天学习马马虎虎'
        })
    ]
}
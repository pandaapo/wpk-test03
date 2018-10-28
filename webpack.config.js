var htmlWebpackPlugin = require('html-webpack-plugin')
var path = require('path')

module.exports = {
    // context 是 webpack 编译时的基础目录，入口起点（entry）会相对于此目录查找
    context: __dirname,
    entry: './src/app.js',
    output: {
        path: __dirname + '/dist',
        filename: 'js/[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                // exclude: __dirname + './node_modules',
                exclude: path.resolve(__dirname, 'node_modules'),
                include: __dirname + './src',
                query: {
                    presets: ['@babel/preset-env']
                }
            },
            {
                test: /\.css$/,
                // 有了css-loader，就可以在js中处理、import css了
                // loader: 'style-loader!css-loader!postcss-loader'
                loaders: [
                    'style-loader',
                    //?……是loader传参的一种方式，?importLoaders=1表示css-loader后有几个loader来处理import的资源
                    'css-loader?importLoaders=1',
                    {
                        loader: 'postcss-loader'
                        //单独写在了postcss.config.js中
                        // options: {
                        //     ident: 'postcss',
                        //     plugins: [
                        //         // require('autoprefixer')({……options}) 给autoprefixer插件传参
                        //         require('autoprefixer')({
                        //             // 最近的5个浏览器版本，加上前缀
                        //             browsers: ['last 5 versions']
                        //         })
                        //     ]
                        // }
                    }
                ]
            },
            {
                test: /\.less$/,
                // 不可以省去-loader。postcss和less loader的位置，在postcss官文有说明
                loader: 'style-loader!css-loader!postcss-loader!less-loader'
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.tpl$/,
                loader: 'ejs-loader'
            },
            // {
            //     // i表示不区分大小写
            //     test: /\.(png|jpg|gif|svg)$/i,
            //     loader: 'file-loader',
            //     query: {
            //         // 设置打包后的文件位置和文件名：assets目录下，name，5位的hash，后缀名
            //         name: 'assets/[name]-[hash:5].[ext]'
            //     }
            // },
            {
                // i表示不区分大小写
                test: /\.(png|jpg|gif|svg)$/i,
                loaders: [
                    'url-loader?limit=10000&name=assets/[name]-[hash:5].[ext]',
                    'image-webpack-loader'
                ]
            }
        ]
    },
    plugins: [
        //根据模板生成我们想要的html模板，并将html中的资源和生成的资源关联起来，自定义化输出html模板
        new htmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: 'body'
        })
    ]
}
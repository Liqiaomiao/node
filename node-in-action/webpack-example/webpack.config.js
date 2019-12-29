const path = require('path')
const webpack = require('webpack')

module.exports = {
    mode: 'development',
    entry:'./app/index.jsx',// 入口
    output: { // 出口
        path: path.resolve(__dirname,'dist'),
        filename: 'bundle.js',
        publicPath: '/assets/'
    },
    module:{
        rules:[
            {
                test: /.jsx?$/,
                use:{
                    loader: 'babel-loader',
                    options:{
                        presets:['@babel/preset-env','@babel/preset-react']
                    }
                }
            }
        ]
    }
}
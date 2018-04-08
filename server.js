// const express = require('express');
// const webpack = require('webpack');
// const webpackMiddleware = require('webpack-dev-middleware');

// // 从 webpack.config.js 文件中读取 Webpack 配置
// const config = require('./webpack.config.js');
// // 实例化一个 Expressjs app
// const app = express();

// // 用读取到的 Webpack 配置实例化一个 Compiler
// const compiler = webpack(config);

// // 给 app 注册 webpackMiddleware 中间件
// app.use(webpackMiddleware(compiler,config.devServer));
// // 启动 HTTP 服务器，服务器监听在 3000 端口
// app.listen(3002);


const webpack = require('webpack');
const config = require('./webpack.config.js');

module.exports = ()=>{
    return new Promise((resolve,reject)=>{
        const zip  = require('./zip');
        webpack(config, (err, stats) => {
            if (err || stats.hasErrors()) {
                // 构建过程出错
                if(err){
                    console.log(err);
                    reject('err')
                }
            }
            console.log("done");
            
            let zipper = zip(false);
            resolve(zipper);
            // 成功执行完构建
        });
    })


}




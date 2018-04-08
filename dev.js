const webpack = require('webpack');
const config = require('./webpack.config.js');

const compiler = webpack(config);


// 调用 compiler.watch 以监听模式启动，返回的 watching 用于关闭监听
const watching = compiler.watch({
    /** watchOptions* */
    aggregateTimeout: 300
}, (err, stats) => {
    if (err || stats.hasErrors()) {
        // 构建过程出错
        throw new Error(err);
    }
    // 每次因文件发生变化而重新执行完构建后
});

// // 调用 watching.close 关闭监听
// watching.close(() => {
//     // 在监听关闭后
//     console.log('close');
// });

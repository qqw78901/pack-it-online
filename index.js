const webpack = require('webpack');
const config = require('./webpack.config.js');

webpack(config, (err, stats) => {
    if (err || stats.hasErrors()) {
        // 构建过程出错
    }
    // 成功执行完构建
});

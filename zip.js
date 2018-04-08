var packageInfo = require('./package.json');
var fs = require("fs");
var zipper = require('zip-local');

module.exports = function (isBuff) {
    let resultMap={}
    var date = new Date();
    var SOURCEPath = "dist";

    var d = (date.getMonth() + 1).toString() + "";
    d += (date.getDate() < 10 ? "0" : '') + date.getDate().toString() + "_";
    d += (date.getHours() < 10 ? "0" : '') + date.getHours().toString() + "";
    d += (date.getMinutes() < 10 ? "0" : '') + date.getMinutes().toString() + "_";
    d += (date.getSeconds() < 10 ? "0" : '') + date.getSeconds().toString() + "";
    var zip = SOURCEPath + "_" + packageInfo.name + "_" + d;

    // 引入插件
    // 压缩dist文件夹
    if (!fs.existsSync("zip_dist")) {
        fs.mkdirSync('zip_dist');
    }

    let buf;
    if (!fs.existsSync(SOURCEPath)) {
        console.warn(SOURCEPath + " is not exist");
        return this();
    }
    if(isBuff){
        try {
            buf = zipper.sync.zip(SOURCEPath).compress().memory();
            resultMap={
                buf: buf,
                name: zip
            }
        } catch (e) {
            throw new Error(e)
        }
   
    }else{
        try {
            zipper.sync.zip(SOURCEPath).compress().save("zip_dist/" + zip + ".zip");
            resultMap={
                name: zip
            }
        } catch (error) {
            throw new Error(error)
        }
      
    }
    return resultMap
}
// zipper.sync.zip(SOURCEPath).compress().save("zip_dist/" + zip + ".zip");
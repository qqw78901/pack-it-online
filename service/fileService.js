const fs = require('fs');
const path = require('path')
module.exports = class FileService {
    constructor() {
        this.sourcePath =path.join(__dirname,'../uploads');
        this.dest = path.join(__dirname, "../src/images");
        this.zippedPath = path.join(__dirname, "../zip_dist");
    }
    copyToImgPath(file) {
        fs.copyFile(file.path, path.join(this.dest, file.originalname), (err) => {
            if (err) {
                console.log(err);
            }
        })
    }
    copyImagesToImgPath(images){
        return new Promise((resolve,reject)=>{
            images.forEach(element => {
                let img = JSON.parse(element);
                try{
                    fs.copyFileSync(path.join(this.sourcePath,img.path),path.join(this.dest,img.originalName))
                }catch(e){
                    reject(e)
                }
            });
            resolve()
        })
    }
    getZipToBuff(file){
        return new Promise((resolve,reject)=>{
            fs.readFile(path.join(this.zippedPath,`${file}.zip`),(err,data)=>{
                if(err){
                    reject(err);
                }
                resolve(data);
            })
        })

    }

}
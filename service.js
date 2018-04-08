const express = require('express');
const fs = require('fs');
const app = express();
const packIt = require('./server');

const allowCrossDomain = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
};
app.use(allowCrossDomain);
/**
 * routers
 */
app.get('/', function(req, res) {
    res.send('Hello World!');
});
/**
 * uploadImages
 */
const multer = require('multer');
const upload = multer({
    dest: 'uploads/'
});

const FileService = require('./service/fileService');
const fileService = new FileService();
app.post('/upload', upload.single('file'), function(req, res) {
    let inputFile = req.file;
    // fileService.copyToImgPath(inputFile);
    //未传时为undefined
    // console.log(inputFiles)
    // var content = inputFiles['inputFile'][0].buffer;

    // console.log('文件类型：%s', file.mimetype); 
    // console.log('原始文件名：%s', file.originalname); 
    // console.log('文件大小：%s', file.size); 
    // console.log('文件保存路径：%s', file.path); 
    res.send({
        success: true,
        data: {
            originalName: inputFile.originalname,
            path: inputFile.filename
        }
    });
});


app.get('/pack', function(req, res) {
    let query = req.query;
    let images = query.images;
    fileService.copyImagesToImgPath(images).then(() => {
        // packIt().then((zipped) => {
        //     res.set({   
        //         "Content-type": "application/octet-stream",
        //         "Content-Disposition": "attachment;filename=" + encodeURI(zipped.name) + ".zip"
        //     });
        //     res.send(new Buffer(zipped.buf))
        // });
        packIt().then(zipped => {
            res.send({
                success: true,
                name: zipped.name
            });
        }).catch(() => {
            res.send({
                success: false
            })
        })
    }).catch(e => {
        console.error(e);
    })

});
app.get('/download/:zipName', (req, res) => {
    let params = req.params;
    let fileName = params.zipName;
    fileService.getZipToBuff(fileName).then(buf => {
        res.set({
            "Content-type": "application/octet-stream",
            "Content-Disposition": "attachment;filename=" + encodeURI(fileName) + ".zip"
        });
        res.send(new Buffer(buf));
    }).catch(err => {
        res.send({
            success: false
        })
        throw new Error(err);

    })

})

let server = app.listen(3008, function() {
    var host = server.address();

    console.log(host);
});
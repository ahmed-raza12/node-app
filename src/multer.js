const express = require('express');
const app = express();

const port = 3000

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploadsFolder')
    },
    filename: function(req, file, cb){
        const fileNameSplit = file.originalname.split('.');
        const fileExtension = fileNameSplit[fileNameSplit.length - 1];
        cb(null, Date.now() + '-' + Math.ceil(Math.random() * 1000) + '.' + fileExtension) 
    }
})

const fileUpload = multer({
    storage,
    // dest: 'uploadsFolder',
    limits: {
        // fileSize: 10000 // 1MB
    },
    fileFilter: (req, file, cb) => {
        // if(!file.originalname.endsWith('.jpg')) {
        if(!file.originalname.match(/\.(jpg|jpeg|PNG|pdf)$/)){   
        return cb(new Error('file is not supported'))
        }

        cb(undefined, true)
    } 
})

app.post('/fileuploads', fileUpload.single('fileUpload'), (req, res) => {
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({error: error.message})
})


app.use(express.json());

app.listen(port, () => {
    console.log('listening on port ' + port);
    
})
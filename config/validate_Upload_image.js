// Validate upload fille
const multer = require('multer')
const helpers = require('./helpers')
const path = require("path");
let upload = multer({ storage: storage, fileFilter: helpers.imageFilter }).single('profile_pic');
upload(req, res, next, function(error) {
    if (req.fileValidationError) {
        return res.send(req.fileValidationError);
    }
    else if (!req.file) {
        return res.send('Please select an image to upload');// check neu ko co file dc chon
    }
    else if (err instanceof multer.MulterError) {
        return res.send(err);
    }
    else if (err) {
        return res.send(err);
    }
    res.send(`You have uploaded this image: <hr/><img src="${req.file.path}" width="500"><hr /><a href="./">Upload another image</a>`);
});


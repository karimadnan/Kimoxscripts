const express = require('express');
const router = express.Router();
const loginApis = require('../login');
const prodcutsApi = require('../products');
const multer = require('multer');
const url = process.env.MONGODB_URI;
const Validator = require('../validation');
const GridFsStorage = require('multer-gridfs-storage');
const storage = new GridFsStorage({
    url: url,
    file: (req, file) => {
        console.log(file, "FILE")
        if (file.mimetype === 'application/octet-stream') {
            return {
                bucketName: 'scripts',
                filename: file.originalname
            };
        } else {
            return null
        }
    }
});
const upload = multer({ storage });

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});
// FRONT APIS ------------------------------------------------
router.get('/login', loginApis.login)
router.get('/getProducts', prodcutsApi.getProducts)
router.post('/uploadScript', Validator.checkJWT, Validator.isAdmin, loginApis.checkScript, upload.single('script'))
router.post('/insertScript', Validator.checkJWT, Validator.isAdmin, loginApis.insertScript)
router.get('/getOtcScripts', Validator.checkJWT, Validator.isAdmin, loginApis.getOtcScripts)
router.get('/authenticateUser', loginApis.authOtcUser)
router.post('/updateOtcUsers', Validator.checkJWT, Validator.isAdmin, loginApis.updateOtcUsers)
// router.post('/signup', loginApis.signup);

module.exports = router;

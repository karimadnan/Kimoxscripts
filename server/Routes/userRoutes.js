var express = require('express');
const path = require('path');
const Front = './build';
var router = express.Router();


router.get('/', function (req, res, next) {
    return res.sendFile(path.resolve(Front, 'index.html'))
});
router.get('/other/:topic', function (req, res, next) {
    return res.sendFile(path.resolve(Front, 'index.html'))
});
router.get('/3yt4jwe8', function (req, res, next) {
    return res.sendFile(path.resolve(Front, 'index.html'))
});
module.exports = router;
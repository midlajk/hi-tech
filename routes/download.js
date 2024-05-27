var express = require('express');
var router = express.Router();
const downloadget = require('../controller/download');
const authcheck = require('../middleware/authcheck');
router.get('/downloadarrivals/:name',authcheck, downloadget.downloadarrivals);
router.get('/downloaddespatch/:name',authcheck, downloadget.downloaddespatch);

module.exports = router;

var express = require('express');
var router = express.Router();
const adminget = require('../controller/getdetailedview');
const authcheck = require('../middleware/authcheck');

/* GET home page. */
router.get('/purchaseaccount/:name',authcheck, adminget.individualpurchaseaccount);


router.get('/getdetailedreport',authcheck, adminget.getdetailedreport);


module.exports = router;

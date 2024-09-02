var express = require('express');
var router = express.Router();
const adminpostapis = require('../controller/postrequest');
const generatereport = require('../controller/generatereport');
const authcheck = require('../middleware/authcheck');

/* GET home page. */

router.post('/submit-bill',authcheck, (req, res, next) => {
    // Check the value of req.body.billtype
  
    if (req.body.billtype === 'Sales') {
      // If billType is 'sales', route to generatesalesreport
      generatereport.generatesalesreport(req, res);
    } else {
      // For any other value or if not specified, route to generatepurchasereport
      generatereport.generatepurchasereport(req, res);
    }
});
router.post('/addseller',authcheck, adminpostapis.addseller);
router.post('/addpurchasecommitment',authcheck, adminpostapis.addpurchasecommitment);
router.post('/addsalecommitment',authcheck, adminpostapis.addsalecommitment);
router.post('/addreference',authcheck, adminpostapis.addrefference);
router.post('/newfinancial',authcheck, adminpostapis.addfinancial);

router.post('/addproducts',authcheck, adminpostapis.addproducts);
router.post('/addtransportagent',authcheck, adminpostapis.addtransportagent);
router.post('/saveTransaction',authcheck, adminpostapis.addTransactions);
router.post('/generatebill',authcheck, (req, res, next) => {
  // Check the value of req.body.billtype

  if (req.body.billtype == 'Purchase') {
    console.log('hetre')
    // If billType is 'sales', route to generatesalesreport
    generatereport.purchasebill(req, res);
  } else {
    // For any other value or if not specified, route to generatepurchasereport
    generatereport.salesbill(req, res);
  }
});
router.post('/addexpencesandincomes',authcheck, adminpostapis.addexpencesandincome);

router.post('/addstoreinsettlement',authcheck, adminpostapis.addstoreinsettlement);
router.post('/addstoreoutsettlement',authcheck, adminpostapis.addstoreoutsettlement);
router.post('/create-daily-report',authcheck, adminpostapis.createDailyReport);


router.post('/addtrip',authcheck, adminpostapis.addtrip);

module.exports = router;

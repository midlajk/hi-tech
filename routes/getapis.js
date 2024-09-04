var express = require('express');
var router = express.Router();
const adminpostapis = require('../controller/getapis');
const authcheck = require('../middleware/authcheck');

/* GET home page. */
router.get('/getclients',authcheck, adminpostapis.getclients);
router.get('/getnames',authcheck, adminpostapis.getnames);
router.get('/getproducts',authcheck, adminpostapis.getproducts);
router.get('/getdetailedproductproducts',authcheck, adminpostapis.getdetailedproductproducts);
router.get('/getotherallnames',authcheck, adminpostapis.getotherallnames);

router.get('/purchasecommitments',authcheck, adminpostapis.purchasecommitment);
router.get('/salescommitments',authcheck, adminpostapis.salescommitments);
router.get('/individualarrivals',authcheck, adminpostapis.individualarrivals);
router.get('/individualdespatch',authcheck, adminpostapis.individualdespatch);
router.get('/getrefferance',authcheck, adminpostapis.getrefference);
router.get('/getfinancialyears',authcheck, adminpostapis.getfinancialyears);

router.get('/getTransportAgent',authcheck, adminpostapis.getTransportAgent);
router.get('/salesbills',authcheck, adminpostapis.salesbills);
router.get('/purchasebills',authcheck, adminpostapis.purchasebills);
router.get('/salesstorages',authcheck,adminpostapis.storeout);
router.get('/purchasestorages',authcheck, adminpostapis.storein);
router.get('/alltransactions',authcheck, adminpostapis.transactions);
router.get('/expencesandincomes',authcheck, adminpostapis.expencesandincome);

/////
router.get('/arrivals',authcheck, adminpostapis.arrivals);
router.get('/despatch',authcheck, adminpostapis.despatch);

router.get('/invoicebasepurchasebills',authcheck, adminpostapis.invoicebasepurchasebills);
router.get('/invoicesalesbill',authcheck, adminpostapis.invoicesalesbill);

router.get('/allpurchasebill',authcheck, adminpostapis.allpurchasebill);
router.get('/allsalesbill',authcheck, adminpostapis.allsales);

router.get('/allpurchasestorages',authcheck, adminpostapis.arrivalsstorage);
router.get('/allsalesstorage',authcheck, adminpostapis.despatchstorage);
router.get('/detailedcommitmets',authcheck, adminpostapis.detailedcommitmets);
router.get('/allpcommitments',authcheck, adminpostapis.allcommitments);
router.get('/allscommitments',authcheck, adminpostapis.allsalecommitments);

router.get('/productwisestorein',authcheck, adminpostapis.productwisestorein);
router.get('/productwisestoreout',authcheck, adminpostapis.productwisestoreout);


///// loads
router.get('/agentxloads',authcheck, adminpostapis.agentxloads);
router.get('/getallemployees',authcheck, adminpostapis.getallemployees);


router.get('/attendance/:data',authcheck, adminpostapis.getattendance);


module.exports = router;

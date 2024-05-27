const mongoose = require('mongoose');
const ClientModel = mongoose.model('Client')
const Reference = mongoose.model('Reference');

exports.individualpurchaseaccount = async (req, res) => {
    const client = await ClientModel.findOne({name:req.params.name})
    const reference = await Reference.findOne({})
    .sort({ defaulted: -1 }) 
    res.render('individualpurchase',{ route: 'accounts',name: req.params.name,data:client,reference:reference.name})
  
};


exports.getdetailedreport = async (req, res) => {
    const name = req.query.name;
    const client = await ClientModel.findOne({name:name})
    const result1 = await ClientModel.aggregate([
        {
            $match: { name: name } // Match documents by name
        },
        { $unwind: '$coffee' },
        {
            $group: {
                _id: null,
                arrival: { $sum: '$coffee.netepweight' },
                storage: { $sum: '$coffee.storage' },
                
            }
        }
    ]);
    const result3 = await ClientModel.aggregate([
        {
            $match: { name: name } // Match documents by name
        },
        { $unwind: '$purchasebillSchema' },
        {
            $match: {
                'purchasebillSchema.item': { $ne: 'HUSK' }
            }
        },
        {
            $group: {
                _id: null,
                totalQty: { $sum: '$purchasebillSchema.qty' },
                totalAmount: { $sum: '$purchasebillSchema.subtotal' }
            }
        }
    ]);
    const result2 = await ClientModel.aggregate([
        {
            $match: { name: name } // Match documents by name
        },
        { $unwind: '$purchasecommitments' },
        {
            $group: {
                _id: null,
                totalRevievable: { $sum: '$purchasecommitments.balance' },
            }
        }
    ]);
    const result4 = await ClientModel.aggregate([
        {
            $match: { name: name } // Match documents by name
        },
        { $unwind: '$despatch' },
        {
            $group: {
                _id: null,
                depatch: { $sum: '$despatch.netepweight' },
                storage: { $sum: '$despatch.storage' },
                
            }
        }
    ]);
    const result5 = await ClientModel.aggregate([
        {
            $match: { name: name } // Match documents by name
        },
        { $unwind: '$salesbillSchema' },
        {
            $match: {
                'salesbillSchema.item': { $ne: 'HUSK' }
            }
        },
        {
            $group: {
                _id: null,
                totalQty: { $sum: '$salesbillSchema.qty' },
                totalAmount: { $sum: '$salesbillSchema.subtotal' }
            }
        }
    ]);
    const result6 = await ClientModel.aggregate([
        {
            $match: { name: name } // Match documents by name
        },
        { $unwind: '$salescommitmentsschema' },
        {
            $group: {
                _id: null,
                totalRevievable: { $sum: '$salescommitmentsschema.balance' },
            }
        }
    ]);
    res.json({
        data: {
            balance : client.recievable+client.paid-client.recieved-client.payable,
            recievable : client.recievable,
            paid : client.paid,
            recieved : client.recieved,
            payable : client.payable,
            storein : result1[0]?.storage || 0,
            arrival : result1[0]?.arrival || 0,
            billedvalue:result3[0]?.totalAmount || 0,
            commitmentpurchase:result2[0]?.totalRevievable || 0,
            despatch : result4[0]?.depatch || 0,
            storeout : result4[0]?.storage || 0,
            salebilled:result5[0]?.totalAmount || 0,
            commitmentsale:result6[0]?.totalRevievable || 0,


        }})
  
};
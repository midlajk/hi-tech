
require('../model/clientsmodal')
const mongoose = require('mongoose');
const ClientModel = mongoose.model('Client')
const CoffeeSchema = mongoose.model('CoffeeSchema');
const Reference = mongoose.model('Reference');
const PoductsSchema = mongoose.model('PoductsSchema')
const Transportagent = mongoose.model('Transportagent')
const bcrypt = require('bcrypt');
const User = mongoose.model('User')


exports.deletepurchasecommitment = async (req, res) => {
    try {
        const client = await ClientModel.findOne({ name: req.params.name });

        if (!client) {
            return res.status(404).json({ error: 'Client not found' });
        }

        const purchaseCommitmentIndex = client.purchasecommitments.findIndex(commitment => commitment._id == req.params.id);

        if (purchaseCommitmentIndex === -1) {
            return res.status(404).json({ error: 'Purchase commitment not found' });
        }

        // Remove the purchase commitment from the array
        client.purchasecommitments.splice(purchaseCommitmentIndex, 1);
        await client.save();

        // If successful, send a success response
        return res.json({ message: 'Purchase commitment deleted successfully' });
    } catch (error) {
        console.error('Error deleting purchase commitment:', error);
        return res.status(500).json({ error: 'Server error' });
    }
};
exports.deletesalescommitments = async (req, res) => {
    console.log('here')
    try {
        const client = await ClientModel.findOne({ name: req.params.name });

        if (!client) {
            return res.status(404).json({ error: 'Client not found' });
        }

        const salescommitmentindex = client.salescommitmentsschema.findIndex(commitment => commitment._id == req.params.id);

        if (salescommitmentindex === -1) {
            return res.status(404).json({ error: 'Purchase commitment not found' });
        }

        // Remove the purchase commitment from the array
        client.salescommitmentsschema.splice(salescommitmentindex, 1);
        await client.save();

        // If successful, send a success response
        return res.json({ message: 'Purchase commitment deleted successfully' });
    } catch (error) {
        console.error('Error deleting purchase commitment:', error);
        return res.status(500).json({ error: 'Server error' });
    }
};


exports.deletepurchasebill = async (req, res) => {
    const billId = req.params.billId;

    try {
        const client = await ClientModel.findOne({ name: req.params.name });

        if (!client) {

            return res.status(404).json({ error: 'Client not found' });
        }
        const purchasebill = client.purchasebillSchema.find(commitment => commitment.uniqueid == billId);
        const transaction = client.transaction.find(data => data.id == billId);
        const coffee = client.coffee.find(data => data.lotnumber == purchasebill.lotnumber);
        if (coffee) {
            coffee.storage = coffee.storage + purchasebill.qty

        }
        const purchasebillSchema = client.purchasebillSchema.findIndex(commitment => commitment.uniqueid == billId);
        const transactionindex = client.transaction.findIndex(data => data.id == billId);
        var payable = transaction.payable
        var recievable = transaction.revievable
        var paid = transaction.paid
        var recieved = transaction.recieved
        const storeout = client.storeout + 0
        const storein = client.storein + parseFloat(purchasebill.qty)

        if (purchasebillSchema === -1) {
            return res.status(404).json({ error: 'Purchase commitment not found' });
        }
        const purchasecommitment = client.purchasecommitments.find(commitment => commitment.id === purchasebill.commitment);

        if (purchasecommitment) {
            // Calculate the new balance by subtracting the delivered quantity from the total quantity
            // Update the balance in the sales commitment object
            var weight = purchasecommitment.balanceweight + purchasebill.weight
            purchasecommitment.balanceweight = purchasecommitment.balanceweight + purchasebill.weight;
            purchasecommitment.balance = parseInt(weight * coffee.eppercentage / 100);

        }
        // Remove the purchase commitment from the array
        client.purchasebillSchema.splice(purchasebillSchema, 1);
        client.transaction.splice(transactionindex, 1);
        client.payable = client.payable - payable;
        client.recievable = client.recievable - recievable;
        client.paid = client.paid - paid;
        client.recieved = client.recieved - recieved;

        client.storeout = storeout;
        client.storein = storein;
        await client.save();

        // If successful, send a success response
        return res.json({ message: 'Purchase commitment deleted successfully' });
    } catch (error) {
        console.log(error)

        console.log('Error deleting purchase commitment:', error);
        return res.status(500).json({ error: 'Server error' });
    }
};


exports.deletesalesbill = async (req, res) => {
    const billId = req.params.billId;

    try {
        const client = await ClientModel.findOne({ name: req.params.name });

        if (!client) {

            return res.status(404).json({ error: 'Client not found' });
        }
        const salesbill = client.salesbillSchema.find(commitment => commitment.uniqueid == billId);
        console.log(salesbill)
        const transaction = client.transaction.find(data => data.id == billId);
        const coffee = client.despatch.find(data => data.lotnumber == salesbill.lotnumber);
        if (coffee) {
            coffee.storage = coffee.storage + salesbill.qty
            await client.save(); // Save the changes to the database

        }
        const salesbillSchema = client.salesbillSchema.findIndex(commitment => commitment.uniqueid == billId);
        const transactionindex = client.transaction.findIndex(data => data.id == billId);
        var payable = transaction.payable
        var recievable = transaction.revievable
        var paid = transaction.paid
        var recieved = transaction.recieved
        const storeout = client.storeout + parseFloat(salesbill.qty)
        const storein = client.storein + 0

        if (salesbillSchema === -1) {
            return res.status(404).json({ error: 'Purchase commitment not found' });
        }
        const salescommitment = client.salescommitmentsschema.find(commitment => commitment.id === salesbill.commitment);

        if (salescommitment) {
            // Calculate the new balance by subtracting the delivered quantity from the total quantity
            // Update the balance in the sales commitment object
            var weight = salescommitment.balanceweight + salesbill.weight
            salescommitment.balanceweight = salescommitment.balanceweight + salesbill.weight;
            salescommitment.balance = parseInt(weight * coffee.eppercentage / 100);

        }
        // Remove the purchase commitment from the array
        client.salesbillSchema.splice(salesbillSchema, 1);
        client.transaction.splice(transactionindex, 1);
        client.payable = client.payable - payable;
        client.recievable = client.recievable - recievable;
        client.paid = client.paid - paid;
        client.recieved = client.recieved - recieved;

        client.storeout = storeout;
        client.storein = storein;
        await client.save();

        // If successful, send a success response
        return res.json({ message: 'Purchase commitment deleted successfully' });
    } catch (error) {
        console.log(error)

        console.log('Error deleting purchase commitment:', error);
        return res.status(500).json({ error: 'Server error' });
    }
};

exports.deleteuser = async (req, res) => {
    const { id, password } = req.body;
    let user = await User.findOne({ username:req.session.user.username });
    // If user exists, compare hashed passwords
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
    const existingClient = await ClientModel.findByIdAndDelete(id);
    
      res.json({ success: true, message: 'Reference added successfully' });
  
    
    }else{
        return res.status(400).json({ error: 'Both id and password are required' });

      }

  }

  exports.deletetransaction = async (req, res) => {
    const id = req.params.id;

    try {
        const client = await ClientModel.findOne({ name: req.params.name });

        if (!client) {

            return res.status(404).json({ error: 'Client not found' });
        }
        const transaction = client.transaction.find(transaction => transaction._id == id);
     
        const transactionindex = client.transaction.findIndex(data => data._id == id);
        console.log(transaction)
        var payable = transaction.payable
        var recievable = transaction.revievable
        var paid = transaction.paid
        var recieved = transaction.recieved

      
        // Remove the purchase commitment from the array
        client.transaction.splice(transactionindex, 1);
        client.payable = (client.payable||0) - payable;
        client.recievable = (client.recievable||0) - recievable;
        client.paid = (client.paid||0) - paid;
        client.recieved = (client.recieved||0) - recieved;
        await client.save();

        // If successful, send a success response
        return res.json({ message: 'Purchase commitment deleted successfully' });
    } catch (error) {
        console.log(error)

        console.log('Error deleting purchase commitment:', error);
        return res.status(500).json({ error: 'Server error' });
    }
    

  }
//   exports.deletepurchase = async (req, res) => {
//     const id = req.params.id;

//     try {
//         const client = await ClientModel.findOne({ name: req.params.name });

//         if (!client) {

//             return res.status(404).json({ error: 'Client not found' });
//         }
//         const coffee = await client.coffee.find(coffee => coffee.lotnumber == id);
//         const purchasebillSchema = client.purchasebillSchema.find(purchasebillSchema => purchasebillSchema.lotnumber == id);
//         if(purchasebillSchema){
//             return res.status(500).json({ error: 'Server error' });

//         }else{
//             console.log(coffee.item)
//             const product = await PoductsSchema.findOne({ product: coffee.item });
//             client.storein = ((client.storein - coffee.storage)<=0?0:(client.storein - coffee.storage))
//             product.stockweight = ((product.stockweight - coffee.netWeight)<=0?0:(product.stockweight - coffee.netWeight))
//             await product.save();
//             const coffeeIndex = client.coffee.findIndex(coffee => coffee.lotnumber == id);
//             client.coffee.splice(coffeeIndex, 1);
//             await client.save();    
//             return res.json({ message: 'Purchase commitment deleted successfully' });

//         }
        

//         // If successful, send a success response
//     } catch (error) {
//         console.log(error)

//         console.log('Error deleting purchase commitment:', error);
//         return res.status(500).json({ error: 'Server error' });
//     }
    

//   }
exports.deletepurchase = async (req, res) => {
    const { id, name } = req.params;
  
    try {
      // Find the client
      const client = await ClientModel.findOne({ name });
      if (!client) {
        return res.status(404).json({ error: 'Client not found' });
      }
  
      // Find the coffee with the specified lot number
      const coffeeIndex = client.coffee.findIndex(c => c.lotnumber === id);
      if (coffeeIndex === -1) {
        return res.status(404).json({ error: 'Coffee lot not found' });
      }
  
      const coffee = client.coffee[coffeeIndex];
  
      // Check for a corresponding purchase bill
      const purchaseBillExists = client.purchasebillSchema.some(pb => pb.lotnumber === id);
      if (purchaseBillExists) {
        return res.status(500).json({ error: 'Cannot delete purchase with existing purchase bill' });
      }
  
      // Adjust store and product stocks
      client.storein = Math.max(0, client.storein - coffee.storage);
  
      const product = await PoductsSchema.findOne({ product: coffee.item });
      if (product) {
        product.stockweight = Math.max(0, product.stockweight - coffee.netWeight);
        await product.save();
      }
  
      // Remove the coffee from the client
      client.coffee.splice(coffeeIndex, 1);
      await client.save();
  
      // If everything is successful
      return res.json({ message: 'Purchase commitment deleted successfully' });
  
    } catch (error) {
      console.log('Error deleting purchase commitment:', error);
      return res.status(500).json({ error: 'Server error' });
    }
  };
  
  exports.deletesales = async (req, res) => {
    const id = req.params.id;

    try {
        const client = await ClientModel.findOne({ name: req.params.name });

        if (!client) {

            return res.status(404).json({ error: 'Client not found' });
        }
        const despatch = client.despatch.find(despatch => despatch.lotnumber == id);
        const salesbillSchema = client.salesbillSchema.find(salesbillSchema => salesbillSchema.lotnumber == id);
        if(salesbillSchema){
            return res.status(500).json({ error: 'Server error' });

        }else{
            const product = await PoductsSchema.findOne({ product: despatch.item });
            client.storeout = ((client.storeout - despatch.storage)<=0?0:(client.storeout - despatch.storage))
            product.stockweight = product.stockweight + despatch.netWeight
            await product.save();
            const despatchIndex = client.despatch.findIndex(despatch => despatch.lotnumber == id);
            client.despatch.splice(despatchIndex, 1);
            await client.save();    
            return res.json({ message: 'Purchase commitment deleted successfully' });

        }
    } catch (error) {
        console.log(error)

        console.log('Error deleting purchase commitment:', error);
        return res.status(500).json({ error: 'Server error' });
    }
    

  }

  exports.deleteexpencesandincome = async (req, res) => {
    const id = req.params.id;

    try {
        const client = await Transportagent.findOne({ agent: req.params.name });

        if (!client) {

            return res.status(404).json({ error: 'Client not found' });
        }
        const transaction = client.transaction.find(transaction => transaction._id == id);
     
        const transactionindex = client.transaction.findIndex(data => data._id == id);
        var payable = (transaction.payable||0)
        var recievable = (transaction.revievable||0)
        var paid = (transaction.paid||0)
        var recieved = (transaction.recieved||0)

      
        // Remove the purchase commitment from the array
        client.transaction.splice(transactionindex, 1);
        client.payable = (client.payable||0) - payable;
        client.recievable = (client.recievable||0) - recievable;
        client.paid = (client.paid||0) - paid;
        client.recieved = (client.recieved||0) - recieved;
        await client.save();

        // If successful, send a success response
        return res.json({ message: 'Purchase commitment deleted successfully' });
    } catch (error) {
        console.log(error)

        console.log('Error deleting purchase commitment:', error);
        return res.status(500).json({ error: 'Server error' });
    }
    

  }

  exports.deleteagent = async (req, res) => {
    const { id, password } = req.body;
    console.log('here')
    let user = await User.findOne({ username:req.session.user.username });
    // If user exists, compare hashed passwords
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
    const existingClient = await Transportagent.findByIdAndDelete(id);
    
      res.json({ success: true, message: 'Reference added successfully' });
  
    
    }else{
        return res.status(400).json({ error: 'Both id and password are required' });

      }

  }
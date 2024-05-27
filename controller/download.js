const mongoose = require('mongoose');
const ClientModel = mongoose.model('Client')
const Reference = mongoose.model('Reference')
const PoductsSchema = mongoose.model('PoductsSchema')
const Transportagent = mongoose.model('Transportagent')
const XLSX = require('xlsx');
exports.downloadarrivals = async (req, res) => {
    try {
      const client = await ClientModel.findOne({ name: req.params.name });
      const coffee = client.coffee;
  
      // Define custom headings for the required fields
      const topHeading = [['From '+req.params.name + ' Purchase Reports']];
      const columnHeaders = [
        ['Date', 'Lorry', 'Item', 'Bags', 'Quantity', 'OUTURN', 'Net EP Weight']
      ];
  
      // Extract only the required fields from coffee data
      const data = coffee.map(coffeeEntry => [
        coffeeEntry.date,
        coffeeEntry.lorry,
        coffeeEntry.item,
        coffeeEntry.bags,
        coffeeEntry.quantity,
        coffeeEntry.eppercentage,  // This is "OUTURN"
        coffeeEntry.netepweight
      ]);
  
      // Combine top heading, column headers, and data
      const combinedData = topHeading.concat(columnHeaders).concat(data);
      
      // Create a new workbook and worksheet
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.aoa_to_sheet(combinedData);
  ws['!merges'] = [
        { s: { r: 0, c: 0 }, e: { r: 0, c: 6 } } // Merge cells from A1 to G1
      ];
      
      // Append worksheet to workbook
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  
      // Generate binary string
      const wboutBinary = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
  
      // Send the file to the client
      res.setHeader('Content-Disposition', 'attachment; filename="data.xlsx"');
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.send(Buffer.from(wboutBinary, 'binary'));
    } catch (error) {
      console.error('Error generating Excel file:', error);
      res.status(500).send('Error generating Excel file');
    }
  };

  exports.downloaddespatch = async (req, res) => {
    try {
      const client = await ClientModel.findOne({ name: req.params.name });
      const coffee = client.despatch;
      const topHeading = [['To '+req.params.name + ' Despatch Reports']];
    const columnHeaders = [
      ['Date', 'Lorry', 'Item', 'Bags', 'Quantity', 'OUTURN', 'Net EP Weight']
    ];

    // Extract only the required fields from coffee data
    const data = coffee.map(coffeeEntry => [
      coffeeEntry.date,
      coffeeEntry.lorry,
      coffeeEntry.item,
      coffeeEntry.bags,
      coffeeEntry.quantity,
      coffeeEntry.eppercentage,  // This is "OUTURN"
      coffeeEntry.netepweight
    ]);

    // Combine top heading, column headers, and data
    const combinedData = topHeading.concat(columnHeaders).concat(data);
    
      // Create a new workbook and worksheet
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.aoa_to_sheet(combinedData);
  ws['!merges'] = [
        { s: { r: 0, c: 0 }, e: { r: 0, c: 6 } } // Merge cells from A1 to G1
      ];
      // Append worksheet to workbook
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  
      // Generate binary string
      const wboutBinary = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
  
      // Send the file to the client
      res.setHeader('Content-Disposition', 'attachment; filename="data.xlsx"');
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.send(Buffer.from(wboutBinary, 'binary'));
    } catch (error) {
      console.error('Error generating Excel file:', error);
      res.status(500).send('Error generating Excel file');
    }
  };
const db = require('../models');
const Future = db.future; // call stocks table in model
const Enterprise = db.enterprise;
const Op = db.Sequelize.Op;

//Using Sequelize op
exports.create = (symbol, create_data) => {
    // Create a stock table 
    const future = {
        future_symbol: create_data.future_symbol,
        stock_symbol: symbol
    };
    // Save stock in the postgreSQL database
    return Future.create(future).then(data => {
        console.log(data);
        return data
    }).catch(err => {
        console.log(err);
    })                 
};
const db = require('../models');
const Option = db.option; // call stocks table in model
const Enterprise = db.enterprise;
const Op = db.Sequelize.Op;

//Using Sequelize op
exports.create = (symbol, create_data) => {
    // Create a stock table 
    const option = {
        option_symbol: create_data.option_symbol,
        stock_symbol: symbol
    };
    // Save stock in the postgreSQL database
    return Option.create(option).then(data => {
        console.log(data);
        return data
    }).catch(err => {
        console.log(err);
    })                 
};
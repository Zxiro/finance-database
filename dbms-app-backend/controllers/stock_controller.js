const { type } = require('os');
const db = require('../models');
const stock = db.stocks; // call stocks table in model
const Op = db.Sequelize.Op;

//Using Sequelize op
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
        res.status(400).send({
        message: "Content can not be empty!"
        });
        return;
    }

}

exports.findOne = (req, res) => {

}
 //Using raw SQL
const getStockSymbol = async (req, res) => { 
    let StockSymbol;
    StockSymbol = await db.sequelize.query('SELECT "stock_symbol" FROM stocks ', // wait for query finish to continue go on 
    {type: db.sequelize.QuertTypes.SELECT}); // get SELECT type back
}
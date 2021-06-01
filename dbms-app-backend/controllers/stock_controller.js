const { type } = require('os');
const db = require('../models');
const Stock = db.stock; // call stocks table in model
const Op = db.Sequelize.Op;

//Using Sequelize op
exports.create = (req, res) => {
    // Validate request
    if (!req.body.stock_symbol) {
        res.status(400).send({
        message: "Content can not be empty!"
        });
        return;
    }
    // Create a stock table 
    const stock = {
        stock_symbol: req.body.stock_symbol
    };
    // Save stock in the postgreSQL database
    Stock.create(stock).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: 
                err.message || "Some error occurred"
        });
    });
};

exports.findOne = (req, res) => {

}
 //Using raw SQL
const getStockSymbol = async (req, res) => { 
    let StockSymbol;
    StockSymbol = await db.sequelize.query('SELECT "stock_symbol" FROM stocks ', // wait for query finish to continue go on 
    {type: db.sequelize.QuertTypes.SELECT}); // get SELECT type back
}
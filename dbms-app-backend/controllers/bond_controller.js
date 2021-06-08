const { type } = require('os');
const db = require('../models');
const Bond = db.bond; // call stocks table in model
const Op = db.Sequelize.Op;

//Using Sequelize op
exports.create = (symbol, create_data) => {
    // Create a stock table 
    const bond = {
        bond_symbol: create_data.bond_symbol,
        enterprise_symbol: symbol
    };
    // Save stock in the postgreSQL database
    return Bond.create(bond).then(data => {
        console.log(data);
        return data
    }).catch(err => {
        console.log(err);
    })
};

exports.findByBondSymbol = (req, res) => {
    const bondSymbol = req.params.bond_symbol;
    console.log(bondSymbol);
    Bond.findAll({
        where:{
            bond_symbol:bondSymbol// SELECT * FROM stock WHERE stock_symbol = stockSymbol
    }})
    .then(data =>{
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: 
                err.message || "Some error occurred while retrieving bonds"
        })
    })
};
/*exports.findAll = (req, res) => {
    /*const stockSymbol = req.query.stock_symbol;
    var cond = stockSymbol ? {stock_symbol:{[Op.iLike]: `%${stockSymbol}`}} : null;

    Stock.findAll({where: cond})
    .then(data =>{
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: 
                err.message || "Some error occurred while retrieving stocks"
        })
    })
};*/
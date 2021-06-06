const { type } = require('os');
const db = require('../models');
const Bond = db.bond; // call stocks table in model
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
    const bond = {
        bond_symbol: req.body.bond_symbol,
        open_price: req.body.open_price,
        close_price: req.body.close_price
    };
    // Save stock in the postgreSQL database
    Bond.create(bond).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: 
                err.message || "Some error occurred while creating bonds"
        });
    });
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
const { type } = require('os');
const { Sequelize } = require('../models');
const db = require('../models');
const Option = db.option; // call options table in model
const Op = db.Sequelize.Op;

//Using Sequelize op
// SELECT * FROM options
exports.getAll = (req, res) => {
    Option.findAll()
    .then(data =>{
        console.log(data);
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: 
                err.message || "Some error occurred while retrieving options"
        })
    })
};
// INSERT new option
exports.insertOption = (req, res) => {
    const option = {
        option_symbol: req.body.option_symbol,
        open_price: req.body.open_price,
        close_price: req.body.close_price,
        high_price:req.body.high_price,
        low_price: req.body.low_price,
        volume: req.body.volume,
        stock_symbol: req.body.stock_symbol
    };
    console.log(option)
    return Option.create(option)
    .then(data =>{
        console.log(data);
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: 
                err.message || "Some error occurred while retrieving options"
        })
    })
};
// SELECT * FROM options WHERE option_symbol =
// UPDATE
exports.getAvgbyOptionSymbol = (req, res) =>{
    Option.findAll({
        attributes:[Sequelize.fn('AVG', Sequelize.col('close_price'))],
        raw: true
    }).then(data =>{
        console.log(data);
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: 
                err.message || "Some error occurred while retrieving min open price"
        })
    })
}
// SELECT option by IN
exports.getbyInOptionSymbol = (req, res) => {
    Option.findAll({
        where:{
            option_symbol: req.body
        }
    }).then(data =>{
        console.log(data);
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: 
                err.message || "Some error occurred while retrieving options"
        })
    })
}
//
exports.getbyNotInOptionSymbol = (req, res) => {
    Option.findAll({
        where:{option_symbol: {[Op.notIn]: req.body}}
    }).then(data =>{
        console.log(data);
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: 
                err.message || "Some error occurred while retrieving options"
        })
    })
}
//
//
exports.rawOptionDml = async (req, res) => { 
    try{
        console.log(req.body.sql);
        let Ans
        Ans = await db.sequelize.query(req.body.sql);
        const data = {
            "res":Ans
        }
        return res.send(data);
    }catch(err){
        console.log(err);
    }
}
//Using raw SQL
exports.rawOptionDdl = async (req, res) => { 
    try{
        let Ans;
        console.log(req.body.sql);
        Ans = await db.sequelize.query(req.body.sql);
        const data = {
            "res":Ans
        }
        console.log(data);
        return res.send(data);
    }catch(err){
        console.log(err);
    }
}
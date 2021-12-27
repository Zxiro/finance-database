const { type } = require('os');
const { Sequelize } = require('../models');
const db = require('../models');
const Future = db.future; // call futures table in model
const Op = db.Sequelize.Op;

//Using Sequelize op
// SELECT * FROM futures
exports.getAll = (req, res) => {
    Future.findAll()
    .then(data =>{
        console.log(data);
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: 
                err.message || "Some error occurred while retrieving futures"
        })
    })
};
// INSERT new future
exports.insertFuture = (req, res) => {
    const future = {
        future_symbol: req.body.future_symbol,
        open_price: req.body.open_price,
        close_price: req.body.close_price,
        high_price:req.body.high_price,
        low_price: req.body.low_price,
        volume: req.body.volume,
        enterprise_symbol: req.body.enterprise_symbol
    };
    console.log(future)
    return Future.create(future)
    .then(data =>{
        console.log(data);
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: 
                err.message || "Some error occurred while retrieving futures"
        })
    })
};
// SELECT * FROM futures WHERE future_symbol =
//
exports.getAvgbyFutureSymbol = (req, res) =>{
    Future.findAll({
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
// SELECT future by IN
exports.getbyInFutureSymbol = (req, res) => {
    Future.findAll({
        where:{
            future_symbol: req.body
        }
    }).then(data =>{
        console.log(data);
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: 
                err.message || "Some error occurred while retrieving futures"
        })
    })
}
//
exports.getbyNotInFutureSymbol = (req, res) => {
    Future.findAll({
        where:{future_symbol: {[Op.notIn]: req.body}}
    }).then(data =>{
        console.log(data);
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: 
                err.message || "Some error occurred while retrieving futures"
        })
    })
}
//
//
exports.rawFutureDml = async (req, res) => { 
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
exports.rawFutureDdl = async (req, res) => { 
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
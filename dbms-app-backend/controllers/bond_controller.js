const { type } = require('os');
const { Sequelize } = require('../models');
const db = require('../models');
const Bond = db.bond; // call bonds table in model
const Op = db.Sequelize.Op;

//Using Sequelize op
// SELECT * FROM bonds
exports.getAll = (req, res) => {
    Bond.findAll()
    .then(data =>{
        console.log(data);
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: 
                err.message || "Some error occurred while retrieving bonds"
        })
    })
};
// INSERT new bond
exports.insertBond = (req, res) => {
    const bond = {
        bond_symbol: req.body.bond_symbol,
        open_price: req.body.open_price,
        close_price: req.body.close_price,
        high_price:req.body.high_price,
        low_price: req.body.low_price,
        volume: req.body.volume,
        enterprise_symbol: req.body.enterprise_symbol
    };
    console.log(bond)
    return Bond.create(bond)
    .then(data =>{
        console.log(data);
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: 
                err.message || "Some error occurred while retrieving bonds"
        })
    })
};
// SELECT * FROM bonds WHERE bond_symbol =
// UPDATE
// DELETE
// SELECT MAX(high_price) FROM bond WHERE bond_symbol = bond_symbol
// SELECT MIN(high_price) FROM bond WHERE bond_symbol = bond_symbol
//
exports.getAvgbyBondSymbol = (req, res) =>{
    Bond.findAll({
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
// SELECT bond by IN
exports.getbyInBondSymbol = (req, res) => {
    Bond.findAll({
        where:{
            bond_symbol: req.body
        }
    }).then(data =>{
        console.log(data);
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: 
                err.message || "Some error occurred while retrieving bonds"
        })
    })
}
//
exports.getbyNotInBondSymbol = (req, res) => {
    Bond.findAll({
        where:{bond_symbol: {[Op.notIn]: req.body}}
    }).then(data =>{
        console.log(data);
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: 
                err.message || "Some error occurred while retrieving bonds"
        })
    })
}
//
//
exports.rawBondDml = async (req, res) => { 
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
exports.rawBondDdl = async (req, res) => { 
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
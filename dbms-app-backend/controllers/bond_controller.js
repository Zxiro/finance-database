const { type } = require('os');
const { Sequelize } = require('../models');
const db = require('../models');
const Bond = db.bond; // call bonds table in model
const Op = db.Sequelize.Op;

//Using Sequelize op
exports.create = (symbol, create_data) => {
    // Create a bond table 
    const bond = {
        bond_symbol: create_data.bond_symbol,
        open_price: create_data.open_price,
        close_price: create_data.close_price,
        high_price: create_data.high_price,
        low_price: create_data.low_price,
        volume: create_data.volume,
        enterprise_symbol: symbol
    };
    // Save bond in the postgreSQL database
    return Bond.create(bond).then(data => {
        console.log(data);
        return data
    }).catch(err => {
        console.log(err);
    })
};
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
exports.getbyBondSymbol = (req, res) => {
    const bondSymbol = req.params.bond_symbol;
    console.log("yy");
    Bond.findAll({
        where:{
            bond_symbol:bondSymbol // SELECT * FROM bond WHERE bond_symbol = bondSymbol
    }})
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
// UPDATE
exports.updatebySymbol = (req, res) => {
    const bond_symbol = req.body.bond_symbol;
    const update_data = {
        bond_symbol: req.body.bond_symbol,
        open_price: req.body.open_price,
        close_price: req.body.close_price,
        high_price:req.body.high_price,
        low_price: req.body.low_price,
        volume: req.body.volume,
        enterprise_symbol: req.body.enterprise_symbol
    }
    Bond.update(update_data, {
      where: { bond_symbol: bond_symbol }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Tutorial was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Tutorial with id=${bond_symbol}. Maybe Tutorial was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Tutorial with id=" + bond_symbol
        });
      });
};
// DELETE
exports.deletebySymbol = (req, res) => {
    const bond_symbol = req.body.bond_symbol;
  
    Bond.destroy({
      where: { bond_symbol: bond_symbol }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Tutorial was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Tutorial with id=${bond_symbol}. Maybe Tutorial was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Tutorial with id=" + bond_symbol
        });
      });
};
// SELECT MAX(high_price) FROM bond WHERE bond_symbol = bond_symbol
exports.getMaxbyBondSymbol = async (req, res) =>{
    try{
        let ans
        ans = await Bond.max('close_price')
        console.log(ans);
        const max = {
            "max":ans
        }
        res.send(max);
    }catch(err){
        console.log(err);
    }
};
// SELECT MIN(high_price) FROM bond WHERE bond_symbol = bond_symbol
exports.getMinbyBondSymbol = async (req, res) =>{
    try{
        let ans
        ans = await Bond.min('close_price')
        console.log(ans);
        const min = {
            "min":ans
        }
        res.send(min);
    }catch(err){
        console.log(err);
    }
}
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
exports.countAllBond = async(req, res) => {
    try{
        let amount
        amount = await Bond.count({
        where:{
            bond_symbol:{
                [Op.not]: null //bond_symbol IS NOT null
                }
            }
        })
        console.log(amount);
        const count = {
            "count":amount
        }
        res.send(count);
    }catch(err){
        console.log(err);
    }
}
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
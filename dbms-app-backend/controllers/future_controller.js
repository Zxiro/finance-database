const { type } = require('os');
const { Sequelize } = require('../models');
const db = require('../models');
const Future = db.future; // call futures table in model
const Op = db.Sequelize.Op;

//Using Sequelize op
exports.create = (symbol, create_data) => {
    // Create a future table 
    const future = {
        future_symbol: create_data.future_symbol,
        open_price: create_data.open_price,
        close_price: create_data.close_price,
        high_price: create_data.high_price,
        low_price: create_data.low_price,
        volume: create_data.volume,
        stock_symbol: symbol
    };
    // Save future in the postgreSQL database
    return Future.create(future).then(data => {
        console.log(data);
        return data
    }).catch(err => {
        console.log(err);
    })
};
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
exports.getbyFutureSymbol = (req, res) => {
    const futureSymbol = req.params.future_symbol;
    console.log("yy");
    Future.findAll({
        where:{
            future_symbol:futureSymbol // SELECT * FROM future WHERE future_symbol = futureSymbol
    }})
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
// UPDATE
exports.updatebySymbol = (req, res) => {
    const future_symbol = req.body.future_symbol;
    const update_data = {
        future_symbol: req.body.future_symbol,
        open_price: req.body.open_price,
        close_price: req.body.close_price,
        high_price:req.body.high_price,
        low_price: req.body.low_price,
        volume: req.body.volume,
        enterprise_symbol: req.body.enterprise_symbol
    }
    Future.update(update_data, {
      where: { future_symbol: future_symbol }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Tutorial was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Tutorial with id=${future_symbol}. Maybe Tutorial was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Tutorial with id=" + future_symbol
        });
      });
};
// DELETE
exports.deletebySymbol = (req, res) => {
    const future_symbol = req.body.future_symbol;
  
    Future.destroy({
      where: { future_symbol: future_symbol }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Tutorial was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Tutorial with id=${future_symbol}. Maybe Tutorial was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Tutorial with id=" + future_symbol
        });
      });
};
// SELECT MAX(high_price) FROM future WHERE future_symbol = future_symbol
exports.getMaxbyFutureSymbol = async (req, res) =>{
    try{
        let ans
        ans = await Future.max('close_price')
        console.log(ans);
        const max = {
            "max":ans
        }
        res.send(max);
    }catch(err){
        console.log(err);
    }
};
// SELECT MIN(high_price) FROM future WHERE future_symbol = future_symbol
exports.getMinbyFutureSymbol = async (req, res) =>{
    try{
        let ans
        ans = await Future.min('close_price')
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
exports.countAllFuture = async(req, res) => {
    try{
        let amount
        amount = await Future.count({
        where:{
            future_symbol:{
                [Op.not]: null //future_symbol IS NOT null
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
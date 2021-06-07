const { data } = require('jquery');
const { type } = require('os');
const db = require('../models');
const Stock = db.stock; // call stocks table in model
const Enterprise = db.enterprise;
const Op = db.Sequelize.Op;

//Using Sequelize op
exports.create = (symbol, create_data) => {
    // Create a stock table 
    const stock = {
        stock_symbol: create_data.stock_symbol,
        open_price: create_data.open_price,
        close_price: create_data.close_price,
        enterprise_symbol: symbol
    };
    // Save stock in the postgreSQL database
    return Stock.create(stock).then(data => {
        console.log(data);
        return data
    }).catch(err => {
        console.log(err);
    })                 
};

exports.getStockByEnterpiseSymbol = (enter_symbol) =>{
    /*return Stock.findByPk(enter_symbol,{
        include: Enterprise
    })
    .then(data =>{
        console.log(data);
        return data
    })
    .catch(err => {
        console.log(err);
    })*/
}

exports.getAll = (req, res) => {
    const stock_symbol = req.query.stock_symbol;
    console.log(stock_symbol);
    var cond = stock_symbol ? { stock_symbol: stock_symbol} : null;
    console.log(cond);
    Stock.findAll({
        where: cond// SELECT * FROM stock WHERE stock_symbol = stockSymbol
    })
    .then(data =>{
        console.log(data);
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: 
                err.message || "Some error occurred while retrieving stocks"
        })
    })
};

exports.getStockSymbol = (req, res) => {
    const stockSymbol = req.params.stock_symbol;
    Stock.findAll({
        where:{
            stock_symbol:stockSymbol // SELECT * FROM stock WHERE stock_symbol = stockSymbol
    }})
    .then(data =>{
        console.log(data);
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: 
                err.message || "Some error occurred while retrieving stocks"
        })
    })
};

exports.updatebySymbol = (req, res) => {
    const stock_symbol = req.body.stock_symbol;
  
    Stock.update(req.body, {
      where: { stock_symbol: stock_symbol }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Tutorial was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Tutorial with id=${stock_symbol}. Maybe Tutorial was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Tutorial with id=" + stock_symbol
        });
      });
};

exports.deletebySymbol = (req, res) => {
    const stock_symbol = req.body.stock_symbol;
  
    Stock.destroy({
      where: { stock_symbol: stock_symbol }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Tutorial was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Tutorial with id=${stock_symbol}. Maybe Tutorial was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Tutorial with id=" + stock_symbol
        });
      });
};
exports.countAllStock = async(req, res) => {
    try{
        let amount
        amount = await Stock.count({
        where:{
            stock_symbol:{
                [Op.not]: null //stock_symbol IS NOT null
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

//Using raw SQL
exports.raw_getStockSymbol = async (req, res) => { 
    try{
        let StockSymbol;
        console.log(req.body.sql);
        StockSymbol = await db.sequelize.query(req.body.sql);
        const data = {
            "res":StockSymbol
        }
        console.log(data);
        return res.send(data);
    }catch(err){
        console.log(err);
    }
}

const { data } = require('jquery');
const { type } = require('os');
const { sequelize } = require('../models');
const db = require('../models');
const Stock = db.stock; // call stocks table in model
const Enterprise = db.enterprise;
const Option = db.option;
const Op = db.Sequelize.Op;

//Using Sequelize op
exports.create = (symbol, create_data) => {
    // Create a stock table 
    const stock = {
        stock_symbol: create_data.stock_symbol,
        open_price: create_data.open_price,
        close_price: create_data.close_price,
        volume: create_data.volume,
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
// SELECT * FROM stocks
exports.getAll = (req, res) => {
    Stock.findAll()
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
// SELECT stock by IN
exports.getbyInStockSymbol = (req, res) => {
    Stock.findAll({
        where:{
            stock_symbol: req.body
        }
    }).then(data =>{
        console.log(data);
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: 
                err.message || "Some error occurred while retrieving stocks"
        })
    })
}
//
exports.getbyNotInStockSymbol = (req, res) => {
    Stock.findAll({
        where:{stock_symbol: {[Op.notIn]: req.body}}
    }).then(data =>{
        console.log(data);
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: 
                err.message || "Some error occurred while retrieving stocks"
        })
    })
}
// INSERT new stock
exports.insertStock = (req, res) => {
    const stock = {
        stock_symbol: req.body.stock_symbol,
        open_price: req.body.open_price,
        close_price: req.body.close_price,
        enterprise_symbol: req.body.enterprise_symbol
    };
    console.log(stock)
    return Stock.create(stock)
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
// SELECT * FROM stocks WHERE stock_symbol =
exports.getbyStockSymbol = (req, res) => {
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
// UPDATE
exports.updatebySymbol = (req, res) => {
    const stock_symbol = req.body.stock_symbol;
    const update_data = {
        open_price: req.body.open_price,
        close_price: req.body.close_price
    }
    Stock.update(update_data, {
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
// DELETE
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
// SELECT MAX(high_price) FROM stock WHERE stock_symbol = stock_symbol
exports.getMaxbyStockSymbol = async(req, res) =>{
    try{
        let ans
        ans = await Stock.max('close_price')
        console.log(ans);
        const max = {
            "max":ans
        }
        res.send(max);
    }catch(err){
        console.log(err);
    }
};
// SELECT MIN(high_price) FROM stock WHERE stock_symbol = stock_symbol
exports.getMinbyStockSymbol = async(req, res) =>{
    try{
        let ans
        ans = await Stock.min('close_price')
        console.log(ans);
        const min = {
            "min":ans
        }
        res.send(min);
    }catch(err){
        console.log(err);
    }
};
//
exports.NOTFINISHED_havingMaxOptionPriceStock= async (req, res) =>{
try{
    let Ans;
    console.log(req.params.enterprise_symbol);
    Ans = await db.sequelize.query('SELECT option_symbol, MAX() FROM enterprises GROUP BY enterprise_symbol HAVING SUM(operation_cash, investing_cash, financing_cash) > 40')
    const data = {
        "res":Ans
    }
    console.log(data);
    return res.send(data);
    }catch(err){
        console.log(err);
    }
}
//
exports.havingMaxOptionPriceStock = (req, res) =>{
    Option.findOne({
        attributes:[[sequelize.fn('max', sequelize.col('option.open_price')), 'result']],
        include :[{
            model: Stock,
        }],
        group:['stock.stock_symbol'],
        raw:true
    }).then(data =>{
        console.log(data);
        return data
    })
    .catch(err => {
        console.log(err);
    })
}
//
exports.getNotExistOption= async (req, res) =>{
    try{
        let Ans;
        console.log(req.params.stock_symbol);
        Ans = await db.sequelize.query('SELECT * FROM stocks WHERE NOT EXISTS (SELECT option_symbol FROM options WHERE options.stock_symbol='+req.params.stock_symbol+')');
        const data = {
            "res":Ans
        }
        console.log(data);
        return res.send(data);
        }catch(err){
            console.log(err);
        }
    }
//
exports.getSumStockVolume = async(req, res) =>{
    try{
        let ans
        ans = await Stock.sum('volume')
        console.log(ans);
        const vol = {
            "vol":ans
        }
        res.send(vol);
    }catch(err){
        console.log(err);
    }
};
exports.getBySymbol = (enter_symbol) =>{
    return Stock.findByPk(enter_symbol,{
        include: Option
    })
    .then(data =>{
        console.log(data);
        return data
    })
    .catch(err => {
        console.log(err);
    })
}


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

//Using raw SQL
exports.rawStockDml = async (req, res) => { 
    try{
        console.log(req.body.sql);
        await db.sequelize.query(req.body.sql);
        return res.send();
    }catch(err){
        console.log(err);
    }
}
//Using raw SQL
exports.rawStockDdl = async (req, res) => { 
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
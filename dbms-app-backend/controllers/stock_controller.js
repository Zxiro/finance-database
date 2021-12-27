const { data } = require('jquery');
const { type } = require('os');
const { sequelize } = require('../models');
const db = require('../models');
const Stock = db.stock; // call stocks table in model
const Option = db.option;
const Op = db.Sequelize.Op;

//Using Sequelize op
//output the module
exports.create = (symbol, create_data) => {
    // Create a stock table 
    const stock = {
        stock_symbol: create_data.stock_symbol,
        open_price: create_data.open_price,
        close_price: create_data.close_price,
        high_price: create_data.high_price,
        low_price: create_data.low_price,
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
exports.getbyInStockSymbol = async (req, res) => {
    try{
        let Ans;
        console.log(req.body);
        Ans = await db.sequelize.query('SELECT * FROM stocks WHERE stocks.stock_symbol IN( SELECT stock_symbol FROM options WHERE option_symbol = '+req.body+')')
        const data = {
            "res":Ans
        }
        console.log(data);
        return res.send(data);
        }catch(err){
            console.log(err);}

}
//
exports.getbyNotInStockSymbol = async (req, res) => {
    try{
        let Ans;
        console.log(req.body);
        Ans = await db.sequelize.query('SELECT * FROM stocks WHERE stocks.stock_symbol NOT IN( SELECT stock_symbol FROM options WHERE option_symbol = '+req.body+')')
        const data = {
            "res":Ans
        }
        console.log(data);
        return res.send(data);
        }catch(err){
            console.log(err);}
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
exports.havingMaxOptionPriceStock = (req, res) =>{
    Option.findAll({
        attributes:[[sequelize.fn('max', sequelize.col('option.open_price')), 'result']],
        include :[{
            model: Stock,
        }],
        group:['stock.stock_symbol'],
        raw:true
    }).then(data =>{
        console.log(data);
        return res.send(data)
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
        console.log(JSON.stringify(data, null, 2));
        return res.send(JSON.stringify(data, null, 2));
    }catch(err){
        console.log(err);
    }
}
//Using raw SQL
exports.rawStockDml = async (req, res) => { 
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
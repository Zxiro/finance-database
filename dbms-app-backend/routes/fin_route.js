module.exports = app => { // set the corresponding method when getting different route/request
    const db = require('../models')
    const stock = db.stock
    const bond = db.bond
    const option = db.option
    const future = db.future
    var product_controller = require('../controllers/product_controller.js')
    class stock_controller extends product_controller{
        get_volume = async(req, res) =>{
            try{
                let ans
                ans = await this.product.sum('volume')
                console.log(ans);
                const vol = {
                    "vol":ans
                }
                res.send(vol);
            }catch(err){
                console.log(err);
            }
        }
        get_stock_with_option = async (req, res) =>{
            try{
                let Ans;
                console.log(req.params.stock_symbol);
                Ans = await db.sequelize.query('SELECT stock_symbol FROM stocks WHERE EXISTS (SELECT * FROM options WHERE options.stock_symbol='+req.params.stock_symbol+') AND stocks.stock_symbol = '+req.params.stock_symbol);
                const data = {
                    "res":Ans
                }
                console.log(data);
                return res.send(data);
                }catch(err){
                    console.log(err);
                }
            }
    }

    class bond_controller extends product_controller{}

    class option_controller extends product_controller{
        get_volume = async(req, res) =>{
            try{
                let ans
                ans = await this.product.sum('volume')
                console.log(ans);
                const vol = {
                    "vol":ans
                }
                res.send(vol);
            }catch(err){
                console.log(err);
            }
        }
    }

    class future_controller extends product_controller{
        get_volume = async(req, res) =>{
            try{
                let ans
                ans = await this.product.sum('volume')
                console.log(ans);
                const vol = {
                    "vol":ans
                }
                res.send(vol);
            }catch(err){
                console.log(err);
            }
        }
    }

    const stocks = new stock_controller(stock, True, False)

    const bonds = new bond_controller(bond, True, False)

    const options = new option_controller(option, False, True)

    const futures = new future_controller(future, False, True)


    var router = require("express").Router(); // init router var to determine the route
   
    // Retrive data by symbol
    router.get("/stocks", stocks.getAll);
    router.get("/stocks/symbol/:stock_symbol", stocks.getbyStockSymbol);
    router.get("/stocks/max", stocks.getMaxbyStockSymbol);
    router.get("/stocks/min", stocks.getMinbyStockSymbol);
    router.get("/stocks/sum", stocks.getSumStockVolume);
    router.get("/stocks/having", stocks.havingMaxOptionPriceStock);
    router.get("/stocks/exist/:stock_symbol", stocks.getNotExistOption);
    router.post("/stocks/in", stocks.getbyInStockSymbol);
    router.post("/stocks/not_in", stocks.getbyNotInStockSymbol);
    router.post("/stocks/insert", stocks.insertStock);
    router.post("/stocks/update", stocks.updatebySymbol);
    router.post("/stocks/delete", stocks.deletebySymbol);
    router.post("/stocks/count", stocks.countAllStock);
    router.post("/stocks/raw", stocks.raw_getStockSymbol);
    router.post("/stocks/raw/dml", stocks.rawStockDml);
    router.post("/stocks/raw/ddl", stocks.rawStockDdl);

    router.get("/enterprises", enterprises.getAll);
    router.get("/enterprises/symbol/:enterprise_symbol", enterprises.getbyEnterpriseSymbol);
    router.get("/enterprises/sum/:enterprise_symbol", enterprises.sumEnterpriseNetCash);
    router.get("/enterprises/having", enterprises.havingMaxOpCashEnterperise);
    router.post("/enterprises/in", enterprises.getbyInEnterpriseSymbol);
    router.post("/enterprises/not_in", enterprises.getbyNotInEnterpriseSymbol);
    router.post("/enterprises/insert", enterprises.insertEnterprise);
    router.post("/enterprises/update", enterprises.updatebySymbol);
    router.post("/enterprises/delete", enterprises.deletebySymbol);
    router.post("/enterprises/count", enterprises.countAllEnterprise);
    router.get("/enterprises/exist/:enterprise_symbol", enterprises.getExistBond);
    router.post("/enterprises/raw", enterprises.raw_getEnterpriseSymbol);
    router.post("/enterprises/raw/dml", enterprises.rawEnterpriseDml);
    router.post("/enterprises/raw/ddl", enterprises.rawEnterpriseDdl);

    router.get("/bonds", bonds.getAll);
    router.get("/bonds/symbol/:bond_symbol", bonds.getbyBondSymbol);
    router.get("/bonds/max", bonds.getMaxbyBondSymbol);
    router.get("/bonds/min", bonds.getMinbyBondSymbol);
    router.get("/bonds/avg", bonds.getAvgbyBondSymbol);
    router.post("/bonds/in", bonds.getbyInBondSymbol);
    router.post("/bonds/not_in", bonds.getbyNotInBondSymbol);
    router.post("/bonds/insert", bonds.insertBond);
    router.post("/bonds/update", bonds.updatebySymbol);
    router.post("/bonds/delete", bonds.deletebySymbol);
    router.post("/bonds/count", bonds.countAllBond);
    router.post("/bonds/raw/ddl", bonds.rawBondDdl);
    router.post("/bonds/raw/dml", bonds.rawBondDml);

    router.get("/options", options.getAll);
    router.get("/options/symbol/:option_symbol", options.getbyOptionSymbol);
    router.get("/options/max", options.getMaxbyOptionSymbol);
    router.get("/options/min", options.getMinbyOptionSymbol);
    router.get("/options/avg", options.getAvgbyOptionSymbol);
    router.post("/options/in", options.getbyInOptionSymbol);
    router.post("/options/not_in", options.getbyNotInOptionSymbol);
    router.post("/options/insert", options.insertOption);
    router.post("/options/update", options.updatebySymbol);
    router.post("/options/delete", options.deletebySymbol);
    router.post("/options/count", options.countAllOption);
    router.post("/options/raw/ddl", options.rawOptionDdl);
    router.post("/options/raw/dml", options.rawOptionDml);
    
    router.get("/futures", futures.getAll);
    router.get("/futures/symbol/:future_symbol", futures.getbyFutureSymbol);
    router.get("/futures/max", futures.getMaxbyFutureSymbol);
    router.get("/futures/min", futures.getMinbyFutureSymbol);
    router.get("/futures/avg", futures.getAvgbyFutureSymbol);
    router.post("/futures/in", futures.getbyInFutureSymbol);
    router.post("/futures/not_in", futures.getbyNotInFutureSymbol);
    router.post("/futures/insert", futures.insertFuture);
    router.post("/futures/update", futures.updatebySymbol);
    router.post("/futures/delete", futures.deletebySymbol);
    router.post("/futures/count", futures.countAllFuture);
    router.post("/futures/raw/ddl", futures.rawFutureDdl);
    router.post("/futures/raw/dml", futures.rawFutureDml);


    app.use('/', router);
};


/*
const stocks = require("../controllers/stock_controller.js");
const bonds = require("../controllers/bond_controller.js");
const enterprises = require("../controllers/enterprise_controller.js");
const options = require("../controllers/option_controller.js");
const futures = require("../controllers/future_controller.js");
*/
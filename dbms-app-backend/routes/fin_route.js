module.exports = app => { // set the corresponding method when getting different route/request
    const stocks = require("../controllers/stock_controller.js");
    const bonds = require("../controllers/bond_controller.js");
    const enterprises = require("../controllers/enterprise_controller.js");
    var router = require("express").Router(); // init router var to determine the route
   
    // Retrive data by symbol
    router.get("/stocks", stocks.getAll);
    router.get("/stocks/symbol/:stock_symbol", stocks.getbyStockSymbol);
    router.get("/stocks/max", stocks.getMaxbyStockSymbol);
    router.get("/stocks/min", stocks.getMinbyStockSymbol);
    router.post("/stocks/in", stocks.getbyInStockSymbol);
    router.post("/stocks/not_in", stocks.getbyNotInStockSymbol);
    router.post("/stocks/insert", stocks.insertStock);
    router.post("/stocks/update", stocks.updatebySymbol);
    router.post("/stocks/delete", stocks.deletebySymbol);
    router.post("/stocks/count", stocks.countAllStock);
    router.post("/stocks/raw", stocks.raw_getStockSymbol);

    router.get("/enterprises/:stock_symbol", enterprises.getEnterpriseBySymbol);


    //router.get("/bonds", bonds.getAll);
    router.get("/bonds/:bond_symbol", bonds.findByBondSymbol);

    app.use('/', router);
};
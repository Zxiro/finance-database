module.exports = app => { // set the corresponding method when getting different route/request
    const stocks = require("../controllers/stock_controller.js");
    const bonds = require("../controllers/bond_controller.js");
    var router = require("express").Router(); // init router var to determine the route
   
    //router.get("/:type", :type.getAll);
    // Create a new instance
    router.post("/stocks", stocks.create);
    router.post("/bonds", bonds.create);

    // Retrive data by symbol
    router.get("/bonds/:bond_symbol", bonds.findByBondSymbol);
    router.get("/stocks/:stock_symbol", stocks.getStockSymbol);
    router.post("/stocks/update", stocks.update);
    router.post("/stocks/delete", stocks.delete);
    router.post("/stocks/raw", stocks.raw_getStockSymbol);

    app.use('/', router);
};
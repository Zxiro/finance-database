module.exports = app => { // set the corresponding method when getting different route/request
    const stocks = require("../controllers/stock_controller.js");
    const bonds = require("../controllers/bond_controller.js");
    const enterprises = require("../controllers/enterprise_controller.js");
    const options = require("../controllers/option_controller.js");
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
    //router.post("/bonds/raw", bonds.raw_getBondSymbol);

    router.get("/options", options.getAll);
    router.get("/option/symbol/:option_symbol", options.getbyOptionSymbol);
    router.get("/options/max", options.getMaxbyOptionSymbol);
    router.get("/options/min", options.getMinbyOptionSymbol);
    router.get("/options/avg", options.getAvgbyOptionSymbol);
    router.post("/options/in", options.getbyInOptionSymbol);
    router.post("/options/not_in", options.getbyNotInOptionSymbol);
    router.post("/options/insert", options.insertOption);
    router.post("/options/update", options.updatebySymbol);
    router.post("/options/delete", options.deletebySymbol);
    router.post("/options/count", options.countAllOption);
    //router.post("/options/raw", options.raw_getOptionSymbol);


    app.use('/', router);
};
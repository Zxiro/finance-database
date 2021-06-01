module.exports = app => { // set the corresponding method when getting different route/request
    const stocks = require("../controllers/stock_controller.js");
    var router = require("express").Router(); // init router var to determine the route

    // Create a new stock
    router.post("/", stocks.create);

    app.use('/stocks', router);
};
module.exports = class productController{
    constructor(product, enterprise, stock){
        this.product = product
        this.Op = db.Sequelize.Op;
        this.data  = require('jquery');
        this.type = require('os');
        this.sequelize = require('../models');
    };
    create_data = (symbol, create_data) => {
        // Create a product table 
        if(enterprise==True){
            const product = {
                product_symbol: create_data.product_symbol,
                open_price: create_data.open_price,
                close_price: create_data.close_price,
                high_price: create_data.high_price,
                low_price: create_data.low_price,
                volume: create_data.volume,
                enterprise_symbol: symbol
            };
        }
        if(stock==True){
            const product = {
                product_symbol: create_data.product_symbol,
                open_price: create_data.open_price,
                close_price: create_data.close_price,
                high_price: create_data.high_price,
                low_price: create_data.low_price,
                volume: create_data.volume,
                stock_symbol: symbol
            };
        }
        // Save product in the postgreSQL database
        return this.product.create(product).then(data => {
            console.log(data);
            return data
        }).catch(err => {
            console.log(err);
        })
    };
    get_product = (req, res) => {
        const symbol = req.params.symbol;
        this.product.findAll({
            where:{
                product_symbol:symbol // SELECT * FROM stock WHERE stock_symbol = stockSymbol
        }})
        .then(data =>{
            console.log(data);
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: 
                    err.message || "Some error occurred while retrieving products"
            })
        })
    };
    update_product = (req, res) => {
        const product_symbol = req.body.symbol;
        const update_data = {
            open_price: req.body.open_price,
            close_price: req.body.close_price,
            high_price: req.body.high_price,
            low_price: req.body.low_price,
            volume: req.body.volume
        }
    Stock.update(update_data, {
      where: { product_symbol: product_symbol }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Stock was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Product with id=${product_symbol}. Maybe Stock was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating product with id=" + product_symbol
        });
      });
    };
    delete_product = (req, res) => {
        const product_symbol = req.body.product_symbol;
        this.product.destroy({
        where: { product_symbol: product_symbol }
        })
        .then(num => {
            if (num == 1) {
            res.send({
                message: "Tutorial was deleted successfully!"
            });
            } else {
            res.send({
                message: `Cannot delete Tutorial with id=${product_symbol}. Maybe Tutorial was not found!`
            });
            }
        })
        .catch(err => {
            res.status(500).send({
            message: "Could not delete Tutorial with id=" + product_symbol
            });
        });
    };
    get_max_product = (req, res) => {
        try{
            let ans
            ans = await this.product.max('close_price')
            console.log(ans);
            const max = {
                "max":ans
            }
            res.send(max);
        }catch(err){
            console.log(err);
        }
    };
    get_min_product = (req, res) => {
        try{
            let ans
            ans = await this.product.min('close_price')
            console.log(ans);
            const min = {
                "min":ans
            }
            res.send(min);
        }catch(err){
            console.log(err);
        }
    };
    count_all_product = (req, res) => {
        try{
            let amount
            amount = await this.product.count({
            where:{
                product_symbol:{
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
    };
}


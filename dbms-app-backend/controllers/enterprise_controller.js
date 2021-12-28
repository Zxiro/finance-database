module.exports = class enterprise_controller{
    constructor(enterprise){
        this.db = require('../models');
        this.enterprise = enterprise
        this.stock = enterprise.stock;
        this.bond = enterprise.bond;
        this.Op = db.Sequelize.Op;
        this.data  = require('jquery');
        this.type = require('os');
        this.sequelize = require('../models');
    }
    get_enterprise = (req, res) => {
        const enterpriseSymbol = req.params.enterprise_symbol;
        this.enterprise.findAll({
            where:{
                enterprise_symbol:enterpriseSymbol // SELECT * FROM enterprise WHERE enterprise_symbol = enterpriseSymbol
        }})
        .then(data =>{
            console.log(data);
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: 
                    err.message || "Some error occurred while retrieving enterprises"
            })
        })
    };
    update_enterprise = (req, res) => {
        const enterprise_symbol = req.body.enterprise_symbol;
        const update_data = {
        enterprise_symbol: req.body.enterprise_symbol,
        operation_cash:req.body.operation_cash,
        investing_cash:req.body.investing_cash,
        financing_cash:req.body.financing_cash
        }
        //console.log(update_data);
        this.enterprise.update(update_data, {
        where: { 
            enterprise_symbol: enterprise_symbol 
        }
        })
        .then(num => {
            if (num == 1) {
            res.send({
                message: "Tutorial was updated successfully."
            });
            } else {
            res.send({
                message: `Cannot update Tutorial with id=${enterprise_symbol}. Maybe Tutorial was not found or req.body is empty!`
            });
            }
        })
        .catch(err => {
            res.status(500).send({
            message: "Error updating Tutorial with id=" + enterprise_symbol
            });
        });
    };
    delete_enterprise = (req, res) => {
        const enterprise_symbol = req.body.enterprise_symbol;
        this.enterprise.destroy({
        where: { enterprise_symbol: enterprise_symbol }
        })
        .then(num => {
            if (num == 1) {
            res.send({
                message: "Tutorial was deleted successfully!"
            });
            } else {
            res.send({
                message: `Cannot delete Tutorial with id=${enterprise_symbol}. Maybe Tutorial was not found!`
            });
            }
        })
        .catch(err => {
            res.status(500).send({
            message: "Could not delete Tutorial with id=" + enterprise_symbol
            });
        });
    };
    add_stock = (req, res) => {
        return this.enterprise.findByPk(req.params.enterprise_symbol)
        .then((enterprise) => {
            return this.db.stock.findByPk(req.params.stock_symbol)
            .then((stock) =>{
            console.log(shares)
            enterprise.addLong(stock,{
                through:{
                    share: shares
            }});
            console.log(`>> added Stock id=${stock.stock_symbol} to Enterprise id=${enterprise.enterprise_symbol}`);
            return enterprise; 
            });
        })
        .catch((err) => {
            console.log(">> Error while adding Stock to Enterprise: ", err);
        });
    };
    get_bond = async(req, res) => {
        try{
            let Ans;
            console.log(req.params.enterprise_symbol);
            Ans = await db.sequelize.query('SELECT enterprise_symbol FROM enterprises WHERE EXISTS (SELECT enterprise_symbol FROM bonds WHERE bonds.enterprise_symbol ='+req.params.enterprise_symbol+')AND enterprises.enterprise_symbol = '+req.params.enterprise_symbol);
            const data = {
                "res":Ans
            }
            console.log(data);
            return res.send(data);
            }catch(err){
                console.log(err);
            }
    };
    count_cash = (req, res) => {
        return this.enterprise.findByPk(req.params.enterprise_symbol,{  
        })
        .then(data =>{
            //console.log(JSON.stringify(data, null, 2));
            return res.send(data);
            //return JSON.stringify(data, null, 2)
        })
        .catch(err => {
            console.log(err);
        })
    };
}
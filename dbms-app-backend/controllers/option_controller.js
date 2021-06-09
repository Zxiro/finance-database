const { type } = require('os');
const { Sequelize } = require('../models');
const db = require('../models');
const Option = db.option; // call options table in model
const Op = db.Sequelize.Op;

//Using Sequelize op
exports.create = (symbol, create_data) => {
    // Create a option table 
    const option = {
        option_symbol: create_data.option_symbol,
        open_price: create_data.open_price,
        close_price: create_data.close_price,
        stock_symbol: symbol
    };
    // Save option in the postgreSQL database
    return Option.create(option).then(data => {
        console.log(data);
        return data
    }).catch(err => {
        console.log(err);
    })
};
// SELECT * FROM options
exports.getAll = (req, res) => {
    Option.findAll()
    .then(data =>{
        console.log(data);
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: 
                err.message || "Some error occurred while retrieving options"
        })
    })
};
// INSERT new option
exports.insertOption = (req, res) => {
    const option = {
        option_symbol: req.body.option_symbol,
        open_price: req.body.open_price,
        close_price: req.body.close_price,
    };
    console.log(option)
    return Option.create(option)
    .then(data =>{
        console.log(data);
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: 
                err.message || "Some error occurred while retrieving options"
        })
    })
};
// SELECT * FROM options WHERE option_symbol =
exports.getbyOptionSymbol = (req, res) => {
    const optionSymbol = req.params.option_symbol;
    Option.findAll({
        where:{
            option_symbol:optionSymbol // SELECT * FROM option WHERE option_symbol = optionSymbol
    }})
    .then(data =>{
        console.log(data);
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: 
                err.message || "Some error occurred while retrieving options"
        })
    })
};
// UPDATE
exports.updatebySymbol = (req, res) => {
    const option_symbol = req.body.option_symbol;
    const update_data = {
        open_price: req.body.open_price,
        close_price: req.body.close_price
    }
    Option.update(update_data, {
      where: { option_symbol: option_symbol }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Tutorial was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Tutorial with id=${option_symbol}. Maybe Tutorial was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Tutorial with id=" + option_symbol
        });
      });
};
// DELETE
exports.deletebySymbol = (req, res) => {
    const option_symbol = req.body.option_symbol;
  
    Option.destroy({
      where: { option_symbol: option_symbol }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Tutorial was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Tutorial with id=${option_symbol}. Maybe Tutorial was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Tutorial with id=" + option_symbol
        });
      });
};
// SELECT MAX(high_price) FROM option WHERE option_symbol = option_symbol
exports.getMaxbyOptionSymbol = (res) =>{
    Option.max('open_price')
    .then(data =>{
        console.log(data);
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: 
                err.message || "Some error occurred while retrieving max open price"
        })
    })
};
// SELECT MIN(high_price) FROM option WHERE option_symbol = option_symbol
exports.getMinbyOptionSymbol = (req, res) =>{
    Option.min('close_price').then(data =>{
        console.log(data);
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: 
                err.message || "Some error occurred while retrieving min open price"
        })
    })
}
//
exports.getAvgbyOptionSymbol = (req, res) =>{
    Option.findAll({
        attributes:[Sequelize.fn('AVG', Sequelize.col('close_price'))],
        raw: true
    }).then(data =>{
        console.log(data);
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: 
                err.message || "Some error occurred while retrieving min open price"
        })
    })
}
// SELECT option by IN
exports.getbyInOptionSymbol = (req, res) => {
    Option.findAll({
        where:{
            option_symbol: req.body
        }
    }).then(data =>{
        console.log(data);
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: 
                err.message || "Some error occurred while retrieving options"
        })
    })
}
//
exports.getbyNotInOptionSymbol = (req, res) => {
    Option.findAll({
        where:{option_symbol: {[Op.notIn]: req.body}}
    }).then(data =>{
        console.log(data);
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: 
                err.message || "Some error occurred while retrieving options"
        })
    })
}
//
exports.countAllOption = async(req, res) => {
    try{
        let amount
        amount = await Option.count({
        where:{
            option_symbol:{
                [Op.not]: null //option_symbol IS NOT null
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
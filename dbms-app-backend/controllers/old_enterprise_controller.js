const { group } = require('console');
const { data } = require('jquery');
const { type } = require('os');
const db = require('../models');
const Stock = db.stock; // call stocks table in model
const Enterprise = db.enterprise;
const Option = db.option;
const Op = db.Sequelize.Op;

//Using Sequelize op
exports.create = (symbol) => {
    // Create a enterprise table 
    const enterprise = {
        enterprise_symbol:symbol.enterprise_symbol,
        operation_cash:symbol.operation_cash,
        investing_cash:symbol.investing_cash,
        financing_cash:symbol.financing_cash
    };
    // Save enterprise in the postgreSQL database
    return Enterprise.create(enterprise).then(data => {
        console.log(data);
        return data
    }).catch(err => {
        console.log(err);
    })                 
};
// SELECT * FROM enterprises
exports.getAll = (req, res) => {
    Enterprise.findAll()
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
// SELECT enterprise by IN
exports.getbyInEnterpriseSymbol = (req, res) => {
    Enterprise.findAll({
        where:{
            enterprise_symbol: req.body
        }
    }).then(data =>{
        console.log(data);
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: 
                err.message || "Some error occurred while retrieving enterprises"
        })
    })
}
//
exports.getbyNotInEnterpriseSymbol = (req, res) => {
    Enterprise.findAll({
        where:{enterprise_symbol: {[Op.notIn]: req.body}}
    }).then(data =>{
        console.log(data);
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: 
                err.message || "Some error occurred while retrieving enterprises"
        })
    })
}
// SELECT * FROM enterprises WHERE enterprise_symbol =
// UPDATE
exports.getBySymbol = (enter_symbol) =>{
    return Enterprise.findByPk(enter_symbol,{
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
//
exports.countAllEnterprise = async(req, res) => {
    try{
        let amount
        amount = await Enterprise.count({
        where:{
            enterprise_symbol:{
                [Op.not]: null //enterprise_symbol IS NOT null
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
exports.raw_getEnterpriseSymbol = async (req, res) => { 
    try{
        let EnterpriseSymbol;
        console.log(req.body.sql);
        EnterpriseSymbol = await db.sequelize.query(req.body.sql);
        const data = {
            "res":EnterpriseSymbol
        }
        console.log(data);
        return res.send(data);
    }catch(err){
        console.log(err);
    }
}
//Using raw SQL
exports.rawEnterpriseDml = async (req, res) => { 
    try{
        console.log(req.body.sql);
        let Ans
        Ans= await db.sequelize.query(req.body.sql);
        console.log(Ans)      
        return res.send(Ans);
    }catch(err){
        console.log(err);
    }
}
//Using raw SQL
exports.rawEnterpriseDdl = async (req, res) => { 
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
//
exports.addLongStock = (stock_symbol, enterprise_symbol, shares) => {
  return Enterprise.findByPk(enterprise_symbol)
  .then((enterprise) => {
    return Stock.findByPk(stock_symbol)
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
//
exports.havingMaxOpCashEnterperise= async(req, res) =>{
  try{
    let Ans;
    Ans = await db.sequelize.query('SELECT enterprise_symbol, MIN(operation_cash) FROM enterprises GROUP BY enterprise_symbol HAVING MIN(operation_cash)>200000');
    /*const data = {
        "res":Ans
    }*/
    console.log(Ans);
    return res.send(Ans);
    }catch(err){
        console.log(err);
    }
  }
//
exports.sumEnterpriseNetCash = (req, res) =>{
  return Enterprise.findByPk(req.params.enterprise_symbol,{  
    
  })
  .then(data =>{
      //console.log(JSON.stringify(data, null, 2));
      return res.send(data);
      //return JSON.stringify(data, null, 2)
  })
  .catch(err => {
      console.log(err);
  })
}
//
exports.addShortStock = (stock_symbol, enterprise_symbol, shares) => {
  return Enterprise.findByPk(enterprise_symbol)
  .then((enterprise) => {
    return Stock.findByPk(stock_symbol)
    .then((stock) =>{
      console.log(shares)
      enterprise.addShort(stock,{
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
//
exports.getpublicBySymbol = (enter_symbol) =>{
  return Enterprise.findByPk(enter_symbol,{
      include:[
        {
          model: Stock,
          as: "public",
          through: { attributes: ['share'] },
          attributes:['close_price'],
        }
      ]
  })
  .then(data =>{
      console.log(data);
      return data
  })
  .catch(err => {
      console.log(err);
  })
}

const dbConfig = require("../config/db_config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, 
    dbConfig.USER, 
    dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
  
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle
    }
});// constructor(database: string, username: string, password: string, options: object)

const db = {}; // Initliazie database module
db.Sequelize = Sequelize;
db.sequelize = sequelize;

var financialProduct = require('financial_product.js')

class stock extends financialProduct{}

class bond extends financialProduct{}

class option extends financialProduct{}

class future extends financialProduct{}

db.stock = new stock(sequelize, Sequelize, 'stock', True, False)

db.bond = new bond(sequelize, Sequelize, 'bond', True, False)

db.option = new option(sequelize, Sequelize, 'option', False, True)

db.future = new future(sequelize, Sequelize, 'future', False, True)

db.enterprise = require("./enterprise_model.js")(sequelize, Sequelize);
/*
db.stock = require("./stock_model.js")(sequelize, Sequelize);
db.bond = require("./bond_model.js")(sequelize, Sequelize);
db.option = require("./option_model.js")(sequelize, Sequelize);
db.future = require("./future_model.js")(sequelize, Sequelize);
db.long_stock = require("./long_stock.js")(sequelize, Sequelize);
db.short_stock = require("./short_stock.js")(sequelize, Sequelize);*/

// Here to create relationship 

// Stock has enterprise_symbol as FK (1 to 1)
db.enterprise.hasOne(db.stock, {
  as:'public',
  foreignKey: 'enterprise_symbol',
  allowNull: false
});
db.stock.belongsTo(db.enterprise, {
  as:'public',
  foreignKey: 'enterprise_symbol',
  allowNull: false
});
// long stcok table to concat to many to many relationship (many to many)
db.enterprise.belongsToMany(db.stock, {
  as:'long',
  through: "long_stock",
  foreignKey: 'enterprise_symbol',
});
db.stock.belongsToMany(db.enterprise, {
  as:'long',
  through: "long_stock",
  foreignKey: 'stock_symbol',
});
// Short stcok table to concat to many to many relationship (many to many)
db.enterprise.belongsToMany(db.stock, {
  as:'short',
  through: "short_stock",
  foreignKey: 'enterprise_symbol',
});
db.stock.belongsToMany(db.enterprise, {
  as:'short',
  through: "short_stock",
  foreignKey: 'stock_symbol',
});


// Bonds has enterprise_symbol as FK (1 to many)
db.enterprise.hasMany(db.bond, {
  foreignKey: 'enterprise_symbol'
});
db.bond.belongsTo(db.enterprise, {
  foreignKey: 'enterprise_symbol'
});





// Bonds has enterprise_symbol as FK (1 to many)
db.stock.hasMany(db.option, {
  foreignKey: 'stock_symbol'
});
db.option.belongsTo(db.stock, {
  foreignKey: 'stock_symbol'
});
// Bonds has enterprise_symbol as FK (1 to many)
db.stock.hasMany(db.future, {
  foreignKey: 'stock_symbol'
});
db.future.belongsTo(db.stock, {
  foreignKey: 'stock_symbol'
});



module.exports = db; 
// module.exports is as like as function return
// so it return db datatype

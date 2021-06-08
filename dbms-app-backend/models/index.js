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

db.stock = require("./stock_model.js")(sequelize, Sequelize);
db.enterprise = require("./enterprise_model.js")(sequelize, Sequelize);
db.bond = require("./bond_model.js")(sequelize, Sequelize);
db.option = require("./option_model.js")(sequelize, Sequelize);
db.future = require("./future_model.js")(sequelize, Sequelize);



// Here to create relationship 

// Stock has enterprise_symbol as FK (1 to 1)
db.enterprise.hasOne(db.stock, {
  foreignKey: 'enterprise_symbol',
  allowNull: false
});
db.stock.belongsTo(db.enterprise, {
  foreignKey: 'enterprise_symbol',
  allowNull: false
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

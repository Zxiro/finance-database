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

// 可以在這裡做 raw SQL 操作
module.exports = db; 
// module.exports is as like as function return
// so it return db datatype

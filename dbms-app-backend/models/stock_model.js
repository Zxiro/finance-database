module.exports = (sequelize, Sequelize)=>{
    const Stock = sequelize.define("stock", {
        stock_symbol:{
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        open_price:{
            type: Sequelize.INTEGER
        },
        close_price:{
            type: Sequelize.INTEGER
        },
        high_price:{
            type: Sequelize.INTEGER
        },
        low_price:{
            type: Sequelize.INTEGER
        },
        volume:{
            type: Sequelize.INTEGER,
        }
    },{timestamps: false});
    return Stock;
};
//This Sequelize Model represents stocks table in PostgreSQL database. 
module.exports = (sequelize, Sequelize)=>{
    const Stock = sequelize.define("stock", {
        stock_symbol:{
            type: Sequelize.INTEGER
        },
        /*open_price:{
            type: Sequelize.INTEGER
        },
        high_price:{
            type: Sequelize.INTEGER
        },
        low_price:{
            type: Sequelize.INTEGER
        },
        close_pricel:{
            type: Sequelize.INTEGER
        }*/
    });
    return Stock;
};
//This Sequelize Model represents stocks table in PostgreSQL database. 
//These columns will be generated automatically: id, stock_symbol, createdAt, updatedAt.
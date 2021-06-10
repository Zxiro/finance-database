module.exports = (sequelize, Sequelize)=>{
    const long_stock = sequelize.define("long_stock", {
        share:{
            type: Sequelize.INTEGER,
        },
        stock_symbol:{
            type: Sequelize.INTEGER,
        },
        enterprise_symbol:{
            type: Sequelize.INTEGER,
        },
    },{timestamps: false});
    return long_stock;
};
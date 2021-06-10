module.exports = (sequelize, Sequelize)=>{
    const short_stock = sequelize.define("short_stock", {
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
    return short_stock;
};
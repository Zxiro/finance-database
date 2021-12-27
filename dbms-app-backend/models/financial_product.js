/*
abstractclass FinancialProduct{
    - product_symbol
    - open_price
    - close_price
    - high_price
    - low_price
    - enterprise_symbol
}
*/
module.exports = class financialProduct{
    constructor(sequelize, Sequelize, product_name, enterprise_symbol, stock_symbol) {
        attr = {
            product_symbol:{
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
        }
        if(enterprise_symbol == True){
            attr["enterprise_symbol"] = {
                type: Sequelize.INTEGER
            }
        }
        if(stock_symbol == True){
            attr["stock_symbol"] = {
                type: Sequelize.INTEGER
            }
        }
        const Product = sequelize.define(product_name, attr
        ,{timestamps: false});
        return Product;
    }
}

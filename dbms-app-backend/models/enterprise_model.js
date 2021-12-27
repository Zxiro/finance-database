module.exports = class enterprise{
    constructor(sequelize, Sequelize, stock, bond){
        attr = {
            enterprise_symbol:{
                type: Sequelize.INTEGER,
                primaryKey: true
            },
            operation_cash:{
                type: Sequelize.INTEGER
            },
            investing_cash:{
                type: Sequelize.INTEGER
            },
            financing_cash:{
                type: Sequelize.INTEGER
            }
        }
        this.stock = stock;
        this.bond = bond;
        const enterprise = sequelize.define("enterprise", attr ,{timestamps: false});
        return enterprise;
    }



}
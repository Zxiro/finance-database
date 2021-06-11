module.exports = (sequelize, Sequelize)=>{
    const enterprise = sequelize.define("enterprise", {
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
    },{timestamps: false});
    return enterprise;
};
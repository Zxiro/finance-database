module.exports = (sequelize, Sequelize)=>{
    const enterprise = sequelize.define("enterprise", {
        enterprise_symbol:{
            type: Sequelize.INTEGER,
            primaryKey: true
        }
    },{timestamps: false});
    return enterprise;
};
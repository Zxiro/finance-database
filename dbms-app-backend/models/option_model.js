module.exports = (sequelize, Sequelize)=>{
    const option = sequelize.define("option", {
        option_symbol:{
            type: Sequelize.INTEGER,
            primaryKey: true
        }
    });
    return option;
};
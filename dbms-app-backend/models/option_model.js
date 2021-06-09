module.exports = (sequelize, Sequelize)=>{
    const option = sequelize.define("option", {
        option_symbol:{
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        open_price:{
            type: Sequelize.INTEGER
        },
        close_price:{
            type: Sequelize.INTEGER
        }
    },{timestamps: false});
    return option;
};
module.exports = (sequelize, Sequelize)=>{
    const future = sequelize.define("future", {
        future_symbol:{
            type: Sequelize.INTEGER,
            primaryKey: true
        }
    });
    return future;
};
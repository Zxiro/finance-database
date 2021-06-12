module.exports = (sequelize, Sequelize)=>{
    const future = sequelize.define("future", {
        future_symbol:{
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
            type: Sequelize.INTEGER
        }
    },{timestamps: false});
    return future;
};
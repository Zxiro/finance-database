module.exports = (sequelize, Sequelize)=>{
    const bond = sequelize.define("bond", {
        bond_symbol:{
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
    return bond;
};
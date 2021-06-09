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
        }
    },{timestamps: false});
    return bond;
};
module.exports = (sequelize, Sequelize)=>{
    const bond = sequelize.define("bond", {
        bond_symbol:{
            type: Sequelize.INTEGER,
            primaryKey: true
        }
    });
    return bond;
};
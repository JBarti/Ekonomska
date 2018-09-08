module.exports = (sequelize, types) => {
    return sequelize.define('expense', {
        id: {
            type: types.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        name: {
            type: types.STRING,
            allowNull: false,
        },
        money: {
            type: types.INTEGER,
            allowNull: false,
        }
    })
}
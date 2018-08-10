module.exports = (sequelize, types) => {
    return sequelize.define('razred', {
        id: {
            type: types.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        name: {
            type: types.STRING,
            allowNull: false,
        }
    })
}
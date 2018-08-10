module.exports = (sequelize, types) => {
    return sequelize.define('user', {
        id: {
            type: types.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        firstName: {
            type: types.STRING,
            allowNull: false,
        },
        lastName: {
            type: types.STRING,
            allowNull: false,
        },
        email: {
            type: types.STRING,
            validate: { isEmail: true },
            allowNull: false,
        },
        password: {
            type: types.STRING,
            allowNull: false,
        },
        active: {
            type: types.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        notifications: {
            type: types.ARRAY(types.JSON),
        }
    })
}
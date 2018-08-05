module.exports = (sequelize, types) => {
    return sequelize.define('user', {
        id: {
            type: types.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        firstName: types.STRING,
        lastName: types.STRING,
        email: {
            type: types.STRING,
            validate: { isEmail: true }
        },
        password: types.STRING
    })
}
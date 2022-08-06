module.exports = (sequelize, Datatype) => {
    const User = sequelize.define(
        'users',
        {
            id: {
                type: Datatype.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: Datatype.STRING,
            },
            token: {
                type: Datatype.STRING,
            },
        },
        {
            freezeTableName: true,
        }
    )
    return User
}

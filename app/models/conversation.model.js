module.exports = (sequelize, Datatype) => {
    const Conversation = sequelize.define(
        'conversations',
        {
            id: {
                type: Datatype.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: Datatype.STRING,
                allowNull: true,
            },
        },
        {
            freezeTableName: true,
        }
    )
    return Conversation
}

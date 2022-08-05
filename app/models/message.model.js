module.exports = (sequelize, Datatype) => {
    const Message = sequelize.define(
        'messages',
        {
            id: {
                type: Datatype.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            text: {
                type: Datatype.TEXT,
            },
            sent_datetime: {
                type: Datatype.DATE,
            },
            read: {
                type: Datatype.BOOLEAN,
            },
            read_datetime: {
                type: Datatype.DATE,
                allowNull:true
            },
            user_id: {
                type: Datatype.INTEGER,
            },
            conversation_id: {
                type: Datatype.INTEGER,
            },
        },
        {
            freezeTableName: true,
        }
    )
    return Message
}

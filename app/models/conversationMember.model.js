module.exports = (sequelize, Datatype) => {
    const ConversationMember = sequelize.define(
        'conversation_member',
        {
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
    return ConversationMember
}

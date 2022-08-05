const { QueryTypes } = require('sequelize');
const db = require('../models');

const Conversation = db.conversations;
const ConversationMember = db.conversationMember;
const Message = db.messages;

const sendMessage = async (req, res, next) => {
    let body = req.body;
    if (!req.body.message) {
        return res.status(422).send();
    }
    //TODO
    let receiverId = req.body.to;
    let senderId = 2;

    let check = await db.sequelize.query(
        `SELECT c.ID as conversationId
        FROM CONVERSATIONS C 
        JOIN CONVERSATION_MEMBER CMS 
            ON CMS.CONVERSATION_ID = C.ID
        JOIN CONVERSATION_MEMBER CMR 
            ON CMR.CONVERSATION_ID = C.ID
        WHERE CMS.USER_ID = :senderId 
        AND CMR.USER_ID = :receiverId`,
        {
            replacements: { senderId, receiverId },
            type: QueryTypes.SELECT,
            plain: true,
            logging: console.log
        }
    );
    let result = null;
    if (check !== null) {

    } else {
        try {
            result = await db.sequelize.transaction(async(trans)=>{
                let conversationData = {
                    name: null,
                }
                const conversation = await Conversation.create(conversationData,{transaction:trans})
                console.log(conversation);
                let membersData = [
                    { user_id: senderId, conversation_id: conversation.id },
                    { user_id: receiverId, conversation_id: conversation.id }
                ]
                await ConversationMember.bulkCreate(membersData,{transaction:trans})
                let messages = {
                    text: req.body.message,
                    sent_datetime: Date.now(),
                    read: 0,
                    user_id: senderId,
                    conversation_id: conversation.id
                }
                await Message.create(messages,{transaction:trans})
                return conversation
            })
        } catch (err) {
            res.status(500).send({
                message: err.message || 'Some Error Occur While Sending Message'
            })
        }

    }
    res.status(201).send(result)
}

module.exports = {
    sendMessage
}
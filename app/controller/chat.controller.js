const { QueryTypes, Op } = require('sequelize')

const db = require('../models')

const Conversation = db.conversations
const ConversationMember = db.conversationMember
const Message = db.messages

const sendMessage = async (req, res) => {
    if (!req.body.message) {
        return res.status(422).send({ message: 'Message cannot be empty' })
    }
    //TODO
    let receiverId = req.body.to
    let senderId = req.userId

    let check = await db.sequelize.query(
        `SELECT c.*
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
            model: Conversation,
            logging: console.log,
        }
    )
    let result = null
    if (check !== null) {
        try {
            result = await db.sequelize.transaction(async (trans) => {
                let messages = {
                    text: req.body.message,
                    sent_datetime: Date.now(),
                    read: 0,
                    user_id: senderId,
                    conversation_id: check.id,
                }
                await Message.create(messages, { transaction: trans })
                return check
            })
            await Message.update(
                { read: 1, read_datetime: Date.now() },
                {
                    where: {
                        conversation_id: check.id,
                        user_id: { [Op.ne]: senderId },
                    },
                }
            )
        } catch (err) {
            res.status(500).send({
                message:
                    err.message || 'Some Error Occur While Sending Message',
            })
        }
    } else {
        try {
            result = await db.sequelize.transaction(async (trans) => {
                let conversationData = {
                    name: null,
                }
                const conversation = await Conversation.create(
                    conversationData,
                    { transaction: trans }
                )
                let membersData = [
                    { user_id: senderId, conversation_id: conversation.id },
                    { user_id: receiverId, conversation_id: conversation.id },
                ]
                await ConversationMember.bulkCreate(membersData, {
                    transaction: trans,
                })
                let messages = {
                    text: req.body.message,
                    sent_datetime: Date.now(),
                    read: 0,
                    user_id: senderId,
                    conversation_id: conversation.id,
                }
                await Message.create(messages, { transaction: trans })
                return conversation
            })
        } catch (err) {
            res.status(500).send({
                message:
                    err.message || 'Some Error Occur While Sending Message',
            })
        }
    }
    res.status(201).send({ message: 'message sent', conversationId: result.id })
}

const getConversationMessages = async (req, res) => {
    let senderId = req.userId
    if (!req.body.conversationId) {
        return res
            .status(422)
            .send({ message: 'ConversationId cannot be empty' })
    }
    try {
        let messages = await Message.findAll({
            where: { conversation_id: req.body.conversationId },
        })
        await Message.update(
            { read: 1, read_datetime: Date.now() },
            {
                where: {
                    conversation_id: req.body.conversationId,
                    user_id: { [Op.ne]: senderId },
                },
            }
        )
        res.status(200).send(messages)
    } catch (err) {
        res.status(500).send({
            message: err.message || 'Some Error Occur While Fetching Message',
        })
    }
}

const getConversations = async (req, res) => {
    let senderId = req.userId
    try {
        let result = await db.sequelize.query(
            `SELECT
                TT.COUNT_UNREAD AS countUnread,
                TT.CONVERSATION_ID AS conversationId,
                TT.CONVERSATION_NAME AS conversationName,
                TM.TEXT AS lastMessage,
                TM.SENT_DATETIME AS lastMessageTime
            FROM
                (
                    SELECT
                        SUM( CASE WHEN (M.READ = 0 AND M.USER_ID <> CMS.USER_ID) THEN 1 ELSE 0 END) AS COUNT_UNREAD ,
                        M.CONVERSATION_ID ,
                        IFNULL(C.NAME, U.NAME) AS CONVERSATION_NAME
                    FROM
                        MESSAGES M
                    JOIN CONVERSATIONS C ON
                        M.CONVERSATION_ID = C.ID
                    JOIN CONVERSATION_MEMBER CMS ON
                        CMS.CONVERSATION_ID = C.ID
                    JOIN CONVERSATION_MEMBER CMR ON
                        CMR.USER_ID <> CMS.USER_ID
                        AND CMR.CONVERSATION_ID = C.ID
                    JOIN USERS U ON
                        U.ID = CMR.USER_ID
                    WHERE
                        CMS.USER_ID = :senderId
                    GROUP BY
                        M.CONVERSATION_ID
                ) TT
            JOIN (
                    SELECT
                        MM.TEXT,
                        MM.SENT_DATETIME,
                        MM.CONVERSATION_ID,
                        ROW_NUMBER() OVER ( PARTITION BY MM.CONVERSATION_ID
                    ORDER BY
                        MM.SENT_DATETIME DESC ) AS RN
                    FROM
                        MESSAGES MM 
                ) TM 
                ON TT.CONVERSATION_ID = TM.CONVERSATION_ID
                AND TM.RN = 1
            ORDER BY SENT_DATETIME DESC`,
            {
                replacements: { senderId },
                type: QueryTypes.SELECT,
                logging: console.log,
            }
        )
        res.status(200).send({ message: 'Success fetch data', data: result })
    } catch (err) {
        res.status(500).send({
            message: err.message || 'Some Error Occur While Sending Message',
        })
    }
}

module.exports = {
    sendMessage,
    getConversationMessages,
    getConversations,
}

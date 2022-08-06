# chat-api

### Installation

1. Setup DB Env on ``app/config/db.config.js``
2. run ``npm start``
3. run ``npm run db:seed`` for seeding Database

> /api/auth

return token for user authentication

method POST

sample request 

```json
{
  "userId":5
}
```

sample response

```json
{
    "id": 5,
    "name": "doremi",
    "token": "1a5b1220dd452c5400a741eed06aba21e354e5238bc216e6442421bc57e981d0",
    "createdAt": "2022-08-06T01:47:06.000Z",
    "updatedAt": "2022-08-06T05:56:13.791Z"
}
```

> /api/send 

send message to specific user

method POST, with Authorization header

return conversationId

sample request

```json
{
  "to":5
  "message":"Hello World !"
}
```

sample response

```json
{
    "message": "message sent",
    "conversationId": 5
}
```

> /api/getmessage

get conversation message from specific user

method POST, with Authorization header

return list of message

sample request

```json
{
  "conversationId":2
}
```

sample response

```json
[
    {
        "id": 3,
        "text": "hello first message",
        "sent_datetime": "2022-08-06T02:30:16.000Z",
        "read": true,
        "read_datetime": "2022-08-06T03:15:39.000Z",
        "user_id": 2,
        "conversation_id": 2,
        "createdAt": "2022-08-06T02:30:16.000Z",
        "updatedAt": "2022-08-06T03:15:39.000Z"
    },
    {
        "id": 4,
        "text": "hello second message",
        "sent_datetime": "2022-08-06T02:30:30.000Z",
        "read": true,
        "read_datetime": "2022-08-06T03:15:39.000Z",
        "user_id": 2,
        "conversation_id": 2,
        "createdAt": "2022-08-06T02:30:30.000Z",
        "updatedAt": "2022-08-06T03:15:39.000Z"
    },
    {
        "id": 5,
        "text": "hello third message",
        "sent_datetime": "2022-08-06T02:30:51.000Z",
        "read": true,
        "read_datetime": "2022-08-06T03:15:39.000Z",
        "user_id": 2,
        "conversation_id": 2,
        "createdAt": "2022-08-06T02:30:51.000Z",
        "updatedAt": "2022-08-06T03:15:39.000Z"
    }
]
```

> /api/getconversations

get list conversation they are chatting with

method GET, with Authorization header

return list of Conversation

sample response 

```json
{
    "message": "Success fetch data",
    "data": [
        {
            "countUnread": "1",
            "conversationId": 5,
            "conversationName": "doremi",
            "lastMessage": "hal juga",
            "lastMessageTime": "2022-08-06T05:58:01.000Z"
        },
        {
            "countUnread": "0",
            "conversationId": 1,
            "conversationName": "lukman",
            "lastMessage": "halo from auth",
            "lastMessageTime": "2022-08-06T05:54:11.000Z"
        },
        {
            "countUnread": "0",
            "conversationId": 3,
            "conversationName": "budi",
            "lastMessage": "hello first message",
            "lastMessageTime": "2022-08-06T02:31:17.000Z"
        },
        {
            "countUnread": "0",
            "conversationId": 2,
            "conversationName": "lukmanhadi",
            "lastMessage": "hello third message",
            "lastMessageTime": "2022-08-06T02:30:51.000Z"
        }
    ]
}
```



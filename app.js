const express = require('express')
const cors = require('cors')
const app = express()

const { requestToken } = require('./app/middleware/authToken')
const db = require('./app/models')

const chatRouter = require('./app/router/chat.router')
const authRouter = require('./app/router/auth.router')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET, POST,')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    res.header('Access-Control-Request-Method', '*')
    res.header('content-type: application/json; charset=utf-8')
    next()
})
app.use(requestToken)

app.use('/api', authRouter)
app.use('/api', chatRouter)

db.sequelize
    .sync()
    .then(() => {
        console.log('Resync DB.')
    })
    .catch((err) => {
        console.log('Failed to sync db: ' + err.message)
    })

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
})

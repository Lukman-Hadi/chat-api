const express = require('express')
const cors = require('cors')
const app = express()

const chatRouter = require('./app/router/chat.router')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api',chatRouter)

const db = require("./app/models");
db.sequelize.sync()
    .then(() => {
        console.log("Resync DB.");
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    });

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
})

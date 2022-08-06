const mysql = require("mysql2")
const dbConfig = require('../config/db.config');
const fs = require("fs")

// Read SQL seed query
const seedQuery = fs.readFileSync("app/db/seed.sql", {
    encoding: "utf-8",
})

// Connect to database
const connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB,
    multipleStatements: true, // IMPORTANT
})

connection.connect()


console.log("Running SQL seed...")

// Run seed query
connection.query(seedQuery, err => {
    if (err) {
        throw err
    }

    console.log("SQL seed completed! ")
    connection.end()
});
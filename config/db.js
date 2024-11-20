const oracledb = require('oracledb');
require("dotenv").config();

async function getConnection() {
    try {
        await oracledb.createPool({
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            connectString: process.env.DB_CONNECTION_STRING,
        });
        console.log("Connected to Oracle database");
    } catch (err) {
        console.error(err.message);
    }
}

module.exports = { getConnection };
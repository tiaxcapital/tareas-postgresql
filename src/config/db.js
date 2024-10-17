const { Pool } = require("pg")

const dotenv=require('dotenv')
dotenv.config()

// const pool = new Pool({
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     host: process.env.DB_HOST,    
//     database: process.env.DB_NAME
// })
const pool = new Pool({
    connectionString:process.env.DB_CONNECTIONSTRING
})
module.exports=pool
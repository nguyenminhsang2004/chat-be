const { Client } = require('pg')
require('dotenv').config()

const client = new Client({
  connectionString: process.env.POSTGRESQL_URI,
  ssl: { rejectUnauthorized: false },
})

;(async () => {
  await client
    .connect()
    .then(() => console.log('Connect successfully'))
    .catch((err) => console.error(err))
})()

module.exports = client

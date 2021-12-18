const express = require('express')
const router = express.Router()
const client = require('../connectDB')

router.post('/login', async (req, res) => {
  const { username, password } = req.body
  console.log({ username, password })
  try {
    const result = await client.query(
      `select webchat.web_chat_user_checklogin('${username}', '${password}')`
    )
    res.status(200).json({ data: result.rows[0]['web_chat_user_checklogin'] })
  } catch (e) {
    await client.query('ROLLBACK')
    res.status(500).json({ data: 'Internal server error' })
  }
})

router.post('/in4', async (req, res) => {
  const { id } = req.body
  console.log({ id })
  try {
    await client.query('BEGIN')
    const result1 = await client.query(
      `select webchat.web_chat_users_getinfor('v_out'::refcursor,'${id}')`
    )
    const result2 = await client.query(`fetch all ${result1.rows[0]['web_chat_users_getinfor']}`)
    await client.query('COMMIT')
    result2.rows[0] && res.status(200).json({ data: result2.rows[0] })
  } catch (e) {
    await client.query('ROLLBACK')
    res.status(500).json({ data: 'Internal server error' })
  }
})

module.exports = router

const express = require('express')
const router = express.Router()
const client = require('../connectDB')

const messageList = []

router.post('/update', async (req, res) => {
  const { id } = req.body
  try {
    const messageListUpdate = [...messageList, message]
    const data = JSON.stringify({ content: messageListUpdate })
    await client.query(`select webchat.web_chat_groups_update(${data} ,'${id}')`)
  } catch (e) {
    await client.query('ROLLBACK')
    res.status(500).json({ data: 'Internal server error' })
  }
})

router.post('/get-all-by-group', async (req, res) => {
  const { id } = req.body
  console.log(id)
  try {
    await client.query('BEGIN')
    const result1 = await client.query(
      `select webchat.web_chat_group_getinfor('v_out'::refcursor,'${id}')`
    )
    const result2 = await client.query(`fetch all ${result1.rows[0]['web_chat_group_getinfor']}`)
    await client.query('COMMIT')
    result2.rows[0] && res.status(200).json({ data: result2.rows[0] })
    res.status(404).json({ data: 'Cannot find data' })
  } catch (e) {
    await client.query('ROLLBACK')
    res.status(500).json({ data: 'Internal server error' })
  }
})

module.exports = router

const express = require('express')
const router = express.Router()
const client = require('../connectDB')

router.post('/get-list-group', async (req, res) => {
  const { id } = req.body
  try {
    await client.query('BEGIN')
    const res1 = await client.query(
      `select webchat.web_chat_user_getlistgroup('v_out'::refcursor,'${id}')`
    )
    const res2 = await client.query(`fetch all ${res1.rows[0]['web_chat_user_getlistgroup']}`)
    await client.query('COMMIT')
    res2.rows && res.status(200).json({ data: res2.rows })
    res.status(404).json({ data: 'Cannot find data' })
  } catch (e) {
    await client.query('ROLLBACK')
    res.status(500).json({ data: 'Internal server error' })
  }
})

module.exports = router

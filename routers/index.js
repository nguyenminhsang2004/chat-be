const express = require('express')
const router = express.Router()

router.use('/api/group', require(__dirname + '/group'))
router.use('/api/auth', require(__dirname + '/auth'))
router.use('/api/chat', require(__dirname + '/chat'))

router.get('/', (req, res) => {
  res.send('Home page')
})

module.exports = router

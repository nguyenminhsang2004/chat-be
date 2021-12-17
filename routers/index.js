const express = require('express')
const router = express.Router()

router.use('/api/group', require(__dirname + '/group'))

router.get('/', (req, res) => {
  res.send('Home page')
})

module.exports = router

const express = require('express')
const router = express.Router()

const BoardController = require('../app/controller/BoardController')

router.get('/', BoardController.getAll)
router.put('/broads', BoardController.update)

module.exports = router

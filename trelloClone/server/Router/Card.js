const express = require('express')
const router = express.Router()

const CardController = require('../app/controller/CardController')
router.post('/', CardController.create)
router.delete('/:slug', CardController.delete)
router.put('/', CardController.update)

module.exports = router
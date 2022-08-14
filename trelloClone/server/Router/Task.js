const express = require('express')
const router = express.Router()

const TaskController = require('../app/controller/TaskController')

router.post('/', TaskController.create)
router.delete('/:iddelete', TaskController.delete)

module.exports = router
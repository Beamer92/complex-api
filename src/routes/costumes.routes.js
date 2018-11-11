const express = require('express')
const router = express.Router()
const ctrl = require('../controllers/costumes.control')

router.get('/', ctrl.getCostumes)

module.exports = router
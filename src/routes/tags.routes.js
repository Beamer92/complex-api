const express = require('express')
const router = express.Router()
const ctrl = require('../controllers/costumes.control')

router.get('/', ctrl.getTags)

module.exports = router
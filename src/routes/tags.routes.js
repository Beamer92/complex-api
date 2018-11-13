const express = require('express')
const router = express.Router()
const ctrl = require('../controllers/costumes.control')

router.get('/', ctrl.getTags)
router.put('/:tagid', ctrl.checkTag, ctrl.updateTag)
router.delete('/:tagid', ctrl.checkTag, ctrl.deleteTag) //don't forget to delete Tag entries as well

module.exports = router
const express = require('express')
const router = express.Router()
const ctrl = require('../controllers/costumes.control')

router.get('/', ctrl.getCostumes)
router.get('/tags', ctrl.getTags)
router.get('/:id', ctrl.checkCos, ctrl.getCostume)
router.get('/:id/tags', ctrl.checkCos, ctrl.getCTags)
router.post('/', ctrl.checkCosDup, ctrl.createCostume)
router.post('/:id/tags', ctrl.checkCos, ctrl.createTag)
router.put('/:id', ctrl.checkCos, ctrl.updateCostume)
router.delete('/:id', ctrl.checkCos, ctrl.deleteCostume)

module.exports = router
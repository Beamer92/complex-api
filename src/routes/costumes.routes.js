const express = require('express')
const router = express.Router()
const ctrl = require('../controllers/costumes.control')

router.get('/', ctrl.getCostumes)
router.get('/tags', ctrl.getTags)
router.get('/:id', ctrl.checkCos, ctrl.getCostume)
router.get('/:id/tags', ctrl.checkCos, ctrl.getCTags)
router.post('/', ctrl.checkCosDup, ctrl.createCostume)
router.post('/:id/tags', ctrl.checkCos, ctrl.createTag)
// router.put('/:id', ctrl.checkCos, ctrl.updateCostume)
// router.put('/:id/tags/:tagid', ctrl.checkCos, ctrl.checkTag, ctrl.updateTag)
// router.delete('/:id', ctrl.checkCos, ctrl.deleteCostume) //don't forget to delete all associated tags
// router.delete('/:id/tags/:tagid', ctrl.checkCos, ctrl.checkTag, ctrl.deleteTag) //don't forget to delete Tag entry as well

module.exports = router
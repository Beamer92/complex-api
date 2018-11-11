const model = require('../models/costumes.models.js')
// const tags = require('../../data/tags')
// const costumes = require('../../data/costumes')

function getCostumes(req,res,next) {
    const limit = req.params.limit
    const costumelist = model.getCostumes(limit)

    res.status(200).send({costumelist})
}

function getTags(req,res,next) {
    const taglist = model.getTags()

    res.status(200).send(taglist)
}


module.exports = {getCostumes, getTags}
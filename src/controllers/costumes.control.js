const model = require('../models/costumes.models.js')
const uuid = require('uuid/v4')
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

function checkCos (req,res,next) {
    const id = req.params.id
    const result = model.checkCos(id)

    if (result.errors) {
        return next({ status: 404, message: `Could not find that Costume`, errors: result.errors })
      }

    req.cos = result
    next()
}

function checkCosDup (req,res,next) {
    const name = req.body.name
    const result = model.checkCosDup(name)

    if (result.errors) {
        return next({ status: 400, message: `This costume already exists`, errors: result.errors })
      }

    next()
}

function checkTag(req,res,next) {
    const tagid = req.params.tagid
    const result = model.checkTag(tagid)

    if (result.errors) {
        return next({ status: 404, message: `Could not find that Costume Tag`, errors: result.errors })
      }

    req.tagid = tagid
    next()
}

function getCostume(req,res,next) {
    // const result = model.getCostume(req.id)
    return res.status(200).send(req.cos)
}

function getCTags(req,res,next) {
    const result = model.getCTags(req.cos.id)
    return res.status(200).send(result)
}

function createCostume(req,res,next) {
    let newCost = {
        id: uuid(),
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        tags: []
    }
    const result = model.createCostume(newCost)
    return res.status(200).send(result)
}

// function createTag(req,res,next) {
//     let newTag = {
//         name: req.body.tagName,
//         color: req.body.color
//     }
//     const result = model.getCostume(req.id, newTag)
//     return res.status(200).send(result)
// }

// function updateCostume(req,res,next) {

// }

// function updateTag(req,res,next) {

// }

// function deleteCostume(req,res,next) {

// }

// function deleteTag(req,res,next) {

// }


module.exports = {getCostumes, getTags, checkCos, checkCosDup, checkTag, getCostume, getCTags, createCostume}
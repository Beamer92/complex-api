const uuid = require('uuid/v4')
const tags = require('../../data/tags')
const costumes = require('../../data/costumes')


function getCostumes(limit) {
     return limit ? costumes.slice(0, limit) : costumes
}

function getTags() {
    return tags
}


module.exports = {getCostumes, getTags}
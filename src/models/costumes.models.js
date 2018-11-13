const uuid = require('uuid/v4')
//  const tags = require('../../data/tags.json')
//  const costumes = require('../../data/costumes.json')
const fs = require('fs')
const costumeData = fs.readFileSync('./data/costumes.json', 'utf-8')
const tagData = fs.readFileSync('./data/tags.json', 'utf-8')
const costumes = JSON.parse(costumeData)
const tags = JSON.parse(tagData)

function checkCos(costumeId){
    const errors = []
    id = costumeId

    let response
    const res = costumes.find(obj => obj.id === costumeId)
    if(!res) {
        errors.push('Could not Find Costume')
        response = {errors}
    }
    else {
        response = res
    }
    return response
}

function checkCosDup(costumeId) {
    const errors = []
    id = costumeId

    const res = costumes.find(obj => obj.id === costumeId)
    if(res) {
        errors.push('This costume already exists')
        return {errors}
    }
    return {}
}

function checkTag (tagId) {
    const errors = []
    id = costumeId

    let response
    const res = req.cos.tags.filter(obj => obj.id === tagId) 
    if(!res) {
        errors.push('Could not Find that tag')
        response = {errors}
    }
    else {
        response = res
    }
    return response
}   


function getCostumes(limit) {
     return limit ? costumes.slice(0, limit) : costumes
}

function getTags() {
    return tags
}

// function getCostume(costumeId) {
//     const res = costumes.find(obj => obj.id === costumeId)
//     return res
// }

function getCTags(costumeId) {
    const res = costumes.find(obj => obj.id === costumeId)
    const tagdata = {}
    //get all tag info for those tags
    for(tag of res.tags){
        let td = tags.find(obj => obj.id === tag)
        tagdata[tag] = {td}
    }
    return tagdata
}

function createCostume(obj) {
    costumes.push(obj)
    const content = JSON.stringify(costumes);
    fs.writeFileSync('./data/costumes.json', content, 'utf8', 'a')
}

// function createTag(costumeId, obj) {
    
// }


module.exports = {getCostumes, getTags, checkCos, checkCosDup, checkTag, getCTags, createCostume}
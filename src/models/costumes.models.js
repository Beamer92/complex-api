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
    const content = JSON.stringify(costumes, null, 4);
    fs.writeFileSync('./data/costumes.json', content, 'utf-8', 'a')
    return (obj)
}

function createTag(costumeId, obj) {
    tags.push(obj)
    const content = JSON.stringify(tags, null, 2)
    fs.writeFileSync('./data/tags.json', content, 'utf-8', 'a')

    let ind = costumes.findIndex(obj => obj.id === costumeId)
    costumes[3].tags.push(obj.id)
    const costContent = JSON.stringify(costumes, null, 4);
    fs.writeFileSync('./data/costumes.json', costContent, 'utf-8', 'a')
    return (`Created ${obj.name} tag and appended it to the ${costumes[3].name} costume`)
}


module.exports = {getCostumes, getTags, checkCos, checkCosDup, checkTag, getCTags, createCostume, createTag}
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
    console.log(costumeId)
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

    let response
    const res = tags.filter(obj => obj.id === tagId) 
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
    if(obj.color.length !== 7 || !obj.color[1] === '#'){
       return ('Tag color was not a valid hex code')
     }
   
    tags.push(obj)
    const content = JSON.stringify(tags, null, 2)
    fs.writeFileSync('./data/tags.json', content, 'utf-8', 'a')

    let ind = costumes.findIndex(obj => obj.id === costumeId)
    costumes[ind].tags.push(obj.id)
    const costContent = JSON.stringify(costumes, null, 4);
    fs.writeFileSync('./data/costumes.json', costContent, 'utf-8')
    return (`Created ${obj.name} tag and appended it to the ${costumes[ind].name} costume`)
}

function updateCostume(costumeId, body) {
    let ind = costumes.findIndex(obj => obj.id === costumeId)

    let errors = []
    if(body.name) {
        costumes[ind].name = body.name
    }
    if(body.price) {
        if(!isNaN(body.price)) {
        costumes[ind].price = body.price
        }
        else {
            errors.push('Could not add price, was not a numeric')
        }
    }
    if(body.description) {
        costumes[ind].description = body.description
    }
    if(body.tag) {
        let res = checkTag(body.tag)
        if(!res.errors) {
            costumes[ind].tags.push(body.tag)
        }
        else {
            errors.push('Could not find tag to add')
        }
    }

    const costContent = JSON.stringify(costumes, null, 4);
    fs.writeFileSync('./data/costumes.json', costContent, 'utf-8')

    if(errors.length > 0) {
        return (`Updated Costume with following errors: ${errors}`)
    }
    else {
        return ('Updated Costume!')
    }

}

function updateTag(tagId, body) {
    let tind = tags.findIndex(obj => obj.id === tagId)
    console.log(tind)
    console.log(tagId)
    let errors = []
    if(body.name) {
        tags[tind].name = body.name
    }
    if(body.color) {
        if(body.color.length !== 7 || !body.color[1] === '#'){
           errors.push('Not a valid hex color code')
        }
        else {
            console.log(tags[tind].color)
            console.log(body.color)
            tags[tind].color = body.color
        }   
    }

    const content = JSON.stringify(tags, null, 2)
    fs.writeFileSync('./data/tags.json', content, 'utf-8')

    if(errors.length > 0) {
        return (`Updated Tag with following errors: ${errors}`)
    }
    else {
        return ('Updated Tag!')
    }
}

function deleteCostume(costumeId) {
    let delTags = []
    let ind = costumes.findIndex(obj => obj.id === costumeId)
    for(tag of costumes[ind].tags){
        let tind = tags.findIndex(obj => obj.id === tag)
        delTags.push(tags[tind].name)
        tags.splice(tind, 1)
    }

    const content = JSON.stringify(tags, null, 2)
    fs.writeFileSync('./data/tags.json', content, 'utf-8')

    let delCost = costumes[ind].name
    costumes.splice(ind, 1)
    const costContent = JSON.stringify(costumes, null, 4);
    fs.writeFileSync('./data/costumes.json', costContent, 'utf-8')
    return (`Deleted ${delCost} costume and related tags ${delTags}`)
}

function deleteTag(tagId) {
    let affectedCostume = ''
    let delTag = ''
    
    //find tag in Costumes, remove tag from that costume before deleting from Tags
    for(costume of costumes) {
        if(costume.tags.includes(tagId)){
            let tind = costume.tags.indexOf(tagId)
            costume.tags.splice(tind, 1)
            affectedCostume = costume.name
        }
    }
    const costContent = JSON.stringify(costumes, null, 4);
    fs.writeFileSync('./data/costumes.json', costContent, 'utf-8')

    //now remove tag from Tags
    let tind = tags.findIndex(obj => obj.id === tagId)
    delTag = tags[tind].name
    tags.splice(tind, 1)
    const content = JSON.stringify(tags, null, 2)
    fs.writeFileSync('./data/tags.json', content, 'utf-8')

    return (`Deleted ${delTag} tag and removed the tag from the ${affectedCostume} costume`)
}


module.exports = {getCostumes, getTags, checkCos, checkCosDup, 
    checkTag, getCTags, createCostume, createTag,
     updateCostume, updateTag, deleteCostume, deleteTag}
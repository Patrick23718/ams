const {Poste} = require('../models')

const create = async(body) =>{
    // Verifier l'existence de l'utilisateur
    return Poste.create(body)
}

const getPosteById = async(id) =>{
    return Poste.findById(id)
}

const updateTags = async(id, tags) =>{
    const poste = await getPosteById(id)
    if(!poste){
        throw new Error()
    }
    poste.tags = [...new Set([...poste.tags, ...tags])];
    return poste.save();
}

const getAllPoste = async() =>{
    return Poste.find()
}

const get3Poste = async() =>{
    return Poste.find().limit(3)
}

const updatePoste = async(id, updateBody) =>{
    const poste = await getPosteById(id)
    if(!poste){
        throw new Error()
    }
    if(updateBody.text) poste.text = updateBody.text
    if(updateBody.title) poste.title = updateBody.title
    if(updateBody.petite_image) poste.petite_image = updateBody.petite_image
    if(updateBody.grande_image) poste.grande_image = updateBody.grande_image
    return poste.save()
}

const deleteTags = async(id, tags) =>{
    const poste = await getPosteById(id)
    if(!poste){
        throw new Error()
    }
    poste.tags.pop(tags);
    return poste.save();
}

const deletePoste = async(id) =>{
    return Poste.deleteOne({_id: id})
}

module.exports = {
    create,
    getAllPoste,
    getPosteById,
    updateTags,
    deletePoste,
    updatePoste,
    deleteTags,
    get3Poste
}
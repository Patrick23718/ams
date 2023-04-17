const {Commentaire} = require('../models')
const posteService = require('./poste.service')

const create = async(body) =>{
    // Verifier l'existence de l'utilisateur
    // const poste = await posteService.getPosteById(body.poste)
    // if(!poste){
    //     throw new Error()
    // }
    return Commentaire.create(body)
}

const getCommentById = async(id) =>{
    return Commentaire.findById(id)
}

const getAllComments = async() =>{
    return Commentaire.find()
}

const getCommentByPoste = async(posteId) =>{
    const poste = await posteService.getPosteById(posteId)
    // if(!poste){
    //     throw new Error()
    // }
    return Commentaire.find({poste: posteId})
}

const deleteComment = async(id) =>{
    return Commentaire.deleteOne({_id: id})
}

module.exports = {
    create,
    getAllComments,
    getCommentById,
    deleteComment,
    getCommentByPoste
}
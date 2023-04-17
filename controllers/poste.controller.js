const {posteService, commentaireService} = require('../services')

const createPoste = async(req, res) =>{
    const result = await posteService.create(req.body)
    res.send(result)
}

const updatePoste = async(req, res) =>{
    const result = await posteService.updatePoste(req.params.id, req.body)
    res.send(result)
}

const getPoste = async(req, res) =>{
    const poste = await posteService.getPosteById(req.params.id)
    res.send(poste)
}

const getPostes = async() =>{
    const postes = await posteService.getAllPoste()
    res.send(postes)
}

const getPosteComment = async(req, res) =>{
    const comments = await commentaireService.getCommentByPoste(req.params.id)
    res.send(comments)
}

const deleteTags = async(req, res) =>{
    const poste = await posteService.deleteTags(req.params.id, req.body.tags)
    res.send(poste)
}

const updateTags = async(req, res) =>{
    const poste = await posteService.updateTags(req.params.id, req.body.tags)
    res.send(poste)
}
 
const deletePoste = async(req, res) =>{
    await posteService.deletePoste(req.params.id)
    res.send()
}

module.exports = {
    createPoste,
    getPoste,
    getPosteComment,
    getPostes,
    updatePoste,
    deletePoste,
    updateTags,
    deleteTags
}
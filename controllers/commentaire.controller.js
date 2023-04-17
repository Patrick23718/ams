const {commentaireService} = require('../services')

const addComment = async(req, res) =>{
    await commentaireService.create(req.body)
    // res.send(result)
    // console.log(req.body)
    res.redirect('/'+req.body.poste)
}

const getComment = async(req, res) =>{
    const comment = await commentaireService.getCommentById(req.params.id)
    res.send(comment)
}

const getComments = async(req, res) =>{
    const comments = await commentaireService.getAllComments()
    res.send(comments)
}

const deleteComment = async(req, res) =>{
    await commentaireService.deleteComment(req.params.id)
    res.send()
}

module.exports = {
    addComment,
    getComment,
    getComments,
    deleteComment
}
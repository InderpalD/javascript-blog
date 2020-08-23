const express = require('express')
const ArticleTable = require('./../models/articles')
const router = express.Router()

router.get('/new', (req, res) => {
    res.render('articles/new', {article: new ArticleTable()})
})

router.get('/:id', (req, res) => {
    res.send(req.params.id)
})

router.post('/', async (req, res) => {
    let article = new ArticleTable({
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown
    })
    
    try {
        article = await article.save()
        res.redirect(`/articles/${article.id}`)
        
    } catch (error) {
        res.render('articles/new', {article: article})
        
    }

})
module.exports = router
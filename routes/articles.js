const express = require('express')
const ArticleTable = require('./../models/articles')
const router = express.Router()

router.get('/new', (req, res) => {
    res.render('articles/new', {article: new ArticleTable()})
})

router.get('/edit/:id', async(req, res) => {

    const article = await ArticleTable.findById(req.params.id)
    res.render('articles/edit', {article: article})
})

router.get('/:slug', async(req, res) => {
    const article = await ArticleTable.findOne({slug:req.params.slug})
    if (article === null) {
        res.redirect('/')
    }
    res.render('articles/show', {article:article})
})

router.post('/', async (req, res, next) => {
    req.article = new ArticleTable()
    next()
}, saveArticleAndRedirect('new'))

router.put('/:id', async (req, res, next) => {
    req.article = await ArticleTable.findById(req.params.id)
    next()
}, saveArticleAndRedirect('edit'))


function saveArticleAndRedirect(path) {
    return async(req, res) => {
        let article = req.article
        article.title = req.body.title
        article.description = req.body.description
        article.markdown = req.body.markdown
        
        try {
            article = await article.save()
            res.redirect(`/articles/${article.slug}`)
            
        } catch (error) {
            res.render(`articles/${path}`, {article: article})
            
        }
    }
}

router.delete('/:id', async(req, res)=> {
    await ArticleTable.findByIdAndDelete(req.params.id)
    res.redirect('/')
})
module.exports = router
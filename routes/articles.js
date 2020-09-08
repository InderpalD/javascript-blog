const express = require('express')
const ArticleTable = require('./../models/articles')
const router = express.Router()

/**
 * Handle GET request for articles/new endpoint
 */
router.get('/new', (req, res) => {
    res.render('articles/new', {article: new ArticleTable()})
})

/**
 * Handle GET request for articles/edit/id.
 * Renders Edit.ejs page
 */
router.get('/edit/:id', async(req, res) => {
    const article = await ArticleTable.findById(req.params.id)
    res.render('articles/edit', {article: article})
})


/**
 * Handle GET request for articles/slug.
 * Renders Show.ejs page
 */
router.get('/:slug', async(req, res) => {
    const article = await ArticleTable.findOne({slug:req.params.slug})
    if (article === null) {
        res.redirect('/')
    }
    res.render('articles/show', {article:article})
})

/**
 * Handle POST request for articles/new
 * Redirects to article page after creating new article
 */
router.post('/', async (req, res, next) => {
    req.article = new ArticleTable()
    next()
}, saveArticleAndRedirect('new'))

/**
 * Handle PUT request for articles/id.
 * Redirects to article page after updating existing article
 */
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

/**
 * Handle DELETE request for articles/id.
 * Redirects to home page after deleting article
 */
router.delete('/:id', async(req, res)=> {
    await ArticleTable.findByIdAndDelete(req.params.id)
    res.redirect('/')
})
module.exports = router
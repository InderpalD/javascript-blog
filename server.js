const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const ArticleTable = require('./models/articles')
const articleRouter = require('./routes/articles')

const app = express()
app.listen(5000)

/**  
 * Purpose of a view engine is to generate html server side instead of in a static html file
 * You'll see that variables defined here can be used in ejs files to write html
 * Also you can run js code, even without outputing (<%= vs <% )
 */
app.set('view engine', 'ejs')

// Allows us to get specific attributes from req objects in http methods
app.use(express.urlencoded({extended: false}))

// required to use delete functionality because for some reason forms only allow posts and gets
app.use(methodOverride('_method'))

// setup database
mongoose.connect('mongodb://localhost/blog_db', {
     useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })

/**
 * Render the Home page when receiving a GET request for default route
 */
app.get('/', async (req, res) => {
    const articles = await ArticleTable.find().sort({createdAt:'desc'})
    // render articles/index view and pass articles (from db) as local var
    res.render('articles/index', {articles:articles})
});

/**
 * Mount the path 'articles' and then every route from articles.js will come after /articles/ endpoint
 * Putting this router last because it has to be after url encoder gets used.
 */
app.use('/articles', articleRouter)
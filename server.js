const express = require('express')
const mongoose = require('mongoose')
const ArticleTable = require('./models/articles')
const app = express()
const articleRouter = require('./routes/articles')
const methodOverride = require('method-override')

// Purpose of a view engine is to generate html server side instead of in a static html file
// You'll see that variables defined here can be used in ejs files to write html
// Also you can straight up run js code, even without outputing (<%= vs <% )
app.set('view engine', 'ejs')
app.listen(5000)

// Allows us to get specific attributes from req objects in http methods
app.use(express.urlencoded({extended: false}))

// required to use delete functionality because for some reason forms only allow posts and gets
app.use(methodOverride('_method'))

// setup database
mongoose.connect('mongodb://localhost/blog_db', {
     useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })

app.get('/', async (req, res) => {
    const articles = await ArticleTable.find().sort({createdAt:'desc'})
    
    res.render('articles/index', { articles:articles})
});

// putting this router last because it has to be after url encoder gets used 
//Mount the path 'articles' and then every articleRouter.METHOD will follow as a subpath
app.use('/articles', articleRouter)
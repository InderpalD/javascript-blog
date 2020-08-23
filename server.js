const express = require('express')
const mongoose = require('mongoose')
const app = express()
const articleRouter = require('./routes/articles')

// Purpose of a view engine is to generate html server side instead of in a static html file
// You'll see that variables defined here can be used in ejs files to write html
// Also you can straight up run js code, even without outputing (<%= vs <% )
app.set('view engine', 'ejs')
app.listen(5000)

// Allows us to get specific attributes from req objects in http methods
app.use(express.urlencoded({extended: false}))

// setup database
mongoose.connect('mongodb://localhost/blog_db', {
     useNewUrlParser: true, useUnifiedTopology: true })

app.get('/', (req, res) => {
    
    const articles = [
        {
            title: 'First Article',
            createdAt: new Date(),
            description: 'test description'
        },
        {
            title: 'Second Article',
            createdAt: new Date(),
            description: 'test description'
        }
    ]
    res.render('articles/index', { articles:articles})
});

// putting this router last because i was not getting proper functionality with other app.use defined after this
//Mount the path 'articles' and then every articleRouter.METHOD will follow as a subpath
app.use('/articles', articleRouter)
const express = require('express')
const app = express()
const articleRouter = require('./routes/articles')

// Purpose of a view engine is to generate html server side instead of in a static html file
// You'll see that variables defined here can be used in ejs files to write html
// Also you can straight up run js code, even without outputing (<%= vs <% )
app.set('view engine', 'ejs')
app.listen(5000)

//Mount the path 'articles' and then every articleRouter.METHOD will follow as a subpath
app.use('/articles', articleRouter)

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
    res.render('index', { articles:articles})
});
# javascript-blog



## Some notes (just for me, but you might love em too).
Examples of how we connected client to server:
1) The New button. We attached an <a> tag to it within index.ejs (the view where the button lives) and linked it to another route '/articles/new'. Then we created a router.post('/new') method for it in articles.js

2) The Form fields for creating a new article. E.g. Title. We created a <form action='articles' method='POST'> in the new.ejs view, and then created a router.post('/') in articles.js

3) Cancel button goes back to home page with <a>. Method is GET. Route in server.js

const mongoose = require('mongoose')

//define schema
const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    markdown: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

});


// create db table called Article with the above columns
module.exports = mongoose.model('Article', articleSchema);
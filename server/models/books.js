let mongoose = require('mongoose');

// create a model class
let Book = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true
  }
}, 

{
  collection: "books"
});

module.exports = mongoose.model('Book', Book);

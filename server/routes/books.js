// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
const { findByIdAndUpdate } = require('../models/books');
var ObjectID = require('mongodb').ObjectID;

router.use(express.urlencoded({extended:true}));

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });

});


//  GET the Book Details page in order to add a new Book
  router.get('/add',(req,res)=>{

     /*****************
     * ADD CODE HERE *
     *****************/
      res.render("books/details",{
      title:'Enter Book Details',
      books: ''
    });
  });
   
   

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {

      /*****************
       * ADD CODE HERE *
       *****************/
      var myData = new book(req.body);
      myData.save()
      .then(item => {
      res.redirect("/books");
      })
      .catch(err => {
      res.status(400).send("unable to save to database");
    });
});


// GET the Book Details page in order to edit an existing Book
router.get('/:id', (req, res, next) => {

      /*****************
       * ADD CODE HERE *
       *****************/
      book.findById(req.params.id, function(err, foundBook){
        if(err){
            res.redirect("/");
        }
        else{
          res.render("books/edit", {title:'Edit Book Details', books: foundBook});
        }
      })   
});


// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {

      /*****************
       * ADD CODE HERE *
       *****************/

      let data = req.body;
      let id = new ObjectID(req.params.id);
      data._id = id;
      book.findByIdAndUpdate(id, data).then(function(err) {
        console.log(err, 'updated');
        book.findOne().then(function(items) {
          console.log(items)
          books = items;
          res.redirect('/books');
        });
      });
});


// GET - process the delete by user id
router.get('/delete/:id', function(req, res, next) {

    /*****************
     * ADD CODE HERE *
     *****************/
    book.findByIdAndRemove({_id:req.params.id}, function(err){
      if(err){
          res.redirect("/books");
      }else{
          res.redirect("/books");
      }
    })
 });


module.exports = router;

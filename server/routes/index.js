// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
var ObjectID = require('mongodb').ObjectID;

// define the game model
let Book = require('../models/books');

/* GET home page. wildcard */
router.get('/', (req, res, next) => {
  res.render('content/index', {
    title: 'Home',
    books: ''
   });
});

router.get('/add',(req,res)=>{
  res.render("books/details",{
    title:'Enter Book Details',
    books: ''
  });
});

router.post("/add", (req, res) => {
  var myData = new Book(req.body);
  myData.save()
  .then(item => {
  res.redirect("/books");
  })
  .catch(err => {
  res.status(400).send("unable to save to database");
  });
 });


router.get("/edit/:id", function(req,res){
Book.findById(req.params.id, function(err, foundBook){
  if(err){
      res.redirect("/");
  }else{
    res.render("books/edit", {title:'Edit Book Details', books: foundBook});
  }
})
})

router.post('/edit/:id', function(req, res){
  let data = req.body;
  let id = new ObjectID(req.params.id);
  data._id = id;
  Book.findByIdAndUpdate(id, data).then(function(err) {
    console.log(err, 'updated');
    Book.findOne().then(function(items) {
      console.log(items)
      books = items;
      res.redirect('/books');
    });
  });
});

router.get('/delete/:id', function(req, res, next) {
  Book.findByIdAndRemove({_id:req.params.id}, function(err){
    if(err){
        res.redirect("/books");
    }else{
        res.redirect("/books");
    }
})
 });

module.exports = router;

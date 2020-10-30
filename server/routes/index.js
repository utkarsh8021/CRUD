// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

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
//  Book.findById(req.params.id)
//  .then(foundBook =>{
//    if(!foundBook){ return res.status(404).end();}
//    return res.status(200).json(foundBook);
//  })
//  .catch(err=>next(err));

 Book.findById(req.params.id, function(err, foundBook){
  if(err){
      res.redirect("/");
  }else{
    res.render("books/details", {title:'Edit Book Details', books: foundBook});
  }
})
})



module.exports = router;

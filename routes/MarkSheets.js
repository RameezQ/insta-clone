const express = require ('express'); 
const router = express.Router(); 
const mongoose = require('mongoose')
const Article = mongoose.model('MarkSheets'); 
const APIFeatures = require('../utils/APIFeatures')
const requireLogin  = require('../middleware/requireLogin')
router.get('/teachers', function(req, res) { 
  Article.find(function(err, teachers) {
    res.json(teachers);
  });
});

router.get('/teacher/:id', function(req, res) {  
  Article.findById(req.params.id, function(err, article) {
    if (!article) {
      res.status(404).send('No result found');
    } else {
      res.json(article);
    }
  });
});

router.post('/teacher',requireLogin, function(req, res) {   
  // console.log(req.body)  
  const {name,fatherName,idCard,salary,cell,address,reference,classOfTeach,subject,photo,teacherId,education} = req.body
  let article = new Article({
    name,fatherName,idCard,salary,cell,address,reference,classOfTeach,subject,photo,postedBy:req.user,teacherId,education
  });
  console.log(article)
  article.save()
    .then(article => {
      res.send(article);
    })
    .catch(function(err) {
      res.status(422).send('Article add failed');
    });
});
router.post('/marksheet', function(req, res) {   
    console.log(req.body.studentId)  
    const article=new Article(req.body)
    console.log(article)
    article.save()
      .then(article => {
        res.send(article);
      })
      .catch(function(err) {
        res.status(422).send('Article add failed');
      });
  });
router.put('/teacher/:id', function(req, res){    
  Article.findByIdAndUpdate(req.params.id, req.body)
    .then(function() {
      res.json('Article updated');
    })
    .catch(function(err) {
      res.status(422).send("Article update failed.");
    });
});

router.delete('/teacher/:id', function(req, res) {  
  Article.findById(req.params.id, function(err, article) {
    if (!article) {
      res.status(404).send('Article not found');
    } else {
      Article.findByIdAndRemove(req.params.id)
        .then(function() { res.status(200).json("Article deleted") })
        .catch(function(err) {
          res.status(400).send("Article delete failed.");
        })
    }
  });
})
router.get("/allTeachers",requireLogin,async (req, res, next) => {

  const resPerPage = 4;
  const productsCount = await Article.countDocuments();

  const apiFeatures = new APIFeatures(Article.find(), req.query)
      .search()
      .filter()

  let products = await apiFeatures.query;
  let filteredProductsCount = products.length;

  apiFeatures.pagination(resPerPage)
  products = await apiFeatures.query;


  res.status(200).json({
      success: true,
      productsCount,
      resPerPage,
      filteredProductsCount,
      products
  })

})
module.exports = router;
const express = require ('express'); 
const router = express.Router(); 
const mongoose = require('mongoose')
const Article = mongoose.model('Fee'); 
const APIFeatures = require('../utils/APIFeatures')
const requireLogin  = require('../middleware/requireLogin')
router.get('/fees', function(req, res) { 
  Article.find(function(err, fees) {
    res.json(fees);
  }).populate("studentId","_id name")
    .sort('-createdAt')
});
router.get('/feee', function(req, res) { 
  
    res.json("this is working");
  
});
router.get('/fee/:id', function(req, res) {  
  Article.findOne({studentId:req.params.id}, function(err, article) {
    if (!article) {
      res.status(404).send('No result found');
    } else {
      res.json(article);
    }
  }).populate("studentId","_id name");
});
router.put('/feeObjectId/:id', function(req, res) {  
  console.log(req.body)
  Article.findByIdAndUpdate(req.params.id,{$push : {fee : req.body.fee}}, function(err, article) {
    if (!article) {
      res.status(404).send('No result found');
    } else {
      res.json(article);
    }
  });
});

router.post('/fee',requireLogin, function(req, res) {   
  console.log(req.body)
  let article = new Article(req.body);
  console.log(article)
  article.save()
    .then(article => {
      res.send(article);
    })
    .catch(function(err) {
      res.status(422).send('Article add failed');
    });
});

router.put('/fee/:Studebtid', function(req, res){    
  Article.findByIdAndUpdate({_id:req.params.studendId}, req.body)
    .then(function() {
      res.json('Article updated');
    })
    .catch(function(err) {
      res.status(422).send("Article update failed.");
    });
});

router.delete('/fee/:id', function(req, res) {  
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
router.get("/allfees",requireLogin,async (req, res, next) => {

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
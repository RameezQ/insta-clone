const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const requireLogin  = require('../middleware/requireLogin')
const Post =  mongoose.model("Students")
const APIFeatures = require('../utils/APIFeatures')

router.get('/allpost',requireLogin,(req,res)=>{
    Post.find()
    .populate("postedBy","_id name")
    .populate("comments.postedBy","_id name")
    .sort('-createdAt')
    .then((posts)=>{
        res.json({posts})
    }).catch(err=>{
        console.log(err)
    })
    
})

router.get('/getsubpost',requireLogin,(req,res)=>{

    // if postedBy in following
    Post.find({postedBy:{$in:req.user.following}})
    .populate("postedBy","_id name")
    .populate("comments.postedBy","_id name")
    .sort('-createdAt')
    .then(posts=>{
        res.json({posts})
    })
    .catch(err=>{
        console.log(err)
    })
})
router.post('/articles',requireLogin, function(req, res) {
    const {name,address,cell,inClass,course,pic,fatherName,rollNumber} = req.body
    console.log(req.body)     
    let article = new Post({
            name,
            address,
            inClass,
            cell,
            course,
            fatherName,
            photo:pic,
            rollNumber,
            postedBy:req.user
    });
    article.save()
      .then(article => {
        res.send(article);
      })
      .catch(function(err) {
        res.status(422).send('Article add failed');
      });
  });
router.post('/createpost',requireLogin,(req,res)=>{
    console.log(req.body)
    const {name,address,cell,inClass,course,fatherName,rollNumber,photo} = req.body
    if(!name || !fatherName ||!cell ||!course ||!address ||!inClass ||!rollNumber||!photo){
      return  res.status(422).json({error:"Plase add all the fields"})
    }
    req.user.password = undefined
    const post = new Post({
        name,
        address,
        inClass,
        cell,
        course,
        fatherName,
        photo,
        rollNumber,
        postedBy:req.user
    })
    post.save().then(result=>{
        res.json({post:result})
    })
    .catch(err=>{
        console.log(err)
    })
})
router.put('/student/:id', function(req, res){    
    console.log(req.body)
    Post.findByIdAndUpdate(req.params.id, req.body)
      .then(function() {
        res.json('Article updated');
      })
      .catch(function(err) {
        res.status(422).send("Article update failed.");
      });
  });

router.get('/mypost',requireLogin,(req,res)=>{
    Post.find({postedBy:req.user._id})
    .populate("PostedBy","_id name")
    .then(mypost=>{
        res.json({mypost})
    })
    .catch(err=>{
        console.log(err)
    })
})
router.get('/student/profile/:id',requireLogin, function(req, res) {  
    console.log(req.body)
    Post.findById(req.params.id, function(err, article) {
      if (!article) {
        res.status(404).send('No result found');
      } else {
        res.json(article);
      }
    });
  });
router.put('/like',requireLogin,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        $push:{likes:req.user._id}
    },{
        new:true
    }).exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
})
router.put('/unlike',requireLogin,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        $pull:{likes:req.user._id}
    },{
        new:true
    }).exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
})


router.put('/comment',requireLogin,(req,res)=>{
    const comment = {
        text:req.body.text,
        postedBy:req.user._id
    }
    Post.findByIdAndUpdate(req.body.postId,{
        $push:{comments:comment}
    },{
        new:true
    })
    .populate("comments.postedBy","_id name")
    .populate("postedBy","_id name")
    .exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
})

router.delete('/deletepost/:postId',requireLogin,(req,res)=>{
    Post.findOne({_id:req.params.postId})
    .populate("postedBy","_id")
    .exec((err,post)=>{
        if(err || !post){
            return res.status(422).json({error:err})
        }
        if(post.postedBy._id.toString() === req.user._id.toString()){
              post.remove()
              .then(result=>{
                  res.json(result)
              }).catch(err=>{
                  console.log(err)
              })
        }
    })
})
router.get("/allproducts",requireLogin,async (req, res, next) => {

    const resPerPage = 4;
    const productsCount = await Post.countDocuments();

    const apiFeatures = new APIFeatures(Post.find(), req.query)
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
router.get('/students', function(req, res) { 
    Post.find(function(err, teachers) {
      res.json(teachers);
    });
  });
module.exports = router
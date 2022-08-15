const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const privateRoute = require('../routes/privateRoute');


router.get('/', async (req, res) => { 
    try
    {
        const posts = await Post.find();
        res.json(posts);
    }
    catch(err)
    {
        res.json({message: err});
    }
});

router.post('/create-new-post', privateRoute, async (req, res) => { 

    console.log(req.body.category);
    const newPost = new Post(
        {
            author : req.body.author,
            title : req.body.title,
            content : req.body.content,
            category : req.body.category,
            responces: req.body.responces
        }
    );

    try
    {
        const savedPost = await newPost.save();
        res.json(savedPost);
    }
    catch(err)
    {
        res.json({message: err});
    }
});


router.patch('/add-comment', privateRoute, (req, res) => { 
    const body = req.body;
    Post.findOneAndUpdate({_id: body._id}, {$push: {responces : { 
        author: body.name,
        content: body.content
    }}}, {new: true},function (error, success) {
        if (error) {
          console.log(error);
        } else {
          console.log(success);
        }
      }
    );

});


module.exports = router;

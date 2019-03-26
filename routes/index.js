var express = require('express');
var router = express.Router();
var PostCollection = require('../models/PostSchema');

// list all posts
router.get('/', (req, res) => {
    PostCollection.find({}, (error, results) => {
        if (error) res.send(error);
        else res.render('index', {posts: results});
    });
});

//render create form
router.get('/create', (req, res) => {
    res.render('create');
});

// create a post
router.get('/createAction', (req, res) => {
    PostCollection.create({
        userId: req.query.userId,
        id: req.query.id,
        title: req.query.title,
        body: req.query.body
    }, (error, results) => {
        if (error) res.send(error);
        else res.redirect('/');
    });
});

//render update form
router.get('/update', (req, res) => {
    res.render('update');
});

//update existing post
router.get('/updateAction', (req, res) => {
    PostCollection.findOneAndUpdate(
        {id: req.query.id},
        {
            userId: req.query.userId,
            title: req.query.title,
            body: req.query.body
        }, (error) => {
            if (error) res.send(error);
            else res.redirect('/')
        })
});

//render delete form
router.get('/delete', (req, res) => {
    res.render('delete');
});

// delete post
router.get('/deleteAction', (req, res) => {
    PostCollection.deleteOne({id:req.query.id}, (error) => {
        if (error) res.send(error);
        else res.redirect('/');
    });
});

module.exports = router;

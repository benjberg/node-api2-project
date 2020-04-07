const express = require('express');

const Posts=require('./data/db.js');
const router= express.Router();

router.get('/', (req, res) => {
    Posts.find(req.query)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the posts',
      });
    });
  });


  router.get('/:id', (req , res) =>{
    Posts.findById(req.params.id)
    .then((post) => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({
          message: "post not found",
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error processing request",
      });
    });
  });

  router.get('/:id/comments', (req, res) =>{
    Posts.findPostComments(req.params.id).then(comment =>{
        res.status(200).json(comment)
            }).catch(err=> {
                res.status(500).json({message: 'something went wrong'})
            })
  })

  router.post('/', (req,res) => {
      Posts.insert(req.body).then(post =>{
          res.status(201).json({message: 'success'})
      }).catch(err => {
          res.status(500).json({message: 'error adding post'})
      })
  })

  router.post('/:id/comments', (req, res) =>{
    Posts.findById(req.params.id).then((post) => {
      if (post) {
        req.body.text
          ? Posts.insertComment(req.body)
              .then(res.status(200).json(req.body))
              .catch((err) => {
                console.log(err);
              })
          : res
              .status(400)
              .json({ errorMessage: "Please provide text for the comment." });
      } else {
        res.status(404).json({
          message: "post not found",
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error processing request",
      });
    });
  })

  router.delete('/:id', (req, res) =>{
      Posts.remove(req.params.id).then(count => {
          if (count > 0){
              res.status(200).json({message: 'post deleted'})
          } else {
              res.status(404).json({message: 'post could not be found'})
          }
      })
      })
    
      router.put('/:id', (req, res) =>{
        const changes = req.body;
    Posts.update(req.params.id, changes)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: 'The post could not be found' });
      }
    })
      })


   module.exports = router;
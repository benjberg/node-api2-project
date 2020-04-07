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
      Posts.findById(req.params.id).then(post=>{
          if(post){
          res.status(200).json(post);} 
          else{
              res.status(404).json({message: 'post could not be found'})};
          })
  });


  router.post('/', (req,res) => {
      Posts.insert(req.body).then(post =>{
          res.status(201).json({message: 'success'})
      }).catch(err => {
          res.status(500).json({message: 'error adding post'})
      })
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
    
  
   module.exports = router;
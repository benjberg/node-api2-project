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
  router.post('/', (req,res) => {
      Posts.insert(req.body).then(post =>{
          res.status(201).json({message: 'success'})
      }).catch(err => {
          res.status(500).json({message: 'error adding post'})
      })
  })

  module.exports = router;
const express = require('express');
const postsRouter= require('./router.js')
const server = express();



server.use(express.json());
server.use('/api/posts', postsRouter);
server.get('/', (req,res) =>{
    res.send(`
    <h2>Lambda Hubs API</h>
    <p>Welcome to the Lambda Hubs API</p>
  `)
})
const port = 5001;
 server.listen(port, () => console.log(`/n== api on port ${port} ==\n`))
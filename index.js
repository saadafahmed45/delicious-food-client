// ASSINGMENT-10 

const express = require('express')
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
// const ObjectId = require('mongodb').ObjectID;
const ObjectId = require("mongodb").ObjectId;
const cors = require ('cors');
require('dotenv').config()

// require
const app = express()
app.use(bodyParser.json())
app.use(cors())
const port = process.env.PORT || 5000;
// mongoDB connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.vvccs.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
// console.log(uri);
// set Uri
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
    const itemCollection = client.db("deliciousData").collection("items");
    const orderCollection = client.db("cartData").collection("allCart");
    // perform actions on the collection object
  console.log('Data-Base connection successfully');


 // set data from database in server
 app.get('/items',(req, res) => {
  itemCollection.find()
  .toArray((err,items) =>{
    res.send(items)

  })
})
  // post data set to the mongodb database
 app.post('/addItems',(req, res) => {
  const newItems = req.body;
  console.log('adding new event: ', newItems);
  itemCollection.insertOne(newItems)
  .then(result => {
    console.log('inserted Count', result.insertedCount);
    res.send(result.insertedCount > 0);
  })
})


//  delete

app.delete("/delete/:id" , (req, res) =>{
  const id = req.params.id;
  console.log(req.params.id); 
  itemCollection.deleteOne({_id : ObjectId(id)})
  .then(documents => res.send("send"))
})



app.post('/addOrder',(req, res) => {
  const newItems = req.body;
  console.log('adding new event: ', newItems);
  orderCollection.insertOne(newItems)
  .then(result => {
    console.log('inserted Count', result.insertedCount);
    res.send(result.insertedCount > 0);
  })
})

// get

app.get('/order',(req, res) => {
  orderCollection.find()
  .toArray((err,items) =>{
    res.send(items)

  })
})





})




// Add Order 

  
// client.connect(err => {
//     const orderCollection = client.db("cartData").collection("allCart");
//   // perform actions on the collection object
// //  add order  start

// app.post('/addOrder',(req, res) => {
//   const newItems = req.body;
//   console.log('adding new event: ', newItems);
//   orderCollection.insertOne(newItems)
//   .then(result => {
//     console.log('inserted Count', result.insertedCount);
//     res.send(result.insertedCount > 0);
//   })
// })

// // get

// app.get('/order',(req, res) => {
//   orderCollection.find()
//   .toArray((err,items) =>{
//     res.send(items)

//   })
// })





// });




  app.get('/', (req, res) => {
    res.send('this is my assignment-10');
  })
  
  
  app.listen(port)
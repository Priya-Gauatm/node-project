const express = require('express');
const app = express();
require("dotenv").config();
const cors = require('cors');
const port = 4000;

const path = require('path');
const database =  require("./config/dbConnection");

app.set('view engine', 'ejs');

app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', (req, res) => {
  app.get('/', function(req, res){
    res.send("Hello world!");
 });
 
  });

app.get('/data', (req, res) => {
  const sql = "SELECT * FROM `oc_top_testing` WHERE product_id IN (1,2,3,4);";
  database.query(sql, function(error, result) {
    if (error) console.log(error);
    res.render("index", { top_tranding: result });
  });
});

app.get('/trending', (req, res) => {
  const sql = "SELECT * FROM `oc_product` WHERE product_id = 525;";
  database.query(sql, (error, result) => {
    if (error) {

      console.error(error);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.json(result);
  });
});




// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

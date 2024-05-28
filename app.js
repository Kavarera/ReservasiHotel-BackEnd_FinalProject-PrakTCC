require("dotenv").config();
const express = require('express');
const sequelize = require('./src/utils/connection');
const Association = require('./src/utils/associations');
const path = require('path');

const app = express();
const allowedOrigins = ['http://localhost:3000', 'http://localhost:3001','*','*/*'];
app.use(function (req, res, next) {
    const origin=req.headers.origin;
    if(allowedOrigins.includes(origin)){
      res.header("Access-Control-Allow-Origin", origin);
    }
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE, PATCH");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
  });
app.use(express.static(path.join(__dirname,"public")));

app.use(express.json());
const route = require('./src/routes/route');
app.use('/api', route);

app.use('/',express.Router().get('/',(req,res)=>{
    res.sendFile(path.join(__dirname, '../public/index.html'));
}));

const PORT = process.env.PORT || 3000;

  Association().then(()=>{
    app.listen(process.env.PORT);
    console.log(`server is running on port ${PORT}\nhttp://localhost:${process.env.PORT}`);
  }).catch(e=>{
    console.log(`ERROR : ${e.message}`);
  });
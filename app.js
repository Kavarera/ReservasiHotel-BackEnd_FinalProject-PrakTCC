require("dotenv").config();
const express = require('express');
const sequelize = require('./src/utils/connection');
const Association = require('./src/utils/associations');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname,"public")));

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
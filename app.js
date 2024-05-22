require("dotenv").config();
const express = require('express');
const sequelize = require('./src/utils/connection');
const Association = require('./src/utils/associations');

const app = express();
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE, PATCH");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  });

app.use(express.json());
const route = require('./src/routes/route');
app.use('/api', route);

const PORT = process.env.PORT || 3000;

  Association().then(()=>{
    app.listen(process.env.PORT);
    console.log(`server is running on port ${PORT}\nhttp://localhost:${process.env.PORT}`);
  }).catch(e=>{
    console.log(`ERROR : ${e.message}`);
  });

  // sequelize.sync({ force: false }).then(() => {
  //   app.listen(PORT, () => {
  //     console.log(`Server is running on port ${PORT}`);
  //   });
  // }).catch(error => {
  //   console.error('Unable to connect to the database:\n', error);
  // });


  // app.listen(PORT,()=>{
  //   console.log(`server is running on port ${PORT}\nhttp://${process.env.HOST}:${process.env.PORT}`);
  // });
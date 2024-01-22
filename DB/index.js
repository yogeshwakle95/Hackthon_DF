const dotenv = require('dotenv');
dotenv.config({path:'./config/config.env'});
const app = require('./app');

const mongoose = require('mongoose');
// const path = require('path');
const Database = require('./config/database');



Database()

app.listen(process.env.PORT,()=>{
    console.log(`server is running on ${process.env.PORT}`);
})




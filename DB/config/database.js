const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');


const database=async () => {
      await mongoose.connect(process.env.MONGO_URI).then((data)=>{
        console.log(`mongodb connected with server: ${data.connection.host}`);
      })
    }


module.exports = database;  
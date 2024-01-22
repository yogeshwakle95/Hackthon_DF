const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');
const erroMiddleware = require('./middleware/error');
const userRoute = require('./routes/userRoutes');
const productRoute = require('./routes/productRoutes');
const categoryRoute = require('./routes/categoryRoutes');
var bodyParser= require('body-parser');
// app.use(cors());
app.use(cors({
    origin: 'http://localhost:3000',  // Adjust this to match your frontend's origin
    credentials: true,
  }));
  
app.use(bodyParser.json());

app.use(cookieParser());
app.use('/api/user',userRoute);
app.use('/api/product',productRoute);
app.use('/api/category',categoryRoute);
app.use(erroMiddleware);


module.exports = app;
const fs=require('fs');
const express=require('express');
const tourRouter=require('./routes/tourRoutes');

const app=express();
const morgan=require('morgan');


// 1. middleware
app.use(express.json());

app.use(morgan('dev'));

app.use((req,res,next) =>{
  //  console.log('Hello from the middleware');
  req.requestTime=new Date().toISOString();
   next();
});



// 3.ROUTES

app.use('/api/v1/tours',tourRouter);


module.exports=app;




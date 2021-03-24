const fs=require('fs');
const express=require("express");
const tourController=require('./../controllers/tourController');
const tours= JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));

// Routes
const router=express.Router();



router
.route('/')
.get(tourController.getAlltours)
.post(tourController.createTour);

router
.route('/:id')
.get(tourController.getTour)
.patch(tourController.updateTour)
.delete(tourController.deleteTour);

module.exports=router;
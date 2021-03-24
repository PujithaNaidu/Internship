const fs=require('fs');

const Tour=require('./../models/tourModel');

// 2.ROUTE HANDlERS
exports.getAlltours= async(req,res) =>{
  try{
    const tours= await Tour.find()
   res.status(200).json({
     status:'success', 
     results:tours.length,
     data:{
         tours
     }
   });

  }catch(err){
    res.status(404).json({
      status:'fail',
      message:err
    });
  }
  
};

exports.getTour= async (req,res) =>{
 try{
   const tour=await Tour.findById(req.params.id);
  //  here , we could also use
  // Tour.findOne({_id:request.params.id})
   res.status(200).json({
     status:'success',
     data:{
       tour
     }
   });
 }catch(err){
   res.status(404).json({
      status:'fail',
      message:err
    });
 }
  
};

exports.createTour= async(req,res) =>{
  try{
     const  newTour=await Tour.create(
     req.body);
      res.status(201).json({
       status:'success',
      data:{
        tours:newTour
      }
    });

  }catch (err){
     res.status(400).json({
       status:"fail",
       message:"Invalid Dataset"
     })
  }
  
};

exports.updateTour= async (req,res) =>{
  try{
   const tour=await  Tour.findByIdAndUpdate(req.params.id,req.body,{
      new:true,
      runValidators:true
    })
    res.status(200).json({
    status:'success',
    data:{
      tour:tour
    }
  });
  }catch(err){
res.status(400).json({
       status:"fail",
       message:"Invalid Dataset"
     })
  }
  

  
};

exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};
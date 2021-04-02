var express = require('express');
var router = express.Router();
var knex=require('../config/config').knex;
var company=require('../models/schema');
var integration=require('../integration/integration');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post("/users", async (req,res) =>{
  const {name,population}=req.body;
  let response=await integration.save_city(name,population);
  res.send(response);
});

router.get("/allusers",async(req,res) =>{
  const response= await integration.get_allusers();
  res.send(response);
});

router.get("/user", async (req,res)=>{
  let name=req.body.name;
  console.log(name);
  let response=await integration.fetch_city(name);
  res.send(response);
});

router.put("/updateuser",async function(req,res){
  let id=req.query.id;
  console.log("this is update id",id);
  let userinfo=req.body;
  let response= await integration.updateuser(id,userinfo);
  res.send(response);
});

router.delete("/deleteuser", async function(req,res) {

  let userid=req.body.id;
  let response=await integration.deleteUser(userid);
  res.send(response);
});

module.exports = router;

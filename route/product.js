const express= require('express')
const router =express.Router()
const client =require('../Controller/connection')

router.get ('/',async(req,res)=>{
    let data=await client.db("Amazon-project").collection("product").find({}).toArray();
    res.send(data)
  }),
  router.get ('/filter/:query',async(req,res)=>{
    let query=req.params.query;
    regquery=new RegExp(query,"i")
    let filtered=await client.db("Amazon-project").collection("product").find ({"product_name":regquery}).toArray()
    res.send(filtered)
   }),

module.exports=router
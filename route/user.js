const express= require('express')
const router =express.Router()
const client =require('../Controller/connection')

router.get ('/',async(req,res)=>{
    let data=await client.db("Amazon-project").collection("user").find({}).toArray();
    res.send(data)
  }),
router.post('/',async (req,res)=>{
        
    let data=await client.db("Amazon-project").collection("user").find({email:req.body.email}).toArray()

     if(data.length===0){
    // if(newUser.name===""){

    // }
        let newUser = {
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
            address:req.body.address,
            mobileNumber:req.body.mobileNumber,
            profilePicture:req.body.profilePicture
        }
        await client.db("Amazon-project").collection("user").insertOne(newUser)
        res.send('data inserted')
            }else{
                res.send('data Already existed')
            }
}),
router.post('/login',async (req,res)=>{
    let data=await client.db("Amazon-project").collection("user").find({email:req.body.email,password:req.body.password}).toArray()
    if(data.length===1){
        res.json("existed")
    }
    else{
        res.json("not existed")
    }
})

module.exports=router
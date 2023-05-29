const express= require('express')
const router =express.Router()
const client =require('../Controller/connection')

router.get ('/',async(req,res)=>{
    let data=await client.db("Amazon-project").collection("user").find({}).toArray();
    res.send(data)
  }),
router.post('/',async (req,res)=>{
    const { name, email, password, address, mobileNumber } = req.body;

    if (!name || !email || !password || !address || !mobileNumber) {
      res.status(400).send({ error: "All fields are required" });
      return;
    }
    let data=await client.db("Amazon-project").collection("user").find({email:req.body.email}).toArray()

     if(data.length===0){
    // // if(name===" "){
    //     res.send("U must enter ur name")
    // // }
        let newUser = {
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
            address:req.body.address,
            mobileNumber:req.body.mobileNumber,
        }
        await client.db("Amazon-project").collection("user").insertOne(newUser)
        res.send('data inserted')
            }else{
                res.send("data Already existed")
            }
}),
router.post('/login',async (req,res)=>{

    let data=await client.db("Amazon-project").collection("user").find({email:req.body.email,password:req.body.password}).toArray()
    if(data.length===1){
        res.send("existed")
    }
    else{
        res.send("not existed")
    }
}),
router.get('/:email', async(req,res)=>{
    let data=await client.db("Amazon-project").collection("user").findOne({email:req.params.email});
    res.send(data)
  }),
  router.put('/:email', async(req, res) => {
    const email = req.params.email;
    const { name, password, mobileNumber, address } = req.body;

    try {
        await client.db("Amazon-project").collection("user").updateOne(
            { email: email },
            { $set: { name: name, password: password, mobileNumber: mobileNumber, address: address } }
        );
        res.send("updated");
    } catch (err){
        console.log(err);
        res.send("Error updating user profile");
    }
})

module.exports=router
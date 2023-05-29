const express=require('express');
const app=express();
const port=process.env.PORT || 5000
const user=require("./route/user")
const product=require("./route/product")
const cart=require("./route/cart")
const order=require("./route/order")
const cors=require('cors')
app.use(cors())
app.use(express.json())
app.use("/user",user)
app.use("/product",product)
app.use("/cart",cart)
app.use("/order",order)
app.use((req,res,next)=>{
    console.log(req.url,req.method);
    next();
   })
app.get('/',(req,res)=>{
    res.send(req.body)
})
app.listen(port,()=>{
    console.log(`API activated on port ${port}`)
})
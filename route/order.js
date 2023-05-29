const express= require('express')
const router =express.Router()
const client =require('../Controller/connection')

router.get ('/',async(req,res)=>{
    let data=await client.db("Amazon-project").collection("order").find({}).toArray();
    res.send(data)
}),
router.post('/', async (req, res) => {
    const { email, itemId, itemName, itemPrice, quantity,itemImg } = req.body;
    const order = await client.db("Amazon-project").collection("order").findOne({ email });
    if (order) {
      const newItem = {
        itemId, itemName, itemPrice, quantity, itemImg
      };
      await client.db("Amazon-project").collection("order").updateOne(
        { email },
        { $push: { items: newItem } }
      );
      res.send({ message: "Item added to order" });
    } else {
      const newOrder = {
        email,
        items: [
          {itemId,itemName,itemPrice, quantity,itemImg}
        ]
      };
      await client.db("Amazon-project").collection("order").insertOne(newOrder);
      res.send({ message: "Item added to order" });
    }
  }),
  router.get('/:email', async (req, res) => {

    const userEmail = req.params.email;
    const orderItems = await client.db("Amazon-project").collection("order").findOne({ email: userEmail });
    res.send(orderItems);
}),
router.delete('/', async (req, res) => {
  const { itemId, email } = req.query; 
  const cart = await client.db("Amazon-project").collection("order").findOneAndUpdate( { email: email },{ $pull: { items: { itemId: itemId } } },{ new: true } 
    );
  res.send(cart.value.items);
}),
module.exports=router
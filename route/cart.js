const express= require('express')
const router =express.Router()
const client =require('../Controller/connection')

router.get ('/',async(req,res)=>{
    let data=await client.db("Amazon-project").collection("cart").find({}).toArray();
    res.send(data)
  }),
  router.post('/add', async (req, res) => {
    const { email, itemId, itemName, itemPrice, quantity,itemImg } = req.body;
    const cart = await client.db("Amazon-project").collection("cart").findOne({ email });
   if (cart) {
      let items = cart.items;
      let itemIndex = -1;
      for (let i = 0; i < items.length; i++) {
        if (items[i].itemId === itemId) {
          itemIndex = i;
          break;
        }
      }
      if (itemIndex > -1) {
        items[itemIndex].quantity += quantity;
      } else {
        const newItem = {
          itemId,itemName,itemPrice,quantity,itemImg}
        items.push(newItem);
      }
      const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);
      await client.db("Amazon-project").collection("cart").updateOne({ email }, { $set: { items } });
      res.send({ message: "Item added to cart",count:totalQuantity });
    } else {
      const newCart = {
        email,
        items: [
          {itemId,itemName,itemPrice, quantity,itemImg}
        ]
      };
      const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);
      await client.db("Amazon-project").collection("cart").insertOne(newCart);
      res.send({ message: "Item added to cart",count:totalQuantity });
    }
  }),
  router.get('/:email', async (req, res) => {

      const userEmail = req.params.email;
      const cartItems = await client.db("Amazon-project").collection("cart").findOne({ email: userEmail });
      res.send(cartItems);
  }),
  router.delete('/', async (req, res) => {
    const { itemId, email } = req.query; 
    const cart = await client.db("Amazon-project").collection("cart").findOneAndUpdate( { email: email },{ $pull: { items: { itemId: itemId } } },{ new: true }   
      );
    res.send(cart.value.items);
  }),
  router.delete('/clear/:email', async (req, res) => {
    const email = req.params.email;
    const cart = await client.db("Amazon-project").collection("cart").findOneAndUpdate( { email: email },{ $set: { items: [] } },{ returnOriginal: false });
    res.send(cart.value.items);
  }),
  router.patch('/increase/:itemId', async (req, res) => {
      const itemId = req.params.itemId;
      const email = req.body.email;
      const cart = await client
        .db("Amazon-project")
        .collection("cart")
        .findOneAndUpdate(
          { email: email, "items.itemId": itemId },
          { $set: { "items.$.quantity": +1 } },
          { returnOriginal: false }
        );
      res.send(cart.value.items  );
  }),
  router.patch('/decrease/:itemId', async (req, res) => {
    const itemId = req.params.itemId;
    const email = req.body.email;
    const cart = await client
      .db("Amazon-project")
      .collection("cart")
      .findOneAndUpdate(
        { email: email, "items.itemId": itemId },
        { $set: { "items.$.quantity": -1 } },
        { returnOriginal: false }
      );
    res.send(cart.value.items  );

});
module.exports=router
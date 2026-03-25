/*const cart = require('../models/cart')
 
 const {verifyToken,verifyTokenAndAuthorization,verifyTokenAndAdmin,} = require("./verifyToken");

const router = require("express").Router();

//CREATE 
router.post('/', verifyToken, async (req,res) =>{

    const newCart = new cart(req.body); 
try{
const savedCart = await newCart.save();
res.status(201).json({savedCart})
}catch(err){
res.status(500).json(err)
}
});


//UPDATE
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const updatedCart = await cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await cart.findByIdAndDelete(req.params.id);
    res.status(200).json("cart has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER CART
router.get("/find/userId",verifyTokenAndAuthorization, async (req, res) => {
  try {
    const Cart = await cart.findById(req.params.id);
    res.status(200).json(Cart);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL 
router.get("/", verifyTokenAndAdmin, async (req, res) => {

    try{
        const carts = await cart.find();

        res.status(200).json(carts)
    }catch(err){
         res.status(500).json(err)
    }     
})



module.exports = router8*/


/*const Cart = require('../models/Cart');
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");

const router = require("express").Router();

// CREATE cart
router.post('/', verifyToken, async (req, res) => {
  const newCart = new Cart(req.body); 
  try {
    const savedCart = await newCart.save();
    res.status(201).json(savedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE cart by id
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});





// DELETE cart by id
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json("Cart has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET USER CART (by userId)
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const userCart = await Cart.findOne({ userId: req.params.userId });
    res.status(200).json(userCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL carts (admin only)
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;*/



const router = require("express").Router();
const Order = require("../models/Order"); 

// CREATE ORDER
router.post("/", async (req, res) => {
  try {
    const newOrder = new Order({
      items: req.body.items,
      address: req.body.address,
      date: new Date()
    });

    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (err) {
    res.status(500).json({ error: "Failed to save order", details: err.message });
  }
});

module.exports = router;



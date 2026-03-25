const router = require("express").Router();
const Account = require("../models/account");
const bcrypt = require("bcrypt");

// SIGNUP
router.post("/signup", async (req, res) => {

  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newAccount = new Account({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword
    });

    const savedAccount = await newAccount.save();
    res.status(201).json(savedAccount);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
    console.log('object'); 
  try {
    const account = await Account.findOne({
      $or: [{ username: req.body.username }, { email: req.body.username }]
    });
    if (!account) return res.status(404).json({ error: "User not found" });

    const validPassword = await bcrypt.compare(req.body.password, account.password);
    if (!validPassword) return res.status(401).json({ error: "Invalid password" });

    res.status(200).json({ message: "Login successful", user: account });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});







module.exports = router

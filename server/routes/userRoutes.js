const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");

// SIGNUP
router.post("/signup", async (req, res) => {

  try {

    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword
    });

    await user.save();

    res.json({
      userId: user._id,
      name: user.name,
      email: user.email
    });

  } catch (err) {
    res.status(500).json({ error: "Signup failed" });
  }

});

// LOGIN
router.post("/login", async (req, res) => {
  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return res.status(400).json({ error: "Invalid password" });
    }

    res.json({
      message: "Login successful",
      userId: user._id,
      name: user.name,
      email: user.email
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error during login" });
  }
});

// ADD TO CART
router.post("/cart/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { productId, quantity } = req.body;

    if (!userId || !productId) {
      return res.status(400).json({
        error: "userId and productId are required"
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        error: "User not found"
      });
    }

    const existingItem = user.cart.find(
      (item) => item.productId.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity || 1;
    } else {
      user.cart.push({
        productId,
        quantity: quantity || 1
      });
    }

    await user.save();
    await user.populate("cart.productId");

    res.status(200).json(user.cart);
  } catch (err) {
    console.error("ADD TO CART ERROR:", err);

    res.status(500).json({
      error: "Server error"
    });
  }
});

// UPDATE CART ITEM
router.patch("/cart/update/:userId", async (req, res) => {

  const { userId } = req.params;
  const { productId, quantity } = req.body;

  try {

    const user = await User.findById(userId);

    const item = user.cart.find(
      item => item.productId.toString() === productId
    );

    if (item) {
      item.quantity = quantity;
    }

    await user.save();

    res.json(user.cart);

  } catch (err) {

    res.status(500).json({ error: err.message });

  }

});

// GET CART
router.get("/cart/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate("cart.productId");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const validCart = user.cart.filter((item) => item.productId);

    res.json(validCart);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete("/cart/remove/:userId/:productId", async (req, res) => {

  const { userId, productId } = req.params;

  try {

    const user = await User.findById(userId);

    user.cart = user.cart.filter(
      item => item.productId.toString() !== productId
    );

    await user.save();

    res.json(user.cart);

  } catch (err) {

    res.status(500).json({ error: err.message });

  }

});

module.exports = router;
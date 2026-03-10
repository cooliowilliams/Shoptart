const mongoose = require("mongoose");
const Product = require("./models/Product"); // adjust path if needed

mongoose.connect("mongodb+srv://CoolioWilliams677:Shoptart123@cluster0.ytlasqb.mongodb.net/shoptart")
.then(async () => {

  await Product.deleteMany();

  await Product.insertMany([
  {
    title: "Red Street Sneakers",
    price: 18000,
    description: "Comfortable red street sneakers designed for everyday wear.",
    image: "/assets/products/red-sneakers.jpg",
    category: "Shoes"
  },
  {
    title: "Black Urban Backpack",
    price: 15000,
    description: "Spacious black backpack perfect for school and work.",
    image: "/assets/products/black-backpack.jpg",
    category: "Accessories"
  },
  {
    title: "Green Classic Hoodie",
    price: 12000,
    description: "Soft cotton hoodie with a modern fit.",
    image: "/assets/products/green-hoodie.jpg",
    category: "Clothing"
  },
  {
    title: "White Minimalist Sneakers",
    price: 20000,
    description: "Clean white sneakers with premium sole grip.",
    image: "/assets/products/white-sneakers.jpg",
    category: "Shoes"
  },
  {
    title: "Premium Black Wristwatch",
    price: 35000,
    description: "Elegant black wristwatch with leather strap.",
    image: "/assets/products/black-watch.jpg",
    category: "Accessories"
  },
  {
    title: "Slim Fit Denim Jeans",
    price: 17000,
    description: "Blue slim fit jeans for casual and smart outfits.",
    image: "/assets/products/denim-jeans.jpg",
    category: "Clothing"
  },
  {
    title: "Wireless Bluetooth Headphones",
    price: 40000,
    description: "Noise-cancelling wireless headphones with deep bass.",
    image: "/assets/products/headphones.jpg",
    category: "Electronics"
  },
  {
    title: "Black Leather Wallet",
    price: 8000,
    description: "Compact leather wallet with multiple card slots.",
    image: "/assets/products/leather-wallet.jpg",
    category: "Accessories"
  },
  {
    title: "Smart Fitness Tracker",
    price: 28000,
    description: "Track your heart rate, steps, and sleep patterns.",
    image: "/assets/products/fitness-tracker.jpg",
    category: "Electronics"
  },
  {
    title: "Red & Black Graphic T-Shirt",
    price: 9000,
    description: "Comfortable cotton T-shirt with bold graphic print.",
    image: "/assets/products/graphic-shirt.jpg",
    category: "Clothing"
  }
]);

  console.log("Products inserted!");
  process.exit();
})
.catch(err => console.log(err));
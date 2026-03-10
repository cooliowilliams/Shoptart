const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(
  "mongodb+srv://CoolioWilliams677:Shoptart123@cluster0.ytlasqb.mongodb.net/shoptart"
)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.get("/", (req, res) => {
  res.send("ShopTart API Running");
});

const productRoutes = require("./routes/productRoutes");

app.use("/api/products", productRoutes);

const userRoutes = require("./routes/userRoutes");

app.use("/api/users", userRoutes);
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
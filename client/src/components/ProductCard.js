import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import "./ProductCard.css";

function ProductCard({ product }) {

  const { user } = useContext(AuthContext);

  const handleAddToCart = async () => {

    if (!user || !user.userId) {
      alert("Please login first");
      return;
    }

    try {

      await axios.post(
        `https://shoptart-backend.onrender.com/api/users/cart/${user.userId}`,
        {
          productId: product._id,
          quantity: 1
        }
      );

      alert("Added to cart!");

    } catch (error) {

      console.error("Add to cart error:", error);

      alert("Something went wrong");

    }

  };

  return (
    <div className="card">
      <img src={product.image} alt={product.title} />
      <h3>{product.title}</h3>
      <p>₦{product.price}</p>
      <button onClick={handleAddToCart}>Add To Cart</button>
    </div>
  );
}

export default ProductCard;
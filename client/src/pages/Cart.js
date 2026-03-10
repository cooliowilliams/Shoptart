import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

function Cart() {

  const { user } = useContext(AuthContext);

  const { cartItems, setCartItems } = useContext(CartContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:5000/api/users/cart/${user.userId}`)
        .then((res) => setCartItems(res.data))
        .catch((err) => console.log(err));
    }
  }, [user, setCartItems]);

  if (!user) return <p className="cart-login-msg">Please login to see your cart.</p>;

  const total = cartItems.reduce(
    (sum, item) => sum + item.productId.price * item.quantity,
    0
  );

  /* ---------------- INCREASE QUANTITY ---------------- */

  const handleIncrease = async (item) => {

    const newQuantity = item.quantity + 1;

    try {

      await axios.patch(
        `http://localhost:5000/api/users/cart/update/${user.userId}`,
        {
          productId: item.productId._id,
          quantity: newQuantity
        }
      );

      setCartItems(prev =>
        prev.map(cartItem =>
          cartItem.productId._id === item.productId._id
            ? { ...cartItem, quantity: newQuantity }
            : cartItem
        )
      );

    } catch (err) {
      console.log(err);
    }

  };

  /* ---------------- DECREASE QUANTITY ---------------- */

  const handleDecrease = async (item) => {

    if (item.quantity === 1) return;

    const newQuantity = item.quantity - 1;

    try {

      await axios.patch(
        `http://localhost:5000/api/users/cart/update/${user.userId}`,
        {
          productId: item.productId._id,
          quantity: newQuantity
        }
      );

      setCartItems(prev =>
        prev.map(cartItem =>
          cartItem.productId._id === item.productId._id
            ? { ...cartItem, quantity: newQuantity }
            : cartItem
        )
      );

    } catch (err) {
      console.log(err);
    }

  };

  /* ---------------- REMOVE ITEM ---------------- */

  const handleRemove = async (item) => {

    try {

      await axios.delete(
        `https://shoptart-backend.onrender.com/api/users/cart/remove/${user.userId}/${item.productId._id}`
      );

      setCartItems(prev =>
        prev.filter(
          cartItem => cartItem.productId._id !== item.productId._id
        )
      );

    } catch (err) {
      console.log(err);
    }

  };

  return (
    <div className="cart-container">

      <h2 className="cart-title">{user.name}'s Cart</h2>

      {cartItems.length === 0 && (
        <div className="empty-cart">
          <h3>Your cart is empty 🛒</h3>
          <p>Browse products and add items to your cart.</p>
        </div>
      )}

      <div className="cart-grid">

        {cartItems.map((item) => (

          <div key={item.productId._id} className="cart-card">

            <img
              src={item.productId.image}
              alt={item.productId.title}
              className="cart-image"
            />

            <div className="cart-info">

              <h4>{item.productId.title}</h4>

              <p className="price">₦{item.productId.price}</p>

              {/* Quantity Controls */}

              <div className="quantity-controls">

                <button
                  onClick={() => handleDecrease(item)}
                >
                  -
                </button>

                <span>{item.quantity}</span>

                <button
                  onClick={() => handleIncrease(item)}
                >
                  +
                </button>

              </div>

              {/* Remove Button */}

              <button
                className="remove-btn"
                onClick={() => handleRemove(item)}
              >
                Remove
              </button>

            </div>

          </div>

        ))}

      </div>

      {cartItems.length > 0 && (
        <div className="cart-summary">

          <h3>Total: ₦{total}</h3>

          <button
            className="checkout-btn"
            onClick={() =>
              navigate("/checkout", { state: { cartItems, total } })
            }
          >
            Proceed to Checkout
          </button>

        </div>
      )}

    </div>
  );
}

export default Cart;
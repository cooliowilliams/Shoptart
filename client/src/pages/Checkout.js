import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import "./Checkout.css";
import { useNavigate } from "react-router-dom";

function Checkout() {

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);

  const [shipping, setShipping] = useState({
    address: "",
    city: "",
    phone: ""
  });

  useEffect(() => {

    if (!user) return;

    axios
      .get(`https://shoptart-backend.onrender.com/users/cart/${user.userId}`)
      .then(res => setCartItems(res.data))
      .catch(err => console.log(err));

  }, [user]);

  const total = cartItems.reduce(
    (sum, item) => sum + item.productId.price * item.quantity,
    0
  );

  const handlePayment = () => {

    navigate("/payment", {
      state: { cartItems, total, shipping }
    });

  };

  return (

    <div className="checkout-container">

      <h2>Checkout</h2>

      {/* Shipping Info */}

      <div className="shipping-box">

        <h3>Shipping Information</h3>

        <input
          placeholder="Address"
          onChange={(e) =>
            setShipping({ ...shipping, address: e.target.value })
          }
        />

        <input
          placeholder="City"
          onChange={(e) =>
            setShipping({ ...shipping, city: e.target.value })
          }
        />

        <input
          placeholder="Phone Number"
          onChange={(e) =>
            setShipping({ ...shipping, phone: e.target.value })
          }
        />

      </div>

      {/* Order Summary */}

      <div className="order-summary">

        <h3>Order Summary</h3>

        {cartItems.map((item) => (

          <div key={item.productId._id} className="summary-item">

            <span>{item.productId.title}</span>

            <span>
              ₦{item.productId.price} x {item.quantity}
            </span>

          </div>

        ))}

        <h2>Total: ₦{total}</h2>

        <button
          className="payment-btn"
          onClick={handlePayment}
        >
          Continue to Payment
        </button>

      </div>

    </div>

  );

}

export default Checkout;
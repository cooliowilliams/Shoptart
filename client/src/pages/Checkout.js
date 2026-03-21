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
      .get(`https://shoptart-backend.onrender.com/api/users/cart/${user.userId}`)
      .then((res) => {
        console.log("CHECKOUT CART DATA:", res.data);
        setCartItems(res.data);
      })
      .catch((err) => console.log(err));
  }, [user]);

  const validCartItems = cartItems.filter((item) => item?.productId);

  const total = validCartItems.reduce(
    (sum, item) =>
      sum +
      Number(item?.productId?.price || 0) * Number(item?.quantity || 1),
    0
  );

  const handlePayment = () => {
    navigate("/payment", {
      state: { cartItems: validCartItems, total, shipping }
    });
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>

      <div className="shipping-box">
        <h3>Shipping Information</h3>

        <input
          placeholder="Address"
          value={shipping.address}
          onChange={(e) =>
            setShipping({ ...shipping, address: e.target.value })
          }
        />

        <input
          placeholder="City"
          value={shipping.city}
          onChange={(e) =>
            setShipping({ ...shipping, city: e.target.value })
          }
        />

        <input
          placeholder="Phone Number"
          value={shipping.phone}
          onChange={(e) =>
            setShipping({ ...shipping, phone: e.target.value })
          }
        />
      </div>

      <div className="order-summary">
        <h3>Order Summary</h3>

        {validCartItems.length > 0 ? (
          validCartItems.map((item, index) => (
            <div key={item?.productId?._id || index} className="summary-item">
              <span>{item?.productId?.title || "Product"}</span>
              <span>
                ₦{Number(item?.productId?.price || 0)} x {Number(item?.quantity || 1)}
              </span>
            </div>
          ))
        ) : (
          <p>Your cart is empty.</p>
        )}

        <h2>Total: ₦{total}</h2>

        <button
          className="payment-btn"
          onClick={handlePayment}
          disabled={validCartItems.length === 0 || total <= 0}
        >
          Continue to Payment
        </button>
      </div>
    </div>
  );
}

export default Checkout;
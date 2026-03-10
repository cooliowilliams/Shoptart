import { useLocation, useNavigate } from "react-router-dom";
import { PaystackButton } from "react-paystack";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "./Payment.css";

function Payment() {

  const { user } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const { cartItems, total, shipping } = location.state || {};

  if (!cartItems) {
    return <h2 className="payment-error">No order found</h2>;
  }

  const publicKey = "pk_test_6a00c429e9686e013c7caa9b50a37b403bd505f3";

  const componentProps = {
    email: user.email,
    amount: total * 100,
    metadata: {
      name: user.name,
      phone: shipping.phone,
    },
    publicKey,
    text: "Pay Now",
    onSuccess: () => {
      alert("Payment Successful!");
      navigate("/order-success");
    },
    onClose: () => alert("Payment cancelled"),
  };

  return (
    <div className="payment-container">

      <h1 className="checkout-title">Checkout</h1>

      <div className="checkout-grid">

        {/* Order Summary */}
        <div className="order-summary">

          <h2>Order Summary</h2>

          {cartItems.map((item) => (
            <div key={item.productId._id} className="order-item">

              <img
                src={item.productId.image}
                alt={item.productId.title}
              />

              <div>
                <h4>{item.productId.title}</h4>
                <p>₦{item.productId.price}</p>
                <p>Qty: {item.quantity}</p>
              </div>

            </div>
          ))}

        </div>

        {/* Payment Section */}
        <div className="payment-box">

          <h2>Payment Details</h2>

          <div className="shipping-info">

            <h4>Shipping Address</h4>

            <p>{shipping.address}</p>
            <p>{shipping.city}</p>
            <p>{shipping.phone}</p>

          </div>

          <div className="total-box">

            <h3>Total</h3>
            <h2>₦{total}</h2>

          </div>

          <div className="pay-btn">

            <PaystackButton {...componentProps} />

          <p className="secure-pay">
    🔒 Secure payment powered by Paystack
  </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Payment;
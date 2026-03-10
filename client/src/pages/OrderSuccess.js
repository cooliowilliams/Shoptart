import { Link } from "react-router-dom";
import "./OrderSuccess.css";

function OrderSuccess() {

  return (

    <div className="success-container">

      <div className="success-card">

        <div className="checkmark-circle">
          <div className="checkmark"></div>
        </div>

        <h1>Payment Successful</h1>

        <p>Your order has been placed successfully.</p>

        <Link to="/">
          <button className="continue-btn">
            Continue Shopping
          </button>
        </Link>

      </div>

    </div>

  );

}

export default OrderSuccess;
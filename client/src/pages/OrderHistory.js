import { useEffect, useState } from "react";
import axios from "axios";

function OrderHistory() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {

    axios
      .get("https://shoptart-backend.onrender.com/api/orders/history/123")
      .then((res) => setOrders(res.data));

  }, []);

  return (
    <div className="order-history">

      <h2>Your Orders</h2>

      {orders.map((order) => (

        <div className="order-card" key={order._id}>

          <p>Total: ₦{order.totalAmount}</p>

          <p>Date: {new Date(order.createdAt).toDateString()}</p>

        </div>

      ))}

    </div>
  );
}

export default OrderHistory;
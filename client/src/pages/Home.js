import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";

function Home() {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("https://shoptart-backend.onrender.com/api/products") 
      .then(res => {
        setProducts(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div style={{ padding: "20px", backgroundColor: "#f5f5f5", minHeight: "100vh" }}>

      <h1 style={{ padding: "20px", marginBottom: "30px", color: "#ff0000" }}>Products</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
          padding: "20px"
        }}
      >
        {products.map((p) => (
          <ProductCard key={p._id} product={p} /> // ✅ added key
        ))}
      </div>

    </div>
  );
}

export default Home;
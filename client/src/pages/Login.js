import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {

  const [form, setForm] = useState({ email: "", password: "" });
  
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleSubmit = async e => {

    e.preventDefault();

    try {

      const res = await axios.post(
        "https://shoptart-backend.onrender.com/api/users/login",
        form
      );

      const userData = {
        userId: res.data.userId,
        name: res.data.name,
        email: res.data.email
      };

      console.log("LOGIN RESPONSE:", res.data);

      setUser(userData);

      localStorage.setItem(
        "shoptartUser",
        JSON.stringify(userData)
      );

      navigate("/");

    } catch (err) {

      alert(err.response?.data?.error || "Login failed");

    }

  };

  return (

    <div className="login-page">

      <div className="login-card">

        <h2>Login to ShopTart</h2>

        <form className="login-form" onSubmit={handleSubmit}>

          <input
            type="email"
            placeholder="Email"
            required
            onChange={e =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Password"
            required
            onChange={e =>
              setForm({ ...form, password: e.target.value })
            }
          />

          <button className="login-btn" type="submit">
            Login
          </button>

        </form>

        <p className="signup-link">
          Don't have an account? <span onClick={()=>window.location.href="/signup"}>Signup</span>
        </p>

      </div>

    </div>

  );

}

export default Login;
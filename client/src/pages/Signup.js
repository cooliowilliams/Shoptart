import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

function Signup() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.post(
        "https://shoptart-backend.onrender.com/api/users/signup",
        form
      );

      const userData = {
        userId: res.data.userId,
        name: res.data.name,
        email: res.data.email
      };

      // Save user in context
      setUser(userData);

      // Save user in localStorage
      localStorage.setItem(
        "shoptartUser",
        JSON.stringify(userData)
      );

      alert("Signup successful!");

      navigate("/");

    } catch (err) {

      alert(err.response?.data?.error || "Signup failed");

    }

  };

  return (

    <div className="signup-page">

      <div className="signup-card">

        <h2>Create ShopTart Account</h2>

        <form className="signup-form" onSubmit={handleSubmit}>

          <input
            type="text"
            placeholder="Full Name"
            required
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <input
            type="email"
            placeholder="Email"
            required
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Password"
            required
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          <button className="signup-btn" type="submit">
            Create Account
          </button>

        </form>

        <p className="login-link">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>
            Login
          </span>
        </p>

      </div>

    </div>

  );

}

export default Signup;
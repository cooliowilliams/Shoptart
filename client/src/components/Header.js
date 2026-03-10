import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "./Header.css";

function Header() {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate("/login");
  };

  return (
    <div className="header">

      {/* Logo */}
      <h2 className="logo" onClick={() => navigate("/")}>ShopTart</h2>

      {/* Search Bar */}
      <div className="search-container">
        <input placeholder="Search products" />
        <button className="search-btn">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </div>

      {/* Navigation */}
      <div className="nav-icons">
        <Link to="/" className="nav-link">Home</Link>

        {!user && (
          <>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/signup" className="nav-link">Signup</Link>
          </>
        )}

        {user && (
          <>
            <Link to="/cart" className="nav-link">Cart</Link>
            <span className="nav-link" onClick={handleLogout}>Logout</span>
          </>
        )}
      </div>

    </div>
  );
}

export default Header;
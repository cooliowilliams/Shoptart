import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <h2>ShopTart</h2>
          <p>Your trusted online store for quality products at great prices.</p>
        </div>

        <div className="footer-links">
          <h4>Quick Links</h4>
          <a href="/">Home</a>
          <a href="/products">Products</a>
          <a href="/cart">Cart</a>
          <a href="/login">Login</a>
        </div>

        <div className="footer-contact">
          <h4>Contact</h4>
          <p>Email: support@shoptart.com</p>
          <p>Phone: +234 901 603 1646</p>
          <p>Lagos, Nigeria</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 ShopTart. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
// components/Footer.jsx
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">

        <div className="footer-section">
          <h2 className="footer-title">Contact Us</h2>
          <p><strong>Email:</strong> xxx@gmail.com</p>
          <p><strong>Phone number:</strong> (000) 000-0000</p>
        </div>

        <div className="footer-section">
          <h2 className="footer-title">Social Media</h2>
          <p><strong>Instagram:</strong> xxxxx</p>
          <p><strong>TikTok:</strong> xxx</p>
        </div>

      </div>
    </footer>
  );
}
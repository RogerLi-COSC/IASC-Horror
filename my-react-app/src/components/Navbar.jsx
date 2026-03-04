import { NavLink } from "react-router-dom";
import logo from "../assets/logo2.png";
import "./Navbar.css";

import { useSecretUnlock } from "./SecretUnlockContext";

function FileIcon() {
  // simple “2000s file” SVG (no rounded corners)
  return (
    <svg
      className="secret-file-icon"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        d="M6 2h8l4 4v16H6V2z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M14 2v6h6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M8 12h8M8 15h8M8 18h6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </svg>
  );
}

export default function Navbar() {
  // ✅ session-only unlock state (refresh clears it)
  const { isSecretUnlocked } = useSecretUnlock();

  const linkClass = ({ isActive }) => `navlink ${isActive ? "active" : ""}`;

  return (
    <header className="navbar">
      <div className="navbar-inner">
        {/* Left: logo */}
        <NavLink to="/" className="nav-brand" aria-label="Go to Home">
          <img className="brand-logo" src={logo} alt="Comatose" />
        </NavLink>

        {/* Center: links */}
        <nav aria-label="Primary">
          <ul className="navbar-links">
            <li>
              <NavLink to="/" className={linkClass}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={linkClass}>
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/signup" className={linkClass}>
                Sign Up
              </NavLink>
            </li>
            <li>
              <NavLink to="/tutorial" className={linkClass}>
                Tutorial
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={linkClass}>
                Contact
              </NavLink>
            </li>
            <li>
              <NavLink to="/download" className={linkClass}>
                Download
              </NavLink>
            </li>
            <li>
              <NavLink to="/faq" className={linkClass}>
                FAQ
              </NavLink>
            </li>

            {/* ✅ Secret file icon appears only if unlocked (this session) */}
            {isSecretUnlocked && (
              <li className="secret-file-li">
                <NavLink
                  to="/secret"
                  className={({ isActive }) =>
                    `navlink secret-file-link ${isActive ? "active" : ""}`
                  }
                  title="Open Secret File"
                  aria-label="Open Secret File"
                >
                  <FileIcon />
                </NavLink>
              </li>
            )}
          </ul>
        </nav>

        {/* Right spacer to keep center alignment */}
        <div className="nav-right-spacer" />
      </div>
    </header>
  );
}
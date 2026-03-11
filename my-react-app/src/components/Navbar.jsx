import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../assets/logo2.png";
import "./Navbar.css";

import { useSecretUnlock } from "./SecretUnlockContext";

function FileIcon() {
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
  const { isSecretUnlocked, isSecretTwoUnlocked } = useSecretUnlock();
  const [isSecretMenuOpen, setIsSecretMenuOpen] = useState(false);
  const secretMenuRef = useRef(null);
  const location = useLocation();

  const linkClass = ({ isActive }) => `navlink ${isActive ? "active" : ""}`;
  const isSecretAreaActive =
    location.pathname === "/secret" || location.pathname === "/secret-2";

  useEffect(() => {
    setIsSecretMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    function handleOutsideClick(event) {
      if (
        secretMenuRef.current &&
        !secretMenuRef.current.contains(event.target)
      ) {
        setIsSecretMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("touchstart", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
    };
  }, []);

  function toggleSecretMenu() {
    setIsSecretMenuOpen((prev) => !prev);
  }

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <NavLink to="/" className="nav-brand" aria-label="Go to Home">
          <img className="brand-logo" src={logo} alt="Comatose" />
        </NavLink>

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

            {isSecretUnlocked && (
              <li
                className={`secret-file-li ${isSecretMenuOpen ? "is-open" : ""}`}
                ref={secretMenuRef}
              >
                {!isSecretTwoUnlocked ? (
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
                ) : (
                  <>
                    <button
                      type="button"
                      className={`navlink secret-file-link secret-file-button ${
                        isSecretAreaActive ? "active" : ""
                      }`}
                      title="Open Secret Files"
                      aria-label="Open Secret Files"
                      aria-haspopup="menu"
                      aria-expanded={isSecretMenuOpen}
                      onClick={toggleSecretMenu}
                    >
                      <FileIcon />
                    </button>

                    <div
                      className={`secret-dropdown ${
                        isSecretMenuOpen ? "is-open" : ""
                      }`}
                      role="menu"
                    >
                      <NavLink
                        to="/secret"
                        role="menuitem"
                        className={({ isActive }) =>
                          `secret-dropdown-link ${isActive ? "active" : ""}`
                        }
                        onClick={() => setIsSecretMenuOpen(false)}
                      >
                        Secret Page 01
                      </NavLink>

                      <NavLink
                        to="/secret-2"
                        role="menuitem"
                        className={({ isActive }) =>
                          `secret-dropdown-link ${isActive ? "active" : ""}`
                        }
                        onClick={() => setIsSecretMenuOpen(false)}
                      >
                        Secret Page 02
                      </NavLink>
                    </div>
                  </>
                )}
              </li>
            )}
          </ul>
        </nav>

        <div className="nav-right-spacer" />
      </div>
    </header>
  );
}
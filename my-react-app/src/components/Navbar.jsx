import { useEffect, useMemo, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../assets/logo2.png";
import "./Navbar.css";

import { useSecretUnlock } from "./SecretUnlockContext";

const SECRET_SEEN_COUNT_KEY = "seenSecretPageCount";

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
  const [hasNewSecretGlow, setHasNewSecretGlow] = useState(false);

  const secretMenuRef = useRef(null);
  const location = useLocation();

  const linkClass = ({ isActive }) => `navlink ${isActive ? "active" : ""}`;
  const isSecretAreaActive =
    location.pathname === "/secret" || location.pathname === "/secret-2";

  const unlockedSecretPages = useMemo(
    () => [
      ...(isSecretUnlocked ? [{ to: "/secret", label: "Secret Page 01" }] : []),
      ...(isSecretTwoUnlocked
        ? [{ to: "/secret-2", label: "Secret Page 02" }]
        : []),
    ],
    [isSecretUnlocked, isSecretTwoUnlocked]
  );

  const unlockedSecretCount = unlockedSecretPages.length;

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

  useEffect(() => {
    const seenCount = Number(localStorage.getItem(SECRET_SEEN_COUNT_KEY) || "0");
    setHasNewSecretGlow(unlockedSecretCount > seenCount);
  }, [unlockedSecretCount]);

  function clearSecretGlow() {
    localStorage.setItem(SECRET_SEEN_COUNT_KEY, String(unlockedSecretCount));
    setHasNewSecretGlow(false);
  }

  function toggleSecretMenu() {
    setIsSecretMenuOpen((prev) => {
      const next = !prev;

      if (next) {
        clearSecretGlow();
      }

      return next;
    });
  }

  return (
    <>
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
                <NavLink to="/download" className={linkClass}>
                  Download
                </NavLink>
              </li>
              <li>
                <NavLink to="/tutorial" className={linkClass}>
                  Tutorial
                </NavLink>
              </li>
              <li>
                <NavLink to="/signup" className={linkClass}>
                  Sign up
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" className={linkClass}>
                  Contact
                </NavLink>
              </li>
              <li>
                <NavLink to="/faq" className={linkClass}>
                  FAQ
                </NavLink>
              </li>
            </ul>
          </nav>

          <div className="nav-right-spacer" />
        </div>
      </header>

      {isSecretUnlocked && (
        <div
          className={`secret-fab-wrap ${isSecretMenuOpen ? "is-open" : ""}`}
          ref={secretMenuRef}
        >
          <div
            className={`secret-fab-dropdown ${
              isSecretMenuOpen ? "is-open" : ""
            }`}
            role="menu"
            aria-label="Unlocked secret pages"
          >
            <div className="secret-fab-dropdown-label">Unlocked Files</div>

            {unlockedSecretPages.map((page) => (
              <NavLink
                key={page.to}
                to={page.to}
                role="menuitem"
                className={({ isActive }) =>
                  `secret-fab-link ${isActive ? "active" : ""}`
                }
                onClick={() => {
                  setIsSecretMenuOpen(false);
                  clearSecretGlow();
                }}
              >
                {page.label}
              </NavLink>
            ))}
          </div>

          <button
            type="button"
            className={`secret-fab-button ${
              isSecretMenuOpen || isSecretAreaActive ? "active" : ""
            } ${hasNewSecretGlow ? "has-new-secret" : ""}`}
            title="Open Secret Files"
            aria-label="Open Secret Files"
            aria-haspopup="menu"
            aria-expanded={isSecretMenuOpen}
            onClick={toggleSecretMenu}
          >
            <FileIcon />
          </button>
        </div>
      )}
    </>
  );
}
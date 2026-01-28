import "./Navbar.css";
import { usePageTransition } from "./TransitionProvider";
import logo from "../assets/logo2.png";

export default function Navbar() {
  const { go } = usePageTransition();

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <button className="nav-brand" onClick={() => go("/")}>
          <img className="brand-logo" src={logo} alt="Comatose logo" />
        </button>

        <ul className="navbar-links">
          <li><button onClick={() => go("/")}>Home</button></li>
          <li><button onClick={() => go("/about")}>About</button></li>
          <li><button onClick={() => go("/signup")}>Sign Up</button></li>
          <li><button onClick={() => go("/tutorial")}>Tutorial</button></li>
          <li><button onClick={() => go("/contact")}>Contact</button></li>
          <li><button onClick={() => go("/download")}>Download</button></li>
        </ul>

        <div />
      </div>
    </nav>
  );
}

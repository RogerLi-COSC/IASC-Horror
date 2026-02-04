import logo from "../assets/logo2.png";
// import animated_logo from "../assets/animated-logo.gif";

import p1 from "../assets/puzzle1.png";
import p2 from "../assets/puzzle2.png";
import p3 from "../assets/puzzle3.png";
import p4 from "../assets/puzzle4.png";

import MiniGame from "../components/MiniGame";
import "./Home.css";

export default function Home() {
  return (
    <main className="home">
      <section className="home-hero">
        <img className="home-logo" src={logo} alt="Comatose" />
        <p className="home-tagline">The nightmare hasn’t ended.</p>
      </section>

      <section className="home-minigame">
        {/* Keeps your section title */}
        <h2 className="home-minigame-title">Mini Game</h2>

        {/* Replace placeholder with real mini game */}
        <MiniGame
          images={[p4, p3, p1, p2]}      // puzzles 1-4
          requiredOrder={[1, 2, 2, 3, 3, 3, 4]}   // click order (change later if needed)
          unlockPath="/secret"
        />
      </section>
    </main>
  );
}
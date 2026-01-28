import logo from "../assets/logo2.png";
import "./Home.css";

export default function Home() {
  return (
    <main className="home">
      <section className="home-hero">
        <img className="home-logo" src={logo} alt="Comatose" />
        <p className="home-tagline">The nightmare hasn’t ended.</p>
      </section>

      <section className="home-minigame">
        <h2 className="home-minigame-title">Mini Game</h2>
        <div className="minigame-frame">
          {/* Replace this with your mini-game later */}
          <p className="minigame-placeholder">
            [ Mini game goes here ]<br />
            (canvas / puzzle / four-image rotate secret)
          </p>
        </div>
      </section>
    </main>
  );
}

import { useState } from "react";
import animated_logo from "../assets/Logo_Comatose.gif";

import p1 from "../assets/puzzle1.png";
import p2 from "../assets/puzzle2.png";
import p3 from "../assets/puzzle3.png";
import p4 from "../assets/puzzle4.png";

import MiniGame from "../components/MiniGame";
import "./Home.css";

export default function Home() {
  const [gifStartMs, setGifStartMs] = useState(0);

  return (
    <main className="home">
      <section className="home-hero">
        <img
          className="home-logo"
          src={animated_logo}
          alt="Comatose"
          onLoad={() => setGifStartMs(Date.now())}
        />
        <p className="home-tagline">The nightmare hasn’t ended.</p>
      </section>

      <section className="home-minigame">
        <MiniGame
          images={[p4, p3, p1, p2]}
          requiredOrder={[1, 2, 2, 3, 3, 3, 4]}
          unlockPath="/secret"
          gifStartMs={gifStartMs}
        />
      </section>
    </main>
  );
}
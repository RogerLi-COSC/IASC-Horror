import "./About.css";

import newspaperImg from "../assets/Newspaper.png";
import room1Img from "../assets/Room1.png";
import room2Img from "../assets/Room2.png";
import room3Img from "../assets/Room3.png";

export default function About() {
  return (
    <main className="about">
      <section className="about-wrap">
        <h1 className="about-title">About Comatose</h1>

        {/* Top description */}
        <div className="about-text">
          <p>
            <strong>Comatose</strong> is an escape room style puzzle game that plunges players into a surreal
            and unsettling journey through the mind of its protagonist. Trapped in a fractured dreamscape,
            players must think their way through puzzle-filled rooms—each one a step closer to uncovering
            the truth and waking up.
          </p>

          <p>
            The experience kicks off with a cinematic opening designed to draw players into the story and
            heighten emotional engagement. Early puzzles keep the intensity low, allowing time to explore,
            spot clues, and understand the rules of the nightmare.
          </p>

          <p>
            As the game progresses, the rooms ramp up in difficulty. New obstacles—like time limits and
            environmental hindrances—raise the stakes. Tension builds naturally as players push deeper,
            with the experience shifting depending on familiarity with puzzle logic, personal fears, and
            emotional investment in the narrative.
          </p>
        </div>

        {/* Side-by-side newspaper + rooms */}
        <section className="about-media-grid">
          <div className="newspaper-container">
            <img src={newspaperImg} alt="Newspaper screenshot" className="newspaper-img" />
          </div>

          <div className="rooms-container">
            <div className="media-card">
              <img className="media-photo" src={room1Img} alt="Room 1" />
              <div className="media-label">Room 1</div>
            </div>

            <div className="media-card">
              <img className="media-photo" src={room2Img} alt="Room 2" />
              <div className="media-label">Room 2</div>
            </div>

            <div className="media-card">
              <img className="media-photo" src={room3Img} alt="Room 3" />
              <div className="media-label">Room 3</div>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
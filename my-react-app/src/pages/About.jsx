import "./About.css";

import room1Img from "../assets/Room1.png";
import room2Img from "../assets/Room2.png";

export default function About() {
  return (
    <main className="about">
      <section className="about-wrap">
        <h1 className="about-title">About Comatose</h1>

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

        <div className="about-grid">
          <article className="news-card">
            <div className="news-header">Haliford News</div>

            <div className="news-subnav">
              <span>NEWS</span>
              <span>WORLD</span>
              <span>EDUCATION</span>
              <span>BUSINESS</span>
              <span>HEALTH</span>
              <span>TRAVEL</span>
            </div>

            <div className="news-body">
              <p className="news-lede">
                <strong>An update on the case of the missing teenagers.</strong>
              </p>

              <p>
                Late last night, the Haliford Police Department received a cryptic telephone call from an
                unknown number. The call ended before officers could trace it, but a distorted voice
                claimed it had possession of missing children.
              </p>

              <p>
                Shortly after, a delivery driver arrived with a mysterious parcel. Inside: six six-sided
                dice—made of bloodied teeth encased in resin. The parcel also contained an invitation:
                <em> “Let’s play. The Gamemaster.”</em>
              </p>

              <p>
                Search efforts have doubled. Citizens are urged to travel in pairs and keep children close.
                Parents are advised to walk their children to and from school, no matter the age.
              </p>

              <p>
                Officials have issued a statement this morning and put into place a curfew, requiring
                citizens to be indoors by 8PM each evening unless due to extenuating circumstances.
              </p>

              <p className="news-signoff">
                We, your faithful news team, will continue to cover any updates as they come out.
              </p>
            </div>
          </article>

          <section className="media-stack" aria-label="Rooms">
            <div className="media-card">
              <img className="media-photo" src={room1Img} alt="Room 1" />
              <div className="media-label">Room 1</div>
            </div>

            <div className="media-card">
              <img className="media-photo" src={room2Img} alt="Room 2" />
              <div className="media-label">Room 2</div>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}

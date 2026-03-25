import "./Contact.css";
import Lauren from "../assets/profiles/Lauren.jpg";
import Megan from "../assets/profiles/Megan.jpg";
import Danielle from "../assets/profiles/Danielle.jpg";
import Kylan from "../assets/profiles/Kylan.jpg";
import Mo from "../assets/profiles/Mo.jpg";
import Roger from "../assets/profiles/Roger.jpg";
import Tomas from "../assets/profiles/Tomas.jpg";
import Dimple from "../assets/profiles/Dimple.jpg";

import Yael from "../assets/profiles/Yael.jpg";
import Matteo from "../assets/profiles/Matteo.jpg";
import Amelia from "../assets/profiles/Amelia.jpg";
import Julia from "../assets/profiles/Julia.jpg";
import Noah from "../assets/profiles/Noah.jpg";
import Stanlee from "../assets/profiles/Stanlee.jpg";

const gameTeam = [
  { name: "Ya’el Lederman", role: "Narrative Lead / Audio Designer", title: "Game Team", img: Yael },
  { name: "Carter Sentance", role: "3D Artist / Designer", title: "Game Team", img: null },
  { name: "Julia Book", role: "Audio Lead / Narrative Team", title: "Game Team", img: Julia },
  { name: "Abdullah Sheikh", role: "3D Artist / Programmer", title: "Game Team", img: null },
  { name: "Ekraj Singh Narang", role: "3D Artist / Audio Designer", title: "Game Team", img: null },
  { name: "Cadence Delia", role: "3D Artist / Programmer", title: "Game Team", img: null },
  { name: "Noah Serpa", role: "Art Lead / Programmer", title: "Game Team", img: Noah },
  { name: "Grayson Lambert", role: "3D Artist / Programmer", title: "Game Team", img: null },
  { name: "Amelia Gordon", role: "Character Artist / Concept Artist", title: "Game Team", img: Amelia },
  { name: "Stanlee Castaneda", role: "3D Artist / Programmer", title: "Game Team", img: Stanlee },
  { name: "Matteo Monteleone", role: "Tech Lead / Design Lead", title: "Game Team", img: Matteo }
];

const webTeam = [
  { name: "Lauren Berlettano", role: "Design, Marketing, & Management", title: "Web Team", img: Lauren },
  { name: "Dimple Mistry", role: "Design & Coding", title: "Web Team", img: Dimple },
  { name: "Tomas Galvez", role: "Design & Management", title: "Web Team", img: Tomas },
  { name: "Danielle Clapiz", role: "Design & Coding", title: "Web Team", img: Danielle },
  { name: "Kylie Schipper", role: "Design & Marketing", title: "Web Team", img: null },
  { name: "Roger Li", role: "Coding", title: "Web Team", img: Roger },
  { name: "Megan Smith", role: "Design & Marketing", title: "Web Team", img: Megan },
  { name: "Moztabir Islam", role: "Coding", title: "Web Team", img: Mo },
  { name: "Kylan Joint", role: "Video Production & Marketing", title: "Web Team", img: Kylan },
];

function PhotoSlot({ img, name }) {
  return (
    <div className="contact-photo-slot">
      <div className="contact-photo-inner">
        {img && (
          <img
            src={img}
            alt={name}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        )}
      </div>
    </div>
  );
}

function MemberCard({ name, role, title, img }) {
  return (
    <article className="member-card">
      <PhotoSlot img={img} name={name} />
      <div className="member-info">
        <div className="member-row">
          <span className="member-label">Name</span>
          <div className="member-value member-name">{name}</div>
        </div>
        <div className="member-row">
          <span className="member-label">Role</span>
          <div className="member-value member-role">{role}</div>
        </div>
        <div className="member-row">
          <span className="member-label">Division</span>
          <div className="member-value member-division">{title}</div>
        </div>
      </div>
    </article>
  );
}

function TeamSection({ heading, subheading, members }) {
  return (
    <section className="contact-section">
      <div className="contact-section-bar">{heading}</div>
      <p className="contact-section-subtext">{subheading}</p>

      <div className="member-grid">
        {members.map((member) => (
          <MemberCard key={`${heading}-${member.name}`} {...member} />
        ))}
      </div>
    </section>
  );
}

export default function Contact() {
  return (
    <main className="contact-page">
      <section className="contact-sheet">
        <header className="contact-header">
          <div className="contact-stamp">ARCHIVED STAFF FILE</div>

          <div className="contact-title">PROJECT CONTACT DIRECTORY</div>

          <div className="contact-disclaimer">
            <span className="contact-disclaimer-label">Notice:</span>
            <span className="contact-disclaimer-text">
              This page contains the listed contributors behind the game and website
              presentation. Designed in a haunted dossier style.
            </span>
          </div>

          <p className="contact-intro">
            Browse the people behind the horror project. This layout keeps the
            eerie record-file look while making team names, roles, and profile
            spaces easier to scan and read.
          </p>
        </header>

        <TeamSection
          heading="GAME DEVELOPMENT TEAM"
          subheading="Core contributors involved in art, audio, design, narrative, and programming for the game."
          members={gameTeam}
        />

        <div className="contact-divider" aria-hidden="true" />

        <TeamSection
          heading="WEB DEVELOPMENT TEAM"
          subheading="Contributors responsible for design, marketing, coding, management, and presentation."
          members={webTeam}
        />
      </section>
    </main>
  );
}
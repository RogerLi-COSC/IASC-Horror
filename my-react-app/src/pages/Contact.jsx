import "./Contact.css";

const gameTeam = [
  { name: "Ya’el Lederman", role: "Narrative Lead / Audio Designer", title: "Game Team" },
  { name: "Carter Sentance", role: "3D Artist / Designer", title: "Game Team" },
  { name: "Julia Book", role: "Audio Lead / Narrative Team", title: "Game Team" },
  { name: "Abdullah Sheikh", role: "3D Artist / Programmer", title: "Game Team" },
  { name: "Ekraj Singh Narang", role: "3D Artist / Audio Designer", title: "Game Team" },
  { name: "Cadence Delia", role: "3D Artist / Programmer", title: "Game Team" },
  { name: "Noah Serpa", role: "Art Lead / Programmer", title: "Game Team" },
  { name: "Grayson Lambert", role: "3D Artist / Programmer", title: "Game Team" },
  { name: "Amelia Gordon", role: "Character Artist / Concept Artist", title: "Game Team" },
  { name: "Stanlee Castaneda", role: "3D Artist / Programmer", title: "Game Team" },
  { name: "Matteo Monteleone", role: "Tech Lead / Design Lead", title: "Game Team" }
];

const webTeam = [
  { name: "Lauren Berlettano", role: "Design, Marketing, & Management", title: "Web Team" },
  { name: "Dimple Mistry", role: "Design & Coding", title: "Web Team" },
  { name: "Tomas Galvez", role: "Design & Management", title: "Web Team" },
  { name: "Danielle Clapiz", role: "Design & Coding", title: "Web Team" },
  { name: "Kylie Schipper", role: "Design & Marketing", title: "Web Team" },
  { name: "Roger Li", role: "Coding", title: "Web Team" },
  { name: "Megan Smith", role: "Design & Marketing", title: "Web Team" },
  { name: "Moztabir Islam", role: "Coding", title: "Web Team" },
  { name: "Kylan Joint", role: "Video Production & Marketing", title: "Web Team" },
];

function PhotoSlot({ name }) {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  return (
    <div className="contact-photo-slot" aria-label={`${name} profile placeholder`}>
      <div className="contact-photo-inner">{initials}</div>
      <div className="contact-photo-caption">PHOTO</div>
    </div>
  );
}

function MemberCard({ name, role, title }) {
  return (
    <article className="member-card">
      <PhotoSlot name={name} />

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
              presentation. Designed in an archived patient-record style.
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

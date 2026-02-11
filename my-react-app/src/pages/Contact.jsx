import "./Contact.css";

const gameTeam = [
  { name: "Noah Serpa", role: "ART LEAD / PROGRAMMER" },
  { name: "Ya’el Lederman", role: "NARRATIVE LEAD / AUDIO DESIGNER" },
  { name: "Julia Book", role: "AUDIO LEAD / NARRATIVE TEAM" },
  { name: "Stanlee Castaneda", role: "3D ARTIST / PROGRAMMER" },
  { name: "Matteo Monteleone", role: "TECH LEAD / DESIGN LEAD" },
  { name: "Grayson Lambert", role: "3D ARTIST / PROGRAMMER" },
  { name: "Carter Sentance", role: "3D ARTIST / DESIGNER" },
  { name: "Abdullah Sheikh", role: "3D ARTIST / PROGRAMMER" },
  { name: "Amelia Gordon", role: "CHARACTER ARTIST / CONCEPT ARTIST" },
  { name: "Ekraj Singh Narang", role: "3D ARTIST / AUDIO DESIGNER" },
  { name: "Cadence Delia", role: "3D ARTIST / PROGRAMMER" },
];

const webTeam = [
  { name: "Megan Smith", role: "DESIGN & MARKETING" },
  { name: "Lauren Berlettano", role: "DESIGN, MARKETING, & MANAGEMENT" },
  { name: "Kylan Joint", role: "VIDEO PRODUCTION & MARKETING" },
  { name: "Kylie Schipper", role: "DESIGN & MARKETING" },
  { name: "Tomas Galvez", role: "DESIGN & MANAGEMENT" },
  { name: "Roger Li", role: "CODING" },
  { name: "Dimple Mistry", role: "DESIGN" },
  { name: "Danielle Clapiz", role: "DESIGN & CODING" },
  { name: "Moztabir Islam", role: "CODING" },
];

function Avatar({ seed }) {
  // Simple placeholder avatar circle with initials
  const initials = seed
    .split(" ")
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");

  return <div className="avatar">{initials}</div>;
}

function Member({ name, role }) {
  return (
    <div className="member">
      <Avatar seed={name} />
      <div className="member-text">
        <div className="member-name">
          <span className="label">Name:</span> {name}
        </div>
        <div className="member-role">
          <span className="label">Role:</span> {role}
        </div>
      </div>
    </div>
  );
}

function TeamSection({ title, left, right }) {
  return (
    <section className="team-section">
      <div className="team-grid">
        <div className="team-col">
          {left.map((p) => (
            <Member key={p.name} {...p} />
          ))}
        </div>

        <div className="team-center">
          <div className="team-oval">
            {title.split(" ").map((w, i) => (
              <div key={i}>{w}</div>
            ))}
          </div>
        </div>

        <div className="team-col">
          {right.map((p) => (
            <Member key={p.name} {...p} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Contact() {
  // split arrays into left/right columns to mimic the design
  const split = (arr) => {
    const mid = Math.ceil(arr.length / 2);
    return [arr.slice(0, mid), arr.slice(mid)];
  };

  const [gameLeft, gameRight] = split(gameTeam);
  const [webLeft, webRight] = split(webTeam);

  return (
    <main className="contact-page">
      <div className="contact-paper">
        <TeamSection title="Meet Game the Team" left={gameLeft} right={gameRight} />

        <div className="blood-divider" aria-hidden="true" />

        <TeamSection title="Meet the Web Team" left={webLeft} right={webRight} />

      </div>
    </main>
  );
}

import "./Secret.css";

export default function Secret() {
  return (
    <main className="secret-page">
      <div className="secret-card">
        <h1>YOU FOUND IT.</h1>
        <p>
          <br />
          <span className="secret-sub">A new fear has noticed you.</span>
        </p>
        <div className="secret-box">
          {/* [ secret content goes here ] */}
          <section>
            <h1>Haliford town Storyline</h1>
            <p>Haliford was once a quiet lakeside town in the early 2000s ; the kind of place where everyone knew each other and nothing ever happened.</p>
            <p>Until it did.</p>
            <p>In 2003, Haliford General Hospital partially shut down after a fire in the psychiatric wing. Official reports blamed faulty wiring. Unofficially, locals whispered about screaming that lasted long after the alarms stopped.</p>
            <p>Soon after the fire, teenagers began disappearing, search parties found nothing, police reports were quietly closed, and the hospital's lower level was permanently sealed. </p>
          </section>
        </div>
      </div>
    </main>
  );
}
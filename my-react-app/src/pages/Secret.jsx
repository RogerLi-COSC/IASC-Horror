import "./Secret.css";

export default function Secret() {
  return (
    <main className="secret-page">
      <div className="secret-card">
        <h1>YOU FOUND IT.</h1>
        <p>
          The room shifts. The air tastes like iron.
          <br />
          <span className="secret-sub">A new fear has noticed you.</span>
        </p>

        <div className="secret-box">
          [ secret content goes here ]
        </div>
      </div>
    </main>
  );
}
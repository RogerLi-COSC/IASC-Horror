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
          {/* [ secret content goes here ] */}
          <section>
            <ul>
              <li><h1>OMAR KUTAY</h1></li>
              <li><p>Age: 17</p></li>
              <li><p>Height: 6'1</p></li>
              <li><p>Description: Plays on river fork high football team, Jock</p></li>
            </ul>
          </section>
          <section>
            <ul>
              <li><h1>LOGAN SANDERS</h1></li>
              <li><p>Age: 16</p></li>
              <li><p>Height: 5'8</p></li>
              <li><p>Description: Wears glasses, suspenders, stripped t-shirt</p></li>
            </ul>
          </section>
          <section>
            <ul>
              <li><h1>SASHA COWEN</h1></li>
              <li><p>Age: 17</p></li>
              <li><p>Height: 5'5</p></li>
              <li><p>Description: The writer, pencil on hand, smart</p></li>
            </ul>
          </section>
          <section>
            <ul>
              <li><h1>ZOEY MALANO</h1></li>
              <li><p>Age: 17</p></li>
              <li><p>Height: 5'6</p></li>
              <li><p>Description: Popular, Dating Omar, Only cares about herself</p></li>
            </ul>
          </section>
          <section>
            <ul>
              <li><h1>NOAH DHAVALE</h1></li>
              <li><p>Age: 17</p></li>
              <li><p>Height: 5'11</p></li>
              <li><p>Description: Class clown, Drug addict, Dark clothing</p></li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
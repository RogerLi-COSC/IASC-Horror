import "./Secret.css";
import WordSearchMiniGame from "../components/WordSearchMiniGame";

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

        <div className="secret-box secret-cast">
          <section>
            <div>
              <img src="" alt="" />
            </div>
            <ul>
              <li><h1>OMAR KUTAY</h1></li>
              <li><p>Age: 17</p></li>
              <li><p>Height: 6&apos;1</p></li>
              <li><p>Description: Plays on River Fork High football team, jock.</p></li>
            </ul>
          </section>

          <section>
            <ul>
              <li><h1>LOGAN SANDERS</h1></li>
              <li><p>Age: 16</p></li>
              <li><p>Height: 5&apos;8</p></li>
              <li><p>Description: Wears glasses, suspenders, striped t-shirt.</p></li>
            </ul>
          </section>

          <section>
            <ul>
              <li><h1>SASHA COWEN</h1></li>
              <li><p>Age: 17</p></li>
              <li><p>Height: 5&apos;5</p></li>
              <li><p>Description: The writer. Pencil on hand. Too smart for comfort.</p></li>
            </ul>
          </section>

          <section>
            <ul>
              <li><h1>ZOEY MALANO</h1></li>
              <li><p>Age: 17</p></li>
              <li><p>Height: 5&apos;6</p></li>
              <li><p>Description: Popular, dating Omar, only cares about herself.</p></li>
            </ul>
          </section>

          <section>
            <ul>
              <li><h1>NOAH DHAVALE</h1></li>
              <li><p>Age: 17</p></li>
              <li><p>Height: 5&apos;11</p></li>
              <li><p>Description: Class clown, drug addict, dark clothing.</p></li>
            </ul>
          </section>
        </div>

        <WordSearchMiniGame unlockPath="/secret-2" />
      </div>
    </main>
  );
}
import "./Secret.css";
import WordSearchMiniGame from "../components/WordSearchMiniGame";
import Omar from "../assets/OmarKutay.png";
import Logan from "../assets/LoganSaunders.png";
import Sasha from "../assets/SashaCowen.png";
import Zoey from "../assets/ZoeyMalano.png";
import Noah from "../assets/NoahDhavale.png";

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
            <div className="card">
              <img src={Omar} alt="Profile" />
              <ul>
                <li><h1>OMAR KUTAY</h1></li>
                <li><p><strong>Age:</strong> 17</p></li>
                <li><p><strong>Height:</strong> 6&apos;1</p></li>
                <li><p><strong>Description:</strong> Plays on River Fork High football team, jock.</p></li>
              </ul>
            </div>
          </section>

          <section>
            <div className="card">
              <img src={Logan} alt="Profile" />
              <ul>
                <li><h1>LOGAN SANDERS</h1></li>
                <li><p><strong>Age:</strong> 16</p></li>
                <li><p><strong>Height:</strong> 5&apos;8</p></li>
                <li><p><strong>Description:</strong> Wears glasses, suspenders, striped t-shirt.</p></li>
              </ul>
            </div>
          </section>

          <section>
            <div className="card">
              <img src={Sasha} alt="Profile" />            
              <ul>
                <li><h1>SASHA COWEN</h1></li>
                <li><p><strong>Age:</strong> 17</p></li>
                <li><p><strong>Height:</strong> 5&apos;5</p></li>
                <li><p><strong>Description:</strong> The writer. Pencil on hand. Too smart for comfort.</p></li>
              </ul>
            </div>
          </section>

          <section>
            <div className="card">
              <img src={Zoey} alt="Profile" /> 
              <ul>
                <li><h1>ZOEY MALANO</h1></li>
                <li><p><strong>Age:</strong> 17</p></li>
                <li><p><strong>Height:</strong> 5&apos;6</p></li>
                <li><p><strong>Description:</strong> Popular, dating Omar, only cares about herself.</p></li>
              </ul>
            </div>
          </section>

          <section>
            <div className="card">
              <img src={Noah} alt="Profile" />
              <ul>
                <li><h1>NOAH DHAVALE</h1></li>
                <li><p><strong>Age:</strong> 17</p></li>
                <li><p><strong>Height:</strong> 5&apos;11</p></li>
                <li><p><strong>Description:</strong> Class clown, drug addict, dark clothing.</p></li>
              </ul>
            </div>
          </section>
        </div>

        <WordSearchMiniGame unlockPath="/secret-2" />
      </div>
    </main>
  );
}
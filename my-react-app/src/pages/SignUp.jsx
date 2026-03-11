import { useState } from "react";
import "./SignUp.css";

const horrorInterests = [
  "Psychological horror",
  "Body horror",
  "Lore + secret pages",
  "Puzzle minigames",
  "Creature design",
  "Soundtrack drops",
  "Dev updates",
  "Demo / release alerts",
];

export default function SignUp() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    alias: "",
    email: "",
    ageRange: "",
    region: "",
    frequency: "",
    playedBefore: "",
    fearLevel: "",
    interests: [],
    note: "",
  });

  function update(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function toggleInterest(item) {
    setForm((prev) => ({
      ...prev,
      interests: prev.interests.includes(item)
        ? prev.interests.filter((interest) => interest !== item)
        : [...prev.interests, item],
    }));
  }

  function onSubmit(e) {
    e.preventDefault();
    alert("Newsletter intake received. No information was saved.");
  }

  return (
    <main className="signup">
      <section className="sheet">
        <header className="sheet-header">
          <div className="sheet-stamp">ARCHIVE 2003</div>
          <div className="sheet-title">PATIENT NEWSLETTER INTAKE</div>

          <div className="sheet-disclaimer">
            <div className="disclaimer-label">Notice:</div>
            <div className="disclaimer-text">
              Fill out this intake sheet to receive updates, secrets, and nightmare
              transmissions related to the game. No information is being saved.
            </div>
          </div>

          <p className="sheet-subtext">
            Preferred for fans who want early reveals, hidden clues, atmosphere drops,
            and horror-themed news from the project.
          </p>
        </header>

        <form className="sheet-form" onSubmit={onSubmit}>
          <div className="section-bar">RECIPIENT DETAILS</div>

          <div className="grid">
            <label className="field">
              <span className="field-label">First Name:</span>
              <input
                value={form.firstName}
                onChange={(e) => update("firstName", e.target.value)}
                className="line-input"
                type="text"
                autoComplete="off"
              />
            </label>

            <label className="field">
              <span className="field-label">Last Name:</span>
              <input
                value={form.lastName}
                onChange={(e) => update("lastName", e.target.value)}
                className="line-input"
                type="text"
                autoComplete="off"
              />
            </label>

            <label className="field">
              <span className="field-label">Preferred Alias:</span>
              <input
                value={form.alias}
                onChange={(e) => update("alias", e.target.value)}
                className="line-input"
                type="text"
                placeholder="Optional"
                autoComplete="off"
              />
            </label>

            <label className="field">
              <span className="field-label">E-mail:</span>
              <input
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                className="line-input"
                type="email"
                placeholder="you@example.com"
                autoComplete="off"
              />
            </label>

            <label className="field">
              <span className="field-label">Age Range:</span>
              <select
                value={form.ageRange}
                onChange={(e) => update("ageRange", e.target.value)}
                className="select-line"
              >
                <option value="">Select</option>
                <option value="under18">Under 18</option>
                <option value="18to24">18 - 24</option>
                <option value="25to34">25 - 34</option>
                <option value="35to44">35 - 44</option>
                <option value="45plus">45+</option>
              </select>
            </label>

            <label className="field">
              <span className="field-label">Region:</span>
              <input
                value={form.region}
                onChange={(e) => update("region", e.target.value)}
                className="line-input"
                type="text"
                placeholder="City / Country"
                autoComplete="off"
              />
            </label>
          </div>

          <div className="section-bar">NEWSLETTER PREFERENCES</div>

          <div className="panel">
            <div className="question-block">
              <div className="question-title">How often should the transmissions arrive?</div>
              <div className="checks wrap">
                {["Weekly", "Monthly", "Only major updates"].map((option) => (
                  <label key={option} className="check">
                    <input
                      type="radio"
                      name="frequency"
                      checked={form.frequency === option}
                      onChange={() => update("frequency", option)}
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="question-block">
              <div className="question-title">Have you already played or followed the game?</div>
              <div className="checks wrap">
                {["Yes", "Not yet", "I just found it"].map((option) => (
                  <label key={option} className="check">
                    <input
                      type="radio"
                      name="playedBefore"
                      checked={form.playedBefore === option}
                      onChange={() => update("playedBefore", option)}
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="question-block">
              <div className="question-title">What level of horror are you most interested in?</div>
              <div className="checks wrap">
                {["Uneasy", "Disturbing", "Full nightmare"].map((option) => (
                  <label key={option} className="check">
                    <input
                      type="radio"
                      name="fearLevel"
                      checked={form.fearLevel === option}
                      onChange={() => update("fearLevel", option)}
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="section-bar">HORROR INTEREST PROFILE</div>

          <div className="panel">
            <div className="question-block">
              <div className="question-title">Select the subjects you want featured in the newsletter:</div>
              <div className="interest-grid">
                {horrorInterests.map((item) => (
                  <label key={item} className="check checkbox-check">
                    <input
                      type="checkbox"
                      checked={form.interests.includes(item)}
                      onChange={() => toggleInterest(item)}
                    />
                    <span>{item}</span>
                  </label>
                ))}
              </div>
            </div>

            <label className="note-field">
              <span className="field-label">What kind of horror pulls you in most?</span>
              <textarea
                value={form.note}
                onChange={(e) => update("note", e.target.value)}
                className="note-input"
                rows="4"
                placeholder="Nightmare imagery, hospital settings, hidden lore, dream symbolism, unsettling sound design..."
              />
            </label>
          </div>

          <div className="sheet-footer">
            <button className="submit-btn" type="submit">
              JOIN THE NEWSLETTER
            </button>
            <div className="thanks">THANK YOU FOR ENTERING THE RECORDS.</div>
          </div>
        </form>
      </section>
    </main>
  );
}
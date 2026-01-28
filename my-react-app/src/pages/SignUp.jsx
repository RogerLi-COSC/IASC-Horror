import { useState } from "react";
import "./SignUp.css";

export default function SignUp() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    address: "",
    phone: "",
    email: "",
    playedBefore: "",
  });

  function update(key, value) {
    setForm((p) => ({ ...p, [key]: value }));
  }

  function onSubmit(e) {
    e.preventDefault();
    // no saving: horror “paperwork” vibe
    alert("Form received. No information was saved.");
  }

  const addressOptions = [
    "",
    "12 Haliford Crescent",
    "44 River Fork Lane",
    "9 Curfew Street",
    "301 Ward B Hallway",
    "17 Sleepwalker Ave",
  ];

  const phoneOptions = [
    "",
    "555-0199",
    "555-0137",
    "555-0420",
    "555-0666",
  ];

  const emailOptions = [
    "",
    "patient@halifordhealth.org",
    "intake@wardb.ca",
    "unknown@caller.id",
    "comatose@trial.gov",
  ];

  return (
    <main className="signup">
      <section className="sheet">
        <header className="sheet-header">
          <div className="sheet-title">PATIENT INTAKE FORM</div>

          <div className="sheet-disclaimer">
            <div className="disclaimer-label">Disclaimer:</div>
            <div className="disclaimer-text">
              This form is used to receive information of upcoming information about the game.
              No information is being saved.
            </div>
          </div>
        </header>

        <form className="sheet-form" onSubmit={onSubmit}>
          <div className="section-bar">PATIENT DETAILS</div>

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
              <span className="field-label">Date of Birth:</span>
              <input
                value={form.dob}
                onChange={(e) => update("dob", e.target.value)}
                className="line-input"
                type="text"
                placeholder="dd/mm/yyyy"
                autoComplete="off"
              />
            </label>

            <div className="field">
              <span className="field-label">Gender:</span>
              <div className="checks">
                {["Male", "Female", "Other"].map((g) => (
                  <label key={g} className="check">
                    <input
                      type="radio"
                      name="gender"
                      checked={form.gender === g}
                      onChange={() => update("gender", g)}
                    />
                    <span>{g}</span>
                  </label>
                ))}
              </div>
            </div>

            <label className="field field-wide">
              <span className="field-label">Street Address:</span>
              <select
                className="select-line"
                value={form.address}
                onChange={(e) => update("address", e.target.value)}
              >
                {addressOptions.map((a) => (
                  <option key={a} value={a}>
                    {a === "" ? "Fake Address Names With Dropdown" : a}
                  </option>
                ))}
              </select>
            </label>

            <label className="field">
              <span className="field-label">Phone Number:</span>
              <select
                className="select-line"
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
              >
                {phoneOptions.map((p) => (
                  <option key={p} value={p}>
                    {p === "" ? "Fake Phone #’s With Dropdown" : p}
                  </option>
                ))}
              </select>
            </label>

            <label className="field">
              <span className="field-label">E-mail:</span>
              <select
                className="select-line"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
              >
                {emailOptions.map((em) => (
                  <option key={em} value={em}>
                    {em === "" ? "Fake E-mails With Dropdown" : em}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="section-bar">QUESTIONS</div>

          <div className="question-row">
            <div className="question-text">Have You Played This Game Before?</div>
            <div className="checks">
              {["Yes", "No"].map((ans) => (
                <label key={ans} className="check">
                  <input
                    type="radio"
                    name="playedBefore"
                    checked={form.playedBefore === ans}
                    onChange={() => update("playedBefore", ans)}
                  />
                  <span>{ans}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="sheet-footer">
            <button className="submit-btn" type="submit">
              SUBMIT
            </button>
            <div className="thanks">Thank you for submitting your info!</div>
          </div>
        </form>
      </section>
    </main>
  );
}

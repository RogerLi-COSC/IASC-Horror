import { useMemo, useState } from "react";
import "./FAQ.css";

export default function FAQ() {
  const faqs = useMemo(
  () => [
    {
      q: "Are there hidden secrets in the game?",
      a: "Probably. It's a secret—you have to find out for yourself.",
    },
    {
      q: "How do I download the game?",
      a: "Go to the Download page and press the download button.",
    },
    {
      q: "What is the recommended age for the game?",
      a: "The game is rated Mature due to its horror elements and unsettling atmosphere.",
    },
    {
      q: "Do my choices affect the story?",
      a: "No. The ending is the same regardless of how you play the game.",
    },
  ],
  []
);

  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (i) => setOpenIndex((prev) => (prev === i ? -1 : i));

  return (
    <main className="faq-page">
      <header className="faq-hero">
        <p className="faq-kicker">HELP / SUPPORT</p>
        <h1 className="faq-title">FAQ</h1>
        <p className="faq-subtitle">Quick answers before you step into the dark.</p>
      </header>

      <section className="faq-card" aria-label="Frequently asked questions">
        {faqs.map((item, i) => {
          const isOpen = i === openIndex;
          return (
            <div className={`faq-item ${isOpen ? "is-open" : ""}`} key={item.q}>
              <button
                className="faq-q"
                onClick={() => toggle(i)}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${i}`}
              >
                <span className="faq-q-text">{item.q}</span>
                <span className="faq-icon" aria-hidden="true">
                  {isOpen ? "—" : "+"}
                </span>
              </button>

              <div id={`faq-panel-${i}`} className="faq-a-wrap" role="region" aria-label={item.q}>
                <div className="faq-a">{item.a}</div>
              </div>
            </div>
          );
        })}
      </section>

      <footer className="faq-footer">
        <p>
          Still stuck? Go to the <a className="faq-link" href="/contact">Contact</a> page.
        </p>
      </footer>
    </main>
  );
}
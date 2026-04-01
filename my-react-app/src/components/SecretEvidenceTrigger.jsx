import { useEffect, useRef, useState } from "react";
import evidenceMain from "../assets/evidence2.png";
import evidenceSecond from "../assets/Evidence.png";

const SECRET_PASSWORD = "projectcoma";
const MAX_BUFFER_LENGTH = 30;
const IDLE_RESET_MS = 2500;

export default function SecretEvidenceTrigger() {
  const [isOpen, setIsOpen] = useState(false);
  const bufferRef = useRef("");
  const resetTimerRef = useRef(null);

  useEffect(() => {
    const isTypingField = (target) => {
      if (!target) return false;

      const tag = target.tagName?.toLowerCase();
      return (
        tag === "input" ||
        tag === "textarea" ||
        tag === "select" ||
        target.isContentEditable
      );
    };

    const resetBuffer = () => {
      bufferRef.current = "";
      if (resetTimerRef.current) {
        clearTimeout(resetTimerRef.current);
        resetTimerRef.current = null;
      }
    };

    const startIdleReset = () => {
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
      resetTimerRef.current = setTimeout(() => {
        bufferRef.current = "";
      }, IDLE_RESET_MS);
    };

    const handleKeyDown = (event) => {
      if (isTypingField(event.target)) return;

      if (isOpen) {
        if (event.key === "Escape") {
          setIsOpen(false);
          resetBuffer();
        }
        return;
      }

      if (event.ctrlKey || event.metaKey || event.altKey) return;

      if (event.key === "Backspace") {
        bufferRef.current = bufferRef.current.slice(0, -1);
        startIdleReset();
        return;
      }

      if (event.key.length !== 1) return;

      const nextBuffer = (bufferRef.current + event.key.toLowerCase()).slice(
        -MAX_BUFFER_LENGTH
      );

      bufferRef.current = nextBuffer;
      startIdleReset();

      if (nextBuffer.endsWith(SECRET_PASSWORD)) {
        setIsOpen(true);
        resetBuffer();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    };
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div
          className="secret-evidence-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="secret-evidence-title"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="secret-evidence-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="secret-evidence-close"
              onClick={() => setIsOpen(false)}
              aria-label="Close secret evidence window"
            >
              ×
            </button>

            <div className="secret-evidence-stamp">CONFIDENTIAL</div>

            <p className="secret-evidence-kicker">Recovered archive</p>
            <h2 id="secret-evidence-title">Secret Evidence Log</h2>

            <div className="secret-evidence-section">
              <h3>Contributors</h3>
              <ul>
                <li>
                  <strong>RogerLi-COSC</strong> — Code Backend, Frontend Design, Styling. 10k/11k of the work.
                </li>
              </ul>
            </div>

            <div className="secret-evidence-section">
              <h3>Internal Notes - Github Recorded Evidence</h3>

              <div className="secret-evidence-gallery">
                <figure className="secret-evidence-figure">
                  <img
                    src={evidenceMain}
                    alt="Contribution evidence for ALL ADDITIONS and MAJOR CHANGES by Roger Li"
                  />
                  <figcaption>Contribution evidence for ALL ADDITIONS and MAJOR CHANGES by RogerLi-COSC</figcaption>
                </figure>

                <figure className="secret-evidence-figure">
                  <img
                    src={evidenceSecond}
                    alt="Contribution evidence for Commits"
                  />
                  <figcaption>Contribution evidence for Commits</figcaption>
                </figure>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
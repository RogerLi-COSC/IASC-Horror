import { useEffect, useState } from "react";
import "./Secret-2.css";
import { useSecretUnlock } from "../components/SecretUnlockContext";

import poster1 from "../assets/poster1 (1).png";
import poster2 from "../assets/poster1 (2).png";
import poster3 from "../assets/poster1 (3).png";
import poster4 from "../assets/poster1 (4).png";
import poster5 from "../assets/poster1 (5).png";
import poster6 from "../assets/poster1 (6).png";
import poster7 from "../assets/poster1 (7).png";
import poster8 from "../assets/poster1 (8).png";
import poster9 from "../assets/poster1 (9).png";
import poster10 from "../assets/Poster1.png";
import poster11 from "../assets/Poster2.png";
import poster12 from "../assets/Poster3.png";

export default function SecretTwo() {
  const { unlockSecretTwo } = useSecretUnlock();
  const [activePoster, setActivePoster] = useState(null);

  useEffect(() => {
    unlockSecretTwo();
  }, [unlockSecretTwo]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setActivePoster(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const posters = [
    {
      id: 1,
      title: "Case File 01",
      image: poster1,
      alt: "Poster one",
      slotClass: "story-slot--1",
    },
    {
      id: 2,
      title: "Case File 02",
      image: poster2,
      alt: "Poster two",
      slotClass: "story-slot--2",
    },
    {
      id: 3,
      title: "Case File 03",
      image: poster3,
      alt: "Poster three",
      slotClass: "story-slot--3",
    },
    {
      id: 4,
      title: "Case File 04",
      image: poster4,
      alt: "Poster four",
      slotClass: "story-slot--4",
    },
    {
      id: 5,
      title: "Case File 05",
      image: poster5,
      alt: "Poster five",
      slotClass: "story-slot--5",
    },
    {
      id: 6,
      title: "Case File 06",
      image: poster6,
      alt: "Poster six",
      slotClass: "story-slot--6",
    },
    {
      id: 7,
      title: "Case File 07",
      image: poster7,
      alt: "Poster seven",
      slotClass: "story-slot--7",
    },
    {
      id: 8,
      title: "Case File 08",
      image: poster8,
      alt: "Poster eight",
      slotClass: "story-slot--8",
    },
    {
      id: 9,
      title: "Case File 09",
      image: poster9,
      alt: "Poster nine",
      slotClass: "story-slot--9",
    },
    {
      id: 10,
      title: "Case File 10",
      image: poster10,
      alt: "Poster ten",
      slotClass: "story-slot--10",
    },
    {
      id: 11,
      title: "Case File 11",
      image: poster11,
      alt: "Poster eleven",
      slotClass: "story-slot--11",
    },
    {
      id: 12,
      title: "Case File 12",
      image: poster12,
      alt: "Poster twelve",
      slotClass: "story-slot--12",
    },
  ];

  const openPoster = (poster) => {
    setActivePoster(poster);
  };

  const closePoster = () => {
    setActivePoster(null);
  };

  return (
    <>
      <main className="secret2-page">
        <div className="secret2-shell">
          <header className="secret2-hero">
            <p className="secret2-kicker">Second Secret Page</p>
            <h1 className="secret2-title">Story Board</h1>
            <p className="secret2-subtext">
              Open the files. Piece the nightmare together.
            </p>
          </header>

          <section className="story-board">
            <div className="story-board__strings" aria-hidden="true">
              <span className="string string-1" />
              <span className="string string-2" />
              <span className="string string-3" />
              <span className="string string-4" />
              <span className="string string-5" />
              <span className="string string-6" />
            </div>

            <div className="story-grid">
              {posters.map((poster) => (
                <button
                  key={poster.id}
                  type="button"
                  className={`story-slot ${poster.slotClass}`}
                  onClick={() => openPoster(poster)}
                  aria-label={`Open ${poster.title}`}
                >
                  <span className="story-pin" aria-hidden="true" />
                  <span className="story-tape story-tape--left" aria-hidden="true" />
                  <span className="story-tape story-tape--right" aria-hidden="true" />

                  <span className="story-poster-frame">
                    <img
                      src={poster.image}
                      alt={poster.alt}
                      className="story-poster-image"
                    />
                  </span>
                </button>
              ))}
            </div>
          </section>
        </div>
      </main>

      {activePoster && (
        <div className="poster-modal is-open" onClick={closePoster}>
          <div
            className="poster-modal__backdrop"
            aria-hidden="true"
          />

          <div
            className="poster-modal__content"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={activePoster.title}
          >
            <button
              type="button"
              className="poster-modal__close"
              onClick={closePoster}
              aria-label="Close poster"
            >
              ×
            </button>

            <div className="poster-modal__image-wrap">
              <img
                src={activePoster.image}
                alt={activePoster.alt}
                className="poster-modal__image"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
import { useEffect } from "react";
import "./Secret-2.css";
import { useSecretUnlock } from "../components/SecretUnlockContext";

// Replace these with your actual poster file names
import halifordPoster from "../assets/Poster1.png";
import morrowPoster from "../assets/Poster2.png";
import lauriePoster from "../assets/Poster3.png";

export default function SecretTwo() {
  const { unlockSecretTwo } = useSecretUnlock();

  useEffect(() => {
    unlockSecretTwo();
  }, [unlockSecretTwo]);

  const posters = [
    {
      id: "haliford",
      src: halifordPoster,
      alt: "Haliford poster",
      theme: "bronze",
    },
    {
      id: "morrow",
      src: morrowPoster,
      alt: "Dr. Elias Morrow poster",
      theme: "dark",
    },
    {
      id: "laurie",
      src: lauriePoster,
      alt: "Laurie Grace poster",
      theme: "light",
    },
  ];

  return (
    <main className="secret2-page">
      <div className="secret2-shell">
        <header className="secret2-hero">
          <p className="secret2-kicker">Second Secret Page</p>
          <h1 className="secret2-title">Story Lines</h1>
        </header>

        <section className="secret2-gallery">
          {posters.map((poster) => (
            <article
              key={poster.id}
              className={`secret2-poster-card secret2-poster-card--${poster.theme}`}
            >
              <div className="secret2-poster-frame">
                <img
                  src={poster.src}
                  alt={poster.alt}
                  className="secret2-poster-image"
                />
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
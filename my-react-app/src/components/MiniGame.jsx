import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSecretUnlock } from "./SecretUnlockContext";

import wrongSfx from "../assets/wrong.mp3";
import completeSfx from "../assets/complete.mp3";
import rotateSfx from "../assets/squish.mp3"; // <-- your per-click sound
import "./MiniGame.css";

export default function MiniGame({
  images = [],
  requiredOrder = [1, 2, 3, 4],
  unlockPath = "/secret",
}) {
  const navigate = useNavigate();
  const { unlockSecret } = useSecretUnlock();
  const rotateAudioRef = useRef(null);

  // each tile is 0/90/180/270
  const [rotations, setRotations] = useState([0, 0, 0, 0]);
  const [progressIndex, setProgressIndex] = useState(0);
  const [wrong, setWrong] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  const required = useMemo(() => requiredOrder.map((n) => n - 1), [requiredOrder]);

  // ===== SFX (fast replay)
  const wrongAudioRef = useRef(null);
  const completeAudioRef = useRef(null);

  useEffect(() => {
    wrongAudioRef.current = new Audio(wrongSfx);
    wrongAudioRef.current.preload = "auto";
    wrongAudioRef.current.volume = 0.15;

    completeAudioRef.current = new Audio(completeSfx);
    completeAudioRef.current.preload = "auto";
    completeAudioRef.current.volume = 0.15;

    rotateAudioRef.current = new Audio(rotateSfx);
    rotateAudioRef.current.preload = "auto";
    rotateAudioRef.current.volume = 0.90; // tweak
  }, []);

  function playWrong() {
    const a = wrongAudioRef.current;
    if (!a) return;
    a.pause();
    a.currentTime = 0;
    a.play().catch(() => {});
  }

  function playComplete() {
    const a = completeAudioRef.current;
    if (!a) return;
    a.pause();
    a.currentTime = 0;
    a.play().catch(() => {});
  }

  function playRotate() {
  const a = rotateAudioRef.current;
  if (!a) return;
  a.pause();
  a.currentTime = 0;
  a.play().catch(() => {});
}

  // ✅ forced reset (no button)
  function forceReset() {
    setRotations([0, 0, 0, 0]);
    setProgressIndex(0);
    setUnlocked(false);
  }

  function handleTileClick(tileIndex) {
    if (unlocked) return;

    // check order click requirement FIRST
    const expectedTile = required[progressIndex];

    // Wrong order → SFX + forced reset + flash
    if (tileIndex !== expectedTile) {
      playWrong();

      setWrong(true);
      forceReset();

      window.setTimeout(() => setWrong(false), 450);
      return;
    }

    // ✅ Correct click → rotate clicked tile 90deg
    playRotate();
    setRotations((prev) => {
      const next = [...prev];
      next[tileIndex] = (next[tileIndex] + 90) % 360;
      return next;
    });

    const nextIndex = progressIndex + 1;
    //Puzzle Solved
    if (nextIndex >= required.length) {
      setUnlocked(true);
      playComplete();

      unlockSecret(); // navbar secret icon appears
      window.setTimeout(() => navigate(unlockPath), 650);
      return;
    }

    setProgressIndex(nextIndex);
  }

  return (
    <div className={`mg-wrap ${wrong ? "mg-wrong" : ""} ${unlocked ? "mg-unlocked" : ""}`}>
      <header className="mg-header">
        <h3 className="mg-title"></h3>
      </header>

      <div className="mg-board">
        {[0, 1, 2, 3].map((i) => (
          <button
            key={i}
            className="mg-tile"
            type="button"
            onClick={() => handleTileClick(i)}
            aria-label={`Puzzle tile ${i + 1}`}
          >
            <div className="mg-tile-overlay">
              <span className="mg-tile-num">{i + 1}</span>
            </div>

            <div className="mg-img" style={{ transform: `rotate(${rotations[i]}deg)` }}>
              {images[i] ? (
                <img src={images[i]} alt={`Puzzle ${i + 1}`} draggable="false" />
              ) : (
                <div className="mg-placeholder">PUZZLE {i + 1}</div>
              )}
            </div>
          </button>
        ))}
      </div>

      <footer className="mg-footer">
        <div>
          Progress: <span className="mg-order">{progressIndex}/{required.length}</span>
          {unlocked ? <span className="mg-order"> — UNLOCKED</span> : null}
        </div>

        {/* ✅ removed reset button */}
      </footer>
    </div>
  );
}
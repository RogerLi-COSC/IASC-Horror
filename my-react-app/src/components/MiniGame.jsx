import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSecretUnlock } from "./SecretUnlockContext";

import "./MiniGame.css";

export default function MiniGame({
  images = [],
  requiredOrder = [1, 2, 3, 4],
  unlockPath = "/secret",
}) {
  const navigate = useNavigate();
  const { unlockSecret } = useSecretUnlock();

  // each tile is 0/90/180/270
  const [rotations, setRotations] = useState([0, 0, 0, 0]);
  const [progressIndex, setProgressIndex] = useState(0);
  const [wrong, setWrong] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  const required = useMemo(() => requiredOrder.map((n) => n - 1), [requiredOrder]);

  function resetPuzzle() {
    setRotations([0, 0, 0, 0]);
    setProgressIndex(0);
    setWrong(false);
    setUnlocked(false);
  }

  function handleTileClick(tileIndex) {
    if (unlocked) return;

    // rotate clicked tile 90deg
    setRotations((prev) => {
      const next = [...prev];
      next[tileIndex] = (next[tileIndex] + 90) % 360;
      return next;
    });

    // check order click requirement
    const expectedTile = required[progressIndex];
    if (tileIndex !== expectedTile) {
      setWrong(true);
      setProgressIndex(0);
      window.setTimeout(() => setWrong(false), 350);
      return;
    }

    // correct click
    const nextIndex = progressIndex + 1;

    if (nextIndex >= required.length) {
      // ✅ UNLOCK (in-memory only)
      setUnlocked(true);
      unlockSecret(); // <<<<<< THIS is what makes Navbar show the icon

      // small delay for “unlock feel”
      window.setTimeout(() => navigate(unlockPath), 500);
      return;
    }

    setProgressIndex(nextIndex);
  }

  return (
    <div className={`mg-wrap ${wrong ? "mg-wrong" : ""} ${unlocked ? "mg-unlocked" : ""}`}>
      <header className="mg-header">
        <h3 className="mg-title">Mini Game</h3>
        <p className="mg-sub">Rotate and click in the correct order to unlock the file.</p>
        <div className="mg-hint">Order: {requiredOrder.join(" → ")}</div>
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

        <button className="mg-reset" type="button" onClick={resetPuzzle}>
          Reset
        </button>
      </footer>
    </div>
  );
}
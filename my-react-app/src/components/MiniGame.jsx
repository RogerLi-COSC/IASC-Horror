import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSecretUnlock } from "./SecretUnlockContext";

import wrongSfx from "../assets/wrong.mp3";
import completeSfx from "../assets/complete.mp3";
import rotateSfx from "../assets/squish.mp3";
import "./MiniGame.css";

const TILE_COUNT = 4;
const GRID_COLUMNS = 2;

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function getNextTileIndex(currentIndex, key) {
  const row = Math.floor(currentIndex / GRID_COLUMNS);
  const col = currentIndex % GRID_COLUMNS;

  switch (key) {
    case "ArrowRight":
      return row * GRID_COLUMNS + clamp(col + 1, 0, GRID_COLUMNS - 1);
    case "ArrowLeft":
      return row * GRID_COLUMNS + clamp(col - 1, 0, GRID_COLUMNS - 1);
    case "ArrowDown":
      return clamp(row + 1, 0, 1) * GRID_COLUMNS + col;
    case "ArrowUp":
      return clamp(row - 1, 0, 1) * GRID_COLUMNS + col;
    default:
      return currentIndex;
  }
}

export default function MiniGame({
  images = [],
  requiredOrder = [1, 2, 3, 4],
  unlockPath = "/secret",
}) {
  const navigate = useNavigate();
  const { unlockSecret } = useSecretUnlock();

  const [rotations, setRotations] = useState([0, 0, 0, 0]);
  const [progressIndex, setProgressIndex] = useState(0);
  const [wrong, setWrong] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  const required = useMemo(() => requiredOrder.map((n) => n - 1), [requiredOrder]);

  const wrongAudioRef = useRef(null);
  const completeAudioRef = useRef(null);
  const rotateAudioRef = useRef(null);
  const tileRefs = useRef([]);

  useEffect(() => {
    wrongAudioRef.current = new Audio(wrongSfx);
    wrongAudioRef.current.preload = "auto";
    wrongAudioRef.current.volume = 0.15;

    completeAudioRef.current = new Audio(completeSfx);
    completeAudioRef.current.preload = "auto";
    completeAudioRef.current.volume = 0.15;

    rotateAudioRef.current = new Audio(rotateSfx);
    rotateAudioRef.current.preload = "auto";
    rotateAudioRef.current.volume = 0.9;
  }, []);

  function playAudio(ref) {
    const a = ref.current;
    if (!a) return;
    a.pause();
    a.currentTime = 0;
    a.play().catch(() => {});
  }

  function playWrong() {
    playAudio(wrongAudioRef);
  }

  function playComplete() {
    playAudio(completeAudioRef);
  }

  function playRotate() {
    playAudio(rotateAudioRef);
  }

  function forceReset() {
    setRotations([0, 0, 0, 0]);
    setProgressIndex(0);
    setUnlocked(false);
  }

  function handleTileClick(tileIndex) {
    if (unlocked) return;

    const expectedTile = required[progressIndex];

    if (tileIndex !== expectedTile) {
      playWrong();
      setWrong(true);
      forceReset();
      window.setTimeout(() => setWrong(false), 450);
      return;
    }

    playRotate();
    setRotations((prev) => {
      const next = [...prev];
      next[tileIndex] = (next[tileIndex] + 90) % 360;
      return next;
    });

    const nextIndex = progressIndex + 1;

    if (nextIndex >= required.length) {
      setUnlocked(true);
      playComplete();

      unlockSecret();

      window.setTimeout(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
        navigate(unlockPath);
      }, 650);

      return;
    }

    setProgressIndex(nextIndex);
  }

  function handleTileKeyDown(event, tileIndex) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleTileClick(tileIndex);
      return;
    }

    if (
      event.key === "ArrowRight" ||
      event.key === "ArrowLeft" ||
      event.key === "ArrowUp" ||
      event.key === "ArrowDown"
    ) {
      event.preventDefault();
      const nextIndex = getNextTileIndex(tileIndex, event.key);
      tileRefs.current[nextIndex]?.focus();
    }
  }

  const statusMessage = unlocked
    ? "Unlocked. Opening the secret page."
    : wrong
    ? "Wrong tile order. Puzzle reset."
    : `Progress ${progressIndex} of ${required.length}. Select the next image in the correct order.`;

  return (
    <section
      className={`mg-wrap ${wrong ? "mg-wrong" : ""} ${unlocked ? "mg-unlocked" : ""}`}
      aria-labelledby="mg-title"
    >
      <header className="mg-header">
        <h3 className="mg-title" id="mg-title">
          Select the images in the correct order
        </h3>
        <p className="mg-sub">
          Use your mouse or keyboard to interact with the puzzle.
        </p>
        <p className="mg-hint" id="mg-instructions">
          Keyboard: use arrow keys to move between images, then press Enter or Space to select.
        </p>
      </header>

      <div className="mg-board" role="group" aria-describedby="mg-instructions mg-status">
        {[0, 1, 2, 3].map((i) => (
          <button
            key={i}
            ref={(el) => {
              tileRefs.current[i] = el;
            }}
            className="mg-tile"
            type="button"
            onClick={() => handleTileClick(i)}
            onKeyDown={(event) => handleTileKeyDown(event, i)}
            aria-label={`Puzzle tile ${i + 1}. Rotated ${rotations[i]} degrees.`}
            aria-describedby="mg-instructions mg-status"
          >
            <div className="mg-tile-overlay">
              <span className="mg-tile-num">{i + 1}</span>
            </div>

            <div className="mg-img-rotator" style={{ transform: `rotate(${rotations[i]}deg)` }}>
              <div className="mg-img-pop">
                {images[i] ? (
                  <img src={images[i]} alt={`Puzzle ${i + 1}`} draggable="false" />
                ) : (
                  <div className="mg-placeholder">Puzzle {i + 1}</div>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>

      <footer className="mg-footer">
        <div className="mg-footer-copy">
          Progress: <span className="mg-order">{progressIndex}/{required.length}</span>
          {unlocked ? <span className="mg-order"> — Unlocked</span> : null}
        </div>

        <p className="mg-status" id="mg-status" aria-live="polite">
          {statusMessage}
        </p>
      </footer>
    </section>
  );
}
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import ambientSound from "../assets/ambient-bg.mp3";
import "./BackgroundAudio.css";

const STORAGE_KEY = "siteMuted";

export default function BackgroundAudio() {
  const audioRef = useRef(null);
  const location = useLocation();

  const [muted, setMuted] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved === "1";
  });

  // keep <audio> synced with mute state
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = muted;
  }, [muted]);

  // play/pause depending on route + mute
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Always enforce mute flag
    audio.muted = muted;

    // ❌ Home page: never play
    if (location.pathname === "/") {
      audio.pause();
      audio.currentTime = 0;
      return;
    }

    // 🔇 Muted: stay paused
    if (muted) {
      audio.pause();
      return;
    }

    // ✅ Other pages + not muted: play
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay may be blocked until user interacts — normal browser behavior.
      });
    }
  }, [location.pathname, muted]);

  function toggleMute() {
    setMuted((m) => {
      const next = !m;
      localStorage.setItem(STORAGE_KEY, next ? "1" : "0");
      return next;
    });
  }

  return (
    <>
      <audio ref={audioRef} src={ambientSound} loop preload="auto" />

      <button
        className="bg-audio-mute"
        type="button"
        onClick={toggleMute}
        aria-label={muted ? "Unmute background audio" : "Mute background audio"}
        title={muted ? "Unmute" : "Mute"}
      >
        <span className="bg-audio-icon" aria-hidden="true">
          {muted ? "🔇" : "🔊"}
        </span>
        <span className="bg-audio-text">{muted ? "MUTED" : "SOUND"}</span>
      </button>
    </>
  );
}
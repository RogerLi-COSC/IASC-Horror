import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

import ambientSound from "../assets/ambient-bg.mp3";
import homeSound from "../assets/background1.mp3";
import homeSting from "../assets/heart.mp3";

import "./BackgroundAudio.css";

const STORAGE_KEY = "siteMuted";

// 🔧 Tune these
const GIF_LOOP_MS = 10_000;        // your GIF loop length
const HIT_M_OFFSET_MS = 900;       

// volumes
const HOME_BG_INITIAL_VOL = 0.35;
const HOME_BG_AFTER_VOL = HOME_BG_INITIAL_VOL / 2;
const OTHER_BG_VOL = 0.35;
const STING_VOL = 0.85;

export default function BackgroundAudio({ gifStartMs = 0 }) {
  const bgAudioRef = useRef(null);
  const stingAudioRef = useRef(null);

  const stingIntervalRef = useRef(null);
  const firstStingTimeoutRef = useRef(null);

  const location = useLocation();

  const [muted, setMuted] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved === "1";
  });

  const isHome = location.pathname === "/";

  // Keep audio muted flags synced
  useEffect(() => {
    const bg = bgAudioRef.current;
    const sting = stingAudioRef.current;
    if (bg) bg.muted = muted;
    if (sting) sting.muted = muted;
  }, [muted]);

  // Background track routing (home vs others)
  useEffect(() => {
    const bg = bgAudioRef.current;
    if (!bg) return;

    const desiredSrc = isHome ? homeSound : ambientSound;
    const desiredAbs = new URL(desiredSrc, window.location.href).href;

    if (bg.src !== desiredAbs) {
      bg.src = desiredSrc;
      bg.currentTime = 0;
    }

    // set volume per route (home starts louder, later will be reduced after sting)
    bg.volume = isHome ? HOME_BG_INITIAL_VOL : OTHER_BG_VOL;

    bg.muted = muted;

    if (muted) {
      bg.pause();
      return;
    }

    const p = bg.play();
    if (p !== undefined) p.catch(() => {});
  }, [isHome, muted]);

  // Home sting synced to GIF
  useEffect(() => {
    const sting = stingAudioRef.current;
    const bg = bgAudioRef.current;

    // clear previous timers
    if (firstStingTimeoutRef.current) {
      clearTimeout(firstStingTimeoutRef.current);
      firstStingTimeoutRef.current = null;
    }
    if (stingIntervalRef.current) {
      clearInterval(stingIntervalRef.current);
      stingIntervalRef.current = null;
    }

    // only run on home, not muted
    if (!isHome || muted || !sting) {
      if (sting) {
        sting.pause();
        sting.currentTime = 0;
      }
      return;
    }

    // wait for gifStartMs so we can sync
    if (!gifStartMs) return;

    sting.muted = muted;
    sting.volume = STING_VOL;

    const playSting = () => {
      if (muted) return;

      sting.pause();
      sting.currentTime = 0;
      sting.play().catch(() => {});

      // after first sting, cut home bg volume in half (keeps playing)
      if (bg && isHome) bg.volume = HOME_BG_AFTER_VOL;
    };

    // schedule first sting at the exact offset in the GIF loop
    const targetTime = gifStartMs + HIT_M_OFFSET_MS;
    const delay = Math.max(0, targetTime - Date.now());

    firstStingTimeoutRef.current = setTimeout(() => {
      playSting();
      stingIntervalRef.current = setInterval(playSting, GIF_LOOP_MS);
    }, delay);

    return () => {
      if (firstStingTimeoutRef.current) {
        clearTimeout(firstStingTimeoutRef.current);
        firstStingTimeoutRef.current = null;
      }
      if (stingIntervalRef.current) {
        clearInterval(stingIntervalRef.current);
        stingIntervalRef.current = null;
      }
      sting.pause();
      sting.currentTime = 0;
    };
  }, [isHome, muted, gifStartMs]);

  function toggleMute() {
    setMuted((m) => {
      const next = !m;
      localStorage.setItem(STORAGE_KEY, next ? "1" : "0");
      return next;
    });
  }

  return (
    <>
      <audio ref={bgAudioRef} loop preload="auto" />
      <audio ref={stingAudioRef} src={homeSting} preload="auto" />

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
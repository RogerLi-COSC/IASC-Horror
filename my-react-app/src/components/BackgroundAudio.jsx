import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

import ambientSound from "../assets/ambient-bg.mp3";
import homeSound from "../assets/background1.mp3";
import homeSting from "../assets/heart.mp3";

import "./BackgroundAudio.css";

const STORAGE_KEY = "siteMuted";
const SITE_AUDIO_EVENT = "site-audio-change";

// tune these
const GIF_LOOP_MS = 10_000;
const HIT_M_OFFSET_MS = 780;

// volumes
const HOME_BG_INITIAL_VOL = 0.35;
const HOME_BG_AFTER_VOL = HOME_BG_INITIAL_VOL / 2;
const OTHER_BG_VOL = 0.35;
const STING_VOL = 0.85;

function getStoredMute() {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved === "1";
}

function syncMediaElement(media, muted) {
  if (!media) return;

  media.muted = muted;

  if (muted) {
    try {
      media.pause();
    } catch {
      // ignore pause errors
    }
  }
}

function installGlobalAudioBridge() {
  if (typeof window === "undefined") return;
  if (window.__siteAudioBridgeInstalled) return;

  const OriginalAudio = window.Audio;
  const registry = new Set();

  const registerAudio = (audio) => {
    if (!audio) return audio;

    registry.add(audio);
    audio.muted = getStoredMute();

    return audio;
  };

  function PatchedAudio(...args) {
    const audio = new OriginalAudio(...args);
    return registerAudio(audio);
  }

  PatchedAudio.prototype = OriginalAudio.prototype;
  Object.setPrototypeOf(PatchedAudio, OriginalAudio);

  window.Audio = PatchedAudio;
  window.__siteAudioRegistry = registry;
  window.__registerSiteAudio = registerAudio;
  window.__siteAudioBridgeInstalled = true;
}

function syncAllKnownAudio(muted) {
  if (typeof window === "undefined") return;

  const domAudio = Array.from(document.querySelectorAll("audio"));
  const registeredAudio = window.__siteAudioRegistry
    ? Array.from(window.__siteAudioRegistry)
    : [];

  const allAudio = [...new Set([...domAudio, ...registeredAudio])];

  allAudio.forEach((audio) => {
    syncMediaElement(audio, muted);
  });

  window.dispatchEvent(
    new CustomEvent(SITE_AUDIO_EVENT, {
      detail: { muted },
    })
  );
}

export default function BackgroundAudio({ gifStartMs = 0 }) {
  const location = useLocation();
  const isHome = location.pathname === "/";

  const bgAudioRef = useRef(null);
  const stingAudioRef = useRef(null);

  const stingIntervalRef = useRef(null);
  const firstStingTimeoutRef = useRef(null);
  const hasDuckedRef = useRef(false);
  const unlockedRef = useRef(false);

  const [muted, setMuted] = useState(() => getStoredMute());

  useEffect(() => {
    installGlobalAudioBridge();

    if (window.__registerSiteAudio) {
      window.__registerSiteAudio(bgAudioRef.current);
      window.__registerSiteAudio(stingAudioRef.current);
    }

    syncAllKnownAudio(muted);
  }, []);

  useEffect(() => {
    syncAllKnownAudio(muted);

    const bg = bgAudioRef.current;
    const sting = stingAudioRef.current;

    if (bg) bg.muted = muted;
    if (sting) sting.muted = muted;
  }, [muted]);

  // Try to start audio after first user interaction
  useEffect(() => {
    const bg = bgAudioRef.current;
    if (!bg) return;

    const tryStart = () => {
      if (muted) return;
      bg.play().catch(() => {});
    };

    const onFirstInteraction = () => {
      unlockedRef.current = true;
      tryStart();
      window.removeEventListener("pointerdown", onFirstInteraction);
      window.removeEventListener("keydown", onFirstInteraction);
      window.removeEventListener("touchstart", onFirstInteraction);
    };

    tryStart();

    window.addEventListener("pointerdown", onFirstInteraction, { passive: true });
    window.addEventListener("keydown", onFirstInteraction);
    window.addEventListener("touchstart", onFirstInteraction, { passive: true });

    return () => {
      window.removeEventListener("pointerdown", onFirstInteraction);
      window.removeEventListener("keydown", onFirstInteraction);
      window.removeEventListener("touchstart", onFirstInteraction);
    };
  }, [muted, isHome]);

  // Background track routing
  useEffect(() => {
    const bg = bgAudioRef.current;
    if (!bg) return;

    const desiredSrc = isHome ? homeSound : ambientSound;
    const desiredAbs = new URL(desiredSrc, window.location.href).href;

    if (bg.src !== desiredAbs) {
      bg.src = desiredSrc;
      bg.currentTime = 0;
      hasDuckedRef.current = false;
    }

    if (isHome) {
      bg.volume = hasDuckedRef.current ? HOME_BG_AFTER_VOL : HOME_BG_INITIAL_VOL;
    } else {
      bg.volume = OTHER_BG_VOL;
    }

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

    if (firstStingTimeoutRef.current) {
      clearTimeout(firstStingTimeoutRef.current);
      firstStingTimeoutRef.current = null;
    }

    if (stingIntervalRef.current) {
      clearInterval(stingIntervalRef.current);
      stingIntervalRef.current = null;
    }

    if (!isHome || muted || !sting) {
      if (sting) {
        sting.pause();
        sting.currentTime = 0;
      }
      return;
    }

    if (!gifStartMs) return;

    sting.muted = muted;
    sting.volume = STING_VOL;

    const playSting = () => {
      if (muted) return;

      sting.pause();
      sting.currentTime = 0;
      sting.play().catch(() => {});

      if (bg && isHome) {
        hasDuckedRef.current = true;
        bg.volume = HOME_BG_AFTER_VOL;
      }
    };

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
    setMuted((current) => {
      const next = !current;
      localStorage.setItem(STORAGE_KEY, next ? "1" : "0");

      syncAllKnownAudio(next);

      if (!next) {
        const bg = bgAudioRef.current;
        bg?.play().catch(() => {});
      } else {
        const bg = bgAudioRef.current;
        const sting = stingAudioRef.current;

        bg?.pause();

        if (sting) {
          sting.pause();
          sting.currentTime = 0;
        }
      }

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
        aria-label={muted ? "Unmute all game audio" : "Mute all game audio"}
        title={muted ? "Unmute all audio" : "Mute all audio"}
      >
        <span className="bg-audio-icon" aria-hidden="true">
          {muted ? "🔇" : "🔊"}
        </span>
        <span className="bg-audio-text">{muted ? "MUTED" : "AUDIO"}</span>
      </button>
    </>
  );
}
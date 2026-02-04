import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import ambientSound from "../assets/ambient-bg.mp3"; // <-- your mp4 here

export default function BackgroundAudio() {
  const audioRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // ❌ HOME PAGE → NO SOUND
    if (location.pathname === "/") {
      audio.pause();
      audio.currentTime = 0;
      return;
    }

    // ✅ ALL OTHER PAGES → PLAY
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // autoplay may be blocked until user interaction (normal browser behavior)
      });
    }
  }, [location.pathname]);

  return (
    <audio
      ref={audioRef}
      src={ambientSound}
      loop
      preload="auto"
      volume={0.35}   // subtle horror ambience
    />
  );
}
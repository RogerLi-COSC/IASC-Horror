import { useEffect, useMemo, useState } from "react";
import "./BloodDrips.css";

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

export default function BloodDrips({
  enabled = true,
  intervalMs = 2200,
  maxOnScreen = 10,
}) {
  const [drips, setDrips] = useState([]);

  const sideChoices = useMemo(() => ["left", "right"], []);

  useEffect(() => {
    if (!enabled) return;

    const id = setInterval(() => {
      setDrips((prev) => {
        const next = [...prev];

        // Spawn 1–2 drips each interval for “alive” feel
        const spawnCount = Math.random() < 0.35 ? 2 : 1;

        for (let i = 0; i < spawnCount; i++) {
          next.push({
            id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
            side: sideChoices[Math.floor(Math.random() * sideChoices.length)],
            // position a bit in from the edge
            xOffset: rand(6, 20), // px
            topDelay: rand(0, 250), // ms
            size: rand(6, 14), // px
            height: rand(90, 260), // px (trail length)
            duration: rand(2.4, 4.2), // s
            opacity: rand(0.35, 0.7),
            blur: rand(0, 1.2), // px
          });
        }

        // Cap how many drips exist at once
        return next.slice(-maxOnScreen);
      });
    }, intervalMs);

    return () => clearInterval(id);
  }, [enabled, intervalMs, maxOnScreen, sideChoices]);

  function handleEnd(id) {
    setDrips((prev) => prev.filter((d) => d.id !== id));
  }

  return (
    <div className="blood-drips" aria-hidden="true">
      {drips.map((d) => (
        <div
          key={d.id}
          className={`drip ${d.side}`}
          style={{
            "--x": `${d.xOffset}px`,
            "--size": `${d.size}px`,
            "--trail": `${d.height}px`,
            "--dur": `${d.duration}s`,
            "--op": d.opacity,
            "--blur": `${d.blur}px`,
            animationDelay: `${d.topDelay}ms`,
          }}
          onAnimationEnd={() => handleEnd(d.id)}
        />
      ))}
    </div>
  );
}

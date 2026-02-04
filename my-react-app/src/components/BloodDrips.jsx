import { useEffect, useRef, useState } from "react";
import "./BloodDrips.css";

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

export default function BloodDrips({
  enabled = true,
  intervalMs = 1100, // a bit more frequent
  maxOnScreen = 18,
  landChance = 0.72, // ✅ more landings
  midLandChance = 0.55, // ✅ allow landing mid-page often
}) {
  const [drops, setDrops] = useState([]);
  const [puddles, setPuddles] = useState([]);
  const wrapRef = useRef(null);

  useEffect(() => {
    if (!enabled) return;

    const id = setInterval(() => {
      setDrops((prev) => {
        const next = [...prev];

        // ✅ Spawn 1–3 drips for more activity
        const r = Math.random();
        const spawnCount = r < 0.18 ? 3 : r < 0.45 ? 2 : 1;

        for (let i = 0; i < spawnCount; i++) {
          const size = rand(7, 14);
          const trail = rand(90, 320);

          const willLand = Math.random() < landChance;

          // ✅ where does it “stop”? (vh)
          // - if landing: sometimes mid page, otherwise near bottom
          // - if not landing: just fall past the screen
          let stopY;
          if (willLand) {
            const landMid = Math.random() < midLandChance;
            stopY = landMid ? rand(18, 78) : rand(78, 102);
          } else {
            stopY = rand(105, 120);
          }

          next.push({
            id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
            x: rand(4, 96), // percent of viewport width
            size,
            trail,
            duration: rand(2.2, 4.6), // seconds
            opacity: rand(0.5, 0.85),
            blur: rand(0, 0.8),
            sway: rand(-12, 12), // slight sideways drift
            land: willLand,
            stopY, // ✅ stop point in vh
          });
        }

        return next.slice(-maxOnScreen);
      });
    }, intervalMs);

    return () => clearInterval(id);
  }, [enabled, intervalMs, maxOnScreen, landChance, midLandChance]);

  function spawnPuddleAt(drop, stopYvh) {
    const xPx = (drop.x / 100) * window.innerWidth;

    // convert vh → px
    const yPx = (stopYvh / 100) * window.innerHeight;

    const p = {
      id: `p-${drop.id}`,
      x: xPx + rand(-12, 12),
      y: yPx + rand(-10, 10),

      // ✅ smaller landings
      size: rand(14, 34),
      stretch: rand(0.75, 1.25),
      rot: rand(-14, 14),
      opacity: rand(0.35, 0.65),
      lifeMs: rand(2400, 5200),
    };

    setPuddles((prev) => [...prev, p]);

    window.setTimeout(() => {
      setPuddles((prev) => prev.filter((pp) => pp.id !== p.id));
    }, p.lifeMs + 900);
  }

  function handleDropEnd(drop) {
    setDrops((prev) => prev.filter((d) => d.id !== drop.id));
    if (drop.land) spawnPuddleAt(drop, drop.stopY);
  }

  return (
    <div ref={wrapRef} className="blood-drips" aria-hidden="true">
      {/* puddles / splats */}
      {puddles.map((p) => (
        <div
          key={p.id}
          className="puddle"
          style={{
            left: `${p.x}px`,
            top: `${p.y}px`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            transform: `translate(-50%, -50%) rotate(${p.rot}deg) scaleX(${p.stretch})`,
            opacity: p.opacity,
            animationDuration: `${p.lifeMs}ms`,
          }}
        />
      ))}

      {/* falling drops */}
      {drops.map((d) => (
        <div
          key={d.id}
          className="drip"
          style={{
            "--x": `${d.x}vw`,
            "--size": `${d.size}px`,
            "--trail": `${d.trail}px`,
            "--dur": `${d.duration}s`,
            "--op": d.opacity,
            "--blur": `${d.blur}px`,
            "--sway": `${d.sway}px`,
            "--stopY": `${d.stopY}vh`, // ✅ stop anywhere
          }}
          onAnimationEnd={() => handleDropEnd(d)}
        />
      ))}
    </div>
  );
}
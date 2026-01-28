import { createContext, useContext, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./PageTransition.css";

const TransitionContext = createContext(null);

export function usePageTransition() {
  const ctx = useContext(TransitionContext);
  if (!ctx) throw new Error("usePageTransition must be used inside TransitionProvider");
  return ctx;
}

export default function TransitionProvider({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [phase, setPhase] = useState("idle"); // idle | out | in

  // Slow & smooth
  const DURATION_OUT = 900;
  const DURATION_IN = 900;

  async function go(to) {
    // prevent double-click spam & prevent navigating to same page
    if (phase !== "idle") return;
    if (to === location.pathname) return;

    // 1) Fade OUT current page (screen goes dark)
    setPhase("out");
    await new Promise((r) => setTimeout(r, DURATION_OUT));

    // 2) Navigate while dark
    navigate(to);

    // 3) Fade IN new page
    setPhase("in");
    await new Promise((r) => setTimeout(r, DURATION_IN));

    setPhase("idle");
  }

  const value = useMemo(() => ({ go, phase }), [phase, location.pathname]);

  return (
    <TransitionContext.Provider value={value}>
      <div
        className={`page-transition ${
          phase === "out" ? "to-black" : phase === "in" ? "from-black" : ""
        }`}
      />
      {children}
    </TransitionContext.Provider>
  );
}

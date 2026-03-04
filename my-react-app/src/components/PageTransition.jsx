import { useEffect, useLayoutEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./PageTransition.css";

export default function PageTransition({ children }) {
  const location = useLocation();
  const [phase, setPhase] = useState("idle"); // idle | in | out

  // ✅ Always jump to top BEFORE paint on route change
  useLayoutEffect(() => {
    // 1) Normal window scrolling
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });

    // 2) Safety: if you ever add a scroll container later, reset it too
    const shell = document.querySelector(".app-shell");
    if (shell && shell.scrollTop !== undefined) shell.scrollTop = 0;
  }, [location.pathname]);

  useEffect(() => {
    // ✅ Slightly slower / smoother transition timing
    setPhase("in");

    const t1 = setTimeout(() => setPhase("out"), 550);  // overlay visible
    const t2 = setTimeout(() => setPhase("idle"), 1250); // done

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [location.pathname]);

  return (
    <>
      <div className={`page-fade ${phase}`} aria-hidden="true" />
      <div className="page-content">{children}</div>
    </>
  );
}
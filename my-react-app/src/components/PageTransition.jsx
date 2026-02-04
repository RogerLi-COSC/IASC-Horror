import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./PageTransition.css";

export default function PageTransition({ children }) {
  const location = useLocation();
  const [phase, setPhase] = useState("idle"); // idle | in | out

  useEffect(() => {
    // on route change: fade IN quickly then fade OUT
    setPhase("in");

    const t1 = setTimeout(() => setPhase("out"), 420); // overlay visible
    const t2 = setTimeout(() => setPhase("idle"), 920); // done

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
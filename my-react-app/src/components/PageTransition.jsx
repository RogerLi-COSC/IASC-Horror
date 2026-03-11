import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./PageTransition.css";

export default function PageTransition({ children }) {
  const location = useLocation();
  const [phase, setPhase] = useState("idle"); // idle | in | out

  useEffect(() => {
    setPhase("in");

    const t1 = setTimeout(() => setPhase("out"), 550);
    const t2 = setTimeout(() => setPhase("idle"), 1250);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [location.pathname, location.key]);

  return (
    <>
      <div className={`page-fade ${phase}`} aria-hidden="true" />
      <div className="page-content">{children}</div>
    </>
  );
}
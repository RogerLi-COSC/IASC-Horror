import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./PageTransition.css";

export default function PageTransition({ children }) {
  const location = useLocation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);

    const timeout = setTimeout(() => {
      setVisible(false);
    }, 350); // duration matches CSS

    return () => clearTimeout(timeout);
  }, [location.pathname]);

  return (
    <>
      <div className={`page-fade ${visible ? "active" : ""}`} />
      <div className="page-content">{children}</div>
    </>
  );
}

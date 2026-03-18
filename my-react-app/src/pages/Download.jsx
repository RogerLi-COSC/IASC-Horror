import { useEffect, useState } from "react";
import "./Download.css";

const targetDate = new Date("April 1, 2026 08:30:00").getTime();

export default function Download() {
  const [time, setTime] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    function updateCountdown() {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        setTime({
          days: "00",
          hours: "00",
          minutes: "00",
          seconds: "00",
        });
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((distance / (1000 * 60)) % 60);
      const seconds = Math.floor((distance / 1000) % 60);

      setTime({
        days: days < 10 ? "0" + days : days,
        hours: hours < 10 ? "0" + hours : hours,
        minutes: minutes < 10 ? "0" + minutes : minutes,
        seconds: seconds < 10 ? "0" + seconds : seconds,
      });
    }

    updateCountdown();

    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval); // cleanup
  }, []);

  return (
    <main className="download-page">
      <div className="countdown-box">
        <p>Time remaining until the game release</p>

        <div className="countdown">
          <div className="time-box">
            <div className="number">{time.days}</div>
            <div className="label">Days</div>
          </div>

          <div className="time-box">
            <div className="number">{time.hours}</div>
            <div className="label">Hours</div>
          </div>

          <div className="time-box">
            <div className="number">{time.minutes}</div>
            <div className="label">Minutes</div>
          </div>

          <div className="time-box">
            <div className="number">{time.seconds}</div>
            <div className="label">Seconds</div>
          </div>
        </div>
      </div>
    </main>
  );
}
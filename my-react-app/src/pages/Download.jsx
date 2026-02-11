import "./Download.css";


const targetDate = new Date("March 1, 2026 09:00:00").getTime();

const countdown = setInterval(function () {
    const now = new Date().getTime();
    const distance = targetDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((distance / (1000 * 60)) % 60);
    const seconds = Math.floor((distance / 1000) % 60);

    document.getElementById("days").innerText = days < 10 ? "0" + days : days;
    document.getElementById("hours").innerText = hours < 10 ? "0" + hours : hours;
    document.getElementById("minutes").innerText = minutes < 10 ? "0" + minutes : minutes;
    document.getElementById("seconds").innerText = seconds < 10 ? "0" + seconds : seconds;

    if (distance < 0) {
    clearInterval(countdown);
    document.querySelector(".countdown").innerHTML = "Time's up!";
    }
}, 1000);

export default function Download() {
  return (
    <main className="download-page">
        <div className="countdown-box">
          {/* [ download content goes here ] */}
            <p>Time remaining until the game release</p>
            <div class="countdown">
                <div class="time-box">
                    <div id="days" class="number">00</div>
                    <div class="label">Days</div>
                </div>
                <div class="time-box">
                    <div id="hours" class="number">00</div>
                    <div class="label">Hours</div>
                </div>
                <div class="time-box">
                    <div id="minutes" class="number">00</div>
                    <div class="label">Minutes</div>
                </div>
                <div class="time-box">
                    <div id="seconds" class="number">00</div>
                    <div class="label">Seconds</div>
                </div>
            </div>
        </div>
    </main>
  );
}
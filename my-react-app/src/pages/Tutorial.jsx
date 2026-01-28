import "./Tutorial.css";

export default function Tutorial() {
  return (
    <main className="tutorial">
      <section className="tutorial-wrap">
        {/* LEFT SIDE */}
        <div className="tutorial-left">
          <h1 className="tutorial-title">How To Play</h1>

          <div className="video-frame">
            <div className="video-placeholder">
              <div className="video-icon">▶</div>
              <div className="video-text">Tutorial Video</div>
              <div className="video-subtext">(video placeholder)</div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="tutorial-right">
          <h1 className="tutorial-title">Key Buttons</h1>

          <div className="controls">
            <div className="key-row">
              <div className="key">W</div>
              <span className="key-label">Forward</span>
            </div>

            <div className="key-row">
              <div className="key">A</div>
              <span className="key-label">Left</span>
            </div>

            <div className="key-row">
              <div className="key">S</div>
              <span className="key-label">Backward</span>
            </div>

            <div className="key-row">
              <div className="key">D</div>
              <span className="key-label">Right</span>
            </div>

            <div className="key-row">
              <div className="key special">E</div>
              <span className="key-label">Pick Up</span>
            </div>

            <div className="mouse-row">
              <div className="mouse">🖱</div>
              <span className="key-label">Move View</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

import "./Tutorial.css";
import pressIVideo from "../assets/PressI.mp4";
import pressEVideo from "../assets/PressE.mp4";
import WholeTutorial from "../assets/WholeTutorial.mov";
const keyClips = [
  { key: "E", label: "Pick Up", caption: "Shows picking up an item.", id: "e", video: pressEVideo },
  { key: "I", label: "Interact", caption: "Shows interacting with doors / objects.", id: "i", video: pressIVideo},
];

export default function Tutorial() {
  return (
    <main className="tutorial">
      <section className="tutorial-wrap">
        {/* ===== Row 1 (NORMAL): Video LEFT, Info RIGHT ===== */}
        <div className="tutorial-panel">
          <h1 className="tutorial-title">How To Play</h1>

          <div className="video-frame">
                <video
                  className="tutorial-video main"
                  src={WholeTutorial}
                  controls
                  preload="metadata"
                />
          </div>
        </div>

        <div className="tutorial-panel">
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

            <div className="key-row">
              <div className="key special">I</div>
              <span className="key-label">Interact</span>
            </div>

            <div className="mouse-row">
              <div className="mouse">🖱</div>
              <span className="key-label">Move View</span>
            </div>
          </div>
        </div>

        {/* ===== Rows 2+ (REVERSED): Info LEFT, Video RIGHT ===== */}
        <div className="tutorial-divider" aria-hidden="true" />

        <h2 className="tutorial-subtitle">Action Clips</h2>

        <div className="tutorial-clips">
          {keyClips.map((clip) => (
            <div className="clip-row" key={clip.id}>
              {/* LEFT: key info */}
              <div className="clip-info">
                <div className="clip-keyline">
                  <div className={`key ${clip.key === "SPACE" ? "space" : "special"}`}>
                    {clip.key}
                  </div>
                  <div className="clip-text">
                    <div className="clip-title">{clip.label}</div>
                    <div className="clip-caption">{clip.caption}</div>
                  </div>
                </div>
              </div>

              {/* RIGHT: small video */}
              <div className="clip-video">
                <div className="video-frame small">
                  {clip.video ? (
                    <video
                      className="tutorial-video"
                      src={clip.video}
                      controls
                      preload="metadata"
                    />
                  ) : (
                    <div className="video-placeholder">
                      <div className="video-icon">▶</div>
                      <div className="video-text">{clip.key} Clip</div>
                      <div className="video-subtext">(video placeholder)</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
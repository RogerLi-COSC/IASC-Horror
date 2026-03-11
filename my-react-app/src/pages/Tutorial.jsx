import "./Tutorial.css";
import pressQVideo from "../assets/PressQ.mov"; // keep this file path if your Q clip is still named PressI.mp4
import pressEVideo from "../assets/PressE.mov";
import wholeTutorial from "../assets/WholeTutorial.mov";

const actionClips = [
  {
    key: "E",
    label: "Interact",
    caption: "Use doors, objects, switches, and anything in the world that responds to the player.",
    video: pressEVideo,
    id: "interact",
  },
  {
    key: "Q",
    label: "Inspect / Stop Inspect",
    caption: "Inspect important items up close, then press again to leave inspection mode.",
    video: pressQVideo,
    id: "inspect",
  },
];

const quickControls = [
  {
    key: "Mouse",
    label: "Move Camera",
    desc: "Look around and control your view.",
    type: "mouse",
  },
  {
    key: "E",
    label: "Interact",
    desc: "Use objects and trigger interactions.",
    type: "special",
  },
  {
    key: "Q",
    label: "Inspect / Stop Inspect",
    desc: "Inspect clues, then press again to exit.",
    type: "special",
  },
];

export default function Tutorial() {
  return (
    <main className="tutorial">
      <section className="tutorial-wrap">
        <div className="tutorial-hero">
          <div className="tutorial-panel">
            <div className="panel-header">
              <p className="panel-kicker">Tutorial</p>
              <h1 className="tutorial-title">How To Play</h1>
              <p className="panel-copy">
                Learn the basic controls, how to interact with the environment,
                and how to inspect objects while exploring the nightmare.
              </p>
            </div>

            <div className="video-frame main-frame">
              <video
                className="tutorial-video"
                src={wholeTutorial}
                controls
                preload="metadata"
              />
            </div>
          </div>

          <div className="tutorial-panel controls-panel">
            <div className="panel-header">
              <p className="panel-kicker">Controls</p>
              <h2 className="tutorial-title">Key Buttons</h2>
              <p className="panel-copy">
                Movement stays simple. The action keys are highlighted below,
                and the video examples are shown in the section underneath.
              </p>
            </div>

            <div className="controls-layout">
              <div className="control-block">
                <h3 className="control-block-title">Movement</h3>

                <div className="movement-card">
                  <div className="wasd-grid" aria-label="WASD movement controls">
                    <div className="keycap ghost" aria-hidden="true"></div>
                    <div className="keycap">W</div>
                    <div className="keycap ghost" aria-hidden="true"></div>

                    <div className="keycap">A</div>
                    <div className="keycap">S</div>
                    <div className="keycap">D</div>
                  </div>

                  <div className="movement-legend">
                    <div className="movement-item">
                      <span className="movement-letter">W</span>
                      <span>Forward</span>
                    </div>
                    <div className="movement-item">
                      <span className="movement-letter">A</span>
                      <span>Left</span>
                    </div>
                    <div className="movement-item">
                      <span className="movement-letter">S</span>
                      <span>Back</span>
                    </div>
                    <div className="movement-item">
                      <span className="movement-letter">D</span>
                      <span>Right</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="control-block">
                <h3 className="control-block-title">Actions</h3>

                <div className="quick-control-list">
                  {quickControls.map((control) => (
                    <div className="quick-control-card" key={control.key}>
                      <div
                        className={`quick-control-key ${
                          control.type === "mouse" ? "mouse-key" : "special-key"
                        }`}
                      >
                        {control.key}
                      </div>

                      <div className="quick-control-text">
                        <div className="quick-control-label">{control.label}</div>
                        <div className="quick-control-desc">{control.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="tutorial-divider" aria-hidden="true" />

        <div className="action-heading">
          <p className="panel-kicker">Examples</p>
          <h2 className="tutorial-subtitle">Action Clips</h2>
          <p className="panel-copy action-copy">
            These are the only keys that currently need video examples.
          </p>
        </div>

        <div className="tutorial-clips">
          {actionClips.map((clip) => (
            <article className="clip-row" key={clip.id}>
              <div className="clip-info">
                <div className="clip-key">{clip.key}</div>

                <div className="clip-text">
                  <h3 className="clip-title">{clip.label}</h3>
                  <p className="clip-caption">{clip.caption}</p>
                </div>
              </div>

              <div className="clip-video">
                <div className="video-frame small-frame">
                  <video
                    className="tutorial-video"
                    src={clip.video}
                    controls
                    preload="metadata"
                  />
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
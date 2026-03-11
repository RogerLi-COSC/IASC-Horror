import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import completeSfx from "../assets/complete.mp3";
import "./WordSearchMiniGame.css";

const WORDS = [
  "BLOOD",
  "SHADOW",
  "KNIFE",
  "CURSE",
  "SILENCE",
  "SCREAM",
  "GRAVE",
  "DOLL",
  "MOON",
  "FEAR",
  "DEAD",
  "WHISPER",
  "GHOST",
  "NIGHT",
];

const GRID_SIZE = 14;
const MAX_GENERATION_ATTEMPTS = 150;

const DIRECTIONS = [
  [0, 1],   // horizontal
  [1, 0],   // vertical
  [1, 1],   // diagonal down-right
  [1, -1],  // diagonal down-left
];

function shuffle(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function reverseWord(word) {
  return word.split("").reverse().join("");
}

function cellKey(row, col) {
  return `${row}-${col}`;
}

function buildPlacementCells(word, row, col, dr, dc) {
  return Array.from({ length: word.length }, (_, i) => ({
    row: row + dr * i,
    col: col + dc * i,
  }));
}

function canPlace(board, word, row, col, dr, dc) {
  for (let i = 0; i < word.length; i += 1) {
    const r = row + dr * i;
    const c = col + dc * i;

    if (r < 0 || r >= GRID_SIZE || c < 0 || c >= GRID_SIZE) return false;

    // No overlap at all.
    if (board[r][c] !== "") return false;
  }

  return true;
}

function createAnchors(count) {
  const cols = Math.ceil(Math.sqrt(count));
  const rows = Math.ceil(count / cols);
  const anchors = [];

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      anchors.push({
        row: ((row + 0.5) * GRID_SIZE) / rows - 0.5,
        col: ((col + 0.5) * GRID_SIZE) / cols - 0.5,
      });
    }
  }

  return shuffle(anchors).slice(0, count);
}

function getNeighborDensity(board, cells) {
  const candidateSet = new Set(cells.map((cell) => cellKey(cell.row, cell.col)));
  const seenNeighbors = new Set();
  let density = 0;

  cells.forEach(({ row, col }) => {
    for (let r = row - 1; r <= row + 1; r += 1) {
      for (let c = col - 1; c <= col + 1; c += 1) {
        if (r < 0 || r >= GRID_SIZE || c < 0 || c >= GRID_SIZE) continue;

        const key = cellKey(r, c);
        if (candidateSet.has(key) || seenNeighbors.has(key)) continue;

        if (board[r][c] !== "") {
          density += 1;
          seenNeighbors.add(key);
        }
      }
    }
  });

  return density;
}

function scorePlacement(board, cells, anchor) {
  const first = cells[0];
  const last = cells[cells.length - 1];
  const midRow = (first.row + last.row) / 2;
  const midCol = (first.col + last.col) / 2;

  const anchorDistance = Math.hypot(midRow - anchor.row, midCol - anchor.col);
  const neighborDensity = getNeighborDensity(board, cells);

  return anchorDistance * 4 + neighborDensity * 3 + Math.random() * 0.35;
}

function choosePlacement(board, word, anchor) {
  const candidates = [];
  const versions = shuffle([word, reverseWord(word)]);
  const directions = shuffle(DIRECTIONS);

  for (const version of versions) {
    for (const [dr, dc] of directions) {
      for (let row = 0; row < GRID_SIZE; row += 1) {
        for (let col = 0; col < GRID_SIZE; col += 1) {
          if (!canPlace(board, version, row, col, dr, dc)) continue;

          const cells = buildPlacementCells(version, row, col, dr, dc);

          candidates.push({
            version,
            cells,
            score: scorePlacement(board, cells, anchor),
          });
        }
      }
    }
  }

  if (!candidates.length) return null;

  candidates.sort((a, b) => a.score - b.score);

  // Keep boards varied, but still choose from the best placements.
  const topSlice = candidates.slice(0, Math.min(6, candidates.length));
  return topSlice[Math.floor(Math.random() * topSlice.length)];
}

function applyPlacement(board, solutionMap, originalWord, placement) {
  placement.cells.forEach((cell, index) => {
    board[cell.row][cell.col] = placement.version[index];
  });

  solutionMap[originalWord] = placement.cells;
}

function generateBoard() {
  const board = Array.from({ length: GRID_SIZE }, () =>
    Array(GRID_SIZE).fill("")
  );

  const solutionMap = {};
  const sortedWords = [...WORDS].sort((a, b) => b.length - a.length);
  const anchors = createAnchors(sortedWords.length);

  for (let i = 0; i < sortedWords.length; i += 1) {
    const word = sortedWords[i];
    const anchor = anchors[i];
    const placement = choosePlacement(board, word, anchor);

    if (!placement) return null;

    applyPlacement(board, solutionMap, word, placement);
  }

  for (let row = 0; row < GRID_SIZE; row += 1) {
    for (let col = 0; col < GRID_SIZE; col += 1) {
      if (!board[row][col]) {
        board[row][col] = String.fromCharCode(65 + Math.floor(Math.random() * 26));
      }
    }
  }

  return { board, solutionMap };
}

function makeBoard() {
  for (let attempt = 0; attempt < MAX_GENERATION_ATTEMPTS; attempt += 1) {
    const generated = generateBoard();
    if (generated) return generated;
  }

  throw new Error("Unable to build a valid word-search board.");
}

function buildPath(start, end) {
  const rowDiff = end.row - start.row;
  const colDiff = end.col - start.col;

  const sameRow = rowDiff === 0;
  const sameCol = colDiff === 0;
  const diagonal = Math.abs(rowDiff) === Math.abs(colDiff);

  if (!sameRow && !sameCol && !diagonal) return null;

  const stepRow = Math.sign(rowDiff);
  const stepCol = Math.sign(colDiff);
  const distance = Math.max(Math.abs(rowDiff), Math.abs(colDiff));

  return Array.from({ length: distance + 1 }, (_, i) => ({
    row: start.row + stepRow * i,
    col: start.col + stepCol * i,
  }));
}

export default function WordSearchMiniGame({ unlockPath = "/secret-2" }) {
  const navigate = useNavigate();
  const completeAudioRef = useRef(null);

  const [seed, setSeed] = useState(0);
  const [startCell, setStartCell] = useState(null);
  const [selectedPath, setSelectedPath] = useState([]);
  const [foundWords, setFoundWords] = useState([]);
  const [foundCells, setFoundCells] = useState(new Set());
  const [status, setStatus] = useState("Click the first letter, then the last.");

  const { board, solutionMap } = useMemo(() => makeBoard(), [seed]);

  useEffect(() => {
    completeAudioRef.current = new Audio(completeSfx);
    completeAudioRef.current.preload = "auto";
    completeAudioRef.current.volume = 0.15;
  }, []);

  function playComplete() {
    const audio = completeAudioRef.current;
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
    audio.play().catch(() => {});
  }

  function goToNextPage() {
    setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      navigate(unlockPath);
    }, 900);
  }

  function resetSelection(nextStatus = "Click the first letter, then the last.") {
    setStartCell(null);
    setSelectedPath([]);
    setStatus(nextStatus);
  }

  function handleHover(row, col) {
    if (!startCell) return;
    const path = buildPath(startCell, { row, col });
    setSelectedPath(path || [startCell]);
  }

  function handleSolve() {
    const allFoundCells = new Set();

    Object.values(solutionMap).forEach((cells) => {
      cells.forEach((cell) => {
        allFoundCells.add(cellKey(cell.row, cell.col));
      });
    });

    setFoundWords([...WORDS]);
    setFoundCells(allFoundCells);
    setStartCell(null);
    setSelectedPath([]);
    setStatus("All words found. Opening the next secret...");
    playComplete();
    goToNextPage();
  }

  function handleClick(row, col) {
    if (foundWords.length === WORDS.length) return;

    const clicked = { row, col };

    if (!startCell) {
      setStartCell(clicked);
      setSelectedPath([clicked]);
      setStatus("Choose the last letter.");
      return;
    }

    const path = buildPath(startCell, clicked);

    if (!path) {
      setStartCell(clicked);
      setSelectedPath([clicked]);
      setStatus("Straight lines only.");
      return;
    }

    const candidate = path.map((p) => board[p.row][p.col]).join("");

    const matchedWord = WORDS.find(
      (word) =>
        !foundWords.includes(word) &&
        (candidate === word || candidate === reverseWord(word))
    );

    if (!matchedWord) {
      resetSelection("Nothing there. Try again.");
      return;
    }

    const nextFoundWords = [...foundWords, matchedWord];
    const nextFoundCells = new Set(foundCells);

    path.forEach((p) => nextFoundCells.add(cellKey(p.row, p.col)));

    if (nextFoundWords.length === WORDS.length) {
      setFoundWords(nextFoundWords);
      setFoundCells(nextFoundCells);
      setStartCell(null);
      setSelectedPath([]);
      setStatus("All words found. Opening the next secret...");
      playComplete();
      goToNextPage();
      return;
    }

    playComplete();
    setFoundWords(nextFoundWords);
    setFoundCells(nextFoundCells);
    setStartCell(null);
    setSelectedPath([]);
    setStatus(`${matchedWord} found.`);
  }

  const selectedKeys = new Set(
    selectedPath.map((cell) => cellKey(cell.row, cell.col))
  );

  return (
    <section className="ws-wrap">
      <header className="ws-header">
        <h2 className="ws-title">Find the words before they find you.</h2>
        <p className="ws-sub">
          Words may be horizontal, vertical, diagonal, and sometimes backwards.
        </p>
      </header>

      <div className="ws-toolbar">
        <div className="ws-progress">
          FOUND <span>{foundWords.length}</span> / {WORDS.length}
        </div>

        <div className="ws-actions">
          <button
            type="button"
            className="ws-reset"
            onClick={() => {
              setSeed((s) => s + 1);
              setFoundWords([]);
              setFoundCells(new Set());
              resetSelection("Board reshuffled.");
            }}
          >
            Reshuffle
          </button>

          <button
            type="button"
            className="ws-reset ws-solve"
            onClick={handleSolve}
          >
            Solve
          </button>
        </div>
      </div>

      <div className="ws-layout">
        <div className="ws-grid-wrap">
          <div
            className="ws-grid"
            style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))` }}
          >
            {board.map((row, rowIndex) =>
              row.map((letter, colIndex) => {
                const key = cellKey(rowIndex, colIndex);
                const isSelected = selectedKeys.has(key);
                const isFound = foundCells.has(key);

                return (
                  <button
                    key={key}
                    type="button"
                    className={`ws-cell ${isSelected ? "is-selected" : ""} ${isFound ? "is-found" : ""}`}
                    onMouseEnter={() => handleHover(rowIndex, colIndex)}
                    onClick={() => handleClick(rowIndex, colIndex)}
                    aria-label={`Letter ${letter}`}
                  >
                    {letter}
                  </button>
                );
              })
            )}
          </div>

          <p className="ws-status">{status}</p>
        </div>

        <aside className="ws-sidebar">
          <h3 className="ws-sidebar-title">Answer Key</h3>

          <ul className="ws-word-list">
            {WORDS.map((word) => {
              const isFound = foundWords.includes(word);

              return (
                <li key={word} className={`ws-word ${isFound ? "is-found" : ""}`}>
                  <span>{word}</span>
                  <em>{isFound ? "FOUND" : "HIDDEN"}</em>
                </li>
              );
            })}
          </ul>
        </aside>
      </div>
    </section>
  );
}
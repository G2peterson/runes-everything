import "./style.css";
import { RUNES } from "./runes.js";

const app = document.querySelector("#app");

let bag = makeBag();
let lastDraw = null;

function makeBag() {
  return RUNES.map(r => ({ ...r }));
}

function drawOneNoDup() {
  if (bag.length === 0) bag = makeBag();
  const idx = Math.floor(Math.random() * bag.length);
  return bag.splice(idx, 1)[0];
}

// Drop visually left to right: Result, Test, Past
// But present answer as Past, Test, Result
function drawSpread() {
  const past = drawOneNoDup();
  const test = drawOneNoDup();
  const result = drawOneNoDup();
  lastDraw = { past, test, result };
  render();
}

function renderCard(slotLabel, rune) {
  return `
    <div class="card">
      <div class="slot">${slotLabel}</div>
      <div class="glyph">${rune.glyph}</div>
      <div class="meta">
        <div><strong>#${rune.n}</strong>, ${rune.name}</div>
        <div>Sound, ${rune.sound}</div>
        <div class="small">${rune.hint}</div>
      </div>
    </div>
  `;
}

function render() {
  app.innerHTML = `
    <h1>Rune’s Everything</h1>

    <div class="controls">
      <button id="draw">Draw 3 runes</button>
      <button id="reset">Reset bag</button>
      <button id="showGlyphs">Show glyphs only</button>
    </div>

    ${lastDraw ? `
      <div class="spread">
        ${renderCard("Result (left box)", lastDraw.result)}
        ${renderCard("Test (middle box)", lastDraw.test)}
        ${renderCard("Past (right box)", lastDraw.past)}
      </div>

      <div class="small" style="margin-top: 12px;">
        Answer order, Past ${lastDraw.past.name}, Test ${lastDraw.test.name}, Result ${lastDraw.result.name}
      </div>
    ` : `<div class="small">Hit “Draw 3 runes” to start.</div>`}
  `;

  document.querySelector("#draw").onclick = drawSpread;

  document.querySelector("#reset").onclick = () => {
    bag = makeBag();
    lastDraw = null;
    render();
  };

  document.querySelector("#showGlyphs").onclick = () => {
    if (!lastDraw) return;
    alert(`${lastDraw.past.glyph}  ${lastDraw.test.glyph}  ${lastDraw.result.glyph}`);
  };
}

render();

(function () {
  const $ = (id) => document.getElementById(id);

  const pastEl = $("past"), testEl = $("test"), resultEl = $("result");
  const pastName = $("pastName"), testName = $("testName"), resultName = $("resultName");
  const pastEmoji = $("pastEmoji"), testEmoji = $("testEmoji"), resultEmoji = $("resultEmoji");
  const sentenceEl = $("sentence");
  const drawBtn = $("drawBtn");
  const resetBtn = $("resetBtn");

  function ensureDeck() {
    if (!window.RUNES || !Array.isArray(window.RUNES) || window.RUNES.length !== 24) {
      sentenceEl.textContent = "Deck missing. runes.js did not load.";
      return false;
    }
    return true;
  }

  let bag = [];

  function resetBag() {
    if (!ensureDeck()) return;
    bag = window.RUNES.slice();
    clearUI();
    sentenceEl.textContent = "Bag reset. Ready to draw.";
  }

  function clearUI() {
    pastEl.textContent = "—"; testEl.textContent = "—"; resultEl.textContent = "—";
    pastName.textContent = ""; testName.textContent = ""; resultName.textContent = "";
    pastEmoji.textContent = ""; testEmoji.textContent = ""; resultEmoji.textContent = "";
  }

  function pullOne() {
    const i = Math.floor(Math.random() * bag.length);
    return bag.splice(i, 1)[0];
  }

  function draw() {
    if (!ensureDeck()) return;
    if (bag.length < 3) resetBag();

    const past = pullOne();
    const test = pullOne();
    const result = pullOne();

    pastEl.textContent = past.glyph;
    testEl.textContent = test.glyph;
    resultEl.textContent = result.glyph;

    pastName.textContent = `${past.n} • ${past.name}`;
    testName.textContent = `${test.n} • ${test.name}`;
    resultName.textContent = `${result.n} • ${result.name}`;

    pastEmoji.textContent = past.emoji;
    testEmoji.textContent = test.emoji;
    resultEmoji.textContent = result.emoji;

    sentenceEl.textContent =
      `Past: ${past.name} (${past.meaning}), Test: ${test.name} (${test.meaning}), Result: ${result.name} (${result.meaning}).`;
  }

  drawBtn.addEventListener("click", draw);
  resetBtn.addEventListener("click", resetBag);

  // Boot
  if (ensureDeck()) resetBag();
})();


// main.js, app logic

(function () {
  const deckBase = (window.RUNES_DECK || []).slice();

  const el = (id) => document.getElementById(id);

  const drawBtn = el("drawBtn");
  const resetBtn = el("resetBtn");
  const toneToggle = el("toneToggle");

  const glyphPast = el("glyphPast");
  const glyphTest = el("glyphTest");
  const glyphResult = el("glyphResult");

  const metaPast = el("metaPast");
  const metaTest = el("metaTest");
  const metaResult = el("metaResult");

  const cards = el("cards");
  const reading = el("reading");
  const status = el("status");
  const lastDraw = el("lastDraw");

  let bag = [];
  let drawCount = 0;

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const t = arr[i];
      arr[i] = arr[j];
      arr[j] = t;
    }
    return arr;
  }

  function resetBag() {
    bag = shuffle(deckBase.slice());
    status.textContent = "Bag reset, 24 runes ready.";
  }

  function aettName(n) {
    if (n >= 1 && n <= 8) return "First Ætt";
    if (n >= 9 && n <= 16) return "Second Ætt";
    return "Third Ætt";
  }

  function renderBox(which, r) {
    const meta = `#${r.n} ${r.name}, ${r.pronunciation}`;
    if (which === "past") {
      glyphPast.textContent = r.glyph;
      metaPast.textContent = meta;
    }
    if (which === "test") {
      glyphTest.textContent = r.glyph;
      metaTest.textContent = meta;
    }
    if (which === "result") {
      glyphResult.textContent = r.glyph;
      metaResult.textContent = meta;
    }
  }

  function cardHTML(r, positionLabel) {
    const emojiLine = (r.emoji || []).join(" ");
    return `
      <article class="card">
        <div class="cardTop">
          <div class="cardTitle">${r.n} , ${r.name}</div>
          <div class="cardGlyph">${r.glyph}</div>
        </div>
        <div class="cardRow">Pronunciation, ${r.pronunciation}</div>
        <div class="cardRow">Emoji, ${emojiLine}</div>
        <div class="cardRow">Meaning, ${r.meaning}</div>
        <div class="cardRow">Ætt, ${aettName(r.n)} , ${positionLabel}</div>
      </article>
    `;
  }

  function threeLineMeditation(r) {
    // Simple, clean, non directive, third person
    const lines = [];
    lines.push(`This symbol points toward ${r.meaning.toLowerCase()}.`);
    lines.push(`It can be held as an anchor rather than a command.`);
    lines.push(`Attention on it tends to reveal what is already true.`);
    return lines;
  }

  function buildReading(past, test, result, humorous) {
    const pastLines = threeLineMeditation(past);
    const testLines = threeLineMeditation(test);
    const resultLines = threeLineMeditation(result);

    const hook = humorous
      ? `Tonight, the runes are being polite, but they are not whispering.`
      : `Tonight, the runes offer three anchors that can be held without forcing an outcome.`;

    const paragraph = `
      ${hook}
      ${past.name} suggests the recent background is about ${past.meaning.toLowerCase()}.
      ${test.name} places the present moment under ${test.meaning.toLowerCase()}.
      ${result.name} points toward ${result.meaning.toLowerCase()} as the direction of release.
      A person could treat this as a centering exercise, notice where the body tightens, then let the three anchors widen the track again.
    `;

    return `
      <div>
        <div><strong>Past,</strong> ${past.glyph} ${past.name}</div>
        <p>${pastLines.join("<br>")}</p>

        <div style="margin-top:10px;"><strong>Test,</strong> ${test.glyph} ${test.name}</div>
        <p>${testLines.join("<br>")}</p>

        <div style="margin-top:10px;"><strong>Result,</strong> ${result.glyph} ${result.name}</div>
        <p>${resultLines.join("<br>")}</p>

        <p style="margin-top:12px;">${paragraph}</p>
      </div>
    `;
  }

  function drawThree() {
    if (bag.length < 3) resetBag();

    // Pull in order from bag, no duplicates
    const past = bag.pop();
    const test = bag.pop();
    const result = bag.pop();

    drawCount += 1;

    // Right box is Past, middle is Test, left is Result
    renderBox("past", past);
    renderBox("test", test);
    renderBox("result", result);

    lastDraw.textContent = `Draw #${drawCount}, numbers, ${past.n}, ${test.n}, ${result.n}. Remaining in bag, ${bag.length}.`;

    cards.innerHTML =
      cardHTML(past, "Past") +
      cardHTML(test, "Test") +
      cardHTML(result, "Result");

    const humorous = !!(toneToggle && toneToggle.checked);
    reading.innerHTML = buildReading(past, test, result, humorous);
  }

  function boot() {
    if (!deckBase.length) {
      if (status) status.textContent = "Deck missing. script.js did not load.";
      return;
    }

    resetBag();

    if (drawBtn) drawBtn.addEventListener("click", drawThree);
    if (resetBtn) resetBtn.addEventListener("click", () => {
      resetBag();
      glyphPast.textContent = "?";
      glyphTest.textContent = "?";
      glyphResult.textContent = "?";
      metaPast.textContent = "";
      metaTest.textContent = "";
      metaResult.textContent = "";
      cards.innerHTML = "";
      reading.innerHTML = "";
      lastDraw.textContent = "";
    });

    if (status) status.textContent = "Ready. Hit Draw.";
  }

  boot();
})();

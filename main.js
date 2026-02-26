import { RUNES } from "./runes.js";

const els = {
  drawBtn: document.getElementById("drawBtn"),
  resetBagBtn: document.getElementById("resetBagBtn"),
  clearHistoryBtn: document.getElementById("clearHistoryBtn"),
  pastCard: document.getElementById("pastCard"),
  testCard: document.getElementById("testCard"),
  resultCard: document.getElementById("resultCard"),
  singleSentence: document.getElementById("singleSentence"),
  paragraph: document.getElementById("paragraph"),
  tone: document.getElementById("tone"),
  detail: document.getElementById("detail"),
  humor: document.getElementById("humor"),
};

const STORAGE_KEYS = {
  bag: "runes_everything_bag_v1",
  history: "runes_everything_history_v1",
  settings: "runes_everything_settings_v1",
};

function loadSettings() {
  try {
    const s = JSON.parse(localStorage.getItem(STORAGE_KEYS.settings) || "{}");
    return {
      tone: s.tone || "neutral",
      detail: s.detail || "medium",
      humor: s.humor || "off",
    };
  } catch {
    return { tone: "neutral", detail: "medium", humor: "off" };
  }
}

function saveSettings(settings) {
  localStorage.setItem(STORAGE_KEYS.settings, JSON.stringify(settings));
}

function getSettingsFromUI() {
  return {
    tone: els.tone.value,
    detail: els.detail.value,
    humor: els.humor.value,
  };
}

function applySettingsToUI(settings) {
  els.tone.value = settings.tone;
  els.detail.value = settings.detail;
  els.humor.value = settings.humor;
}

function loadBag() {
  const raw = localStorage.getItem(STORAGE_KEYS.bag);
  if (!raw) return makeNewBag();
  try {
    const ids = JSON.parse(raw);
    if (!Array.isArray(ids) || ids.length === 0) return makeNewBag();
    return ids;
  } catch {
    return makeNewBag();
  }
}

function saveBag(bagIds) {
  localStorage.setItem(STORAGE_KEYS.bag, JSON.stringify(bagIds));
}

function makeNewBag() {
  const ids = RUNES.map(r => r.n);
  shuffleInPlace(ids);
  saveBag(ids);
  return ids;
}

function shuffleInPlace(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }
}

function drawOneNoDup() {
  let bag = loadBag();
  if (bag.length === 0) bag = makeNewBag();
  const n = bag.pop();
  saveBag(bag);
  return runeByNumber(n);
}

function runeByNumber(n) {
  const r = RUNES.find(x => x.n === n);
  if (!r) throw new Error("Missing rune: " + n);
  return r;
}

function saveHistory(entry) {
  const raw = localStorage.getItem(STORAGE_KEYS.history);
  let list = [];
  try { list = raw ? JSON.parse(raw) : []; } catch { list = []; }
  list.unshift(entry);
  list = list.slice(0, 50);
  localStorage.setItem(STORAGE_KEYS.history, JSON.stringify(list));
}

function clearHistory() {
  localStorage.removeItem(STORAGE_KEYS.history);
}

function renderCard(el, roleLabel, rune) {
  el.innerHTML = `
    <div class="pos">${roleLabel}</div>
    <div class="topline">
      <div>
        <div class="num">#${rune.n}</div>
        <p class="name">${escapeHtml(rune.name)}</p>
      </div>
      <div style="text-align:right">
        <div class="glyph">${escapeHtml(rune.glyph)}</div>
        <div class="emoji">${escapeHtml(rune.emoji || "")}</div>
      </div>
    </div>
    <div class="meta">
      <div><strong>Sound</strong> ${escapeHtml(rune.sound)}</div>
      <div><strong>Keywords</strong> ${escapeHtml(rune.keywords.join(", "))}</div>
    </div>
  `;
}

function escapeHtml(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function chooseTheme(past, test, result) {
  const themes = [
    { id: "orientation", label: "orientation", tags: ["direction","order","focus","stability"] },
    { id: "boundaries", label: "boundaries", tags: ["boundary","safety","discipline","shield"] },
    { id: "exchange", label: "exchange", tags: ["trade","balance","bond","community"] },
    { id: "clarity", label: "clarity", tags: ["clarity","meaning","skill","vitality"] },
    { id: "change", label: "change", tags: ["change","turning","shock","unknown"] },
    { id: "growth", label: "growth", tags: ["growth","renewal","cycle","potential"] },
    { id: "flow", label: "flow", tags: ["movement","emotion","adapt","journey"] },
  ];

  const allTags = [...past.tags, ...test.tags, ...result.tags];

  let best = [];
  let bestScore = -1;

  for (const t of themes) {
    const score = t.tags.reduce((acc, tag) => acc + (allTags.includes(tag) ? 1 : 0), 0);
    if (score > bestScore) {
      bestScore = score;
      best = [t];
    } else if (score === bestScore) {
      best.push(t);
    }
  }

  if (best.length === 0) return themes[0];
  return best[Math.floor(Math.random() * best.length)];
}

function roleText(role, rune) {
  const k = rune.keywords;
  if (role === "past") {
    return `Past suggests ${k[0]}, with ${k[1] || k[0]} close by.`;
  }
  if (role === "test") {
    return `Test points to ${k[0]}, the friction is around ${k[1] || k[0]}.`;
  }
  return `Result leans toward ${k[0]}, supported by ${k[1] || k[0]}.`;
}

function toneMods(settings) {
  const tone = settings.tone;
  const humor = settings.humor;

  const hedge = (tone === "direct") ? "" : "may ";
  const suggestWord = (tone === "direct") ? "signals" : "suggests";
  const taskPhrase =
    (tone === "direct")
      ? "The task is not to control, it is to maintain."
      : "The task of the day is not to control conditions, it is to maintain orientation.";

  const joke =
    (humor === "light")
      ? " No prophecy, just railroad tracks, stay on them."
      : "";

  return { hedge, suggestWord, taskPhrase, joke };
}

function makeSingleSentence(past, test, result, theme, settings) {
  const { taskPhrase, joke } = toneMods(settings);

  const core =
    `Past ${past.keywords[0]}, Test ${test.keywords[0]}, Result ${result.keywords[0]}. ${taskPhrase}`;

  if (settings.detail === "short") return core + joke;

  const themed =
    `Theme is ${theme.label}, Past ${past.keywords[0]}, Test ${test.keywords[0]}, Result ${result.keywords[0]}. ${taskPhrase}`;

  return themed + joke;
}

function makeParagraph(past, test, result, theme, settings) {
  const { suggestWord } = toneMods(settings);

  const p1 = `${past.name} ${suggestWord} recent conditions around ${past.keywords.join(", ")}.`;
  const p2 = `${test.name} ${suggestWord} the day’s pressure point, it highlights ${test.keywords.join(", ")}, as a boundary to notice, not a fight to win.`;
  const p3 = `${result.name} ${suggestWord} the balancing direction, ${result.keywords.join(", ")} helps keep orientation.`;

  if (settings.detail === "short") {
    return `${p1} ${p3}`;
  }

  if (settings.detail === "long") {
    return `${p1} Theme is ${theme.label}, so it helps to treat these as railroad tracks, constraints that keep movement honest. ${p2} ${p3}`;
  }

  return `${p1} ${p2} ${p3}`;
}

function drawSpread() {
  const past = drawOneNoDup();
  let test = drawOneNoDup();
  let result = drawOneNoDup();

  // safety, in case bag logic is ever changed later
  if (test.n === past.n) test = drawOneNoDup();
  if (result.n === past.n || result.n === test.n) result = drawOneNoDup();

  const settings = getSettingsFromUI();
  saveSettings(settings);

  const theme = chooseTheme(past, test, result);

  renderCard(els.pastCard, "Past", past);
  renderCard(els.testCard, "Test", test);
  renderCard(els.resultCard, "Result", result);

  els.singleSentence.textContent = makeSingleSentence(past, test, result, theme, settings);
  els.paragraph.textContent = makeParagraph(past, test, result, theme, settings);

  saveHistory({
    at: new Date().toISOString(),
    past: past.n,
    test: test.n,
    result: result.n,
    theme: theme.id,
    settings,
  });
}

function init() {
  const settings = loadSettings();
  applySettingsToUI(settings);

  els.drawBtn.addEventListener("click", drawSpread);

  els.resetBagBtn.addEventListener("click", () => {
    makeNewBag();
    els.singleSentence.textContent = "Bag reset.";
    els.paragraph.textContent = "";
  });

  els.clearHistoryBtn.addEventListener("click", () => {
    clearHistory();
    els.singleSentence.textContent = "History cleared.";
    els.paragraph.textContent = "";
  });

  // first render placeholders
  els.pastCard.textContent = "Past card";
  els.testCard.textContent = "Test card";
  els.resultCard.textContent = "Result card";
  els.singleSentence.textContent = "Press Draw Past, Test, Result.";
  els.paragraph.textContent = "";
}

init();

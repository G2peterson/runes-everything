/* main.js
   Runes Everything, Elder Futhark, 24 rune deck, Past Test Result draw
   Tone toggle, flashcards, aett wisdom, daily paragraph
*/

(() => {
  "use strict";

  // --------- DATA, LOCKED DECK (24) ---------

  const RUNES = [
    {
      id: 1,
      name: "Fehu",
      pronunciation: "FAY-hoo",
      glyph: "ᚠ",
      emoji: "🐄",
      meaning: "Movable wealth, resources requiring care and circulation",
      meditation: [
        "What you possess requires attention.",
        "Stagnant value decays.",
        "Care is the price of abundance."
      ],
      aett: 1
    },
    {
      id: 2,
      name: "Uruz",
      pronunciation: "OO-rooz",
      glyph: "ᚢ",
      emoji: "🐂",
      meaning: "Raw strength, primal vitality, untamed force",
      meditation: [
        "Strength is reclaimed, not granted.",
        "Stand firm in your body.",
        "Power is alive."
      ],
      aett: 1
    },
    {
      id: 3,
      name: "Thurisaz",
      pronunciation: "THUR-ee-saz",
      glyph: "ᚦ",
      emoji: "🌵",
      meaning: "Boundary, defensive force, necessary conflict",
      meditation: [
        "Sharp edges teach respect.",
        "Power demands awareness.",
        "Choose what you challenge."
      ],
      aett: 1
    },
    {
      id: 4,
      name: "Ansuz",
      pronunciation: "AHN-sooz",
      glyph: "ᚨ",
      emoji: "🗣️",
      meaning: "Divine speech, truth carried through voice",
      meditation: [
        "Breath shapes reality.",
        "Listen before speaking.",
        "Words carry consequence."
      ],
      aett: 1
    },
    {
      id: 5,
      name: "Raidho",
      pronunciation: "RYE-tho",
      glyph: "ᚱ",
      emoji: "🛞",
      meaning: "Right movement, ordered journey",
      meditation: [
        "Move with purpose.",
        "Let rhythm guide you.",
        "The path responds to intention."
      ],
      aett: 1
    },
    {
      id: 6,
      name: "Kenaz",
      pronunciation: "KANE-ahz",
      glyph: "ᚲ",
      emoji: "🔥",
      meaning: "Illumination, controlled fire, insight",
      meditation: [
        "Light reveals form.",
        "Ignite carefully.",
        "Clarity burns clean."
      ],
      aett: 1
    },
    {
      id: 7,
      name: "Gebo",
      pronunciation: "GAY-boh",
      glyph: "ᚷ",
      emoji: "🎁",
      meaning: "Gift, exchange, balanced reciprocity",
      meditation: [
        "A gift binds both hands.",
        "What is given creates a tie.",
        "Balance keeps it sacred."
      ],
      aett: 1
    },
    {
      id: 8,
      name: "Wunjo",
      pronunciation: "WOON-yo",
      glyph: "ᚹ",
      emoji: "🎵",
      meaning: "Joy, harmony, rightful alignment",
      meditation: [
        "Joy signals alignment.",
        "Ease is not weakness.",
        "Harmony reveals truth."
      ],
      aett: 1
    },
    {
      id: 9,
      name: "Hagalaz",
      pronunciation: "HAH-gah-lahz",
      glyph: "ᚺ",
      emoji: "⛈️",
      meaning: "Disruption, natural upheaval, necessary reset",
      meditation: [
        "Storms cleanse.",
        "Resistance shatters.",
        "Transformation strikes fast."
      ],
      aett: 2
    },
    {
      id: 10,
      name: "Nauthiz",
      pronunciation: "NOW-theez",
      glyph: "ᚾ",
      emoji: "🔒",
      meaning: "Constraint, necessity, pressure",
      meditation: [
        "Restriction sharpens focus.",
        "Need clarifies desire.",
        "Endure the tightening."
      ],
      aett: 2
    },
    {
      id: 11,
      name: "Isa",
      pronunciation: "EE-sah",
      glyph: "ᛁ",
      emoji: "🧊",
      meaning: "Stillness, pause, suspended motion",
      meditation: [
        "Stop without panic.",
        "Hold steady.",
        "Silence forms structure."
      ],
      aett: 2
    },
    {
      id: 12,
      name: "Jera",
      pronunciation: "YEH-rah",
      glyph: "ᛃ",
      emoji: "🌾",
      meaning: "Harvest, cycle, earned outcome",
      meditation: [
        "Time completes effort.",
        "Patience grows reward.",
        "Seasons turn inevitably."
      ],
      aett: 2
    },
    {
      id: 13,
      name: "Eihwaz",
      pronunciation: "AY-wahz",
      glyph: "ᛇ",
      emoji: "🌲",
      meaning: "Endurance through transition, yew stability",
      meditation: [
        "Roots survive storms.",
        "Death feeds rebirth.",
        "Stand between worlds."
      ],
      aett: 2
    },
    {
      id: 14,
      name: "Perthro",
      pronunciation: "PER-throw",
      glyph: "ᛈ",
      emoji: "🎲",
      meaning: "Mystery, hidden process, unfolding chance",
      meditation: [
        "What is unseen is active.",
        "Trust the hidden hand.",
        "The pattern reveals itself."
      ],
      aett: 2
    },
    {
      id: 15,
      name: "Algiz",
      pronunciation: "AL-geez",
      glyph: "ᛉ",
      emoji: "🛡️",
      meaning: "Protection, higher awareness, guarded stance",
      meditation: [
        "Stand under watchful sky.",
        "Boundaries guard life.",
        "Lift your awareness."
      ],
      aett: 2
    },
    {
      id: 16,
      name: "Sowilo",
      pronunciation: "SO-wee-lo",
      glyph: "ᛊ",
      emoji: "☀️",
      meaning: "Victory, solar force, clarity through light",
      meditation: [
        "Shine without apology.",
        "Direction brings success.",
        "Light dissolves doubt."
      ],
      aett: 2
    },
    {
      id: 17,
      name: "Tiwaz",
      pronunciation: "TEE-wahz",
      glyph: "ᛏ",
      emoji: "⚔️",
      meaning: "Justice, honorable sacrifice",
      meditation: [
        "Stand for what is right.",
        "Loss may be required.",
        "Integrity outlives ego."
      ],
      aett: 3
    },
    {
      id: 18,
      name: "Berkano",
      pronunciation: "BEAR-kah-no",
      glyph: "ᛒ",
      emoji: "🌱",
      meaning: "Birth, nurturing growth",
      meditation: [
        "Protect what is new.",
        "Gentleness strengthens.",
        "Growth needs shelter."
      ],
      aett: 3
    },
    {
      id: 19,
      name: "Ehwaz",
      pronunciation: "AY-wahz",
      glyph: "ᛖ",
      emoji: "🏇",
      meaning: "Trust, partnership, forward movement",
      meditation: [
        "Move together.",
        "Balance guides speed.",
        "Trust builds momentum."
      ],
      aett: 3
    },
    {
      id: 20,
      name: "Mannaz",
      pronunciation: "MAH-nahz",
      glyph: "ᛗ",
      emoji: "🧍",
      meaning: "Humanity, self-awareness, interdependence",
      meditation: [
        "Know yourself clearly.",
        "Community shapes identity.",
        "Wisdom lives between people."
      ],
      aett: 3
    },
    {
      id: 21,
      name: "Laguz",
      pronunciation: "LAH-gooz",
      glyph: "ᛚ",
      emoji: "🌊",
      meaning: "Flow, intuition, deep current",
      meditation: [
        "Follow the current.",
        "Depth holds truth.",
        "Let instinct guide gently."
      ],
      aett: 3
    },
    {
      id: 22,
      name: "Ingwaz",
      pronunciation: "ING-wahz",
      glyph: "ᛜ",
      emoji: "🌰",
      meaning: "Stored potential, gestation, contained power",
      meditation: [
        "Energy gathers quietly.",
        "Readiness precedes action.",
        "What is ripe will rise."
      ],
      aett: 3
    },
    {
      id: 23,
      name: "Dagaz",
      pronunciation: "DAH-gahz",
      glyph: "ᛞ",
      emoji: "🌅",
      meaning: "Breakthrough, awakening, sudden clarity",
      meditation: [
        "Light splits darkness.",
        "Shift arrives fully.",
        "Awareness changes everything."
      ],
      aett: 3
    },
    {
      id: 24,
      name: "Othala",
      pronunciation: "OH-tha-lah",
      glyph: "ᛟ",
      emoji: "🏠",
      meaning: "Ancestral legacy, inheritance, rooted belonging",
      meditation: [
        "You carry what came before.",
        "Home shapes identity.",
        "Keep what strengthens you."
      ],
      aett: 3
    }
  ];

  // --------- ÆTT WISDOM (9 lines), REUSED ---------

  const AETT_NAMES = {
    1: "First Ætt",
    2: "Second Ætt",
    3: "Third Ætt"
  };

  const AETT_WISDOM = {
    1: {
      Past: "Foundation is emphasized, what was built, earned, held, or spent is still shaping the moment.",
      Test: "Resources and habits are being tested, keep it simple, keep it steady, keep it honest.",
      Result: "A practical next step appears, small care and correct action tend to compound."
    },
    2: {
      Past: "Forces have been in motion, pressure, disruption, or constraint has been part of the recent terrain.",
      Test: "The moment asks for endurance and clarity, respond, do not thrash, do not freeze.",
      Result: "A turning point forms through adaptation, the lesson becomes usable strength."
    },
    3: {
      Past: "People, identity, and belonging have mattered, the social field has been part of the story.",
      Test: "Alignment is tested in relationship and values, integrity shows up in choices, not slogans.",
      Result: "Integration and legacy emerge, what is learned becomes part of how one lives with others."
    }
  };

  // --------- UI HOOKS (match these ids in your HTML) ---------
  // Required ids:
  // drawBtn, toneToggle (checkbox or select), cards, reading
  // Optional ids:
  // status, lastDraw

  const el = {
    drawBtn: document.getElementById("drawBtn"),
    toneToggle: document.getElementById("toneToggle"),
    cards: document.getElementById("cards"),
    reading: document.getElementById("reading"),
    status: document.getElementById("status"),
    lastDraw: document.getElementById("lastDraw")
  };

  function setStatus(msg) {
    if (!el.status) return;
    el.status.textContent = msg;
  }

  function getTone() {
    if (!el.toneToggle) return "serious";

    // If it is a select
    if (el.toneToggle.tagName === "SELECT") {
      return (el.toneToggle.value || "serious").toLowerCase();
    }

    // If it is a checkbox, checked = humorous
    if (el.toneToggle.type === "checkbox") {
      return el.toneToggle.checked ? "humorous" : "serious";
    }

    // Fallback
    return (el.toneToggle.value || "serious").toLowerCase();
  }

  // --------- DRAW LOGIC (no duplicates) ---------

  function drawThreeUnique() {
    const bag = RUNES.slice();
    const pickOne = () => {
      const idx = Math.floor(Math.random() * bag.length);
      return bag.splice(idx, 1)[0];
    };

    // Past, Test, Result in that order as requested
    const past = pickOne();
    const test = pickOne();
    const result = pickOne();

    return { past, test, result };
  }

  // --------- RENDERING ---------

  function escapeHtml(s) {
    return String(s)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function cardHtml(rune, positionLabel) {
    const aettName = AETT_NAMES[rune.aett] || `Ætt ${rune.aett}`;
    const wisdomLine = (AETT_WISDOM[rune.aett] && AETT_WISDOM[rune.aett][positionLabel]) ? AETT_WISDOM[rune.aett][positionLabel] : "";

    return `
      <div class="card">
        <div class="cardTop">
          <div class="cardTitle">${escapeHtml(rune.id)} , ${escapeHtml(rune.name)}</div>
          <div class="cardMeta">Pronunciation , ${escapeHtml(rune.pronunciation)}</div>
        </div>

        <div class="cardGlyphRow">
          <div class="glyph">${escapeHtml(rune.glyph)}</div>
          <div class="emoji">${escapeHtml(rune.emoji)}</div>
        </div>

        <div class="cardSection">
          <div class="label">Meaning</div>
          <div class="value">${escapeHtml(rune.meaning)}</div>
        </div>

        <div class="cardSection">
          <div class="label">Meditation</div>
          <div class="value">
            ${escapeHtml(rune.meditation[0])}<br>
            ${escapeHtml(rune.meditation[1])}<br>
            ${escapeHtml(rune.meditation[2])}
          </div>
        </div>

        <div class="cardSection">
          <div class="label">Ætt Wisdom , ${escapeHtml(aettName)} , ${escapeHtml(positionLabel)}</div>
          <div class="value">${escapeHtml(wisdomLine)}</div>
        </div>

        <div class="positionTag">${escapeHtml(positionLabel)}</div>
      </div>
    `;
  }

  function renderSpread(spread) {
    // Display order left to right on screen, Past, Test, Result
    // If you want right to left visually, swap the order here
    const pastHtml = cardHtml(spread.past, "Past");
    const testHtml = cardHtml(spread.test, "Test");
    const resultHtml = cardHtml(spread.result, "Result");

    if (el.cards) {
      el.cards.innerHTML = `
        <div class="spread">
          ${pastHtml}
          ${testHtml}
          ${resultHtml}
        </div>
      `;
    }

    if (el.lastDraw) {
      el.lastDraw.textContent = `${spread.past.id} , ${spread.test.id} , ${spread.result.id}`;
    }
  }

  // --------- DAILY PARAGRAPH ENGINE (SERIOUS / HUMOROUS) ---------

  function makeOneLiner(spread, tone) {
    const a = spread.past;
    const b = spread.test;
    const c = spread.result;

    if (tone === "humorous") {
      return `${a.name} says the past had momentum, ${b.name} says the middle is the weird part, ${c.name} says the ending wants a clean landing.`;
    }

    return `${a.name} frames what shaped the moment, ${b.name} highlights the pressure point, ${c.name} shows a steady direction forward.`;
  }

  function makeParagraph(spread, tone) {
    const a = spread.past;
    const b = spread.test;
    const c = spread.result;

    // Third person, non predictive, meditation oriented
    if (tone === "humorous") {
      return [
        `${a.glyph} ${a.name} sets the background, resources and momentum are not self maintaining, they want attention.`,
        `${b.glyph} ${b.name} puts a bump in the road, it is a check for balance, boundaries, and clean effort.`,
        `${c.glyph} ${c.name} points to a practical win, keep it simple, keep it moving, keep it kind.`
      ].join("\n");
    }

    return [
      `${a.glyph} ${a.name} frames recent conditions, what has been held, built, or carried still influences the present.`,
      `${b.glyph} ${b.name} names the current test, attention to boundaries, rhythm, and clarity supports steadiness.`,
      `${c.glyph} ${c.name} suggests an outcome of alignment, progress comes through deliberate steps and honest direction.`
    ].join("\n");
  }

  function renderReading(spread) {
    const tone = getTone();
    const oneLiner = makeOneLiner(spread, tone);
    const paragraph = makeParagraph(spread, tone);

    if (!el.reading) return;

    el.reading.innerHTML = `
      <div class="readingBox">
        <div class="readingTone">Tone , ${escapeHtml(tone)}</div>
        <div class="readingOneLiner">${escapeHtml(oneLiner)}</div>
        <pre class="readingParagraph">${escapeHtml(paragraph)}</pre>
      </div>
    `;
  }

  // --------- ACTIONS ---------

  function doDraw() {
    const spread = drawThreeUnique();
    renderSpread(spread);
    renderReading(spread);
    setStatus("Draw complete.");
  }

  // --------- WIRE UP ---------

  function init() {
    if (!el.drawBtn) {
      setStatus("Missing draw button. Add id drawBtn to your button.");
      return;
    }

    el.drawBtn.addEventListener("click", doDraw);

    if (el.toneToggle) {
      el.toneToggle.addEventListener("change", () => {
        // Re render reading for current cards if present
        // Simple approach, just do a fresh draw if you prefer, but we keep it stable
        const last = el.lastDraw ? el.lastDraw.textContent : "";
        if (!last || !el.cards || !el.cards.innerHTML.trim()) return;

        // Extract ids from lastDraw
        const parts = last.split(",").map(s => parseInt(s.trim(), 10)).filter(n => Number.isFinite(n));
        if (parts.length !== 3) return;

        const past = RUNES.find(r => r.id === parts[0]);
        const test = RUNES.find(r => r.id === parts[1]);
        const result = RUNES.find(r => r.id === parts[2]);
        if (!past || !test || !result) return;

        renderReading({ past, test, result });
      });
    }

    setStatus("Ready.");
  }

  init();
})();

    }

    setStatus("Ready.");
  }

  init();
})();


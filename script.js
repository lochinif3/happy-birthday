/*************************************************
 * Verify Screen (Gate)
 *************************************************/
const q1 = document.getElementById("q1");
const q2 = document.getElementById("q2");
const radios = document.querySelectorAll('input[name="q3"]');
const submitBtn = document.getElementById("submit-btn");
const retryBtn = document.getElementById("retry-btn");
const errorMsg = document.getElementById("error-msg");

function clearError() {
  errorMsg.textContent = "";
  retryBtn.hidden = true;
}
function resetForm() {
  q1.value = "";
  q2.value = "";
  radios.forEach((r) => (r.checked = false));
  clearError();
  q1.focus();
}

[q1, q2].forEach((el) => el.addEventListener("input", clearError));
radios.forEach((r) => r.addEventListener("change", clearError));
retryBtn.addEventListener("click", resetForm);

submitBtn.addEventListener("click", () => {
  const name = q1.value.trim().toLowerCase();
  const face = q2.value.trim().toLowerCase();
  const picked = document.querySelector('input[name="q3"]:checked');

  const okName = name.includes("kavindu123");
  const okFace = face.includes("ilovelochi247");
  const okRadio = !!picked;

  if (okName && okFace && okRadio) {
    alert("Yay! Welcome Babyy 💖🎉");
    document.getElementById("verify-screen").style.display = "none";
    document.getElementById("home").classList.add("show");
    document.getElementById("top-panel").classList.remove("hidden");

    document
      .querySelectorAll(".nav-btn")
      .forEach((b) => b.classList.toggle("active", b.dataset.go === "home"));
  } else {
    errorMsg.textContent = "Oops! Wrong answers, try again 😉";
    retryBtn.hidden = false;
  }
});

/*************************************************
 * SPA Router (top-right nav)
 *************************************************/
const buttons = document.querySelectorAll(".nav-btn");
const appScreens = document.querySelectorAll("main .screen");

function show(id) {
  appScreens.forEach((s) => s.classList.remove("show"));
  const target = document.getElementById(id);
  if (target) target.classList.add("show");
  buttons.forEach((b) => b.classList.toggle("active", b.dataset.go === id));

  if (id === "games") ensureGameSetup(); // lazy init game
}

document.addEventListener("click", (e) => {
  const btn = e.target.closest(".nav-btn");
  if (!btn) return;
  show(btn.dataset.go);
});

/*************************************************
 * Memories (render from data)
 *************************************************/
const memData = [
  {
    img: "img/m1.jpg",
    title: "The day we first met 💕",
    text: "Butterflies everywhere! I had no idea what kind of person you’d be, but I was so curious to know more.",
  },
  {
    img: "img/m2.jpg",
    title: "Us at Pyramid (Again!) 🏙️",
    text: "You were coming from the hospital, I was with my cousins… but you still managed to win everyone over. So happy you clicked with them!",
  },
  {
    img: "img/m3.jpg",
    title: "Your First Time at My Place 🏡",
    text: "Awkward at first, but you made everything feel so normal. Amma adored chatting with you endlessly!",
  },
  {
    img: "img/m4.jpg",
    title: "Our First time in Penang 🍔",
    text: "We went all the way to Penang Hill just to end up grabbing some burgers. Totally worth it because you were there.",
  },
  {
    img: "img/m5.jpg",
    title: "My favourite cuddles 🫂 ",
    text: "The cutest human randomly posing while I'm busy cuddling, watching tv, and thinking how nice it would be to stay like this forever",
  },
  {
    img: "img/m6.jpg",
    title: "3 of Us 📸",
    text: "Our very first trio photo! sad that nangi got to post it before I do.",
  },
  {
    img: "img/m7.jpg",
    title: "Us meeting at BAC 📖",
    text: "You were late, but I forgave you. Nando’s Mexican rice, a Civic drop-off… I remember it all.",
  },
  {
    img: "img/m8.jpg",
    title: "Us at some pub 🍻",
    text: "After a looong day, I still wouldn’t let you go. So you came out with us, Rao uncle and Kumari aunty, still wasn't enough!",
  },
  {
    img: "img/m9.jpg",
    title: "Us in the 36-Year-Old Saga 🚗",
    text: "A random old spot, a new memory with you. I still remember us having thosai and limau tea from mamak afterwards",
  },
  {
    img: "img/m10.jpg",
    title: "You made me smile even in hard Times 🌸",
    text: "Even during my hardest goodbye, you kept me smiling. I know seeya’s happy I found you.",
  },
  {
    img: "img/m11.jpg",
    title: "Checking Into My Room 🛏️",
    text: "I still remember I came to wake you up dramatically in the morning, and you matched my drama perfectly.",
  },
  {
    img: "img/m12.jpg",
    title: "The Cutest Goodbye 👋",
    text: "Leaving was sad… but this photo makes me smile every time instead of cry.",
  },
  {
    img: "img/m13.jpg",
    title: "You Turned 22 🎉",
    text: "Our very first birthday together. Those few days with you were nothing but the sweetest memories.",
  },
  {
    img: "img/m14.jpg",
    title: "Us went to see some lights ✨",
    text: "It was supposed to be about the lights, but we ended up at Brew House instead… with some debates bw you and amma, yet still cool.",
  },
  {
    img: "img/m15.jpg",
    title: "Before Goodbyes 💌",
    text: "One last goofy moment before you left back to KL. Just us being us, kids at heart.",
  },
  {
    img: "img/m16.jpg",
    title: "Calls from Thailand 📞",
    text: "Even miles away, you never forgot to keep me updated. Best ‘good boy’ ever!",
  },
  {
    img: "img/m17.jpg",
    title: "Supposed to Be Working? 😏",
    text: "Someone was definitely distracted… but I loved every bit of it.",
  },
  {
    img: "img/m18.jpg",
    title: "Our First BR Date 🍦",
    text: "Totally unplanned, simple, and perfect. Just us and ice cream.",
  },
  {
    img: "img/m19.jpg",
    title: "Ikea dates 🛒",
    text: "Nasi kandar dates are my fave, but Ikea dates never fail either. Who knew food with you could be this fun?",
  },
  {
    img: "img/m20.jpg",
    title: "Our Little Third Wheeler 🐶",
    text: "You love her and Amma so much, Ofc I am jealous… but that’s how I know your heart is huge.",
  },
  {
    img: "img/m21.jpg",
    title: "In the middle of fixing a fan 🔧",
    text: "Happy and sad times mixed, knowing you’d be leaving soon. But every second with you felt precious.",
  },
  {
    img: "img/m22.jpg",
    title: "First Shopping Cart 🛒",
    text: "Okay, maybe nothing healthy in there… but next time we’ll make it better (promise!).",
  },
  {
    img: "img/m23.jpg",
    title: "Date at almost a Tsunami 🌊",
    text: "Our plans got messed up, but with you and nangi, it was still perfect.",
  },
  {
    img: "img/m24.jpg",
    title: "Our Last Sleepover Before you went back to Lanka 🌙",
    text: "Gossip, murukku, movies, and falling asleep in your arms. Moments I’ll never forget.",
  },
  {
    img: "img/m25.jpg",
    title: "My Favorite Selfie of yours😍",
    text: "Am I wrong to say you’re my baby? Because this is how I’ll always see you.",
  },
  {
    img: "img/m26.jpg",
    title: "A Random Selfie of us I Love 📱",
    text: "We look like a sweet old married couple here. This one makes my heart warm every time.",
  },
  {
    img: "img/m27.jpg",
    title: "Minutes Before Your Flight ✈️",
    text: "So hard to say goodbye. But in that moment, all I could think of was the life we’d still share ahead.",
  },
  {
    img: "img/m28.jpg",
    title: "My Daily dose of Kisses 💋",
    text: "No matter how mad or silly we get, I always want to end the day with this kiss. I Love you!",
  },
];

const memGrid = document.getElementById("memGrid");
if (memGrid) {
  memGrid.innerHTML = memData
    .map(
      (m) => `
    <article class="mem-card">
      <img src="${m.img}" alt="${m.title}" class="mem-img">
      <h3 class="mem-title">${m.title}</h3>
      <p class="mem-text">${m.text}</p>
    </article>
  `
    )
    .join("");
}

/*************************************************
 * Notes (23 frames)
 *************************************************/
const notesData = [
  { title: "Note #1", text: "You make my heart smile every single day 💖" },
  { title: "Note #2", text: "No matter what, I’m always on your side 🫂" },
  { title: "Note #3", text: "Every hug with you feels like home 🏡" },
  {
    title: "Note #4",
    text: "I still think of our first loong call together 📸",
  },
  {
    title: "Note #5",
    text: "You make the worst jokes… and I love you for that 😂",
  },
  {
    title: "Note #6",
    text: "I still get butterflies when I see your name pop up 🦋",
  },
  {
    title: "Note #7",
    text: "My favorite place will always be right next to you ☕",
  },
  { title: "Note #8", text: "You’re my favorite kind of trouble 😏" },
  {
    title: "Note #9",
    text: "You’re the ‘good morning’ and ‘good night’ I look forward to 🌙",
  },
  { title: "Note #10", text: "Yes, you’re officially MY baby 👶💘" },
  { title: "Note #11", text: "I like your face. Especially your huge nose 😘" },
  {
    title: "Note #12",
    text: "You’re cuter than puppies and cupcakes combined 🧁🐶",
  },
  { title: "Note #13", text: "Of all people in the world, I got YOU 🍀" },
  {
    title: "Note #14",
    text: "You’re my favorite dream I never want to wake up from 🌌",
  },
  { title: "Note #15", text: "Even on hard days, you make me smile ☀️" },
  { title: "Note #16", text: "Every love song makes sense after you 🎶" },
  { title: "Note #17", text: "Your hugs = instant recharge 🔋💓" },
  {
    title: "Note #18",
    text: "You’re the cheese to my pizza and the sugar to my tea 🍕🍵",
  },
  {
    title: "Note #19",
    text: "With you, it always feels like the best chapter 📖",
  },
  { title: "Note #20", text: "When I think of you → instant happiness 🌞" },
  { title: "Note #21", text: "My safe place will always be your arms 💞" },
  {
    title: "Note #22",
    text: "Sometimes I cry just because I’m so grateful for you 🥲",
  },
  {
    title: "Note #23",
    text: "There’s no finish line with you, only forever ♾️",
  },
];

const frames = [
  "frame-1",
  "frame-2",
  "frame-3",
  "frame-4",
  "frame-5",
  "frame-6",
  "frame-7",
  "frame-8",
  "frame-9",
  "frame-10",
  "frame-11",
  "frame-12",
  "frame-13",
  "frame-14",
  "frame-15",
  "frame-16",
  "frame-17",
  "frame-18",
  "frame-19",
  "frame-20",
  "frame-21",
  "frame-22",
  "frame-23",
];

const notesGrid = document.getElementById("notesGrid");
if (notesGrid) {
  notesGrid.innerHTML = notesData
    .map(
      (n, i) => `
    <article class="note ${frames[i % frames.length]}">
      <h3 class="t">${n.title}</h3>
      <p class="b">${n.text}</p>
    </article>
  `
    )
    .join("");
}

/*************************************************
 * Memory Match Game (with confetti + stay-flipped matches)
 *************************************************/
(function () {
  const images = [
    "img/m1.jpg",
    "img/m2.jpg",
    "img/m3.jpg",
    "img/m4.jpg",
    "img/m5.jpg",
    "img/m6.jpg",
    "img/m7.jpg",
    "img/m8.jpg",
  ];

  // DOM
  const grid = document.getElementById("gm-grid");
  const timeEl = document.getElementById("gm-time");
  const movesEl = document.getElementById("gm-moves");
  const restartBtn = document.getElementById("gm-restart");
  const winModal = document.getElementById("gm-win");
  const playAgain = document.getElementById("gm-play-again");

  // State
  let deck = [];
  let first = null,
    second = null;
  let lock = false,
    moves = 0,
    matches = 0;
  let seconds = 0,
    timerId = null,
    started = false,
    initialized = false;

  // Helpers
  const fmt = (n) => String(n).padStart(2, "0");
  function setTime() {
    const m = Math.floor(seconds / 60),
      s = seconds % 60;
    timeEl.textContent = `${fmt(m)}:${fmt(s)}`;
  }
  function startTimer() {
    if (timerId) return;
    timerId = setInterval(() => {
      seconds++;
      setTime();
    }, 1000);
  }
  function stopTimer() {
    clearInterval(timerId);
    timerId = null;
  }
  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function buildDeck() {
    const pairs = images.flatMap((src, idx) => [
      { id: `${idx}-a`, key: idx, src },
      { id: `${idx}-b`, key: idx, src },
    ]);
    return shuffle(pairs);
  }

  function render() {
    grid.innerHTML = deck
      .map(
        (c) => `
      <div class="gm-card" data-id="${c.id}" data-key="${c.key}">
        <div class="gm-inner">
          <div class="gm-face gm-back">❤</div>
          <div class="gm-face gm-front"><img src="${c.src}" alt="memory"></div>
        </div>
      </div>
    `
      )
      .join("");
  }

  function reset() {
    stopTimer();
    seconds = 0;
    setTime();
    moves = 0;
    movesEl.textContent = "0";
    matches = 0;
    first = second = null;
    lock = false;
    started = false;

    if (winModal) winModal.hidden = true;
    if (grid) grid.hidden = false;

    deck = buildDeck();
    render();
  }

  function flip(el) {
    el.classList.add("flipped");
  }

  function unflip(a, b) {
    setTimeout(() => {
      a.classList.remove("flipped");
      b.classList.remove("flipped");
      lock = false;
    }, 650);
  }

  // ✅ keep matched cards face-up & unclickable; trigger win popup with confetti
  function setMatched(a, b) {
    a.classList.add("flipped", "matched");
    b.classList.add("flipped", "matched");
    lock = false;
    matches++;

    if (matches === images.length) {
      stopTimer();
      setTimeout(showWin, 300);
    }
  }

  // ----- Confetti + modal helpers (scoped) -----
  function showWin() {
    if (winModal) winModal.hidden = false;
    launchConfetti(140); // number of pieces 🎉
  }
  function hideWin() {
    if (winModal) winModal.hidden = true;
    removeConfetti();
  }
  function launchConfetti(count = 120) {
    removeConfetti();
    const wrap = document.createElement("div");
    wrap.className = "confetti";

    const colors = [
      "#ffd86d",
      "#ff90bb",
      "#8accd5",
      "#ffb8d6",
      "#b9e0ff",
      "#c7f0d8",
    ];
    for (let i = 0; i < count; i++) {
      const piece = document.createElement("i");
      const inner = document.createElement("b");
      const left = Math.random() * 100;

      const w = 6 + Math.random() * 6; // 6–12px
      const h = 10 + Math.random() * 10; // 10–20px
      const dur = 1.6 + Math.random() * 1.2;
      const delay = Math.random() * 0.3;
      const color = colors[(Math.random() * colors.length) | 0];

      piece.style.left = left + "vw";
      piece.style.setProperty("--w", w + "px");
      piece.style.setProperty("--h", h + "px");
      piece.style.setProperty("--dur", dur + "s");
      piece.style.setProperty("--delay", delay + "s");
      inner.style.setProperty("--color", color);

      piece.appendChild(inner);
      wrap.appendChild(piece);
    }
    document.body.appendChild(wrap);
    setTimeout(removeConfetti, 3200);
  }
  function removeConfetti() {
    document.querySelectorAll(".confetti").forEach((el) => el.remove());
  }

  // ----- Clicks -----
  grid?.addEventListener("click", (e) => {
    const card = e.target.closest(".gm-card");
    if (
      !card ||
      lock ||
      card.classList.contains("flipped") ||
      card.classList.contains("matched")
    )
      return;

    if (!started) {
      started = true;
      startTimer();
    }

    flip(card);
    if (!first) {
      first = card;
      return;
    }

    second = card;
    lock = true;
    moves++;
    movesEl.textContent = moves;

    const k1 = first.dataset.key,
      k2 = second.dataset.key;
    if (k1 === k2) {
      setMatched(first, second);
      first = second = null;
    } else {
      unflip(first, second);
      first = second = null;
    }
  });

  // Controls
  restartBtn?.addEventListener("click", () => {
    hideWin();
    reset();
  });
  playAgain?.addEventListener("click", () => {
    hideWin();
    reset();
  });

  // Lazy init when Games screen is opened
  window.ensureGameSetup = function ensureGameSetup() {
    if (!grid) return;
    if (!initialized) {
      initialized = true;
      reset();
    } else {
      grid.hidden = false;
    }
  };

  // If Games was visible on load
  if (document.getElementById("games")?.classList.contains("show"))
    ensureGameSetup();
})();

/*********** HOME SCREEN Goodies ***********/
(function () {
  const home = document.getElementById("home");
  const typeLine = document.getElementById("type-line");
  const audio = document.getElementById("birthday-audio");
  const btnToggle = document.getElementById("music-toggle");

  const message = `I’m so proud of the person you are, and even prouder that I get to love you 💖. From what started as a random chat, you’ve become my whole world, my favorite human, my safe place, my greatest joy. Today is your day, and I hope it’s filled with soft laughs, warm hugs, and all the tiny moments that make you truly happy. No matter what, I’d rather fix things with you a thousand times over than ever lose you, because loving you is the best part of my life. 💕`;

  let typed = false;
  let floatLayer; // fullscreen overlay
  let spawnTimer = null; // continuous spawner

  /* typewriter */
  function typeText(el, text, speed = 28) {
    el.textContent = "";
    let i = 0;
    const tick = () => {
      el.textContent = text.slice(0, i++);
      if (i <= text.length)
        requestAnimationFrame(() => setTimeout(tick, speed));
    };
    tick();
  }

  /* confetti (reuse your existing functions if already present) */
  function launchConfetti(count = 160) {
    removeConfetti();
    const wrap = document.createElement("div");
    wrap.className = "confetti";
    const colors = [
      "#ffd86d",
      "#ff90bb",
      "#8accd5",
      "#ffb8d6",
      "#b9e0ff",
      "#c7f0d8",
    ];
    for (let i = 0; i < count; i++) {
      const piece = document.createElement("i");
      const inner = document.createElement("b");
      piece.style.left = Math.random() * 100 + "vw";
      piece.style.setProperty("--w", 6 + Math.random() * 6 + "px");
      piece.style.setProperty("--h", 10 + Math.random() * 10 + "px");
      piece.style.setProperty("--dur", 1.6 + Math.random() * 1.2 + "s");
      piece.style.setProperty("--delay", Math.random() * 0.3 + "s");
      inner.style.setProperty(
        "--color",
        colors[(Math.random() * colors.length) | 0]
      );
      piece.appendChild(inner);
      wrap.appendChild(piece);
    }
    document.body.appendChild(wrap);
    setTimeout(removeConfetti, 3200);
  }
  function removeConfetti() {
    document.querySelectorAll(".confetti").forEach((el) => el.remove());
  }

  /* ===== Floating balloons + hearts over the WHOLE screen ===== */
  function ensureFloatLayer() {
    if (!floatLayer) {
      floatLayer = document.createElement("div");
      floatLayer.className = "float-layer";
      document.body.appendChild(floatLayer);
    }
    return floatLayer;
  }

  function spawnOne() {
    const layer = ensureFloatLayer();
    const isHeart = Math.random() < 0.25; // ~25% hearts

    // PATH WRAPPER
    const item = document.createElement("span");
    item.className = "float-item";
    const dur = 10 + Math.random() * 6; // 10–16s
    const delay = Math.random() * 1.2;
    const x0 = 5 + Math.random() * 90 + "%";
    const x1 = 5 + Math.random() * 90 + "%";
    item.style.setProperty("--dur", dur + "s");
    item.style.setProperty("--delay", delay + "s");
    item.style.setProperty("--xStart", x0);
    item.style.setProperty("--xEnd", x1);

    // SHAPE
    if (isHeart) {
      const shape = document.createElement("span");
      shape.className = "float-shape heart";
      shape.textContent = "❤";
      shape.style.setProperty("--fs", 18 + Math.random() * 18 + "px");
      item.appendChild(shape);
    } else {
      const shape = document.createElement("div");
      shape.className = "float-shape balloon";
      const palette = [
        "#ff90bb",
        "#ffd86d",
        "#8accd5",
        "#b9e0ff",
        "#ffc4dd",
        "#c7f0d8",
      ];
      const size = 36 + Math.random() * 28;
      shape.style.setProperty("--w", size + "px");
      shape.style.setProperty(
        "--color",
        palette[(Math.random() * palette.length) | 0]
      );
      item.appendChild(shape);
    }

    layer.appendChild(item);
    setTimeout(() => item.remove(), (dur + 1.5) * 1000);
  }

  function startFloating() {
    ensureFloatLayer();
    if (spawnTimer) return; // already running
    // burst start
    for (let i = 0; i < 10; i++) setTimeout(spawnOne, i * 180);
    // continuous spawn
    spawnTimer = setInterval(spawnOne, 700); // ~1 every 0.7s
  }
  function stopFloating() {
    clearInterval(spawnTimer);
    spawnTimer = null;
    // optional: keep layer or remove it when leaving Home
    // floatLayer?.remove(); floatLayer = null;
  }

  /* audio controls */
  function safePlay() {
    audio.volume = 0.7;
    audio.play().catch(() => {});
  }
  function toggleAudio() {
    if (audio.paused) {
      audio.play();
      btnToggle.textContent = "🔊 Pause";
    } else {
      audio.pause();
      btnToggle.textContent = "🔇 Play";
    }
  }
  btnToggle?.addEventListener("click", toggleAudio);

  /* activate when Home is visible */
  function activateHome() {
    if (!typed) {
      typeText(typeLine, message);
      typed = true;
    }
    startFloating(); // 🔥 always run over the whole screen on Home
    launchConfetti(140);
    safePlay();
    console.debug("Home activated: balloons started"); // debug helper
  }

  // run if Home already shown on load
  if (home?.classList.contains("show")) activateHome();

  // watch for SPA nav changes
  const observer = new MutationObserver(() => {
    if (home.classList.contains("show")) activateHome();
    else stopFloating(); // stop when leaving Home (remove this line if you want it even on other tabs)
  });
  if (home)
    observer.observe(home, { attributes: true, attributeFilter: ["class"] });
})();

/*************************************************
 * PLAYLIST (replaces “life” with music section)
 *************************************************/
(function () {
  // Reuse the same global audio element used on Home:
  const audio = document.getElementById("birthday-audio");
  const btnTopToggle = document.getElementById("music-toggle"); // to keep label in sync

  const tracks = [
    {
      title: "Perfect For Me",
      artist: "Bradley Marshall",
      src: "audio/the_song.mp3",
      cover: "img/cover_pfm.png",
    },
    {
      title: "The Night We Met",
      artist: "Lord Huron",
      src: "audio/The_Night_We_Met.mp3",
      cover: "img/cover_tnwm.jpg",
    },
    {
      title: "My Love",
      artist: "Westlife",
      src: "audio/My_Love.mp3",
      cover: "img/cover_ml.jpg",
    },
    {
      title: "Vaadi Pulla Vaadi",
      artist: "Hiphop Tamizha",
      src: "audio/Vaadi_Pulla_Vaadi.mp3",
      cover: "img/cover_vpv.jpg",
    },
    {
      title: "Agar Tum Saath Ho",
      artist: "Alka Yagnik and Arijit Singh",
      src: "audio/Agar_Tum_Saath_Ho.mp3",
      cover: "img/cover_atsh.jpeg",
    },
  ];

  // DOM
  const listEl = document.getElementById("pl-list");
  const coverEl = document.getElementById("pl-cover");
  const titleEl = document.getElementById("pl-title");
  const artistEl = document.getElementById("pl-artist");
  const prevBtn = document.getElementById("pl-prev");
  const nextBtn = document.getElementById("pl-next");
  const toggleBtn = document.getElementById("pl-toggle");
  const seekEl = document.getElementById("pl-seek");
  const curEl = document.getElementById("pl-cur");
  const durEl = document.getElementById("pl-dur");
  const volEl = document.getElementById("pl-vol");

  if (!listEl || !audio) return;

  let index = 0;
  let userInteracted = false; // needed for autoplay policies

  function mm(ss) {
    const m = Math.floor(ss / 60) | 0,
      s = Math.floor(ss % 60) | 0;
    return `${m}:${String(s).padStart(2, "0")}`;
  }

  function renderList() {
    listEl.innerHTML = tracks
      .map(
        (t, i) => `
      <li class="pl-item" data-i="${i}">
        <img src="${t.cover || "img/cover-default.jpg"}" alt="">
        <div>
          <div class="t">${t.title}</div>
          <div class="s">${t.artist}</div>
        </div>
        <button class="play" aria-label="Play ${t.title}">Play</button>
      </li>
    `
      )
      .join("");
  }

  function highlight() {
    listEl.querySelectorAll(".pl-item").forEach((li) => {
      li.classList.toggle("active", Number(li.dataset.i) === index);
      const btn = li.querySelector(".play");
      btn.textContent =
        Number(li.dataset.i) === index && !audio.paused ? "Pause" : "Play";
    });
  }

  function load(i) {
    index = (i + tracks.length) % tracks.length;
    const t = tracks[index];
    audio.src = t.src;
    titleEl.textContent = t.title;
    artistEl.textContent = t.artist;
    coverEl.src = t.cover || "img/cover-default.jpg";
    // Reset seek
    seekEl.value = 0;
    curEl.textContent = "0:00";
    durEl.textContent = "0:00";
    highlight();
  }

  async function play() {
    try {
      await audio.play();
      toggleBtn.textContent = "⏸";
      if (btnTopToggle) btnTopToggle.textContent = "🔊 Pause";
      highlight();
    } catch (e) {
      /* ignored until user interacts */
    }
  }
  function pause() {
    audio.pause();
    toggleBtn.textContent = "▶️";
    if (btnTopToggle) btnTopToggle.textContent = "🔇 Play";
    highlight();
  }

  // Events
  listEl.addEventListener("click", (e) => {
    const li = e.target.closest(".pl-item");
    if (!li) return;
    userInteracted = true;
    const i = Number(li.dataset.i);
    if (i === index && !audio.paused) {
      pause();
      return;
    }
    load(i);
    play();
  });

  prevBtn.addEventListener("click", () => {
    userInteracted = true;
    load(index - 1);
    play();
  });
  nextBtn.addEventListener("click", () => {
    userInteracted = true;
    load(index + 1);
    play();
  });
  toggleBtn.addEventListener("click", () => {
    userInteracted = true;
    audio.paused ? play() : pause();
  });

  volEl.addEventListener("input", () => {
    audio.volume = Number(volEl.value);
  });

  seekEl.addEventListener("input", () => {
    if (audio.duration)
      audio.currentTime = (seekEl.value / 100) * audio.duration;
  });

  audio.addEventListener("timeupdate", () => {
    if (!audio.duration) return;
    const pct = (audio.currentTime / audio.duration) * 100;
    seekEl.value = pct;
    curEl.textContent = mm(audio.currentTime);
    durEl.textContent = mm(audio.duration);
  });

  audio.addEventListener("ended", () => {
    load(index + 1);
    play();
  });

  // Keep the global top music button in sync if user presses it
  btnTopToggle?.addEventListener("click", () => {
    setTimeout(highlight, 0);
  });

  // Initial render/load
  renderList();
  load(0);
  audio.volume = Number(volEl.value);
})();

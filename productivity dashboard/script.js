/* ============================================================
   NOVA — dashboard logic
   ============================================================ */

/* ---------- 1. Dashboard navigation ---------- */
(function navigation() {
  const cards = document.querySelectorAll(".feature-card");
  const views = document.querySelectorAll("[data-feature-view]");
  let activeView = null;

  function openFeature(name) {
    if (activeView) return; // ignore double-clicks while a view is open
    const view = document.getElementById(`feature-${name}`);
    if (!view) return;
    view.hidden = false;
    activeView = view;
    document.body.style.overflow = "hidden";
  }

  function closeFeature() {
    if (!activeView) return;
    activeView.hidden = true;
    activeView = null;
    document.body.style.overflow = "";
  }

  cards.forEach((card) => {
    card.addEventListener("click", () => openFeature(card.dataset.feature));
  });

  document.querySelectorAll("[data-back]").forEach((btn) => {
    btn.addEventListener("click", closeFeature);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeFeature();
  });
})();

/* ---------- 2. Theme switch (light / dark) ---------- */
(function themeSwitch() {
  const root = document.documentElement;
  const toggle = document.getElementById("themeToggle");
  const saved = localStorage.getItem("nova_theme") || "dark";
  root.setAttribute("data-theme", saved);

  toggle.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("nova_theme", next);
  });
})();

/* ---------- 3. Date & time + dynamic background ---------- */
(function clockAndBackground() {
  const timeText = document.getElementById("timeText");
  const dateText = document.getElementById("dateText");
  const greetingWord = document.getElementById("greetingWord");
  const html = document.documentElement;

  function categoryFor(hour) {
    if (hour >= 5 && hour < 12) return "morning";
    if (hour >= 12 && hour < 17) return "afternoon";
    if (hour >= 17 && hour < 21) return "evening";
    return "night";
  }

  function tick() {
    const now = new Date();
    let h = now.getHours();
    const m = now.getMinutes().toString().padStart(2, "0");
    const ampm = h >= 12 ? "PM" : "AM";
    const h12 = h % 12 === 0 ? 12 : h % 12;
    timeText.textContent = `${h12}:${m} ${ampm}`;
    dateText.textContent = now.toLocaleDateString(undefined, {
      weekday: "short",
      day: "numeric",
      month: "short",
    });

    const category = categoryFor(h);
    html.setAttribute("data-time", category);
    greetingWord.textContent = category === "night" ? "evening" : category;
  }

  tick();
  setInterval(tick, 1000 * 30); // recheck twice a minute — plenty for a clock + background category
})();

/* ---------- 4. Todo List ---------- */
(function todoList() {
  const STORAGE_KEY = "nova_todos";
  const form = document.getElementById("todoForm");
  const input = document.getElementById("todoInput");
  const list = document.getElementById("todoList");
  const empty = document.getElementById("todoEmpty");
  const cardSub = document.getElementById("todoCardSub");

  let todos = load();

  function load() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
      return [];
    }
  }
  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }

  function render() {
    list.innerHTML = "";
    empty.style.display = todos.length ? "none" : "block";

    todos.forEach((todo) => {
      const li = document.createElement("li");
      li.className = "item-row" + (todo.completed ? " completed" : "");

      const check = document.createElement("button");
      check.className = "item-check";
      check.setAttribute("aria-label", "Mark complete");
      check.addEventListener("click", () => {
        todo.completed = !todo.completed;
        save();
        render();
      });

      const text = document.createElement("span");
      text.className = "item-text" + (todo.important ? " item-important" : "");
      text.textContent = todo.text;

      const star = document.createElement("button");
      star.className = "icon-btn" + (todo.important ? " active" : "");
      star.setAttribute("aria-label", "Mark important");
      star.innerHTML =
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 3l2.6 5.9 6.4.6-4.8 4.3 1.4 6.3L12 17l-5.6 3.1 1.4-6.3-4.8-4.3 6.4-.6L12 3Z"/></svg>';
      star.addEventListener("click", () => {
        todo.important = !todo.important;
        save();
        render();
      });

      const del = document.createElement("button");
      del.className = "icon-btn danger";
      del.setAttribute("aria-label", "Delete task");
      del.innerHTML =
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/></svg>';
      del.addEventListener("click", () => {
        todos = todos.filter((t) => t.id !== todo.id);
        save();
        render();
      });

      li.append(check, text, star, del);
      list.appendChild(li);
    });

    const remaining = todos.filter((t) => !t.completed).length;
    cardSub.textContent = todos.length
      ? `${remaining} of ${todos.length} left`
      : "Nothing yet";
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const value = input.value.trim();
    if (!value) return;
    todos.push({ id: Date.now(), text: value, completed: false, important: false });
    save();
    render();
    input.value = "";
    input.focus();
  });

  render();
})();

/* ---------- 5. Daily Planner ---------- */
(function dailyPlanner() {
  const STORAGE_KEY = "nova_planner";
  const container = document.getElementById("plannerList");
  const cardSub = document.getElementById("plannerCardSub");

  function load() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    } catch {
      return {};
    }
  }
  let plan = load();

  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(plan));
  }

  function formatHour(h) {
    const ampm = h >= 12 ? "PM" : "AM";
    const h12 = h % 12 === 0 ? 12 : h % 12;
    return `${h12}:00 ${ampm}`;
  }

  function build() {
    container.innerHTML = "";
    const currentHour = new Date().getHours();

    for (let h = 0; h < 24; h++) {
      const row = document.createElement("div");
      row.className = "planner-row" + (h === currentHour ? " current-hour" : "");

      const label = document.createElement("span");
      label.className = "planner-hour";
      label.textContent = formatHour(h);

      const field = document.createElement("input");
      field.className = "planner-input";
      field.type = "text";
      field.placeholder = "Nothing planned";
      field.maxLength = 120;
      field.value = plan[h] || "";

      field.addEventListener("input", () => {
        if (field.value.trim()) {
          plan[h] = field.value;
        } else {
          delete plan[h];
        }
        save();
        updateSub();
      });

      row.append(label, field);
      container.appendChild(row);
    }
  }

  function updateSub() {
    const count = Object.keys(plan).length;
    cardSub.textContent = count ? `${count} slot${count > 1 ? "s" : ""} planned` : "Plan your hours";
  }

  build();
  updateSub();
  // re-highlight the current hour periodically in case the view stays open
  setInterval(build, 1000 * 60 * 5);
})();

/* ---------- 6. Daily Goals ---------- */
(function dailyGoals() {
  const STORAGE_KEY = "nova_goals";
  const form = document.getElementById("goalForm");
  const input = document.getElementById("goalInput");
  const list = document.getElementById("goalsList");
  const ring = document.getElementById("goalsRing");
  const ringLabel = document.getElementById("goalsRingLabel");
  const caption = document.getElementById("goalsCaption");
  const cardSub = document.getElementById("goalsCardSub");

  let goals = load();

  function load() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
      return [];
    }
  }
  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(goals));
  }

  function updateProgress() {
    const done = goals.filter((g) => g.completed).length;
    const total = goals.length;
    const pct = total ? Math.round((done / total) * 100) : 0;
    ring.style.setProperty("--pct", pct);
    ringLabel.textContent = `${done}/${total}`;
    cardSub.textContent = `${done} of ${total} done`;
    caption.textContent = total
      ? `${done} of ${total} goals completed today.`
      : "Set a goal to start tracking today.";
  }

  function render() {
    list.innerHTML = "";
    goals.forEach((goal) => {
      const li = document.createElement("li");
      li.className = "item-row" + (goal.completed ? " completed" : "");

      const check = document.createElement("button");
      check.className = "item-check";
      check.setAttribute("aria-label", "Mark goal done");
      check.addEventListener("click", () => {
        goal.completed = !goal.completed;
        save();
        render();
      });

      const text = document.createElement("span");
      text.className = "item-text";
      text.textContent = goal.text;

      const del = document.createElement("button");
      del.className = "icon-btn danger";
      del.setAttribute("aria-label", "Remove goal");
      del.innerHTML =
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/></svg>';
      del.addEventListener("click", () => {
        goals = goals.filter((g) => g.id !== goal.id);
        save();
        render();
        updateProgress();
      });

      li.append(check, text, del);
      list.appendChild(li);
    });
    updateProgress();
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const value = input.value.trim();
    if (!value) return;
    goals.push({ id: Date.now(), text: value, completed: false });
    save();
    render();
    input.value = "";
    input.focus();
  });

  render();
})();

/* ---------- 7. Pomodoro Timer ---------- */
(function pomodoroTimer() {
  const WORK_SECONDS = 25 * 60;
  const BREAK_SECONDS = 5 * 60;

  const timeEl = document.getElementById("pomodoroTime");
  const sessionEl = document.getElementById("pomodoroSession");
  const ring = document.getElementById("pomodoroRing");
  const startBtn = document.getElementById("pomodoroStart");
  const pauseBtn = document.getElementById("pomodoroPause");
  const resetBtn = document.getElementById("pomodoroReset");
  const cardSub = document.getElementById("pomodoroCardSub");

  let totalSeconds = WORK_SECONDS;
  let remaining = WORK_SECONDS;
  let isBreak = false;
  let intervalId = null;

  function format(sec) {
    const m = Math.floor(sec / 60).toString().padStart(2, "0");
    const s = (sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  }

  function paint() {
    timeEl.textContent = format(remaining);
    sessionEl.textContent = isBreak ? "Break" : "Work session";
    const pct = Math.round((remaining / totalSeconds) * 100);
    ring.style.setProperty("--pct", pct);
    cardSub.textContent = `${format(remaining)} ${isBreak ? "break" : "focus"}`;
  }

  function beep() {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.frequency.value = 660;
      osc.connect(gain);
      gain.connect(ctx.destination);
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
      osc.start();
      osc.stop(ctx.currentTime + 0.8);
    } catch {
      /* audio not available — silently skip, the visual state still updates */
    }
  }

  function tick() {
    remaining -= 1;
    if (remaining <= 0) {
      beep();
      isBreak = !isBreak;
      totalSeconds = isBreak ? BREAK_SECONDS : WORK_SECONDS;
      remaining = totalSeconds;
    }
    paint();
  }

  function start() {
    if (intervalId) return; // prevent overlapping intervals
    intervalId = setInterval(tick, 1000);
    startBtn.disabled = true;
    pauseBtn.disabled = false;
  }

  function pause() {
    clearInterval(intervalId);
    intervalId = null;
    startBtn.disabled = false;
    pauseBtn.disabled = true;
  }

  function reset() {
    pause();
    isBreak = false;
    totalSeconds = WORK_SECONDS;
    remaining = WORK_SECONDS;
    paint();
  }

  startBtn.addEventListener("click", start);
  pauseBtn.addEventListener("click", pause);
  resetBtn.addEventListener("click", reset);

  paint();
})();

/* ---------- 8. Weather Widget ---------- */
(function weatherWidget() {
  const tempEl = document.getElementById("weatherTemp");
  const placeEl = document.getElementById("weatherPlace");
  const condEl = document.getElementById("weatherCond");
  const humidityEl = document.getElementById("weatherHumidity");
  const windEl = document.getElementById("weatherWind");

  // Fallback location used if geolocation is denied or unavailable
  const FALLBACK = { lat: 30.901, lon: 75.8573, name: "Ludhiana" };

  const CODE_MAP = {
    0: "Clear sky",
    1: "Mostly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Fog",
    51: "Light drizzle",
    61: "Light rain",
    63: "Rain",
    65: "Heavy rain",
    71: "Light snow",
    73: "Snow",
    75: "Heavy snow",
    80: "Rain showers",
    95: "Thunderstorm",
  };

  async function fetchWeather(lat, lon, placeName) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Weather request failed");
    const data = await res.json();
    const c = data.current;
    tempEl.textContent = `${Math.round(c.temperature_2m)}°`;
    placeEl.textContent = placeName;
    condEl.textContent = CODE_MAP[c.weather_code] || "Conditions unavailable";
    humidityEl.textContent = Math.round(c.relative_humidity_2m);
    windEl.textContent = Math.round(c.wind_speed_10m);
  }

  function showFallbackMessage() {
    condEl.textContent = "Weather unavailable right now";
  }

  function loadFor(lat, lon, name) {
    fetchWeather(lat, lon, name).catch(showFallbackMessage);
  }

  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      (pos) => loadFor(pos.coords.latitude, pos.coords.longitude, "Your location"),
      () => loadFor(FALLBACK.lat, FALLBACK.lon, FALLBACK.name),
      { timeout: 6000 }
    );
  } else {
    loadFor(FALLBACK.lat, FALLBACK.lon, FALLBACK.name);
  }
})();

/* ---------- 9. Motivation Quote ---------- */
(function motivationQuote() {
  const textEl = document.getElementById("quoteText");
  const authorEl = document.getElementById("quoteAuthor");
  const refreshBtn = document.getElementById("quoteRefresh");

  const FALLBACK_QUOTES = [
    { text: "Small steps, done daily, outrun big plans done never.", author: "Nova" },
    { text: "Discipline is choosing what you want most over what you want now.", author: "Nova" },
    { text: "Focus is a muscle. Every session trains it.", author: "Nova" },
    { text: "Done is the engine of more.", author: "Nova" },
    { text: "The work you avoid is usually the work that matters.", author: "Nova" },
    { text: "Momentum is built one finished task at a time.", author: "Nova" },
  ];

  function paint(text, author) {
    textEl.textContent = `“${text}”`;
    authorEl.textContent = author ? `— ${author}` : "";
  }

  function showFallback() {
    const pick = FALLBACK_QUOTES[Math.floor(Math.random() * FALLBACK_QUOTES.length)];
    paint(pick.text, pick.author);
  }

  async function loadQuote() {
    textEl.textContent = "Loading a line worth reading…";
    authorEl.textContent = "";
    try {
      const res = await fetch("https://zenquotes.io/api/random");
      if (!res.ok) throw new Error("Quote request failed");
      const data = await res.json();
      const item = Array.isArray(data) ? data[0] : null;
      if (!item || !item.q) throw new Error("Unexpected quote format");
      paint(item.q, item.a);
    } catch {
      showFallback();
    }
  }

  refreshBtn.addEventListener("click", loadQuote);
  loadQuote();
})();

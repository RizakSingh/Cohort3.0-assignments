const STORAGE_KEY = "dom-explorer-tasks";

let tasks = loadTasks();

function loadTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

const taskForm       = document.getElementById("taskForm");
const taskTitleInput = document.getElementById("taskTitle");
const taskCategoryEl = document.getElementById("taskCategory");
const taskList       = document.getElementById("taskList");
const emptyState     = document.getElementById("emptyState");

const searchInput    = document.getElementById("searchInput");
const filterCategory = document.getElementById("filterCategory");
const clearAllBtn    = document.getElementById("clearAllBtn");

const pendingCountEl   = document.getElementById("pendingCount");
const completedCountEl = document.getElementById("completedCount");

function buildTaskCard(task) {
  const card = document.createElement("li");
  card.className = "task-card";

  card.setAttribute("data-id", task.id);
  card.setAttribute("data-status", task.status);
  card.setAttribute("data-category", task.category);

  const main = document.createElement("div");
  main.className = "task-main";

  const title = document.createElement("span");
  title.className = "task-title";
  title.appendChild(document.createTextNode(task.title));

  const meta = document.createElement("div");
  meta.className = "task-meta";

  const categoryTag = document.createElement("span");
  categoryTag.className = "task-tag";
  categoryTag.appendChild(document.createTextNode(task.category));

  const timeTag = document.createElement("span");
  timeTag.className = "task-tag task-time";
  timeTag.appendChild(document.createTextNode(timeAgo(task.createdAt)));

  meta.append(categoryTag, timeTag);
  main.append(title, meta);

  const actions = document.createElement("div");
  actions.className = "task-actions";

  const editBtn = document.createElement("button");
  editBtn.className = "btn-edit";
  editBtn.title = "Edit";
  editBtn.type = "button";
  editBtn.appendChild(document.createTextNode("✎"));

  const completeBtn = document.createElement("button");
  completeBtn.className = "btn-complete";
  completeBtn.title = "Complete";
  completeBtn.type = "button";
  completeBtn.appendChild(document.createTextNode(task.status === "completed" ? "↺" : "✓"));

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "btn-delete";
  deleteBtn.title = "Delete";
  deleteBtn.type = "button";
  deleteBtn.appendChild(document.createTextNode("🗑"));

  actions.append(editBtn, completeBtn, deleteBtn);
  card.append(main, actions);

  return card;
}

function timeAgo(ts) {
  const diffMin = Math.max(0, Math.round((Date.now() - ts) / 60000));
  if (diffMin < 1) return "just now";
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHr = Math.round(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h ago`;
  return `${Math.round(diffHr / 24)}d ago`;
}

function renderTasks() {
  const query = searchInput.value.trim().toLowerCase();
  const category = filterCategory.value;

  const visible = tasks.filter((t) => {
    const matchesQuery = t.title.toLowerCase().includes(query);
    const matchesCategory = category === "all" || t.category === category;
    return matchesQuery && matchesCategory;
  });

  taskList.innerHTML = "";

  const fragment = document.createDocumentFragment();
  visible
    .sort((a, b) => b.createdAt - a.createdAt)
    .forEach((task) => fragment.appendChild(buildTaskCard(task)));

  taskList.appendChild(fragment);

  emptyState.classList.toggle("visible", tasks.length === 0);
  if (tasks.length > 0 && visible.length === 0) {
    emptyState.textContent = "No tasks match your search / filter.";
    emptyState.classList.add("visible");
  } else if (tasks.length === 0) {
    emptyState.textContent = "No tasks yet — add your first one above.";
  }

  updateCounters();
}

function updateCounters() {
  const pending = tasks.filter((t) => t.status === "pending").length;
  const completed = tasks.filter((t) => t.status === "completed").length;

  pendingCountEl.querySelector(".stat-num").textContent = pending;
  completedCountEl.querySelector(".stat-num").textContent = completed;
  pendingCountEl.setAttribute("data-count", String(pending));
  completedCountEl.setAttribute("data-count", String(completed));
}

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = taskTitleInput.value.trim();
  if (!title) return;

  const newTask = {
    id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
    title,
    category: taskCategoryEl.value,
    status: "pending",
    createdAt: Date.now(),
  };

  tasks.push(newTask);
  saveTasks();
  renderTasks();

  const firstCard = taskList.firstElementChild;
  if (firstCard) taskList.prepend(firstCard);

  taskTitleInput.value = "";
  taskTitleInput.focus();
});

taskList.addEventListener("click", (e) => {
  const card = e.target.closest(".task-card");
  if (!card) return;

  const id = card.getAttribute("data-id");

  if (e.target.closest(".btn-delete")) {
    deleteTask(id, card);
  } else if (e.target.closest(".btn-complete")) {
    toggleComplete(id, card);
  } else if (e.target.closest(".btn-edit")) {
    startEdit(card, id);
  }
});

function deleteTask(id, card) {
  card.remove();
  tasks = tasks.filter((t) => t.id !== id);
  saveTasks();
  setTimeout(renderTasks, 0);
}

function toggleComplete(id, card) {
  const task = tasks.find((t) => t.id === id);
  if (!task) return;

  task.status = task.status === "completed" ? "pending" : "completed";
  card.setAttribute("data-status", task.status);
  saveTasks();

  const title = card.querySelector(".task-title");
  const completeBtn = card.querySelector(".btn-complete");
  completeBtn.textContent = task.status === "completed" ? "↺" : "✓";

  card.querySelectorAll(".done-badge").forEach((n) => n.remove());

  if (task.status === "completed") {
    const badge = document.createElement("span");
    badge.className = "task-tag done-badge";
    badge.appendChild(document.createTextNode("✓ completed"));
    title.before(badge);

    const stamp = document.createElement("span");
    stamp.className = "task-tag done-badge";
    stamp.appendChild(document.createTextNode(timeAgo(Date.now())));
    title.after(stamp);
  }

  updateCounters();
}

function startEdit(card, id) {
  const task = tasks.find((t) => t.id === id);
  if (!task) return;
  if (card.classList.contains("editing")) return;

  const titleSpan = card.querySelector(".task-title");
  const input = document.createElement("input");
  input.type = "text";
  input.className = "edit-input";
  input.value = task.title;

  card.classList.add("editing");
  titleSpan.replaceWith(input);
  input.focus();
  input.select();

  const commit = () => {
    const newTitle = input.value.trim() || task.title;
    task.title = newTitle;
    saveTasks();

    const newSpan = document.createElement("span");
    newSpan.className = "task-title";
    newSpan.appendChild(document.createTextNode(newTitle));

    input.replaceWith(newSpan);
    card.classList.remove("editing");
  };

  input.addEventListener("blur", commit, { once: true });
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") input.blur();
    if (e.key === "Escape") {
      input.value = task.title;
      input.blur();
    }
  });
}

searchInput.addEventListener("input", renderTasks);
filterCategory.addEventListener("change", renderTasks);

clearAllBtn.addEventListener("click", () => {
  if (tasks.length === 0) return;
  if (!confirm("Delete all tasks? This cannot be undone.")) return;
  tasks = [];
  saveTasks();
  renderTasks();
});

const attrDemoInput = document.getElementById("attrDemoInput");
const propValueEl   = document.getElementById("propValue");
const attrValueEl   = document.getElementById("attrValue");
const syncAttrBtn   = document.getElementById("syncAttrBtn");

function refreshAttrDemo() {
  propValueEl.textContent = attrDemoInput.value;
  attrValueEl.textContent = attrDemoInput.getAttribute("value");
}

attrDemoInput.addEventListener("input", refreshAttrDemo);

syncAttrBtn.addEventListener("click", () => {
  attrDemoInput.setAttribute("value", attrDemoInput.value);
  refreshAttrDemo();
});

const themeToggle = document.getElementById("themeToggle");
const htmlEl = document.documentElement;
const THEME_KEY = "dom-explorer-theme";

function applyTheme(theme) {
  htmlEl.setAttribute("data-theme", theme);
  themeToggle.dataset.themeState = theme;
  document.body.classList.toggle("theme-light", theme === "light");
  themeToggle.querySelector(".toggle-text").textContent = theme;
  localStorage.setItem(THEME_KEY, theme);
}

themeToggle.addEventListener("click", () => {
  const current = htmlEl.getAttribute("data-theme");
  applyTheme(current === "dark" ? "light" : "dark");
});

applyTheme(localStorage.getItem(THEME_KEY) || "dark");

const grandparentEl = document.getElementById("grandparent");
const parentEl       = document.getElementById("parent");
const childBtn       = document.getElementById("childBtn");
const propLog        = document.getElementById("propLog");
const captureToggle  = document.getElementById("captureToggle");

function logStep(label) {
  console.log(label);
  propLog.textContent += label + "\n";
}

function resetLog() {
  propLog.textContent = "";
}

childBtn.addEventListener("click", resetLog, true);

[
  [grandparentEl, "Grandparent"],
  [parentEl, "Parent"],
  [childBtn, "Child Button"],
].forEach(([el, name]) => {
  el.addEventListener(
    "click",
    () => {
      if (!captureToggle.checked) logStep(`[bubble] ${name}`);
    },
    false
  );

  el.addEventListener(
    "click",
    () => {
      if (captureToggle.checked) logStep(`[capture] ${name}`);
    },
    true
  );
});

captureToggle.addEventListener("change", resetLog);

renderTasks();

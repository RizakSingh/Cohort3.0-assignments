const STORAGE_TX = "fintrackpro_transactions";
  const STORAGE_PROFILE = "fintrackpro_profile";
  const STORAGE_THEME = "fintrackpro_theme";
  const CURRENCY_SYMBOLS = { USD: "$", EUR: "€", GBP: "£", INR: "₹", JPY: "¥" };

  let transactions = loadTransactions();
  let profile = loadProfile();
  let activeFilter = "all";
  let cashFlowChart = null;

  function loadTransactions() {
    try {
      const raw = localStorage.getItem(STORAGE_TX);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  function saveTransactions() {
    localStorage.setItem(STORAGE_TX, JSON.stringify(transactions));
  }

  function loadProfile() {
    try {
      const raw = localStorage.getItem(STORAGE_PROFILE);
      return raw ? JSON.parse(raw) : { name: "Guest", currency: "USD" };
    } catch {
      return { name: "Guest", currency: "USD" };
    }
  }

  function saveProfile() {
    localStorage.setItem(STORAGE_PROFILE, JSON.stringify(profile));
  }

  function formatMoney(amount) {
    const symbol = CURRENCY_SYMBOLS[profile.currency] || "$";
    const value = Math.abs(amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    return `${symbol}${value}`;
  }

  function cssVar(name) {
    return getComputedStyle(document.body).getPropertyValue(name).trim();
  }

  document.querySelectorAll(".nav-link").forEach((btn) => {
    btn.addEventListener("click", () => showPage(btn.dataset.page));
  });

  function showPage(page) {
    document.querySelectorAll(".nav-link").forEach((b) => b.classList.toggle("active", b.dataset.page === page));
    document.querySelectorAll(".page").forEach((p) => p.classList.toggle("active", p.id === `${page}-page`));
  }

  const profileForm = document.getElementById("profileForm");
  const profileNameInput = document.getElementById("profileName");
  const profileCurrencySelect = document.getElementById("profileCurrency");

  function renderProfileForm() {
    profileNameInput.value = profile.name || "";
    profileCurrencySelect.value = profile.currency || "USD";
  }

  profileForm.addEventListener("submit", (e) => {
    e.preventDefault();
    profile.name = profileNameInput.value.trim() || "Guest";
    profile.currency = profileCurrencySelect.value;
    saveProfile();
    masterRefresh();
  });

  const logoutBtn = document.getElementById("logoutBtn");
  const logoutOverlay = document.getElementById("logoutOverlay");
  const loginAgainBtn = document.getElementById("loginAgainBtn");

  logoutBtn.addEventListener("click", () => logoutOverlay.classList.add("open"));
  loginAgainBtn.addEventListener("click", () => logoutOverlay.classList.remove("open"));

  const darkModeToggle = document.getElementById("darkModeToggle");

  function applyTheme(theme) {
    document.body.classList.toggle("dark", theme === "dark");
    darkModeToggle.checked = theme === "dark";
    localStorage.setItem(STORAGE_THEME, theme);
  }

  darkModeToggle.addEventListener("change", () => {
    applyTheme(darkModeToggle.checked ? "dark" : "light");
    renderChart();
  });

  function calculateTotals() {
    let income = 0;
    let expense = 0;
    transactions.forEach((t) => {
      if (t.type === "income") income += t.amount;
      else expense += t.amount;
    });
    return { income, expense, balance: income - expense };
  }

  function updateCards() {
    const { income, expense, balance } = calculateTotals();
    document.getElementById("statBalance").textContent = (balance < 0 ? "-" : "") + formatMoney(balance);
    document.getElementById("statIncome").textContent = formatMoney(income);
    document.getElementById("statExpense").textContent = formatMoney(expense);
    document.getElementById("statCount").textContent = transactions.length;
  }

  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      activeFilter = btn.dataset.filter;
      document.querySelectorAll(".filter-btn").forEach((b) => b.classList.toggle("active", b === btn));
      renderTable();
    });
  });

  function renderTable() {
    const tbody = document.getElementById("txTableBody");
    const emptyNote = document.getElementById("emptyNote");

    const filtered = transactions
      .filter((t) => (activeFilter === "all" ? true : t.type === activeFilter))
      .sort((a, b) => new Date(b.date) - new Date(a.date));

    tbody.innerHTML = "";
    const fragment = document.createDocumentFragment();

    filtered.forEach((t) => {
      const row = document.createElement("tr");

      const dateCell = document.createElement("td");
      dateCell.textContent = t.date;

      const descCell = document.createElement("td");
      descCell.className = "tx-desc";
      descCell.textContent = t.description;

      const catCell = document.createElement("td");
      const catTag = document.createElement("span");
      catTag.className = "tag";
      catTag.textContent = t.category;
      catCell.appendChild(catTag);

      const amountCell = document.createElement("td");
      amountCell.className = `amount ${t.type === "income" ? "income" : "expense"}`;
      amountCell.textContent = `${t.type === "income" ? "+" : "-"}${formatMoney(t.amount)}`;

      const actionCell = document.createElement("td");
      const actions = document.createElement("div");
      actions.className = "row-actions";

      const editBtn = document.createElement("button");
      editBtn.className = "edit-btn";
      editBtn.type = "button";
      editBtn.textContent = "Edit";
      editBtn.addEventListener("click", () => openModal(t));

      const deleteBtn = document.createElement("button");
      deleteBtn.className = "delete-btn";
      deleteBtn.type = "button";
      deleteBtn.textContent = "Delete";
      deleteBtn.addEventListener("click", () => deleteTransaction(t.id));

      actions.append(editBtn, deleteBtn);
      actionCell.appendChild(actions);

      row.append(dateCell, descCell, catCell, amountCell, actionCell);
      fragment.appendChild(row);
    });

    tbody.appendChild(fragment);

    const isEmpty = transactions.length === 0;
    const noMatches = !isEmpty && filtered.length === 0;
    emptyNote.style.display = isEmpty || noMatches ? "block" : "none";
    emptyNote.textContent = isEmpty
      ? "No transactions yet — add your first one above."
      : "No transactions match this filter.";
  }

  function renderChart() {
    const grouped = {};
    transactions.forEach((t) => {
      if (!grouped[t.date]) grouped[t.date] = { income: 0, expense: 0 };
      grouped[t.date][t.type] += t.amount;
    });

    const labels = Object.keys(grouped).sort((a, b) => new Date(a) - new Date(b));
    const incomeData = labels.map((d) => grouped[d].income);
    const expenseData = labels.map((d) => grouped[d].expense);

    const ctx = document.getElementById("cashFlowChart").getContext("2d");

    if (cashFlowChart) cashFlowChart.destroy();

    cashFlowChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels.length ? labels : ["No data yet"],
        datasets: [
          {
            label: "Income",
            data: labels.length ? incomeData : [0],
            backgroundColor: "#16a34a",
            borderRadius: 6,
            maxBarThickness: 46,
          },
          {
            label: "Expense",
            data: labels.length ? expenseData : [0],
            backgroundColor: "#dc2626",
            borderRadius: 6,
            maxBarThickness: 46,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            ticks: { color: cssVar("--muted") },
            grid: { color: cssVar("--border") },
          },
          y: {
            beginAtZero: true,
            ticks: {
              color: cssVar("--muted"),
              callback: (v) => formatMoney(v),
            },
            grid: { color: cssVar("--border") },
          },
        },
        plugins: {
          legend: {
            position: "top",
            labels: { color: cssVar("--text") },
          },
        },
      },
    });
  }

  const txModal = document.getElementById("txModal");
  const modalTitle = document.getElementById("modalTitle");
  const addTransactionBtn = document.getElementById("addTransactionBtn");
  const closeModalBtn = document.getElementById("closeModalBtn");
  const txForm = document.getElementById("txForm");
  const txIdField = document.getElementById("txId");
  const txTypeField = document.getElementById("txType");
  const txDescriptionField = document.getElementById("txDescription");
  const txAmountField = document.getElementById("txAmount");
  const txDateField = document.getElementById("txDate");
  const txCategoryField = document.getElementById("txCategory");
  const formError = document.getElementById("formError");

  function todayISO() {
    return new Date().toISOString().slice(0, 10);
  }

  function openModal(existing) {
    formError.textContent = "";
    if (existing) {
      modalTitle.textContent = "Edit Transaction";
      txIdField.value = existing.id;
      txTypeField.value = existing.type;
      txDescriptionField.value = existing.description;
      txAmountField.value = existing.amount;
      txDateField.value = existing.date;
      txCategoryField.value = existing.category;
    } else {
      modalTitle.textContent = "Add Transaction";
      txForm.reset();
      txIdField.value = "";
      txDateField.value = todayISO();
    }
    txModal.classList.add("open");
    txDescriptionField.focus();
  }

  function closeModal() {
    txModal.classList.remove("open");
  }

  addTransactionBtn.addEventListener("click", () => openModal(null));
  closeModalBtn.addEventListener("click", closeModal);
  txModal.addEventListener("click", (e) => {
    if (e.target === txModal) closeModal();
  });

  txForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const description = txDescriptionField.value.trim();
    const amount = parseFloat(txAmountField.value);
    const date = txDateField.value;
    const category = txCategoryField.value;
    const type = txTypeField.value;

    if (!description || isNaN(amount) || amount <= 0 || !date || !category) {
      formError.textContent = "Please fill in every field with a valid amount before saving.";
      return;
    }

    const id = txIdField.value;

    if (id) {
      const existing = transactions.find((t) => t.id === id);
      Object.assign(existing, { type, description, amount, date, category });
    } else {
      transactions.push({
        id: String(Date.now()),
        type,
        description,
        amount,
        date,
        category,
      });
    }

    saveTransactions();
    closeModal();
    masterRefresh();
  });

  function deleteTransaction(id) {
    transactions = transactions.filter((t) => t.id !== id);
    saveTransactions();
    masterRefresh();
  }

  document.getElementById("resetAllBtn").addEventListener("click", () => {
    if (transactions.length === 0) return;
    if (!confirm("This will permanently delete every saved transaction. Continue?")) return;
    transactions = [];
    saveTransactions();
    masterRefresh();
  });

  function masterRefresh() {
    updateCards();
    renderTable();
    renderChart();
  }

  renderProfileForm();
  applyTheme(localStorage.getItem(STORAGE_THEME) || "light");
  masterRefresh();

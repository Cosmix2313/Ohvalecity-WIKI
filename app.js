const LOGIN_KEY = "fcid-session";
const ACCESS = {
  id: "FC-214",
  passcode: "fortcarson",
};

const records = [
  {
    name: "Miller, John",
    alias: "Ghostline",
    status: "Sorveglianza attiva",
    note: "Contatti frequenti con rete contrabbando locale.",
  },
  {
    name: "Ortega, Linda",
    alias: "Lynx",
    status: "Interrogatorio completato",
    note: "Cooperazione parziale, in verifica incongruenze timeline.",
  },
  {
    name: "Hayes, Marcus",
    alias: "N/A",
    status: "Mandato in preparazione",
    note: "Tracce finanziarie collegate a wallet offshore.",
  },
  {
    name: "Rossi, Elena",
    alias: "Red Falcon",
    status: "Case file archiviato",
    note: "Riapertura possibile su nuove prove biometriche.",
  },
];

const timelineEvents = [
  "07:35 — Accesso laboratori digital forensics completato.",
  "08:10 — Nuovo dossier caricato: Operazione Sandtrail.",
  "09:00 — Alert geofence: soggetto Miller in zona sensibile.",
  "09:42 — Richiesta supporto campo da Tactical Unit Bravo.",
];

const els = {
  loginScreen: document.getElementById("loginScreen"),
  dashboard: document.getElementById("dashboard"),
  loginForm: document.getElementById("loginForm"),
  agentId: document.getElementById("agentId"),
  passcode: document.getElementById("passcode"),
  loginError: document.getElementById("loginError"),
  logoutButton: document.getElementById("logoutButton"),
  searchInput: document.getElementById("searchInput"),
  recordsList: document.getElementById("recordsList"),
  timeline: document.getElementById("timeline"),
  statsList: document.getElementById("statsList"),
};

init();

function init() {
  const isLogged = localStorage.getItem(LOGIN_KEY) === "1";
  toggleSession(isLogged);
  renderTimeline();
  renderStats();
  renderRecords(records);

  els.loginForm.addEventListener("submit", handleLogin);
  els.logoutButton.addEventListener("click", handleLogout);
  els.searchInput.addEventListener("input", handleSearch);
}

function handleLogin(event) {
  event.preventDefault();

  const id = els.agentId.value.trim().toUpperCase();
  const pass = els.passcode.value.trim().toLowerCase();

  if (id !== ACCESS.id || pass !== ACCESS.passcode) {
    els.loginError.textContent = "Credenziali non valide. Verifica Agent ID e passcode.";
    return;
  }

  els.loginError.textContent = "";
  localStorage.setItem(LOGIN_KEY, "1");
  toggleSession(true);
}

function handleLogout() {
  localStorage.removeItem(LOGIN_KEY);
  els.loginForm.reset();
  toggleSession(false);
}

function handleSearch() {
  const query = els.searchInput.value.trim().toLowerCase();
  const filtered = records.filter((record) => {
    const target = `${record.name} ${record.alias} ${record.status} ${record.note}`.toLowerCase();
    return target.includes(query);
  });

  renderRecords(filtered);
}

function renderRecords(list) {
  if (!list.length) {
    els.recordsList.innerHTML = '<p class="muted">Nessun record trovato.</p>';
    return;
  }

  els.recordsList.innerHTML = list
    .map(
      (record) => `
        <article class="record">
          <strong>${record.name}</strong>
          <p>Alias: ${record.alias}</p>
          <p>Stato: ${record.status}</p>
          <p>Nota: ${record.note}</p>
        </article>
      `,
    )
    .join("");
}

function renderTimeline() {
  els.timeline.innerHTML = timelineEvents
    .map((entry) => `<div class="timeline-item">${entry}</div>`)
    .join("");
}

function renderStats() {
  const stats = [
    `Casi attivi: ${records.filter((r) => !r.status.includes("archiviato")).length}`,
    `Soggetti monitorati: ${records.length}`,
    "Unità operative coinvolte: 3",
    "Livello allerta base: Elevated",
  ];

  els.statsList.innerHTML = stats.map((entry) => `<li>${entry}</li>`).join("");
}

function toggleSession(isLogged) {
  els.loginScreen.hidden = isLogged;
  els.dashboard.hidden = !isLogged;
}

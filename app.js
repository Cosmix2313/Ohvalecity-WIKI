const LOGIN_KEY = "fcid-session";
const ACCESS = {
  id: "FC-214",
  passcode: "fortcarson",
};

const detectives = [
  { id: "FC-214", name: "Lt. Mason Reed", unit: "CID Alpha", status: "On Duty" },
  { id: "FC-327", name: "Sgt. Elena Rossi", unit: "Digital Forensics", status: "In Lab" },
  { id: "FC-198", name: "Det. Marcus Hayes", unit: "Field Intel", status: "In Patrol" },
  { id: "FC-412", name: "Det. Linda Ortega", unit: "Interviews", status: "Briefing" },
];

const openCases = [
  { code: "CASE-19A", title: "Operazione Sandtrail", priority: "Alta" },
  { code: "CASE-27C", title: "Traffico componenti militari", priority: "Critica" },
  { code: "CASE-08F", title: "Accessi non autorizzati a deposito", priority: "Media" },
];

const documentation = [
  "Protocollo interrogatori CID v3.4",
  "Checklist Digital Evidence Handling",
  "Linee guida catena di custodia",
  "Manuale rischio operativo in campo",
];

const armoryRegister = [
  "M4A1 - Serial FCM4-7721 - Assegnata a Unit Bravo",
  "G17 - Serial FCG17-3120 - Armory shelf B2",
  "Taser X26 - Serial FCX26-9914 - In manutenzione",
  "Bodycam AXON-12 - Serial FCAX-1008 - In uso operativo",
];

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
  "10:14 — Documentazione prove aggiornata da Sgt. Rossi.",
];

const usefulLinks = [
  { label: "Portale Internal Affairs", url: "#" },
  { label: "Database biometrico DoD", url: "#" },
  { label: "Registro veicoli militari", url: "#" },
  { label: "Comunicazioni cifrate unità", url: "#" },
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
  agentsList: document.getElementById("agentsList"),
  casesList: document.getElementById("casesList"),
  docsList: document.getElementById("docsList"),
  weaponsList: document.getElementById("weaponsList"),
  linksList: document.getElementById("linksList"),
};

init();

function init() {
  const isLogged = localStorage.getItem(LOGIN_KEY) === "1";
  toggleSession(isLogged);

  renderAgents();
  renderCases();
  renderDocs();
  renderWeapons();
  renderTimeline();
  renderStats();
  renderRecords(records);
  renderLinks();

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

function renderAgents() {
  els.agentsList.innerHTML = detectives
    .map(
      (agent) => `
        <article class="tile">
          <strong>${agent.name}</strong>
          <p>ID: ${agent.id}</p>
          <p>Unità: ${agent.unit}</p>
          <p class="pill">${agent.status}</p>
        </article>
      `,
    )
    .join("");
}

function renderCases() {
  els.casesList.innerHTML = openCases
    .map(
      (item) => `
        <article class="tile">
          <strong>${item.code}</strong>
          <p>${item.title}</p>
          <p class="pill">Priorità: ${item.priority}</p>
        </article>
      `,
    )
    .join("");
}

function renderDocs() {
  els.docsList.innerHTML = documentation
    .map((entry) => `<article class="tile"><p>${entry}</p></article>`)
    .join("");
}

function renderWeapons() {
  els.weaponsList.innerHTML = armoryRegister
    .map((entry) => `<article class="tile"><p>${entry}</p></article>`)
    .join("");
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

function renderLinks() {
  els.linksList.innerHTML = usefulLinks
    .map((entry) => `<a class="link-card" href="${entry.url}">${entry.label}</a>`)
    .join("");
}

function renderStats() {
  const stats = [
    `Casi aperti: ${openCases.length}`,
    `Detective disponibili: ${detectives.length}`,
    `Soggetti monitorati: ${records.length}`,
    "Livello allerta: High / Dark Blue",
  ];

  els.statsList.innerHTML = stats.map((entry) => `<li>${entry}</li>`).join("");
}

function toggleSession(isLogged) {
  els.loginScreen.hidden = isLogged;
  els.dashboard.hidden = !isLogged;
}

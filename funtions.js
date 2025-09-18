// js/app.js
const sidebar = document.getElementById("sidebar");
const btnOpen = document.getElementById("btnOpen");
const btnClose = document.getElementById("btnClose");
const backdrop = document.getElementById("backdrop");
const main = document.getElementById("main");
const view = document.getElementById("view");
const links = Array.from(
  document.querySelectorAll('[data-route], .sidebar-nav .nav-link[href^="#"]')
);

const prefersDesktop = () => matchMedia("(min-width:1024px)").matches;
function openSidebar() {
  if (prefersDesktop()) return;
  sidebar.classList.add("open");
  backdrop.hidden = false;
  backdrop.classList.add("show");
  btnOpen?.setAttribute("aria-expanded", "true");
  const firstLink = sidebar.querySelector(".nav-link");
  firstLink && firstLink.focus();
}
function closeSidebar() {
  sidebar.classList.remove("open");
  backdrop.classList.remove("show");
  setTimeout(() => {
    if (!sidebar.classList.contains("open")) backdrop.hidden = true;
  }, 250);
  btnOpen?.setAttribute("aria-expanded", "false");
  main?.focus();
}
btnOpen?.addEventListener("click", openSidebar);
btnClose?.addEventListener("click", closeSidebar);
backdrop?.addEventListener("click", closeSidebar);
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && sidebar.classList.contains("open")) closeSidebar();
});

// Rutas con CSS/JS por vista
const routes = {
  "#inicio": {
    title: "Inicio",
    file: "/view/inicio/inicio.html",
    css: ["/view/inicio/inicio.css"],
    js: "/view/inicio/inicio.js",
  },
  "#promos": {
    title: "Promos",
    file: "views/promos.html",
    css: ["css/views/promos.css"],
    js: "js/views/promos.js",
  },
  "#juegos": {
    title: "Juegos",
    file: "views/juegos.html",
    css: ["css/views/juegos.css"],
    js: "js/views/juegos.js",
  },
  "#reportes": {
    title: "Reportes",
    file: "views/reportes.html",
    css: ["css/views/reportes.css"],
    js: "js/views/reportes.js",
  },
  "#ayuda": {
    title: "Ayuda",
    file: "views/ayuda.html",
    css: ["css/views/ayuda.css"],
    js: "js/views/ayuda.js",
  },
  "#gran_aladdin": {
    title: "Grand Aladdin",
    file: "/view/grand_aladdin/grand_aladdin.html",
    css: ["/view/grand_aladdin/grand_aladdin.css"],
    js :"/view/grand_aladdin/grand_aladdin.js",
  }
};

// Estilos activos por vista
const activeStyleIds = new Set();
function ensureStyle(id, href) {
  if (document.getElementById(id)) return;
  const link = document.createElement("link");
  link.id = id;
  link.rel = "stylesheet";
  link.href = `${href}?v=${Date.now()}`; // cache-busting
  document.head.appendChild(link);
  activeStyleIds.add(id);
}
function removeOldStyles(keepIds) {
  activeStyleIds.forEach((id) => {
    if (!keepIds.has(id)) {
      document.getElementById(id)?.remove();
      activeStyleIds.delete(id);
    }
  });
}

// Controlador (módulo) actual
let currentController = null; // { init, destroy }
async function loadController(modulePath) {
  if (!modulePath) return null;
  const mod = await import(`${modulePath}?v=${Date.now()}`);
  return typeof mod.init === "function" ? mod : null;
}

async function loadView({ file, css = [], js }) {
  // destroy anterior
  try {
    await currentController?.destroy?.();
  } catch (_) {}

  // loader mínimo
  view.innerHTML = '<p style="opacity:.8">Cargando…</p>';

  // estilos de la vista
  const nextStyleIds = new Set();
  css.forEach((href, i) => {
    const id = `view-style-${href.replace(/[^\w-]/g, "_")}-${i}`;
    ensureStyle(id, href);
    nextStyleIds.add(id);
  });
  removeOldStyles(nextStyleIds);

  try {
    const res = await fetch(`${file}?v=${Date.now()}`, { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const html = await res.text();

    view.innerHTML = html;
    view.setAttribute("tabindex", "-1");
    view.focus({ preventScroll: true });
    main.scrollTo({ top: 0, behavior: "smooth" });

    currentController = await loadController(js);
    if (currentController) await currentController.init(view);
  } catch (err) {
    view.innerHTML = `
      <div role="alert" style="color:#f88">
        <strong>Error cargando la vista</strong><br/>
        Archivo: <code>${file}</code><br/>
        Detalle: ${err.message}
      </div>`;
    try {
      await currentController?.destroy?.();
    } catch (_) {}
    currentController = null;
    removeOldStyles(new Set());
  }
}

let lastHash = null;
function setActive(hash) {
  if (!hash) hash = "#inicio";
  if (hash === lastHash) return;
  lastHash = hash;

  links.forEach((a) =>
    a.classList.toggle("active", a.getAttribute("href") === hash)
  );
  const route = routes[hash] || routes["#inicio"];
  document.title = `${route.title} – Integrador`;
  loadView(route);
  if (!prefersDesktop()) closeSidebar();
}

// Inicializar
if (!location.hash) location.hash = "#inicio";
setActive(location.hash);
window.addEventListener("hashchange", () => setActive(location.hash));

// Utilidad opcional global (antes la llamabas desde onclick)
window.AlertaDesarrollo = function () {
  Swal?.fire?.(
    "En desarrollo",
    "Esta sección estará disponible pronto.",
    "info"
  );
};

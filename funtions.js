/* ========= app.js (principal) ========= */

// ============== CONFIG API ==============
const API_URL =
  "https://script.google.com/macros/s/AKfycbycrFFC2OpF39k40-4X5OlmhAOzGgjmGaJu9018RZsZumOAeerOazIInHFJST6iACaj_Q/exec"; // ej: https://script.google.com/macros/s/AKfycbx.../exec

// ========== SELECTORES BÁSICOS ==========
const sidebar = document.getElementById("sidebar");
const btnOpen = document.getElementById("btnOpen");
const btnClose = document.getElementById("btnClose");
const backdrop = document.getElementById("backdrop");
const main = document.getElementById("main");
const view = document.getElementById("view");
const links = Array.from(
  document.querySelectorAll('[data-route], .sidebar-nav .nav-link[href^="#"]')
);

// ========== SIDEBAR / UI ==========
const prefersDesktop = () => matchMedia("(min-width:1024px)").matches;

function openSidebar() {
  if (prefersDesktop()) return;
  sidebar?.classList.add("open");
  if (backdrop) {
    backdrop.hidden = false;
    backdrop.classList.add("show");
  }
  btnOpen?.setAttribute("aria-expanded", "true");
  const firstLink = sidebar?.querySelector?.(".nav-link");
  firstLink && firstLink.focus();
}
function closeSidebar() {
  sidebar?.classList.remove("open");
  backdrop?.classList.remove("show");
  setTimeout(() => {
    if (!sidebar?.classList.contains("open"))
      backdrop && (backdrop.hidden = true);
  }, 250);
  btnOpen?.setAttribute("aria-expanded", "false");
  main?.focus?.();
}
btnOpen?.addEventListener("click", openSidebar);
btnClose?.addEventListener("click", closeSidebar);
backdrop?.addEventListener("click", closeSidebar);
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && sidebar?.classList.contains("open")) closeSidebar();
});

// ======== RUTAS (marca requiresAuth en las privadas) ========
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
    requiresAuth: true,
  },
  "#juegos": {
    title: "Juegos",
    file: "views/juegos.html",
    css: ["css/views/juegos.css"],
    js: "js/views/juegos.js",
    requiresAuth: true,
  },
  "#reportes": {
    title: "Reportes",
    file: "views/reportes.html",
    css: ["css/views/reportes.css"],
    js: "js/views/reportes.js",
    requiresAuth: true,
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
    js: "/view/grand_aladdin/grand_aladdin.js",
    requiresAuth: true,
  },
  "#login": {
    title: "Iniciar sesión",
    file: "/view/login/login.html",
    css: ["/view/login/login.css"],
    js: "/view/login/login.js",
  },
  // (opcional)
  "#registrarse": {
    title: "Crear cuenta",
    file: "/view/registro/registro.html",
    css: ["/view/registro/login.css"],
    js: "/view/registro/registro.js",
  },
};

// Rutas que NO deben mostrar header/sidebar/footer

// ======= CARGA DINÁMICA DE ESTILOS =======
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

// ======= CONTROLADOR DE VISTAS (módulos ES) =======
let currentController = null; // { init, destroy }
async function loadController(modulePath) {
  if (!modulePath) return null;
  const mod = await import(`${modulePath}?v=${Date.now()}`);
  return typeof mod.init === "function" ? mod : null;
}

// --- rutas sin “shell” (sin header/sidebar/footer) ---
const SHELLLESS = new Set(["#login", "#registrarse", "#registro"]);

// Activa/Desactiva el modo login (oculta shell)
function setShelllessMode(isOn) {
  document.body.classList.toggle("is-authless", !!isOn);
}

let lastHash = null;

function setActive(hash) {
  if (!hash) hash = "#inicio";

  // 1) Lee la ruta pedida
  const wanted = routes[hash] || routes["#inicio"];

  // 2) Si la ruta es privada y no hay sesión, redirige a #login
  if (wanted.requiresAuth && !isAuthenticated()) {
    sessionStorage.setItem("post_login_redirect", hash);
    hash = "#login";
  }

  // 3) (Re)calcula la ruta final y activa modo sin shell si aplica
  const route = routes[hash] || routes["#inicio"];
  setShelllessMode(SHELLLESS.has(hash));

  if (hash === lastHash) return;
  lastHash = hash;

  // 4) Marca activo en el menú (si visible)
  links.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === hash));

  document.title = `${route.title} – Integrador`;
  loadView(route);
  if (!prefersDesktop()) closeSidebar();
}


async function loadView({ file, css = [], js }) {
  // destruye controlador anterior
  try {
    await currentController?.destroy?.();
  } catch (_) {}

  // loader simple
  if (view) view.innerHTML = '<p style="opacity:.8">Cargando…</p>';

  // estilos propios de la vista
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
    view.focus?.({ preventScroll: true });
    main?.scrollTo?.({ top: 0, behavior: "smooth" });

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

// ============ AUTENTICACIÓN (localStorage) ============
const AUTH_TOKEN_KEY = "auth_token";
const AUTH_EXP_KEY = "auth_exp";
const AUTH_USER_KEY = "auth_user";

function getToken() {
  return localStorage.getItem(AUTH_TOKEN_KEY) || "";
}
function getExp() {
  return Number(localStorage.getItem(AUTH_EXP_KEY) || 0);
}
function getAuthUser() {
  try {
    return JSON.parse(localStorage.getItem(AUTH_USER_KEY) || "{}");
  } catch {
    return {};
  }
}
function isAuthenticated() {
  const token = getToken();
  const exp = getExp();
  return !!token && Date.now() < exp;
}
function clearSession() {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(AUTH_EXP_KEY);
  localStorage.removeItem(AUTH_USER_KEY);
}
function saveSession({ token, exp, user }) {
  if (token) localStorage.setItem(AUTH_TOKEN_KEY, token);
  if (exp) localStorage.setItem(AUTH_EXP_KEY, String(exp));
  if (user) localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
  refreshAdminLinksVisibility();
}

// Exponer logout (útil para botón en UI)
function logout() {
  clearSession();
  sessionStorage.removeItem("post_login_redirect");
  location.hash = "#login";
}
window.logout = logout;

// Ocultar/mostrar enlaces solo-admin
function refreshAdminLinksVisibility() {
  const me = getAuthUser();
  const isAdmin = String(me?.rol || "").toLowerCase() === "admin";
  document.querySelectorAll("[data-admin-only]").forEach((el) => {
    el.style.display = isAdmin ? "" : "none";
  });
}

setInterval(() => {
  if (!isAuthenticated() && location.hash !== "#login") {
    sessionStorage.setItem("post_login_redirect", location.hash || "#inicio");
    location.hash = "#login";
  }
}, 15 * 100000); // cada 15s

async function apiFetch(path = "", { method = "POST", body = {}, headers = {} } = {}) {
  // Inyecta token en el body (tu requireAuth_ ya soporta leerlo ahí)
  const token = localStorage.getItem("auth_token");
  const payload = { ...(body || {}) };
  if (token) payload.token = token;

  const res = await fetch(API_URL + path, {
    method,
    headers: { "Content-Type": "text/plain;charset=utf-8", ...headers },
    body: JSON.stringify(payload),
  });

  const txt = await res.text();
  let data;
  try { data = JSON.parse(txt); }
  catch { throw new Error("Respuesta no JSON (¿CORS/permiso WebApp?): " + txt.slice(0,200)); }

  if (data?.ok === false && /UNAUTHORIZED/i.test(String(data.error || ""))) {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_exp");
    localStorage.removeItem("auth_user");
    sessionStorage.setItem("post_login_redirect", location.hash || "#inicio");
    location.hash = "#login";
    throw new Error("No autorizado");
  }
  return data;
}

window.apiFetch = apiFetch;

(function boot() {
  // Limpia sesión caducada al arrancar
  if (!isAuthenticated()) clearSession();

  // Refresca enlaces admin en arranque
  refreshAdminLinksVisibility();

  // Enlace directo a ruta protegida → redirigir a login
  if (!location.hash) location.hash = "#inicio";
  setActive(location.hash);

  // Cambios de hash
  window.addEventListener("hashchange", () => setActive(location.hash));

  // Sincroniza sesión entre pestañas
  window.addEventListener("storage", (e) => {
    if ([AUTH_TOKEN_KEY, AUTH_EXP_KEY, AUTH_USER_KEY].includes(e.key)) {
      refreshAdminLinksVisibility();
      if (!isAuthenticated() && location.hash !== "#login") {
        sessionStorage.setItem(
          "post_login_redirect",
          location.hash || "#inicio"
        );
        location.hash = "#login";
      }
    }
  });
})();

window.AlertaDesarrollo = function () {
  if (window.Swal?.fire) {
    Swal.fire(
      "En desarrollo",
      "Esta sección estará disponible pronto.",
      "info"
    );
  } else {
    alert("En desarrollo. Esta sección estará disponible pronto.");
  }
};

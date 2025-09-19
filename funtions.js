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
    js: "/view/grand_aladdin/grand_aladdin.js",
  },
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

let _scrollY = 0;

document.getElementById("btn_iniciar_sesion").addEventListener("click", () => {
  console.log("entro al btn");
  // localStorage.removeItem("usuario_integrador_aladdin");

  const user_name = document.getElementById("user_name");
  const user_rol = document.getElementById("user_rol");

  const usuarioEl = document.getElementById("nombre_login");
  const cedulaEl = document.getElementById("contraseña_login");

  const loader = document.getElementById("loader-login");

  if (usuarioEl.value == "" || cedulaEl.value == "") {
    Swal.fire({
      icon: "info",
      title: "Campos en blanco",
      html: "Completa todos los campos para poder iniciar sesión.",
    });
    return;
  }

  const url =
    "https://script.google.com/macros/s/AKfycbwoQFpBcbOBhNbIvqo6UPlv9oV1H8IHKJMlonFOiK1T9cW6J0I8uZHAe5bPps4NxdmD3Q/exec";

  let cedula = cedulaEl.value;
  loader.style.display = "flex";

  fetch(`${url}?cedula=${encodeURIComponent(cedula)}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "data");
      if (!Array.isArray(data) || data.length === 0) {
        loader.style.display = "none";
        return;
      }
      loader.style.display = "none";

      // Éxito: guarda en localStorage (si ya estaba, lo refresca)
      localStorage.setItem(LS_KEY, cedula);
      user_name.innerHTML = data[0].Nombre;
      user_rol.innerHTML = data[0].Rol;
      // Cierra overlay y habilita scroll
      document.getElementById("background_login").style.display = "none";
      cleanUrl({ keepQuery: false, hash: "#inicio" });
      unlockBodyScroll();
    })
    .catch((err) => {
      console.error("Error al consultar la cédula:", err);
      Swal.fire({
        icon: "error",
        title: "Error en la verificación.",
        text: "No se pudo verificar si el registro existe.",
      });
    });

  lockBodyScroll();
});
lockBodyScroll();

function lockBodyScroll() {
  _scrollY = window.scrollY || document.documentElement.scrollTop;
  document.body.style.top = `-${_scrollY}px`;
  document.body.classList.add("body-lock");
}

function unlockBodyScroll() {
  document.body.classList.remove("body-lock");
  document.body.style.top = "";
  window.scrollTo(0, _scrollY);
}

const LS_KEY = "usuario_integrador_aladdin";

function getUsersLogin() {
  const user_name = document.getElementById("user_name");
  const user_rol = document.getElementById("user_rol");

  const savedCedula = localStorage.getItem(LS_KEY) || "";
  const cedulaParaEnviar = savedCedula;
  const loader = document.getElementById("loader-login");

  const url =
    "https://script.google.com/macros/s/AKfycbwoQFpBcbOBhNbIvqo6UPlv9oV1H8IHKJMlonFOiK1T9cW6J0I8uZHAe5bPps4NxdmD3Q/exec";

  if (!cedulaParaEnviar) {
    return;
  }

  loader.style.display = "flex";
  fetch(`${url}?cedula=${encodeURIComponent(cedulaParaEnviar)}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "data");
      if (!Array.isArray(data) || data.length === 0) {
        loader.style.display = "none";
        return;
      }
      loader.style.display = "none";

      // Éxito: guarda en localStorage (si ya estaba, lo refresca)
      localStorage.setItem(LS_KEY, cedulaParaEnviar);
      user_name.innerHTML = data[0].Nombre;
      user_rol.innerHTML = data[0].Rol;
      // Cierra overlay y habilita scroll
      document.getElementById("background_login").style.display = "none";
      cleanUrl({ keepQuery: false, hash: "#inicio" });
      unlockBodyScroll();
    })
    .catch((err) => {
      console.error("Error al consultar la cédula:", err);
      Swal.fire({
        icon: "error",
        title: "Error en la verificación.",
        text: "No se pudo verificar si el registro existe.",
      });
    });
}

getUsersLogin();

document
  .getElementById("olvidar_usuario")
  .addEventListener("click", () => forgetSavedUser());

function cleanUrl({ keepQuery = false, hash = "" } = {}) {
  const base = location.origin + location.pathname;
  const q = keepQuery ? location.search : "";
  const h = hash ? hash : ""; // p.ej. "#login" o "" para sin hash
  history.replaceState(null, document.title, base + q + h);
}

function forgetSavedUser() {
  Swal.fire({
    title: "Estas Seguro?",
    text: "¿Seguro que quieres salir de manera segura?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si quiero!",
  }).then((result) => {
    if (!result.isConfirmed) return;

    localStorage.removeItem(LS_KEY);

    // 1) Limpia query y deja la ruta limpia + #login (SPA)
    cleanUrl({ keepQuery: false, hash: "#login" });

    // 2) Si tu router escucha hashchange, esto ya basta.
    //    Si no, puedes forzar:
    // location.reload(); // (opcional, no recomendado si tu SPA maneja el hash)
    Swal.fire("Exitoso!", "Tu usuario ha sido olvidado.", "success").then(
      (res) => {
        if (res.isConfirmed) {
          location.reload();
        }
      }
    );
  });
}

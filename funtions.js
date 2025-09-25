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

const routes = {
  "#inicio": {
    title: "Inicio",
    file: "/view/inicio/inicio.html",
    css: ["/view/inicio/inicio.css"],
    js: "/view/inicio/inicio.js",
  },
  "#gran_aladdin": {
    title: "Grand Aladdin",
    file: "/view/grand_aladdin/grand_aladdin.html",
    css: ["/view/grand_aladdin/grand_aladdin.css"],
    js: "/view/grand_aladdin/grand_aladdin.js",
  },
  "#publicacion_instagram": {
    title: "Publicacion Social Media",
    file: "/view/publicacion_instagram/publi_instagram.html",
    css: ["/view/publicacion_instagram/public_instagram.css"],
    js: "/view/publicacion_instagram/publi_instagram.js",
  },
  "#dinamicas": {
    title: "Dinamicas",
    file: "/view/dinamicas/dinamicas.html",
    css: ["/view/dinamicas/dinamicas.css"],
    js: "/view/dinamicas/dinamicas.js",
  },
  "#otros": {
    title: "Otras Acciones",
    file: "/view/otras/otras.html",
    css: ["/view/otras/otras.css"],
    js: "/view/otras/otras.js",
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

let _scrollY = 0;
let lastHash = null;

function setActive(hash, { force = false } = {}) {
  if (!hash) hash = "#inicio"; // usa default internamente
  if (!force && hash === lastHash) return; // evita recargar si es el mismo hash
  lastHash = hash;

  links.forEach((a) =>
    a.classList.toggle("active", a.getAttribute("href") === hash)
  );

  const route = routes[hash] || routes["#inicio"];
  document.title = `${route.title} – Integrador`;
  loadView(route);
  if (!prefersDesktop()) closeSidebar();
}

// Inicializar SIN modificar la URL:
const initialHash = location.hash;
setActive(initialHash);

window.addEventListener("hashchange", () => setActive(location.hash));

/* --------------------
   LOGIN
-------------------- */
document.getElementById("btn_iniciar_sesion").addEventListener("click", () => {
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
      if (!Array.isArray(data) || data.length === 0) {
        Swal.fire({
          icon: "info",
          title: "Usuario no encontrado",
          html: "El usuario no se encuentra. Contacta el área de Publicidad.",
        });
        console.log("Usuario no encontrado");
        loader.style.display = "none";
        return;
      }
      loader.style.display = "none";

      localStorage.setItem(LS_KEY, cedula);
      user_name.innerHTML = data[0].Nombre.substring(0, 10) + "...";
      user_rol.innerHTML = data[0].Rol;
      validateSeccion();
      document.getElementById("background_login").style.display = "none";
      document.getElementById("background_login").classList.add("test_hidden");
      document.getElementById("menu_login").style.display = "flex";
      document.getElementById("footer_label_legal").style.display = "flex";

      const user = {
        nombre: data[0].Nombre,
        rol: data[0].Rol,
        cedula: cedula,
      };

      if (!location.hash || location.hash === "#login") {
        location.hash = "#inicio";
      }
      window.AppStore?.setUser?.(data);
      metodoprueba(data);

      // AppStore.setUser(user);
      setActive("#inicio", { force: true });

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
  document.body.style.backgroundColor = "white";
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
      if (!Array.isArray(data) || data.length === 0) {
        loader.style.display = "none";
        return;
      }
      localStorage.setItem(LS_KEY, cedulaParaEnviar);
      user_name.innerHTML = data[0].Nombre.substring(0, 10) + "...";
      user_rol.innerHTML = data[0].Rol;

      document.getElementById("background_login").style.display = "none";
      document.getElementById("background_login").classList.add("test_hidden");
      document.getElementById("menu_login").style.display = "flex";
      document.getElementById("footer_label_legal").style.display = "flex";

      const user = {
        nombre: data[0].Nombre,
        rol: data[0].Rol,
        cedula: cedulaParaEnviar,
      };

      if (!location.hash || location.hash === "#login") {
        location.hash = "#inicio";
      }

      window.AppStore?.setUser?.(data);
      metodoprueba(data);
      validateSeccion();
      unlockBodyScroll();
    })
    .catch((err) => {
      console.error("Error al consultar la cédula:", err);
      if (!location.hash || location.hash === "#login") {
        location.hash = "#inicio";
      }

      Swal.fire({
        icon: "error",
        title: "Error en la verificación.",
        text: "No se pudo verificar si el registro existe.",
      });
    });
}

getUsersLogin();

function validateSeccion() {
  if (localStorage.getItem(LS_KEY)) {
    document.getElementById("menu_login").style.display = "flex";
    document.getElementById("app").style.background = "#0f162d";
    document.getElementById("footer_label_legal").style.display = "flex";
  } else {
    document.getElementById("menu_login").style.display = "none";
    document.getElementById("app").style.background = "white";
    document.getElementById("footer_label_legal").style.display = "none";
  }
}

if (localStorage.getItem(LS_KEY)) {
  document.getElementById("menu_login").style.display = "flex";
  document.getElementById("app").style.background = "#0f162d";
  document.getElementById("footer_label_legal").style.display = "flex";
} else {
  document.getElementById("menu_login").style.display = "none";
  document.getElementById("app").style.background = "white";
  document.getElementById("footer_label_legal").style.display = "none";
}

validateSeccion();

document
  .getElementById("olvidar_usuario")
  .addEventListener("click", OlivdarUsuario);
function OlivdarUsuario() {
  Swal.fire({
    title: "Seguro de salir?",
    text: "Se olvidara el usuario y la contraseña",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si Quiero!",
    allowOutsideClick: false,
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Exito!",
        text: "Tu usuario has sido olivdado.",
        icon: "success",
        allowOutsideClick: false,
      }).then((res) => {
        if (res.isConfirmed) {
          localStorage.removeItem(LS_KEY);
          localStorage.removeItem("app:user");
          validateSeccion();
          window.location.hash = "#login";
          location.reload();
        }
      });
    }
  });
}

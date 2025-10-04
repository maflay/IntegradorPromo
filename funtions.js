const sidebar = document.getElementById("sidebar");
const btnOpen = document.getElementById("btnOpen");
const btnClose = document.getElementById("btnClose");
const backdrop = document.getElementById("backdrop");
const main = document.getElementById("main");
const view = document.getElementById("view");
const links = Array.from(
  document.querySelectorAll('[data-route], .sidebar-nav .nav-link[href^="#"]')
);

document.getElementById("app").style.display = "none";

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

let userRoute = getCookie("__Secure_1nf0_US3R") || [];
let routes = {};

// menu ALL
if (userRoute.Nivel == 2 || userRoute.Nivel == 4) {
  // promotor view
  routes = {
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
    "#dinamicas": {
      title: "Dinamicas",
      file: "/view/dinamicas/dinamicas.html",
      css: ["/view/dinamicas/dinamicas.css"],
      js: "/view/dinamicas/dinamicas.js",
    },
    "#ayuda": {
      title: "Ayuda",
      file: "/view/ayuda/ayuda.html",
      css: ["/view/ayuda/ayuda.css"],
      js: "/view/ayuda/ayuda.js",
    },
  };
} else if (userRoute.Nivel == 3) {
  // Social media
  routes = {
    "#inicio": {
      title: "Inicio",
      file: "/view/inicio/inicio.html",
      css: ["/view/inicio/inicio.css"],
      js: "/view/inicio/inicio.js",
    },
        "#publicacion_instagram": {
      title: "Publicacion Social Media",
      file: "/view/publicacion_instagram/publi_instagram.html",
      css: ["/view/publicacion_instagram/public_instagram.css"],
      js: "/view/publicacion_instagram/publi_instagram.js",
    },
    "#ayuda": {
      title: "Ayuda",
      file: "/view/ayuda/ayuda.html",
      css: ["/view/ayuda/ayuda.css"],
      js: "/view/ayuda/ayuda.js",
    },
  };
} else {
  // Menu ADMIN
  routes = {
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
    "#usuarios": {
      title: "Usuarios",
      file: "/view/usuarios/usuarios.html",
      css: ["/view/usuarios/usuarios.css"],
      js: "/view/usuarios/usuarios.js",
    },
    "#ayuda": {
      title: "Ayuda",
      file: "/view/ayuda/ayuda.html",
      css: ["/view/ayuda/ayuda.css"],
      js: "/view/ayuda/ayuda.js",
    },
  };
}

// Estilos activos por vista
const activeStyleIds = new Set();
function ensureStyle(id, href) {
  if (document.getElementById(id)) return;
  const link = document.createElement("link");
  link.id = id;
  link.rel = "stylesheet";
  link.href = `${href}?v=${Date.now()}`;
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
let currentController = null;
async function loadController(modulePath) {
  if (!modulePath) return null;
  const mod = await import(`${modulePath}?v=${Date.now()}`);
  return typeof mod.init === "function" ? mod : null;
}

async function loadView({ file, css = [], js }) {
  try {
    await currentController?.destroy?.();
  } catch (_) {}

  view.innerHTML = '<p style="opacity:.8">Cargando…</p>';

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
  if (!hash) hash = "#inicio";
  if (!force && hash === lastHash) return;
  lastHash = hash;

  links.forEach((a) =>
    a.classList.toggle("active", a.getAttribute("href") === hash)
  );

  const route = routes[hash] || routes["#inicio"];
  document.title = `${route.title} – Integrador`;
  loadView(route);
  if (!prefersDesktop()) closeSidebar();
}

const initialHash = location.hash;
setActive(initialHash);

window.addEventListener("hashchange", () => setActive(location.hash));

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
        // console.log("Usuario no encontrado");
        loader.style.display = "none";
        return;
      }
      // loader.style.display = "none";
      // localStorage.setItem(LS_KEY, cedula);
      user_name.innerHTML = data[0].Nombre.substring(0, 10) + "...";
      user_rol.innerHTML = data[0].Rol;
      document.getElementById("background_login").style.display = "none";
      document.getElementById("background_login").classList.add("test_hidden");
      document.getElementById("menu_login").style.display = "flex";
      document.getElementById("footer_label_legal").style.display = "flex";
      let testHora = data[0].Hora;

      const d = new Date(testHora);
      if (!location.hash || location.hash === "#login") {
        location.hash = "#inicio";
      }

      // Hora en formato Colombia
      const hora = d.toLocaleTimeString("es-CO", {
        timeZone: "America/Bogota",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

      const user = {
        Hora: hora,
        Fecha: data[0].Fecha,
        Nombre: data[0].Nombre,
        rol: data[0].Rol,
        Area: data[0].Area,
        Telefono: data[0].Telefono,
        Correo: data[0].Correo,
        UserName: data[0].UserName,
        Cedula: cedula,
        Nivel: data[0].lvl,
      };

      // console.log(user, "user");
      document.getElementById("app").style.display = "flex";

      setCookie(CS_KEY, user, { days: 7 });
      validateSeccion();
      window.AppStore?.setUser?.(user);
      metodoprueba();
      unlockBodyScroll();
      location.reload();
    })
    .catch((err) => {
      console.error("Error al consultar la cédula:", err);
      loader.style.display = "none";
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

function setCookie(name, value, opts = {}) {
  const {
    days = 7,
    path = "/",
    sameSite = "Lax", // recomendado
    secure = location.protocol === "https:", // true si estás en https
  } = opts;

  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  const encoded = encodeURIComponent(JSON.stringify(value));
  let cookie = `${name}=${encoded}; Expires=${expires}; Path=${path}; SameSite=${sameSite}`;
  if (secure) cookie += `; Secure`;
  document.cookie = cookie;
  // validateCookie();
}

function getCookie(name) {
  const parts = document.cookie ? document.cookie.split("; ") : [];
  for (const part of parts) {
    const [k, ...rest] = part.split("=");
    if (k === name) {
      const val = rest.join("=");
      try {
        return JSON.parse(decodeURIComponent(val));
      } catch {
        return decodeURIComponent(val);
      }
    }
  }
  return null;
}

window.getCookie = getCookie;

const LS_KEY = "usuario_integrador_aladdin";
const CS_KEY = "__Secure_1nf0_US3R";

function getUsersLogin() {
  const user_name = document.getElementById("user_name");
  const user_rol = document.getElementById("user_rol");
  let infoCookie = getCookie(CS_KEY) || "";
  // console.log(infoCookie, "infoCookie");
  let cedulaCookie = infoCookie.Cedula;

  const savedCedula = localStorage.getItem(LS_KEY) || "";
  const cedulaParaEnviar = savedCedula;
  const loader = document.getElementById("loader-login");

  const url =
    "https://script.google.com/macros/s/AKfycbwoQFpBcbOBhNbIvqo6UPlv9oV1H8IHKJMlonFOiK1T9cW6J0I8uZHAe5bPps4NxdmD3Q/exec";

  // if (!cedulaParaEnviar) {
  //   return;
  // }

  if (!getCookie(CS_KEY)) {
    console.log("No existe");
    return;
  }

  loader.style.display = "flex";
  fetch(`${url}?cedula=${encodeURIComponent(cedulaCookie)}`)
    .then((res) => res.json())
    .then((data) => {
      if (!Array.isArray(data) || data.length === 0) {
        loader.style.display = "none";
        return;
      }
      // localStorage.setItem(LS_KEY, cedulaParaEnviar);
      user_name.innerHTML = data[0].Nombre.substring(0, 10) + "...";
      user_rol.innerHTML = data[0].Rol;

      document.getElementById("background_login").style.display = "none";
      document.getElementById("background_login").classList.add("test_hidden");
      document.getElementById("menu_login").style.display = "flex";
      document.getElementById("footer_label_legal").style.display = "flex";

      if (!location.hash || location.hash === "#login") {
        location.hash = "#inicio";
      }

      let testHora = data[0].Hora;

      const d = new Date(testHora);

      // Hora en formato Colombia
      const hora = d.toLocaleTimeString("es-CO", {
        timeZone: "America/Bogota",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

      const user = {
        Hora: hora,
        Fecha: data[0].Fecha,
        Nombre: data[0].Nombre,
        rol: data[0].Rol,
        Area: data[0].Area,
        Telefono: data[0].Telefono,
        Correo: data[0].Correo,
        UserName: data[0].UserName,
        Cedula: cedulaCookie,
        Nivel: data[0].lvl,
      };

      document.getElementById("app").style.display = "flex";

      // console.log(user, "user");
      // window.AppStore?.setUser?.(user);
      setCookie(CS_KEY, user, { days: 7 });
      validateSeccion();
      metodoprueba();
      unlockBodyScroll();
    })
    .catch((err) => {
      console.error("Error al consultar la cédula:", err);
      if (!location.hash || location.hash === "#login") {
        location.hash = "#inicio";
      }
      loader.style.display = "none";
      Swal.fire({
        icon: "error",
        title: "Error en la verificación.",
        text: "No se pudo verificar si el registro existe.",
      });
    });
}

function existeCookie() {
  return document.cookie.split("; ").some((c) => c.startsWith(CS_KEY + "="));
}

if (existeCookie("session_token")) {
  getUsersLogin();
} else {
}

function validateSeccion() {
  if (getCookie(CS_KEY)) {
    document.getElementById("menu_login").style.display = "flex";
    document.getElementById("app").style.background = "#0f162d";
    document.getElementById("footer_label_legal").style.display = "flex";
  } else {
    document.getElementById("menu_login").style.display = "none";
    document.getElementById("app").style.background = "white";
    document.getElementById("footer_label_legal").style.display = "none";
  }
}

if (getCookie(CS_KEY)) {
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
          document.cookie = "__Secure_1nf0_US3R=; max-age=0; path=/;";
          validateSeccion();
          window.location.hash = "#login";
          location.reload();
        }
      });
    }
  });
}

function dateIntegrador() {
  const fechaCompleta = new Date().toLocaleString("es-CO", {
    timeZone: "America/Bogota",
    year: "numeric",
  });

  document.getElementById("año_integrador").textContent = fechaCompleta;
  document.getElementById("año_footer").textContent = fechaCompleta;
}

dateIntegrador();

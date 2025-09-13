/* Oculta el loader al cargar */
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  if (loader) loader.style.display = "none";
});

/* =========================================================
   ELEMENTOS / CONFIG DE VISTAS
========================================================= */
const url =
  "https://script.google.com/macros/s/AKfycbxPs1uUmP7piW26_GGmOLdWWjQEWtN1MVyNxSZ8BvWIjDOZlcIInfDYBabPpiNgsAyhWA/exec";

const contentTiros = document.getElementById("content_result_tiro");
const containerScore = document.getElementById("score_ejemplo_1");
const containerScore2 = document.getElementById("score_ejemplo_2"); // parejas
const containerScore3 = document.getElementById("score_ejemplo_3");
const loader = document.getElementById("loader");

const viewIds = [
  "envio",
  "envio_suplementario",
  "envio_observacion",
  "tabla_premios_match",
  "tabla_premios",
];

const btnMap = {
  btn_envio_normal: "envio",
  btn_envio_suplementario: "envio_suplementario",
  btn_envio_observacion: "envio_observacion",
  btn_tabla_premios: "tabla_premios_match",
  btn_registros_dia: "tabla_premios",
};

const views = Object.fromEntries(
  viewIds.map((id) => [id, document.getElementById(id)])
);

const showView = (idToShow) => {
  for (const id of viewIds) {
    if (!views[id]) continue;
    views[id].classList.toggle("hidden", id !== idToShow);
    views[id].classList.toggle("flex", id === idToShow);
  }
};

// inicia mostrando "envio" por defecto
showView("envio");

/* =========================================================
   BLOQUE INICIAL DE UI (vistas + locks de categoría)
========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  // Botones → vistas
  for (const [btnId, viewId] of Object.entries(btnMap)) {
    const btn = document.getElementById(btnId);
    btn?.addEventListener("click", () => showView(viewId));
  }

  // Bono suplementario visible solo si no es ADICIONAL
  const categoriaSup = document.getElementById("categoria_sup");
  const bonoSup = document.getElementById("bono_sup");
  if (categoriaSup && bonoSup) {
    categoriaSup.addEventListener("input", () => {
      const isAdicional = categoriaSup.value === "ADICIONAL";
      bonoSup.style.display = isAdicional ? "none" : "flex";
    });
  }

  // Lock del tablero según categoría
  const categoria = document.getElementById("categoria");
  const board = document.getElementById("content_column");

  function updateLock() {
    if (!categoria || !board) return;
    const hasValue = (categoria.value || "").trim() !== "";
    board.classList.toggle(
      "locked",
      !hasValue || categoria.value === "ADICIONAL"
    );
  }

  updateLock();
  categoria?.addEventListener("change", updateLock);
});

// Toggle bono/envío adicional base
document.getElementById("categoria")?.addEventListener("input", () => {
  const isAdic = document.getElementById("categoria").value === "ADICIONAL";
  const bonoEl = document.getElementById("bono");
  if (bonoEl) bonoEl.style.display = isAdic ? "none" : "flex";
});

/* =========================================================
   SCROLL UTILS (por si bloqueas body al abrir modal)
========================================================= */
let _scrollY = 0;
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

/* =========================================================
   ESTADO GLOBAL + SLOTS (sistema 1–4)
========================================================= */
let tiros_match = 0; // tiros usados (máx 4)
let matchTotal = 0; // parejas encontradas
const promocion = "Perfect Match";

const state = {
  matchedPairs: new Set(), // "1","2","3",...
};

// ------ NUEVO ESTADO PARA 4 CASILLAS ------
const SLOTS = [null, null, null, null]; // guarda <img> o null

function clearSlotClasses(el) {
  if (!el) return;
  el.classList.remove("slot_pos_1", "slot_pos_2", "slot_pos_3", "slot_pos_4");
}

function clearSlotsAll() {
  for (let i = 0; i < 4; i++) {
    const el = SLOTS[i];
    if (el) clearSlotClasses(el);
    SLOTS[i] = null;
  }
}
function findSlotIndex(el) {
  for (let i = 0; i < 4; i++) if (SLOTS[i] === el) return i;
  return -1;
}
function firstFreeSlot() {
  for (let i = 0; i < 4; i++) if (SLOTS[i] === null) return i;
  return -1;
}
function getPair(id) {
  // img_1_p_3  → "3"
  return id.split("_").pop();
}

/* =========================================================
   HOMES: contenedor original de cada carta (para reset)
========================================================= */
const HOMES = new Map();
(function rememberHomes() {
  const all = document.querySelectorAll(
    'img[id^="img_1_p_"], img[id^="img_2_p_"]'
  );
  all.forEach((el) => {
    if (el && el.parentElement) HOMES.set(el.id, el.parentElement);
  });
})();

/* =========================================================
   PRIZES + HELPERS
========================================================= */
const MAX_TIROS = 4;

const PRIZES = {
  0: {
    GENIUS: "$150.000",
    TITANIO: "$140.000",
    LEGENDARIO: "$130.000",
    GOLD: "$110.000",
    SILVER: "$100.000",
    BRONCE: "$80.000",
    SUPERIOR: "$100.000",
    ESTANDAR: "$80.000",
  },
  1: {
    GENIUS: "$180.000",
    TITANIO: "$160.000",
    LEGENDARIO: "$150.000",
    GOLD: "$130.000",
    SILVER: "$120.000",
    BRONCE: "$100.000",
    SUPERIOR: "$120.000",
    ESTANDAR: "$100.000",
  },
  2: {
    GENIUS: "$500.000",
    TITANIO: "$400.000",
    LEGENDARIO: "$350.000",
    GOLD: "$300.000",
    SILVER: "$250.000",
    BRONCE: "$200.000",
    SUPERIOR: "$300.000",
    ESTANDAR: "$200.000",
  },
};

const $txt = (el) => Number(el?.textContent ?? el?.innerHTML ?? 0) || 0;
const getCategoria = () =>
  (document.getElementById("categoria")?.value || "").trim();

function getPrize(categoria, matches) {
  return PRIZES[matches]?.[categoria] || null;
}

function endOfShotsFlow(matches, tiros, categoria) {
  return Swal.fire({
    icon: "success",
    title: `Tus lanzamientos llegaron al máximo. Pero tu premio te esta esperando`,
    html: `${
      matches == "0"
        ? "Gran intento en el amor pero conseguiste "
        : "Eres grande en el amor conseguiste "
    } <b style="font-size: 2rem">${matches}</b> Match con <b style="font-size: 2rem">${tiros}</b> lanzamientos.`,
    confirmButtonColor: "#dc3545",
    allowOutsideClick: false,
    customClass: {
      popup: "mi-popup",
      title: "mi-titulo",
      confirmButton: "btn btn-danger",
    },
  }).then((res) => {
    if (!res.isConfirmed) return;
    const amount = getPrize(categoria, matches);
    if (amount) alertaWinLose(amount, matches, tiros);
    else alertaWinLose(matches, tiros);
  });
}

function alertaWinLose(premio, matchTotal, contTiro) {
  const categoria = document.getElementById("categoria").value;

  // Desactivar TODAS las cartas de ambos lados
  document
    .querySelectorAll('img[id^="img_1_p_"], img[id^="img_2_p_"]')
    .forEach((el) => {
      el.style.pointerEvents = "none";
    });

  for (const side of [1, 2]) {
    for (let i = 1; i <= 6; i++) {
      document.getElementById(`img_${side}_p_${i}`).style.pointerEvents =
        "none";
    }
  }

  const valorimg =
    document.getElementById("score_ejemplo_2").textContent == "2"
      ? "/dinamicas/promocion-perfect-match/resources/logo-plural.png"
      : "/dinamicas/promocion-perfect-match/resources/logo-singular.png";

  Swal.fire({
    icon: "success",
    title: `Con categoria ${categoria}`,
    html: `
    <div class="swal-premio">
      <img id="swal-logo" src=${valorimg} alt="Logo premio">
      <p>
        Obtuviste un premio de <b style="font-size: 2rem">${premio} en Dinero Promocional</b>, 
        con <b style="font-size: 2rem">${matchTotal}</b> Match 
        y <b style="font-size: 2rem">${contTiro}</b> Lanz...
      </p>
    </div>
  `,
    confirmButtonColor: "#dc3545",
    allowOutsideClick: false,
    customClass: {
      popup: "mi-popup",
      title: "mi-titulo",
      confirmButton: "btn btn-danger",
    },
    didOpen: () => {
      const logo = document.getElementById("swal-logo");
      if (logo) {
        logo.classList.add("logo-animate");
      }
    },
  });
  document.getElementById("result_premio_screen").innerHTML = `
<div>
      <p style="font-size: 1.5rem">
        Obtuviste un premio de <b style="font-size: 2rem">${premio} en Dinero Promocional</b>, 
        con <b style="font-size: 2rem">${matchTotal}</b> Match 
        y <b style="font-size: 2rem">${contTiro}</b> Lanz...
      </p>
    </div>`;
  document.getElementById("categoria").disabled = true;
}

/* =========================================================
   UI helpers varios
========================================================= */
function updateTiros(delta) {
  tiros_match += delta;
  if (tiros_match > MAX_TIROS) tiros_match = MAX_TIROS;
  if (tiros_match < 0) tiros_match = 0;
  if (contentTiros) contentTiros.textContent = tiros_match;
}

function setPairFound(pairNumber) {
  matchTotal += 1;
  if (containerScore2) containerScore2.textContent = matchTotal;
  const par = document.getElementById(`pareja_${pairNumber}`);
  par?.classList.add("pareja_encontrada");
  state.matchedPairs.add(String(pairNumber));
  console.log("setPairFound");
}

// Mueve al contenedor de ganadores
function movePairToWinners(pair) {
  const winners = document.getElementById("ganadores");
  const leftEl = document.getElementById(`img_1_p_${pair}`);
  const rightEl = document.getElementById(`img_2_p_${pair}`);
  if (!winners || !leftEl || !rightEl) return;

  // Quitar clases de slot y deshabilitar interacción
  [leftEl, rightEl].forEach((el) => {
    clearSlotClasses(el);
    el.classList.add("is-disabled");
    el.setAttribute("aria-disabled", "true");
    el.style.pointerEvents = "none";
  });

  winners.appendChild(leftEl);
  winners.appendChild(rightEl);
  console.log("movePairToWinners");
}

/* =========================================================
   LÓGICA DE PAREJAS SOBRE SLOTS
========================================================= */
function checkAndResolvePairs() {
  const byPair = new Map();
  for (const el of SLOTS) {
    if (!el) continue;
    const pair = getPair(el.id);
    if (!byPair.has(pair)) byPair.set(pair, []);
    byPair.get(pair).push(el);
  }

  for (const [pair, list] of byPair.entries()) {
    if (state.matchedPairs.has(pair)) continue;
    if (list.length < 2) continue;

    setPairFound(pair);
  }
}

/* =========================================================
   SELECCIÓN: CLICK EN FICHAS → SLOTS 1..4
========================================================= */
function selectCard(el) {
  const id = el.id;
  const pair = getPair(id);

  // Si esta pareja ya fue ganada, no permitir interacción
  if (state.matchedPairs.has(pair)) return;

  // Si ya está en un slot → quitar y reacomodar
  const idx = findSlotIndex(el);
  if (idx !== -1) {
    SLOTS[idx] = null;
    clearSlotClasses(el);
    updateTiros(-1);
    return;
  }

  // Si no está en slots → agregar si no superamos el máximo
  if (tiros_match >= MAX_TIROS) {
    Swal.fire({
      icon: "warning",
      title: "Límite alcanzado",
      text: `Ya usaste tus ${MAX_TIROS} tiros.`,
      confirmButtonColor: "#dc3545",
      allowOutsideClick: false,
      customClass: {
        popup: "mi-popup",
        title: "mi-titulo",
        confirmButton: "btn btn-danger",
      },
    });
    return;
  }

  const free = firstFreeSlot();
  if (free === -1) return; // sin espacio (no debería ocurrir si respetamos MAX_TIROS)

  SLOTS[free] = el;
  applySlotClass(el, free);
  updateTiros(+1);

  // ¿Se formó pareja?
  checkAndResolvePairs();

  // Si llegamos al tope de tiros, evaluar flujo final
  const tiros = $txt(contentTiros);
  if (tiros >= MAX_TIROS) {
    const categoria = getCategoria();
    endOfShotsFlow(matchTotal, tiros, categoria);
  }
}

/* Delegación de eventos sobre el tablero (o documento) */
const boardRoot = document.getElementById("board") || document;
boardRoot.addEventListener("click", (e) => {
  const el = e.target.closest('img[id^="img_1_p_"], img[id^="img_2_p_"]');
  if (!el) return;
  selectCard(el);
});

/* =========================================================
   RESET TOTAL
========================================================= */
document.getElementById("allreset")?.addEventListener("click", () => {
  Swal.fire({
    title: "¿Seguro de reiniciar?",
    text: "Se reiniciará todo en pantalla.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "rgba(187, 58, 58, 1)",
    cancelButtonColor: "rgba(128, 30, 30, 1)",
    confirmButtonText: "Aceptar",
    cancelButtonText: "Cancelar",
    allowOutsideClick: false,
    customClass: {
      popup: "mi-popup",
      title: "mi-titulo",
      confirmButton: "btn btn-danger",
    },
  }).then((result) => {
    if (!result.isConfirmed) return;

    // Limpia formularios
    ["casino", "categoria", "nombre", "cedula", "bono"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.value = "";
    });

    // Contadores/estado
    tiros_match = 0;
    matchTotal = 0;
    state.matchedPairs.clear();

    const result_premio_screen = document.getElementById(
      "result_premio_screen"
    );
    result_premio_screen.innerHTML = "";

    const board = document.getElementById("content_column");
    board.classList.add("locked");

    if (contentTiros) contentTiros.textContent = 0;
    if (containerScore) containerScore.textContent = 0;
    if (containerScore2) containerScore2.textContent = 0;
    if (containerScore3) containerScore3.textContent = 0;

    const categoria = document.getElementById("categoria");
    categoria && (categoria.disabled = false);

    // Quitar clases y reubicar cada carta a su contenedor original
    for (let i = 1; i <= 6; i++) {
      const L = document.getElementById(`img_1_p_${i}`);
      const R = document.getElementById(`img_2_p_${i}`);

      [L, R].forEach((el) => {
        if (!el) return;
        // Clases viejas (por si quedaron) + clases de slot
        el.classList.remove(
          "posicion_img_left",
          "posicion_img_rigth",
          `posicion_img_1_p_${i}`,
          `posicion_img_2_p_${i}`,
          "is-disabled",
          "slot_pos_1",
          "slot_pos_2",
          "slot_pos_3",
          "slot_pos_4",
          "slot_base"
        );
        el.removeAttribute("aria-disabled");
        el.style.pointerEvents = "";
        const home = HOMES.get(el.id);
        if (home) home.appendChild(el);
      });

      const pareja = document.getElementById(`pareja_${i}`);
      pareja?.classList.remove("pareja_encontrada");
    }

    // Vaciar slots
    clearSlotsAll();

    Swal.fire({
      icon: "info",
      title: "Juego reiniciado",
      text: "Ya puedes comenzar de nuevo.",
      allowOutsideClick: false,
      confirmButtonColor: "#27314F",
      customClass: {
        popup: "mi-popup",
        title: "mi-titulo",
        confirmButton: "btn btn-danger",
      },
    });
  });
});

/* =========================================================
   UTILIDADES VARIAS QUE YA USABAS (envíos, tablas, etc.)
========================================================= */

// Claves LS
const IN_FLIGHT = new Set();
const LS_KEY = "registrosMatch";
const FECHA_KEY = "fechaMatch";

async function handleSendInfo() {
  const casino = document.getElementById("casino");
  const categoria = document.getElementById("categoria");
  const nombre = document.getElementById("nombre");
  const cedula = document.getElementById("cedula");
  const bono = document.getElementById("bono");

  const casinoVal = (casino?.value || "").trim();
  const categoriaVal = (categoria?.value || "").trim();
  const nombreVal = (nombre?.value || "").trim();
  const cedulaVal = (cedula?.value || "").trim();
  const bonoVal = (bono?.value || "").trim();

  const matchDoneVal = (
    document.getElementById("score_ejemplo_2")?.textContent || "0"
  ).trim();

  const fechaCompleta = new Date().toLocaleString("es-CO", {
    timeZone: "America/Bogota",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const [fecha, hora] = fechaCompleta.split(", ");

  const contentTextParejas = document.getElementById("content_alert_categoria");

  let valor1 = contentTextParejas.textContent;
  let valor2 = valor1.split(",", 10);
  let valor3 = valor2[1]?.trim();

  if (valor3 === "Juego Pendiente ...") {
    Swal.fire({
      icon: "warning",
      title: "Antes de continuar.",
      text: "Por favor, completa el mini juego, o selecciona una categoría valida.",
      allowOutsideClick: false,
      confirmButtonColor: "#a13b22",
      customClass: {
        popup: "mi-popup",
        title: "mi-titulo",
        confirmButton: "btn btn-danger",
      },
    });
    return;
  }

  if (valor3.toLowerCase() === "juego pendiente ...".toLowerCase()) {
    Swal.fire({
      icon: "warning",
      title: "Antes de continuar.",
      text: "Por favor, completa el mini juego. o selecciona una categoría valida.",
      allowOutsideClick: false,
      confirmButtonColor: "#a13b22",
      customClass: {
        popup: "mi-popup",
        title: "mi-titulo",
        confirmButton: "btn btn-danger",
      },
    });
    return;
  }

  if (!casinoVal || !categoriaVal || !nombreVal || !cedulaVal) {
    Swal.fire({
      icon: "warning",
      title: "Antes de continuar.",
      text: "Por favor, completa toda la información",
      allowOutsideClick: false,
      confirmButtonColor: "#a13b22",
      customClass: {
        popup: "mi-popup",
        title: "mi-titulo",
        confirmButton: "btn btn-danger",
      },
    });
    return;
  }

  const data = {
    tipo: "dinamica",
    hora,
    fecha,
    nombre: nombreVal,
    cedula: cedulaVal,
    casino: casinoVal,
    categoria: categoriaVal,
    resultado: categoriaVal === "ADICIONAL" ? "0" : matchDoneVal,
    valBono: categoriaVal === "ADICIONAL" ? "0" : bonoVal,
    promocion,
  };

  // Reset diario
  const hoy = new Date().toDateString();
  if (localStorage.getItem(FECHA_KEY) !== hoy) {
    localStorage.setItem(LS_KEY, JSON.stringify([]));
    localStorage.setItem(FECHA_KEY, hoy);
  }

  // Guardado local
  const registros = JSON.parse(localStorage.getItem(LS_KEY)) || [];
  registros.push(data);
  localStorage.setItem(LS_KEY, JSON.stringify(registros));

  // Repintar tabla
  if (typeof mostrarRegistros === "function") mostrarRegistros();

  // Flujo sin bono
  if (!bonoVal) {
    loader && (loader.style.display = "flex");
    if (categoriaVal === "ADICIONAL") {
      fetch(url, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify(data),
      });
      setTimeout(() => {
        loader && (loader.style.display = "none");
        if (casino) casino.value = "";
        if (categoria) categoria.value = "";
        if (nombre) nombre.value = "";
        if (cedula) cedula.value = "";
        if (bono) bono.value = "";
        Swal.fire({
          icon: "success",
          title: "Exito!",
          text: `El envío de la información fue exitoso con categoria ${categoriaVal}.`,
          allowOutsideClick: false,
          confirmButtonColor: "#dc3545",
          customClass: {
            popup: "mi-popup",
            title: "mi-titulo",
            confirmButton: "btn btn-danger",
          },
        });
      }, 2000);
      return;
    }

    setTimeout(() => {
      loader && (loader.style.display = "none");
      if (casino) casino.value = "";
      if (categoria) categoria.value = "";
      if (nombre) nombre.value = "";
      if (cedula) cedula.value = "";
      if (bono) bono.value = "";
      Swal.fire({
        icon: "info",
        title: "Guardado local",
        text: "Se guardó el registro sin # de bono. Puedes asignarlo y enviarlo después.",
        allowOutsideClick: false,
        confirmButtonColor: "#dc3545",
        customClass: {
          popup: "mi-popup",
          title: "mi-titulo",
          confirmButton: "btn btn-danger",
        },
      });
      disableFichas();
      resetGame();
    }, 2000);
    return;
  }

  // Con bono → enviar backend
  loader && (loader.style.display = "flex");
  fetch(url, { method: "POST", mode: "no-cors", body: JSON.stringify(data) })
    .then(() => {
      setTimeout(() => {
        loader && (loader.style.display = "none");
        if (casino) casino.value = "";
        if (categoria) categoria.value = "";
        if (nombre) nombre.value = "";
        if (cedula) cedula.value = "";
        if (bono) bono.value = "";
        Swal.fire({
          icon: "success",
          title: "Éxito",
          text: "El envío de la información fue exitoso.",
          allowOutsideClick: false,
          confirmButtonColor: "#dc3545",
          customClass: {
            popup: "mi-popup",
            title: "mi-titulo",
            confirmButton: "btn btn-danger",
          },
        });
        disableFichas();
        resetGame();
      }, 2000);
    })
    .catch((error) => {
      console.error(error);
      loader && (loader.style.display = "none");
      if (casino) casino.value = "";
      if (categoria) categoria.value = "";
      if (nombre) nombre.value = "";
      if (cedula) cedula.value = "";
      if (bono) bono.value = "";
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ha ocurrido un error al enviar la información.",
        allowOutsideClick: false,
        confirmButtonColor: "#dc3545",
        customClass: {
          popup: "mi-popup",
          title: "mi-titulo",
          confirmButton: "btn btn-danger",
        },
      });
    });
}

function disableFichas() {
  const categoria = document.getElementById("categoria");
  const board = document.getElementById("content_column");
  function updateLock() {
    if (!categoria || !board) return;
    const hasValue = (categoria.value || "").trim() !== "";
    board.classList.toggle(
      "locked",
      !hasValue || categoria.value === "ADICIONAL"
    );
  }
  updateLock();
}

function resetGame() {
  const contentText = document.getElementById("content_alert_categoria");
  if (contentText)
    contentText.innerHTML = `Tenga en cuenta la categoria<span>*</span>`;

  ["casino", "categoria", "nombre", "cedula", "bono"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.value = "";
  });

  // Contadores/estado
  tiros_match = 0;
  matchTotal = 0;
  state.matchedPairs.clear();

  const board = document.getElementById("content_column");
  board.classList.add("locked");

  if (contentTiros) contentTiros.textContent = 0;
  if (containerScore) containerScore.textContent = 0;
  if (containerScore2) containerScore2.textContent = 0;
  if (containerScore3) containerScore3.textContent = 0;

  const categoria = document.getElementById("categoria");
  categoria && (categoria.disabled = false);

  // Quitar clases y reubicar cada carta a su contenedor original
  for (let i = 1; i <= 6; i++) {
    const L = document.getElementById(`img_1_p_${i}`);
    const R = document.getElementById(`img_2_p_${i}`);

    [L, R].forEach((el) => {
      if (!el) return;
      // Clases viejas (por si quedaron) + clases de slot
      el.classList.remove(
        "posicion_img_left",
        "posicion_img_rigth",
        `posicion_img_1_p_${i}`,
        `posicion_img_2_p_${i}`,
        "is-disabled",
        "slot_pos_1",
        "slot_pos_2",
        "slot_pos_3",
        "slot_pos_4",
        "slot_base"
      );
      el.removeAttribute("aria-disabled");
      el.style.pointerEvents = "";
      const home = HOMES.get(el.id);
      if (home) home.appendChild(el);
    });

    const pareja = document.getElementById(`pareja_${i}`);
    pareja?.classList.remove("pareja_encontrada");
  }

  // Vaciar slots
  clearSlotsAll();
}

/* =========================================================
   (Tu bloque de registros, bonos, observaciones) – SIN CAMBIOS
   Puedes mantener aquí tus funciones: handleSuplementarioSend,
   mostrarRegistros, alertBonoEmpty, handleObservacionSend,
   abrirmodalacciones, cerrarmodalacciones...
========================================================= */
// (Pega aquí tus funciones existentes de tabla y observaciones tal cual)

async function handleSuplementarioSend() {
  const casino_sup = document.getElementById("casino_sup");
  const categoria_sup = document.getElementById("categoria_sup");
  const cedula_sup = document.getElementById("cedula_sup");
  const nombre_sup = document.getElementById("nombre_sup");
  const hora_sup = document.getElementById("hora_sup");
  const match_sup = document.getElementById("match_sup");
  const bono_sup = document.getElementById("bono_sup");
  const fecha_sup = document.getElementById("fecha_sup");
  const loader = document.getElementById("loader");
  const casino_sup_val = casino_sup.value;
  const categoria_sup_val = categoria_sup.value;
  const cedula_sup_val = cedula_sup.value;
  const nombre_sup_val = nombre_sup.value;
  const hora_sup_val = hora_sup.value;
  const match_sup_val = match_sup.value;
  const bono_sup_val = bono_sup.value;
  const fecha_sup_val = fecha_sup.value;

  if (casino_sup_val == "ADICIONAL") {
    if (
      casino_sup_val == "" ||
      categoria_sup_val == "" ||
      cedula_sup_val == "" ||
      nombre_sup_val == "" ||
      hora_sup_val == "" ||
      fecha_sup_val == ""
    ) {
      Swal.fire({
        icon: "warning",
        title: "Antes de continuar.",
        html: "Debes completar la información antes de enviar",
      });
      return;
    }
  } else {
    if (
      casino_sup_val == "" ||
      categoria_sup_val == "" ||
      cedula_sup_val == "" ||
      nombre_sup_val == "" ||
      hora_sup_val == "" ||
      match_sup_val == "" ||
      bono_sup_val == "" ||
      fecha_sup_val == ""
    ) {
      Swal.fire({
        icon: "warning",
        title: "Antes de continuar.",
        html: "Debes completar la información antes de enviar",
      });
      return;
    }
  }

  const data = {
    tipo: "dinamica",
    hora: hora_sup_val,
    fecha: fecha_sup_val,
    nombre: nombre_sup_val,
    cedula: cedula_sup_val,
    casino: casino_sup_val,
    categoria: categoria_sup_val,
    resultado: categoria_sup_val == "ADICIONAL" ? "0" : match_sup_val,
    valBono: categoria_sup_val == "ADICIONAL" ? "0" : bono_sup_val,
    promocion: promocion,
  };
  loader.style.display = "flex";
  fetch(url, {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify(data),
  })
    .then((res) => res.text())
    .then(() => {
      casino_sup.value = "";
      categoria_sup.value = "";
      cedula_sup.value = "";
      nombre_sup.value = "";
      hora_sup.value = "";
      match_sup.value = "";
      bono_sup.value = "";
      fecha_sup.value = "";
      Swal.fire({
        icon: "success",
        title: "Envio exitoso",
        html: "La información se envio conrrectamente.",
      });
      loader.style.display = "none";
    })
    .catch((error) => {
      console.log(error);
      loader.style.display = "none";
    });
}

function mostrarRegistros() {
  const ultimosRegistros = document.getElementById("ultimos_registro_match");
  const valInfo = document.getElementById("Info-match");
  const loader = document.getElementById("loader");
  const notificacionRegitro = document.getElementById(
    "notificacion_registro_dia"
  );

  // if (!ultimosRegistros || !casinoNumero || !valInfo) return;

  const registros = JSON.parse(localStorage.getItem("registrosMatch")) || [];
  const valCasino = (document.getElementById("casino")?.value || "").trim();

  const filtrados = valCasino
    ? registros.filter((item) => item.casino)
    : registros;

  // Vacío = null/undefined o string vacío/espacios.
  // OJO: "0" y 0 NO son vacíos.
  const isBlank = (v) =>
    v == null || (typeof v === "string" && v.trim() === "");

  // ¿Existe al menos un registro con bono vacío?
  const hayBonoVacio = filtrados.some((item) => isBlank(item.valBono));

  // Muestra la notificación SOLO si hay bonos vacíos
  notificacionRegitro.style.display = hayBonoVacio ? "flex" : "none";

  if (filtrados.length === 0) {
    ultimosRegistros.innerHTML = `<p class="color-gray">No hay registros ${
      valCasino ? "para este casino." : "aún."
    }</p>`;
    valInfo.innerHTML = "";
    return;
  }

  valInfo.innerHTML = `<small class="color-gray">* Estos registros son temporales (se reinicia a las 00:00), por favor tener en cuenta.</small>`;

  // Render de la tabla (nota: input ahora usa CLASE, no ID repetido)
  ultimosRegistros.innerHTML = `
    <div class="table-wrapper">
      <table class="styled-table table-scrolld ajuste_table_result">
        <thead>
          <tr>
            <th># Registro</th><th>Casino</th><th>Categoría</th><th>Nombre</th>
            <th>Cédula</th><th>Bono</th><th>Acciones</th><th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          ${filtrados
            .map((r, i) => {
              const bono = r.valBono ? r.valBono : "";
              const accion =
                bono === ""
                  ? `<button
                    class="table_btn_enviar_bono"
                    data-casino="${r.casino}"
                    data-categoria="${r.categoria}"
                    data-nombre="${r.nombre}"
                    data-cedula="${r.cedula}"
                    data-bono="${bono || "0"}"
                    data-fecha="${r.fecha}"
                    data-hora="${r.hora}"
                    data-resultado="${r.resultado}"
                    data-id="${r.id}"
                 >Enviar</button>`
                  : `<small class="table_ya_tiene_bono">Ya contiene Bono.</small>`;

              return `
              <tr>
                <td>${i + 1}</td>
                <td>${r.casino}</td>
                <td>${r.categoria}</td>
                <td>${r.nombre}</td>
                <td>${r.cedula}</td>
                <td>${
                  bono ||
                  `<input class="table_input_bono" type="text" placeholder="#Bono">`
                }</td>
                <td>${accion}</td>
                <td>${r.fecha} ${r.hora}</td>
              </tr>`;
            })
            .join("")}
        </tbody>
      </table>
    </div>
  `;

  // --- helpers ---
  const LS_REG = "registrosMatch";

  function getRegs() {
    try {
      return JSON.parse(localStorage.getItem(LS_REG)) || [];
    } catch {
      localStorage.setItem(LS_REG, "[]");
      return [];
    }
  }

  function updateLocalBono(
    { casino, categoria, nombre, cedula, fecha, hora },
    valBono
  ) {
    const regs = getRegs();
    const idx = regs.findIndex(
      (r) =>
        String(r.casino).trim() === String(casino).trim() &&
        String(r.categoria).trim() === String(categoria).trim() &&
        String(r.nombre).trim() === String(nombre).trim() &&
        String(r.cedula).trim() === String(cedula).trim() &&
        String(r.fecha).trim() === String(fecha).trim() &&
        String(r.hora).trim() === String(hora).trim()
    );
    if (idx === -1) return false;

    regs[idx].valBono = valBono;
    regs[idx].bonoAsignado = true;
    localStorage.setItem(LS_REG, JSON.stringify(regs));
    return true;
  }

  function escapeHtml(s) {
    return String(s).replace(
      /[&<>"']/g,
      (m) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        }[m])
    );
  }

  // --- listener único (evita acumular handlers) ---
  // Si ya había un handler previo, lo removemos
  if (ultimosRegistros._clickHandler) {
    ultimosRegistros.removeEventListener(
      "click",
      ultimosRegistros._clickHandler
    );
  }

  ultimosRegistros._clickHandler = async (e) => {
    const btn = e.target.closest(".table_btn_enviar_bono");
    if (!btn) return;

    // Toma el input de la MISMA FILA
    const tr = btn.closest("tr");
    const bonoInput = tr?.querySelector(".table_input_bono");
    const valBonoregistr = bonoInput?.value?.trim() || "";
    if (!valBonoregistr) {
      Swal.fire({
        icon: "warning",
        title: "Falta el bono",
        text: "Ingresa el # de bono antes de enviar.",
        allowOutsideClick: false,
      });
      return;
    }

    const {
      resultado = "0",
      casino = "",
      categoria = "",
      nombre = "",
      cedula = "",
      fecha = "",
      hora = "",
    } = btn.dataset;

    const data = {
      tipo: "dinamica",
      hora,
      fecha,
      nombre,
      cedula,
      casino,
      categoria,
      resultado,
      valBono: valBonoregistr,
      promocion, // debe existir en tu scope
    };

    // Clave única por registro para evitar duplicados
    const key = [casino, categoria, nombre, cedula, fecha, hora].join("|");
    if (IN_FLIGHT.has(key)) return; // ya se está enviando
    IN_FLIGHT.add(key);

    // Evita doble click en el mismo botón
    if (btn.dataset.sending === "1") return;
    btn.dataset.sending = "1";

    const prevText = btn.textContent;
    btn.disabled = true;
    btn.textContent = "Enviando…";
    if (loader?.style) loader.style.display = "flex";

    try {
      await fetch(
        "https://script.google.com/macros/s/AKfycbxPs1uUmP7piW26_GGmOLdWWjQEWtN1MVyNxSZ8BvWIjDOZlcIInfDYBabPpiNgsAyhWA/exec",
        {
          method: "POST",
          mode: "no-cors",
          body: JSON.stringify(data),
        }
      );

      const ok = updateLocalBono(
        { casino, categoria, nombre, cedula, fecha, hora },
        valBonoregistr
      );

      // Actualiza la fila actual de inmediato
      if (tr) {
        const tdBono = tr.querySelector("td:nth-child(6)");
        const tdAcc = tr.querySelector("td:nth-child(7)");
        if (tdBono) tdBono.innerHTML = escapeHtml(valBonoregistr);
        if (tdAcc)
          tdAcc.innerHTML = `<small class="table_ya_tiene_bono">Ya contiene Bono.</small>`;
      }

      Swal.fire({
        icon: ok ? "success" : "info",
        title: ok ? "Bono asignado" : "Registro no encontrado",
        text: ok
          ? "Se envió la información de manera correcta."
          : "No se pudo localizar el registro en localStorage.",
        allowOutsideClick: false,
      });

      // Si quieres re-render completo:
      // mostrarRegistros();
      alertBonoEmpty();
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo enviar el bono al servidor.",
        allowOutsideClick: false,
      });
    } finally {
      IN_FLIGHT.delete(key);

      if (loader?.style) loader.style.display = "none";

      // El TR pudo re-renderizarse; valida que el botón aún exista
      if (document.body.contains(btn)) {
        btn.disabled = false;
        btn.textContent = prevText;
        delete btn.dataset.sending;
      }
    }
    alertBonoEmpty();
  };

  // Lo agregamos una sola vez (limpio)
  ultimosRegistros.addEventListener("click", ultimosRegistros._clickHandler);
}
mostrarRegistros();

function alertBonoEmpty() {
  const registros = JSON.parse(localStorage.getItem("registrosMatch")) || [];
  const valCasino = (document.getElementById("casino")?.value || "").trim();
  const notificacionRegitro = document.getElementById(
    "notificacion_registro_dia"
  );

  // Filtra correctamente por casino (si hay filtro)
  const filtrados = valCasino
    ? registros.filter((item) => String(item.casino).trim() === valCasino)
    : registros;

  // Vacío = null/undefined o string vacío/espacios.
  // OJO: "0" y 0 NO son vacíos.
  const isBlank = (v) =>
    v == null || (typeof v === "string" && v.trim() === "");

  // ¿Existe al menos un registro con bono vacío?
  const hayBonoVacio = filtrados.some((item) => isBlank(item.valBono));

  // Muestra la notificación SOLO si hay bonos vacíos
  notificacionRegitro.style.display = hayBonoVacio ? "flex" : "none";
}

function handleObservacionSend() {
  const casinoObs = document.getElementById("casino_obs").value.trim();
  const descObs = document.getElementById("desc_obs_modal").value.trim();

  const fechaCompleta = new Date().toLocaleString("es-CO", {
    timeZone: "America/Bogota",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const [fecha, hora] = fechaCompleta.split(", ");

  if (casinoObs == "" || descObs == "") {
    Swal.fire({
      icon: "warning",
      title: "Antes de continuar.",
      text: `Por favor, completa: Casino y Descripción.`,
      allowOutsideClick: false,
      confirmButtonColor: "#a13b22",
      customClass: {
        popup: "mi-popup",
        title: "mi-titulo",
        confirmButton: "btn btn-danger",
      },
    });
    return;
  }
  const data = {
    hora,
    fecha,
    casino: casinoObs,
    observacion: descObs,
    promocion,
    tipo: "observacion",
  };

  loader.style.display = "flex";
  fetch(url, {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify(data),
  }).then(() => {
    try {
      Swal.fire({
        icon: "success",
        title: "Éxito",
        text: "El envío de la observación fue exitoso.",
        allowOutsideClick: false,
        confirmButtonColor: "#dc3545",
        customClass: {
          popup: "mi-popup",
          title: "mi-titulo",
          confirmButton: "btn btn-danger",
        },
      });
    } catch (err) {
      console.warn(err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ocurrió un problema al enviar la observación.",
        allowOutsideClick: false,
        confirmButtonColor: "#dc3545",
        customClass: {
          popup: "mi-popup",
          title: "mi-titulo",
          confirmButton: "btn btn-danger",
        },
      });
    } finally {
      loader.style.display = "none";
    }
  });
}

function abrirmodalacciones() {
  document.getElementById("datos-modal-observacion").style.display = "flex";

  const contentText = document.getElementById("content_alert_categoria");
  const contentTextParejas = document.getElementById("score_ejemplo_2");
  const contentTextTiros = document.getElementById("content_result_tiro");
  const categoria = document.getElementById("categoria");

  if (categoria.value == "") {
    contentText.innerHTML = `Tenga en cuenta la categoria<span>*</span>`;
  } else if (categoria.value === "ADICIONAL") {
    contentText.innerHTML = `Categoria seleccionada: <b>${
      categoria.value
    }</b><span> *</span>,  ${
      contentTextParejas.innerHTML
        ? "No se tomará en cuenta los match Ni el número de bono"
        : " "
    }`;
  } else {
    if (contentTextTiros.innerHTML == "4") {
      contentText.innerHTML = `Categoria seleccionada: <b>${
        categoria.value
      }</b><span> *</span>,  ${
        contentTextParejas.innerHTML
          ? "Match Obtenidos: " + contentTextParejas.innerHTML
          : " "
      }`;
    } else {
      contentText.innerHTML = `Categoria seleccionada: <b>${
        categoria.value
      }</b><span> *</span>,  ${
        contentTextParejas.innerHTML ? "Juego Pendiente ..." : " "
      }`;
    }
  }
  lockBodyScroll();
}

function cerrarmodalacciones() {
  document.getElementById("datos-modal-observacion").style.display = "none";
  showView("envio");
  unlockBodyScroll();
}

function applySlotClass(el, idx) {
  if (!el) return;
  el.classList.add("slot_base"); // <-- clave
  // el.classList.remove("slot_pos_1", "slot_pos_2", "slot_pos_3", "slot_pos_4");
  el.classList.add(`slot_pos_${idx + 1}`);
  console.log(el.id, "el");
  console.log(idx, "idx");
}
function clearSlotClasses(el) {
  if (!el) return;
  el.classList.remove(
    "slot_base",
    "slot_pos_1",
    "slot_pos_2",
    "slot_pos_3",
    "slot_pos_4"
  );
}

function handleCleanEnvio() {
  const casino = document.getElementById("casino");
  const cedula = document.getElementById("cedula");
  const nombre = document.getElementById("nombre");
  const bono = document.getElementById("bono");

  casino.value = "";
  cedula.value = "";
  nombre.value = "";
  bono.value = "";
}

function handleCleanEnvioSup() {
  const casino_sup = document.getElementById("casino_sup");
  const categoria_sup = document.getElementById("categoria_sup");
  const cedula_sup = document.getElementById("cedula_sup");
  const nombre_sup = document.getElementById("nombre_sup");
  const hora_sup = document.getElementById("hora_sup");
  const match_sup = document.getElementById("match_sup");
  const bono_sup = document.getElementById("bono_sup");
  const fecha_sup = document.getElementById("fecha_sup");

  casino_sup.value = "";
  categoria_sup.value = "";
  cedula_sup.value = "";
  nombre_sup.value = "";
  hora_sup.value = "";
  match_sup.value = "";
  bono_sup.value = "";
  fecha_sup.value = "";
}

function handleCleanEnvioObs() {
  const casino_obs = document.getElementById("casino_obs");
  const desc_obs_modal = document.getElementById("desc_obs_modal");

  casino_obs.value = "";
  desc_obs_modal.value = "";
}

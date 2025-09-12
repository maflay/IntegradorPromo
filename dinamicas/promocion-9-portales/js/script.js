window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  loader.style.display = "none";
});
window.addEventListener("DOMContentLoaded", () => {
  const btn_cuerno_diablo = document.getElementById("btn_cuerno_diablo");
  const btn_pezuñas_diablo = document.getElementById("btn_pezuñas_diablo");
  const content_control_btn = document.getElementById("content_control_btn");
  const title_game = document.getElementById("title_game");
  const content_control_actions = document.getElementById(
    "content_control_actions"
  );
  const antorcha_ficha = document.getElementById("antorcha_ficha");
  const btn_dados_cuernos = document.getElementById("dados_cuernos");
  const btn_dados_una_casilla = document.getElementById("dados_una_casilla");
  const btn_dados_menos_casilla = document.getElementById(
    "dados_menos_casilla"
  );
  const btn_dados_pezuñas = document.getElementById("dados_pezuñas");

  const btn_reiniciar_btn_actions_all = document.getElementById(
    "reiniciar_btn_actions_all"
  );

  const btn_guardar_registro = document.getElementById("btn_guardar_registro");
  const btn_envio_observacion = document.getElementById(
    "btn_envio_observacion"
  );
  const btn_envio_secundario = document.getElementById("btn_envio_secundario");
  const btn_tabla_premios = document.getElementById("btn_tabla_premios");
  const btn_registros_dia = document.getElementById("btn_registros_dia");
  const btn_modal_rules = document.getElementById("btn_modal_rules");
  const btn_cerrar_modal_rules = document.getElementById("cerrarmodalereglas");

  const cerrar_combinaciones = document.getElementById("cerrar_combinaciones");

  const view_guardar_registro = document.getElementById(
    "view_guardar_registro"
  );
  const view_envio_observacion = document.getElementById(
    "view_envio_observacion"
  );
  const view_envio_secundario = document.getElementById(
    "view_envio_secundario"
  );
  const view_tabla_premios = document.getElementById("view_tabla_premios");
  const view_registros_dia = document.getElementById("view_registros_dia");

  const notificacion_registro_dia = document.getElementById(
    "notificacion_registro_dia"
  );

  const promocion = "Los 9 Portales";
  const url =
    "https://script.google.com/macros/s/AKfycbwnQw7PQuWb0NzV-oAgrXZzq8ebE6HMrVZ1_t8aS_VRbvKQIB1U8B67_3Ch3oaH-0OF/exec";

  notificacion_registro_dia.style.display = "none";

  view_guardar_registro.style.display = "flex";
  view_envio_observacion.style.display = "none";
  view_envio_secundario.style.display = "none";
  view_tabla_premios.style.display = "none";
  view_registros_dia.style.display = "none";

  btn_cerrar_modal_rules.addEventListener("click", () => cerrarRules());
  function cerrarRules() {
    document.getElementById("modal_rules").style.display = "none";
  }

  btn_modal_rules.addEventListener("click", () => modalRules());
  function modalRules() {
    document.getElementById("modal_rules").style.display = "flex";
  }

  cerrar_combinaciones.addEventListener("click", () => {
    document.getElementById("combinacion_6").classList.toggle("display_none");
  });

  btn_guardar_registro.addEventListener("click", () => {
    view_guardar_registro.style.display = "flex";
    view_envio_observacion.style.display = "none";
    view_envio_secundario.style.display = "none";
    view_tabla_premios.style.display = "none";
    view_registros_dia.style.display = "none";

    btn_guardar_registro.classList.add("select_menu");
    btn_envio_observacion.classList.remove("select_menu");
    btn_envio_secundario.classList.remove("select_menu");
    btn_tabla_premios.classList.remove("select_menu");
    btn_registros_dia.classList.remove("select_menu");
  });

  btn_envio_observacion.addEventListener("click", () => {
    view_guardar_registro.style.display = "none";
    view_envio_observacion.style.display = "flex";
    view_envio_secundario.style.display = "none";
    view_tabla_premios.style.display = "none";
    view_registros_dia.style.display = "none";

    btn_guardar_registro.classList.remove("select_menu");
    btn_envio_observacion.classList.add("select_menu");
    btn_envio_secundario.classList.remove("select_menu");
    btn_tabla_premios.classList.remove("select_menu");
    btn_registros_dia.classList.remove("select_menu");
  });

  btn_envio_secundario.addEventListener("click", () => {
    view_guardar_registro.style.display = "none";
    view_envio_observacion.style.display = "none";
    view_envio_secundario.style.display = "flex";
    view_tabla_premios.style.display = "none";
    view_registros_dia.style.display = "none";

    btn_guardar_registro.classList.remove("select_menu");
    btn_envio_observacion.classList.remove("select_menu");
    btn_envio_secundario.classList.add("select_menu");
    btn_tabla_premios.classList.remove("select_menu");
    btn_registros_dia.classList.remove("select_menu");
  });

  btn_tabla_premios.addEventListener("click", () => {
    view_guardar_registro.style.display = "none";
    view_envio_observacion.style.display = "none";
    view_envio_secundario.style.display = "none";
    view_tabla_premios.style.display = "flex";
    view_registros_dia.style.display = "none";

    btn_guardar_registro.classList.remove("select_menu");
    btn_envio_observacion.classList.remove("select_menu");
    btn_envio_secundario.classList.remove("select_menu");
    btn_tabla_premios.classList.add("select_menu");
    btn_registros_dia.classList.remove("select_menu");
  });

  btn_registros_dia.addEventListener("click", () => {
    view_guardar_registro.style.display = "none";
    view_envio_observacion.style.display = "none";
    view_envio_secundario.style.display = "none";
    view_tabla_premios.style.display = "none";
    view_registros_dia.style.display = "flex";

    btn_guardar_registro.classList.remove("select_menu");
    btn_envio_observacion.classList.remove("select_menu");
    btn_envio_secundario.classList.remove("select_menu");
    btn_tabla_premios.classList.remove("select_menu");
    btn_registros_dia.classList.add("select_menu");
  });

  btn_reiniciar_btn_actions_all.addEventListener("click", () => {
    console.log("entro al boton de reiniciar");
    Swal.fire({
      icon: "none",
      title: "Seguro?",
      html: `
      <div >
      <p>Se reiniciara todo en pantalla!.</p>
      <img class="img_corona_rama" src="/dinamicas/promocion-9-portales/resources/corona_rama.png" alt="promoAladdin">
      </div>
      `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e08b0bff",
      cancelButtonColor: "#9b6009ff",
      confirmButtonText: "Si, de acuerdo!",
      allowOutsideClick: false,
      customClass: {
        popup: "mi-popup",
        title: "mi-titulo",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: "none",
          title: "Correcto!",
          html: `
      <div >
      <p>La pantalla se reiniciara.</p>
      <img class="img_corona_rama" src="/dinamicas/promocion-9-portales/resources/corona_rama.png" alt="promoAladdin">
      </div>
      `,
          icon: "success",
          confirmButtonColor: "#e08b0bff",
          allowOutsideClick: false,
          customClass: {
            popup: "mi-popup",
            title: "mi-titulo",
          },
        }).then((resp) => {
          if (resp.isConfirmed) {
            location.reload();
            handleResetTablero();
          }
        });
      }
    });
  });

  const content_conteo_lanzamiento = document.getElementById(
    "content_conteo_lanzamiento"
  );
  const conteo_lanzamientos = document.getElementById("conteo_lanzamientos");

  const categoria_val = document.getElementById("categoria");

  if (categoria_val.value == "") {
    document.getElementById("content_control_btn").style.pointerEvents = "none";
    document.getElementById("content_control_btn").style.opacity = "0.7";
  }

  categoria_val.addEventListener("change", () => {
    if (categoria_val.value == "" || categoria_val.value == "ADICIONAL") {
      document.getElementById("content_control_btn").style.pointerEvents =
        "none";
      document.getElementById("content_control_btn").style.opacity = "0.7";
    } else {
      document.getElementById("content_control_btn").style.pointerEvents =
        "auto";
      document.getElementById("content_control_btn").style.opacity = "1";
    }
  });

  let LANZ_ACTUAL = 0;
  let MAX_LANZ = 4;
  // Mapa de clase → número de portal
  const CLASS_TO_PORTAL = {
    // Cuernos
    start_cuernos: 1,
    posicion_2_cuernos: 2,
    posicion_3_cuernos: 3,
    posicion_4_cuernos: 4,
    posicion_5_last: 5,

    // Pezuñas
    start_pezuñas: 9,
    posicion_8_pezuñas: 8,
    posicion_7_pezuñas: 7,
    posicion_6_pezuñas: 6,
    // comparte el mismo último portal
    posicion_5_last: 5,
  };

  const btn_reiniciar_btn_actions = document.getElementById(
    "reiniciar_btn_actions"
  );

  btn_cuerno_diablo.addEventListener("click", () => {
    antorcha_ficha.classList.add("start_cuernos", "type_cuernos");
    content_control_btn.style.display = "none";
    content_control_actions.style.display = "flex";
    content_control_actions.style.opacity = "1";
    content_control_actions.style.pointerEvents = "auto";
    title_game.textContent =
      "Juego iniciado... Haz elegido Los Cuernos del Diablo, Estas en el portal 1";
    content_conteo_lanzamiento.style.display = "flex";
    btn_reiniciar_btn_actions.style.pointerEvents = "default";
    btn_reiniciar_btn_actions.style.opacity = "1";
  });

  btn_pezuñas_diablo.addEventListener("click", () => {
    antorcha_ficha.classList.add("start_pezuñas", "type_pezuñas");
    content_control_btn.style.display = "none";
    content_control_actions.style.display = "flex";
    content_control_actions.style.opacity = "1";
    content_control_actions.style.pointerEvents = "auto";
    title_game.textContent =
      "Juego iniciado... Haz elegido Las Pezuñas del Diablo, Estas en el portal 9";
    content_conteo_lanzamiento.style.display = "flex";
    btn_reiniciar_btn_actions.style.pointerEvents = "default";
    btn_reiniciar_btn_actions.style.opacity = "1";
  });

  btn_dados_cuernos.addEventListener("click", () => {
    LANZ_ACTUAL += 1;
    conteo_lanzamientos.textContent = LANZ_ACTUAL;
    antorcha_ficha.classList.remove(
      "type_pezuñas",
      "start_pezuñas",
      "posicion_9_pezuñas",
      "posicion_8_pezuñas",
      "posicion_7_pezuñas",
      "posicion_6_pezuñas",
      "posicion_5_last",
      "posicion_4_cuernos",
      "posicion_3_cuernos",
      "posicion_2_cuernos",
      "posicion_1_cuernos"
    );
    antorcha_ficha.classList.add("start_cuernos", "type_cuernos");
    title_game.textContent =
      "Mala suerte caíste en los cachos del diablo. Fuiste olvidado en el portal 1";
    validateCurrentScore(LANZ_ACTUAL);
  });

  btn_dados_pezuñas.addEventListener("click", () => {
    LANZ_ACTUAL += 1;
    conteo_lanzamientos.textContent = LANZ_ACTUAL;
    antorcha_ficha.classList.remove(
      "type_cuernos",
      "start_cuernos",
      "posicion_9_pezuñas",
      "posicion_8_pezuñas",
      "posicion_7_pezuñas",
      "posicion_6_pezuñas",
      "posicion_5_last",
      "posicion_4_cuernos",
      "posicion_3_cuernos",
      "posicion_2_cuernos",
      "posicion_1_cuernos"
    );
    antorcha_ficha.classList.add("start_pezuñas", "type_pezuñas");
    title_game.textContent =
      "Mala suerte las pezuñas te alcanzaron. Caíste al portal 9";
    validateCurrentScore(LANZ_ACTUAL);
  });

  btn_dados_una_casilla.addEventListener("click", () => {
    if (antorcha_ficha.classList.contains("type_cuernos")) {
      if (antorcha_ficha.classList.contains("start_cuernos")) {
        antorcha_ficha.classList.remove("start_cuernos");
        antorcha_ficha.classList.add("posicion_2_cuernos");
        title_game.textContent = "Estas en el portal 2.";
      } else if (antorcha_ficha.classList.contains("posicion_2_cuernos")) {
        antorcha_ficha.classList.remove("posicion_2_cuernos");
        antorcha_ficha.classList.add("posicion_3_cuernos");
        title_game.textContent = "Estas en el portal 3.";
      } else if (antorcha_ficha.classList.contains("posicion_3_cuernos")) {
        antorcha_ficha.classList.remove("posicion_3_cuernos");
        antorcha_ficha.classList.add("posicion_4_cuernos");
        title_game.textContent = "Estas en el portal 4.";
      } else if (antorcha_ficha.classList.contains("posicion_4_cuernos")) {
        antorcha_ficha.classList.remove("posicion_4_cuernos");
        antorcha_ficha.classList.add("posicion_5_last");
        title_game.textContent = "Felicidades Llegaste al portal 5.";
      }
      LANZ_ACTUAL += 1;
      conteo_lanzamientos.textContent = LANZ_ACTUAL;
      validateCurrentScore(LANZ_ACTUAL);
    } else if (antorcha_ficha.classList.contains("type_pezuñas")) {
      if (antorcha_ficha.classList.contains("start_pezuñas")) {
        antorcha_ficha.classList.remove("start_pezuñas");
        antorcha_ficha.classList.add("posicion_8_pezuñas");
        title_game.textContent = "Estas en el portal 8.";
      } else if (antorcha_ficha.classList.contains("posicion_8_pezuñas")) {
        antorcha_ficha.classList.remove("posicion_8_pezuñas");
        antorcha_ficha.classList.add("posicion_7_pezuñas");
        title_game.textContent = "Estas en el portal 7.";
      } else if (antorcha_ficha.classList.contains("posicion_7_pezuñas")) {
        antorcha_ficha.classList.remove("posicion_7_pezuñas");
        antorcha_ficha.classList.add("posicion_6_pezuñas");
        title_game.textContent = "Estas en el portal 6.";
      } else if (antorcha_ficha.classList.contains("posicion_6_pezuñas")) {
        antorcha_ficha.classList.remove("posicion_6_pezuñas");
        antorcha_ficha.classList.add("posicion_5_last");
        title_game.textContent = "Felicidades Llegaste al portal 5.";
      }
      LANZ_ACTUAL += 1;
      conteo_lanzamientos.textContent = LANZ_ACTUAL;
      validateCurrentScore(LANZ_ACTUAL);
    }
  });

  btn_dados_menos_casilla.addEventListener("click", () => {
    if (antorcha_ficha.classList.contains("posicion_8_pezuñas")) {
      antorcha_ficha.classList.remove("posicion_8_pezuñas");
      antorcha_ficha.classList.add("start_pezuñas");
      title_game.textContent = "Mala suerte volviste al portal 9...";
      LANZ_ACTUAL += 1;
      conteo_lanzamientos.textContent = LANZ_ACTUAL;
    } else if (antorcha_ficha.classList.contains("posicion_7_pezuñas")) {
      antorcha_ficha.classList.remove("posicion_7_pezuñas");
      antorcha_ficha.classList.add("posicion_8_pezuñas");
      title_game.textContent = "Mala suerte volviste al portal 8...";
      LANZ_ACTUAL += 1;
      conteo_lanzamientos.textContent = LANZ_ACTUAL;
    } else if (antorcha_ficha.classList.contains("posicion_6_pezuñas")) {
      antorcha_ficha.classList.remove("posicion_6_pezuñas");
      antorcha_ficha.classList.add("posicion_7_pezuñas");
      title_game.textContent = "Mala suerte volviste al portal 7...";
      LANZ_ACTUAL += 1;
      conteo_lanzamientos.textContent = LANZ_ACTUAL;
    } else if (antorcha_ficha.classList.contains("posicion_2_cuernos")) {
      antorcha_ficha.classList.remove("posicion_2_cuernos");
      antorcha_ficha.classList.add("start_cuernos");
      title_game.textContent = "Mala suerte volviste al portal 1...";
      LANZ_ACTUAL += 1;
      conteo_lanzamientos.textContent = LANZ_ACTUAL;
    } else if (antorcha_ficha.classList.contains("posicion_3_cuernos")) {
      antorcha_ficha.classList.remove("posicion_3_cuernos");
      antorcha_ficha.classList.add("posicion_2_cuernos");
      title_game.textContent = "Mala suerte volviste al portal 2...";
      LANZ_ACTUAL += 1;
      conteo_lanzamientos.textContent = LANZ_ACTUAL;
    } else if (antorcha_ficha.classList.contains("posicion_4_cuernos")) {
      antorcha_ficha.classList.remove("posicion_4_cuernos");
      antorcha_ficha.classList.add("posicion_3_cuernos");
      title_game.textContent = "Mala suerte volviste al portal 3...";
      LANZ_ACTUAL += 1;
      conteo_lanzamientos.textContent = LANZ_ACTUAL;
    } else {
      LANZ_ACTUAL += 1;
      conteo_lanzamientos.textContent = LANZ_ACTUAL;
    }

    validateCurrentScore(LANZ_ACTUAL);
  });

  // todas las posiciones posibles para cada tipo
  const POS_CUERNOS = [
    "start_cuernos",
    "posicion_2_cuernos",
    "posicion_3_cuernos",
    "posicion_4_cuernos",
    "posicion_5_last",
  ];

  const POS_PEZUNAS = [
    "start_pezuñas",
    "posicion_8_pezuñas",
    "posicion_7_pezuñas",
    "posicion_6_pezuñas",
    "posicion_5_last",
  ];

  // unión de todas las clases de posición
  const POS_ALL = [...new Set([...POS_CUERNOS, ...POS_PEZUNAS])];

  const CATEGORY_PRIZES = {
    // tabla Superior / Estándar
    SUPERIOR: {
      1: 100000,
      2: 110000,
      3: 120000,
      4: 130000,
      5: 200000,
      6: 130000,
      7: 120000,
      8: 110000,
      9: 100000,
    },
    ESTANDAR: {
      1: 80000,
      2: 90000,
      3: 100000,
      4: 110000,
      5: 150000,
      6: 110000,
      7: 100000,
      8: 90000,
      9: 80000,
    },

    // tabla Genius / Titanio / Legendario / Gold / Silver / Bronce
    GENIUS: {
      1: 150000,
      2: 160000,
      3: 170000,
      4: 180000,
      5: 300000,
      6: 180000,
      7: 170000,
      8: 160000,
      9: 150000,
    },
    TITANIO: {
      1: 120000,
      2: 130000,
      3: 140000,
      4: 150000,
      5: 250000,
      6: 150000,
      7: 140000,
      8: 130000,
      9: 120000,
    },
    LEGENDARIO: {
      1: 100000,
      2: 110000,
      3: 120000,
      4: 130000,
      5: 200000,
      6: 130000,
      7: 120000,
      8: 110000,
      9: 100000,
    },
    GOLD: {
      1: 100000,
      2: 110000,
      3: 120000,
      4: 130000,
      5: 200000,
      6: 130000,
      7: 120000,
      8: 110000,
      9: 100000,
    },
    SILVER: {
      1: 90000,
      2: 100000,
      3: 110000,
      4: 120000,
      5: 170000,
      6: 120000,
      7: 120000,
      8: 110000,
      9: 100000,
    },
    BRONCE: {
      1: 80000,
      2: 90000,
      3: 100000,
      4: 110000,
      5: 150000,
      6: 110000,
      7: 100000,
      8: 90000,
      9: 80000,
    },
  };

  function validateCurrentScore(LANZ_ACTUAL) {
    if (LANZ_ACTUAL !== MAX_LANZ) return;
    title_game.textContent = "";
    content_control_actions.style.pointerEvents = "none";
    content_control_actions.style.opacity = "0.7";
    categoria_val.style.pointerEvents = "none";
    categoria_val.style.opacity = "0.7";

    const btn_reiniciar_btn_actions = document.getElementById(
      "reiniciar_btn_actions"
    );
    btn_reiniciar_btn_actions.style.pointerEvents = "none";
    btn_reiniciar_btn_actions.style.opacity = "0.7";

    // Detectar tipo y portal actual
    const type = antorcha_ficha.classList.contains("type_cuernos")
      ? "cuernos"
      : antorcha_ficha.classList.contains("type_pezuñas")
      ? "pezuñas"
      : null;

    const posClass = getCurrentPosClass(antorcha_ficha); // como vimos antes
    const portal = posClass ? CLASS_TO_PORTAL[posClass] : null;

    // Tomar categoría desde el select
    const categoria = document.getElementById("categoria").value;
    console.log(portal, "portal");
    if (!portal) {
      console.log("No se pudo determinar portal.");
      return;
    }

    const premio = CATEGORY_PRIZES[categoria]?.[portal] ?? 0;

    title_game.innerHTML = `Categoría ${categoria}: ${
      portal == 5
        ? ` Bienvenido al talismán de Aladdin <img class="talisman" src="/dinamicas/promocion-9-portales/resources/talisman.png" alt="Logo premio">, saliste del infierno`
        : `Bienvenido al portal ${portal},`
    } tu premio es $${premio.toLocaleString("es-CO")} en Dinero Promocional`;
    Swal.fire({
      icon: "none",
      html: `
      <div class="content_swal_premio">
      <img class="img_corona_rama" src="/dinamicas/promocion-9-portales/resources/corona_rama.png" alt="promoAladdin">
       <div class="swal_premio_portal">
          <img id="swal-logo" src="/dinamicas/promocion-9-portales/resources/ojos_calabaza_prueba.png" alt="Logo premio">
          <br/>
        </div>
      <h2>Eres un ganador</h2>
       Categoría ${categoria}: ${
        portal == 5
          ? ` Bienvenido al talismán de Aladdin <img class="talisman" src="/dinamicas/promocion-9-portales/resources/talisman.png" alt="Logo premio">, saliste del infierno`
          : `Bienvenido al portal ${portal},`
      } y tu premio es $${premio.toLocaleString("es-CO")} en Dinero Promocional
      </div>
      `,
      confirmButtonColor: "#e08b0bff",
      allowOutsideClick: false,
      customClass: {
        popup: "mi-popup",
        title: "mi-titulo",
      },
    });
  }

  function getCurrentPosClass(el) {
    const scan = [...POS_ALL].reverse();
    return scan.find((c) => el.classList.contains(c)) || null;
  }

  // === NUEVO: Retornar jugada (undo) ===

  // 1) Pila de historial
  const HISTORY = [];

  // 2) Tomar snapshot ANTES de cada jugada/cambio
  function snapshotState() {
    return {
      // tablero / ficha
      classes: Array.from(antorcha_ficha.classList),

      // conteos y textos
      lanz: LANZ_ACTUAL,
      conteoText: conteo_lanzamientos.textContent,
      title: title_game.textContent,

      // visibilidad de paneles
      displays: {
        control_btn: content_control_btn.style.display,
        control_actions: content_control_actions.style.display,
        conteo: content_conteo_lanzamiento.style.display,
      },

      // estilos de bloqueo y la categoría
      ui: {
        actionsPointer: content_control_actions.style.pointerEvents,
        actionsOpacity: content_control_actions.style.opacity,
        catPointer: categoria_val.style.pointerEvents,
        catOpacity: categoria_val.style.opacity,
        categoriaValue: categoria_val.value,
      },
    };
  }

  // 3) Restaurar snapshot
  function restoreState(state) {
    // Cerrar cualquier SweetAlert abierto (opcional)

    try {
      if (typeof Swal !== "undefined" && Swal.isVisible && Swal.isVisible()) {
        Swal.close();
      }
    } catch (e) {}

    // Clases de la ficha
    antorcha_ficha.className = "";
    if (state.classes.length) antorcha_ficha.classList.add(...state.classes);

    // Contadores y textos
    LANZ_ACTUAL = state.lanz;
    conteo_lanzamientos.textContent = state.conteoText;
    title_game.textContent = state.title;

    // Paneles
    content_control_btn.style.display = state.displays.control_btn;
    content_control_actions.style.display = state.displays.control_actions;
    content_conteo_lanzamiento.style.display = state.displays.conteo;

    // Categoría y bloqueos
    categoria_val.value = state.ui.categoriaValue;
    content_control_actions.style.pointerEvents = state.ui.actionsPointer;
    content_control_actions.style.opacity = state.ui.actionsOpacity;
    categoria_val.style.pointerEvents = state.ui.catPointer;
    categoria_val.style.opacity = state.ui.catOpacity;

    // Si volviste a un punto < MAX_LANZ, asegúrate de reactivar
    if (LANZ_ACTUAL < MAX_LANZ) {
      content_control_actions.style.pointerEvents = "auto";
      content_control_actions.style.opacity = "1";
      categoria_val.style.pointerEvents = "auto";
      categoria_val.style.opacity = "1";
    }

    // Habilitar/deshabilitar el botón según la pila
    const btnRetorno = document.getElementById("reiniciar_btn_actions");
    if (btnRetorno) btnRetorno.disabled = HISTORY.length === 0;
  }

  // 4) Antes de CADA acción que modifica el juego, guardamos snapshot (fase capture)
  const botonesDeJugada = [
    btn_cuerno_diablo,
    btn_pezuñas_diablo,
    btn_dados_cuernos,
    btn_dados_pezuñas,
    btn_dados_una_casilla,
  ];

  botonesDeJugada.forEach((btn) => {
    if (!btn) return;
    btn.addEventListener(
      "click",
      () => {
        HISTORY.push(snapshotState());
        const b = document.getElementById("reiniciar_btn_actions");
        if (b) b.disabled = false;
      },
      { capture: true }
    );
  });

  // (opcional) también versionar el cambio de categoría
  categoria_val.addEventListener(
    "change",
    () => {
      HISTORY.push(snapshotState());
      const b = document.getElementById("reiniciar_btn_actions");
      if (b) b.disabled = false;
    },
    { capture: true }
  );

  // 5) Handler del botón "Retornar jugada"
  const btnRetorno = document.getElementById("reiniciar_btn_actions");
  if (btnRetorno) {
    btnRetorno.disabled = true;
    btnRetorno.addEventListener("click", () => {
      const prev = HISTORY.pop();
      restoreState(prev);
    });
  }

  const btn_submit = document.getElementById("btn_submit");
  const IN_FLIGHT = new Set();
  const LS_KEY = "registrosPortales";
  const FECHA_KEY = "fechaPortales";

  const hoy = new Date().toDateString();
  if (localStorage.getItem(FECHA_KEY) !== hoy) {
    localStorage.setItem(LS_KEY, JSON.stringify([]));
    localStorage.setItem(FECHA_KEY, hoy);
  }

  btn_submit.addEventListener("click", () => {
    const categoria = document.getElementById("categoria");
    const categoria_val = categoria.value;
    const casino = document.getElementById("casino");
    const casino_val = casino.value;
    const nombre = document.getElementById("nombre");
    const nombre_val = nombre.value;
    const cedula = document.getElementById("cedula");
    const cedula_val = cedula.value;
    const loader = document.getElementById("loader");

    if (
      categoria_val == "" ||
      casino_val == "" ||
      nombre_val == "" ||
      cedula_val == ""
    ) {
      Swal.fire({
        icon: "warning",
        title: "Antes de continuar",
        text: "Completa toda la información antes de enviar.",
        allowOutsideClick: false,
      });
      return;
    }

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

    const posClass = getCurrentPosClass(antorcha_ficha); // como vimos antes
    const portal = posClass ? CLASS_TO_PORTAL[posClass] : null;

    console.log(portal, "portal");

    let data = {};

    if (categoria_val == "ADICIONAL") {
      data = {
        tipo: "envio_1",
        valor_1: hora,
        valor_2: fecha,
        valor_3: nombre_val,
        valor_4: cedula_val,
        valor_5: casino_val,
        valor_6: categoria_val,
        valor_7: "0 Portal",
        valBono: "0",
        valor_8: "0",
        valor_9: promocion,
      };
    } else {
      data = {
        valor_1: hora,
        valor_2: fecha,
        valor_3: nombre_val,
        valor_4: cedula_val,
        valor_5: casino_val,
        valor_6: categoria_val,
        valor_7: portal + " Portal",
        valor_9: promocion,
      };
    }

    loader.style.display = "flex";
    const registro = JSON.parse(localStorage.getItem(LS_KEY)) || [];
    registro.push(data);
    localStorage.setItem(LS_KEY, JSON.stringify(registro));

    if (typeof GetResgistroDia === "function") GetResgistroDia();

    if (categoria_val == "ADICIONAL") {
      fetch(url, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify(data),
      })
        .then((res) => res.text())
        .then(() => {
          categoria.value = "";
          casino.value = "";
          nombre.value = "";
          cedula.value = "";
          setTimeout(() => {
            loader.style.display = "none";
            Swal.fire({
              icon: "success",
              title: `Exito con categoria ${categoria_val}`,
              html: `
                <div>
                <p>La información en envió correctamente.</p>
                <img class="img_corona_rama" src="/dinamicas/promocion-9-portales/resources/corona_rama.png" alt="promoAladdin">
                </div>
                `,
              allowOutsideClick: false,
              confirmButtonColor: "#dc3545",
              customClass: {
                popup: "mi-popup",
                title: "mi-titulo",
                confirmButton: "btn btn-danger",
              },
            });
          });
        }, 3000);

      return;
    }

    setTimeout(() => {
      categoria.value = "";
      casino.value = "";
      nombre.value = "";
      cedula.value = "";
      handleResetTablero();
    }, 1500);

    setTimeout(() => {
      loader.style.display = "none";

      Swal.fire({
        icon: "info",
        title: "Guardado local",
        html: `
      <div >
      <p>Se guardó el registro sin # de bono. Puedes asignarlo y enviarlo después.</p>
      <img class="img_corona_rama" src="/dinamicas/promocion-9-portales/resources/corona_rama.png" alt="promoAladdin">
      </div>
      `,
        allowOutsideClick: false,
        confirmButtonColor: "#dc3545",
        customClass: {
          popup: "mi-popup",
          title: "mi-titulo",
          confirmButton: "btn btn-danger",
        },
      });
    }, 3000);
  });

  function GetResgistroDia() {
    const content_registro_dia = document.getElementById("result_dia_portales");
    const info_result_dia = document.getElementById("Info_result_dia");
    const registros = JSON.parse(localStorage.getItem(LS_KEY)) || [];
    const valCasino = (document.getElementById("casino")?.value || "").trim();
    const loader = document.getElementById("loader");

    const filtrados = valCasino
      ? registros.filter((item) => item.valor_5)
      : registros;

    if (filtrados.length === 0) {
      content_registro_dia.innerHTML = `<p class="color-gray">No hay registros ${
        valCasino ? "para este casino." : "aún."
      }</p>`;
      info_result_dia.innerHTML = "";
      return;
    }
    const isBlank = (v) =>
      v == null || (typeof v === "string" && v.trim() === "");
    const hayBonoVacio = filtrados.some((item) => isBlank(item.valBono));
    notificacion_registro_dia.style.display = hayBonoVacio ? "flex" : "none";

    info_result_dia.innerHTML = `<small class="color-gray"><spam style="color: red">*</spam> Estos registros son temporales (se reinicia a las 00:00), por favor tener en cuenta.</small>`;

    // Render de la tabla (nota: input ahora usa CLASE, no ID repetido)
    content_registro_dia.innerHTML = `
    <div class="table-wrapper">
      <table class="styled-table table-scrolld ajuste_table_result">
        <thead>
          <tr>
            <th># Registro</th>
            <th>Casino</th>
            <th>Categoría</th>
            <th>Nombre</th>
            <th>Cédula</th>
            <th>Bono</th>
            <th>Acciones</th>
            <th>Fecha</th>
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
                    data-casino="${r.valor_5}"
                    data-categoria="${r.valor_6}"
                    data-nombre="${r.valor_3}"
                    data-cedula="${r.valor_4}"
                    data-bono="${bono || "0"}"
                    data-fecha="${r.valor_2}"
                    data-hora="${r.valor_1}"
                    data-resultado="${r.valor_7}"
                    data-id="${r.id}"
                 >Enviar</button>`
                  : `<small class="table_ya_tiene_bono">Ya contiene Bono.</small>`;

              return `
              <tr>
                <td>${i + 1}</td>
                <td>${r.valor_5}</td>
                <td>${r.valor_6}</td>
                <td>${r.valor_3}</td>
                <td>${r.valor_4}</td>
                <td>${
                  bono ||
                  `<input class="table_input_bono_portal" type="text" placeholder="#Bono">`
                }</td>
                <td>${accion}</td>
                <td>${r.valor_2} ${r.valor_1}</td>
              </tr>`;
            })
            .join("")}
        </tbody>
      </table>
    </div>
  `;

    function getRegs() {
      try {
        return JSON.parse(localStorage.getItem(LS_KEY)) || [];
      } catch {
        localStorage.setItem(LS_KEY, "[]");
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
          String(r.valor_5).trim() === String(casino).trim() &&
          String(r.valor_6).trim() === String(categoria).trim() &&
          String(r.valor_3).trim() === String(nombre).trim() &&
          String(r.valor_4).trim() === String(cedula).trim() &&
          String(r.valor_2).trim() === String(fecha).trim() &&
          String(r.valor_1).trim() === String(hora).trim()
      );
      if (idx === -1) return false;

      regs[idx].valBono = valBono;
      regs[idx].bonoAsignado = true;
      localStorage.setItem(LS_KEY, JSON.stringify(regs));
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

    if (content_registro_dia._clickHandler) {
      content_registro_dia.removeEventListener(
        "click",
        content_registro_dia._clickHandler
      );
    }

    content_registro_dia._clickHandler = async (e) => {
      console.log("entro al click");
      const btn = e.target.closest(".table_btn_enviar_bono");
      if (!btn) return;

      // Toma el input de la MISMA FILA
      const tr = btn.closest("tr");
      const bonoInput = tr?.querySelector(".table_input_bono_portal");
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
        tipo: "envio_1",
        valor_1: hora,
        valor_2: fecha,
        valor_3: nombre,
        valor_4: cedula,
        valor_5: casino,
        valor_6: categoria,
        valor_7: resultado,
        valor_8: valBonoregistr,
        valor_9: promocion,
      };

      // Clave única por registro para evitar duplicados
      const key = [casino, categoria, nombre, cedula, fecha, hora].join("|");
      if (IN_FLIGHT.has(key)) return;
      IN_FLIGHT.add(key);

      // Evita doble click en el mismo botón
      if (btn.dataset.sending === "1") return;
      btn.dataset.sending = "1";

      const prevText = btn.textContent;
      btn.disabled = true;
      btn.textContent = "Enviando…";
      if (loader?.style) loader.style.display = "flex";

      console.log(data, "data");

      try {
        await fetch(url, {
          method: "POST",
          mode: "no-cors",
          body: JSON.stringify(data),
        });

        const ok = updateLocalBono(
          {
            casino,
            categoria,
            nombre,
            cedula,
            fecha,
            hora,
          },
          valBonoregistr
        );

        console.log(ok, " al ok");

        if (tr) {
          const tdBono = tr.querySelector("td:nth-child(6)");
          const tdAcc = tr.querySelector("td:nth-child(7)");
          if (tdBono) tdBono.innerHTML = escapeHtml(valBonoregistr);
          if (tdAcc)
            tdAcc.innerHTML = `<small class="table_ya_tiene_bono">Ya contiene Bono.</small>`;
        }

        console.log(data, "data");
        Swal.fire({
          icon: ok ? "success" : "info",
          title: ok ? "Bono asignado" : "Registro no encontrado",
          customClass: {
            popup: "mi-popup",
            title: "mi-titulo",
            confirmButton: "btn btn-danger",
          },
          html: `<div>
            <p>${
              ok
                ? "Se envió la información de manera correcta."
                : "No se pudo localizar el registro en localStorage."
            }</p>
              <img class="img_corona_rama" src="/dinamicas/promocion-9-portales/resources/corona_rama.png" alt="promoAladdin">
            </div>
            `,
          allowOutsideClick: false,
        }).then((result) => {
          if (result.isConfirmed) {
            handleResetTablero();
          }
        });
        btn.textContent = prevText;
        GetResgistroDia();
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Ha ocurrido un error",
          customClass: {
            popup: "mi-popup",
            title: "mi-titulo",
            confirmButton: "btn btn-danger",
          },
          html: `
      <div >
      <p>Ha ocurrido un error en el envió.</p>
      <img class="img_corona_rama" src="/dinamicas/promocion-9-portales/resources/corona_rama.png" alt="promoAladdin">
      </div>
      `,
          allowOutsideClick: false,
        });
        btn.textContent = prevText;
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

      // setTimeout(() => {
      //   btn.textContent = "Error en el envio.";
      // }, 4500);

      // setTimeout(() => {
      //   btn.textContent = prevText;
      // }, 6000);
    };
    content_registro_dia.addEventListener(
      "click",
      content_registro_dia._clickHandler
    );
  }
  GetResgistroDia();

  const btn_submit_observacion = document.getElementById(
    "btn_envia_observacion"
  );
  btn_submit_observacion.addEventListener("click", () => {
    const casino_observacion = document.getElementById("casino_observacion");
    const casino_observacion_val = casino_observacion.value;
    const descripcion_observacion = document.getElementById(
      "descripcion_observacion"
    );
    const descripcion_observacion_val = descripcion_observacion.value;
    const loader = document.getElementById("loader");

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

    if (casino_observacion_val == "" || descripcion_observacion_val == "") {
      Swal.fire({
        icon: "warning",
        title: "Campos en blanco",
        html: `<div>
                <p>Completa la información antes de enviar.</p>
                <img class="img_corona_rama" src="/dinamicas/promocion-9-portales/resources/corona_rama.png" alt="promoAladdin">
              </div>`,
        allowOutsideClick: false,
        confirmButtonColor: "#dc3545",
        customClass: {
          popup: "mi-popup",
          title: "mi-titulo",
          confirmButton: "btn btn-danger",
        },
      });
      return;
    }

    const data = {
      tipo: "envio_2",
      valor_1: hora,
      valor_2: fecha,
      valor_3: casino_observacion_val,
      valor_4: descripcion_observacion_val,
    };

    console.log(data);

    loader.style.display = "flex";
    fetch(url, {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify(data),
    })
      .then((res) => res.text())
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Envió exitoso",
          html: `
            <div>
              <p>Observación enviada con éxito.</p>
              <img class="img_corona_rama" src="/dinamicas/promocion-9-portales/resources/corona_rama.png" alt="promoAladdin">
            </div>`,
          allowOutsideClick: false,
          confirmButtonColor: "#dc3545",
          customClass: {
            popup: "mi-popup",
            title: "mi-titulo",
            confirmButton: "btn btn-danger",
          },
        });
        loader.style.display = "none";
        handleResetTablero();
      })
      .catch((error) => {
        console.log(error.status);
        loader.style.display = "none";
        Swal.fire({
          icon: "error",
          title: "Error en el envio",
          html: `
            <div>
              <p>Ha ocurrido un error en el envió de la observación.</p>
              <img class="img_corona_rama" src="/dinamicas/promocion-9-portales/resources/corona_rama.png" alt="promoAladdin">
            </div>`,
          allowOutsideClick: false,
          confirmButtonColor: "#dc3545",
          customClass: {
            popup: "mi-popup",
            title: "mi-titulo",
            confirmButton: "btn btn-danger",
          },
        });
      });
  });

  document
    .getElementById("btn_reset_tablero")
    .addEventListener("click", () => handleResetTablero());
  function handleResetTablero() {
    const categoria = document.getElementById("categoria");
    const antorcha_ficha = document.getElementById("antorcha_ficha");
    const content_conteo_lanzamiento = document.getElementById(
      "content_conteo_lanzamiento"
    );
    const conteo_lanzamientos = document.getElementById("conteo_lanzamientos");
    const content_control_actions = document.getElementById(
      "content_control_actions"
    );
    const content_control_btn = document.getElementById("content_control_btn");
    const reiniciar_btn_actions = document.getElementById(
      "reiniciar_btn_actions"
    );
    const result_modal = document.getElementById("result_modal");
    result_modal.value = "";

    reiniciar_btn_actions.style.pointerEvents = "auto";
    reiniciar_btn_actions.style.cursor = "default";
    reiniciar_btn_actions.style.opacity = "0.7";

    categoria_val.value = "";
    (categoria.style.opacity = "1"), (categoria.style.pointerEvents = "auto");
    content_conteo_lanzamiento.style.display = "none";
    conteo_lanzamientos.textContent = "0";
    LANZ_ACTUAL = 0;
    title_game.innerHTML = `Eres Valiente, <br />¿Qué camino eliges?`;

    content_control_actions.style.display = "none";
    content_control_btn.style.display = "flex";
    content_control_btn.style.pointerEvents = "none";
    content_control_btn.style.opacity = "0.7";

    antorcha_ficha.classList.remove(
      "type_pezuñas",
      "start_pezuñas",
      "type_cuernos",
      "start_cuernos",
      "posicion_9_pezuñas",
      "posicion_8_pezuñas",
      "posicion_7_pezuñas",
      "posicion_6_pezuñas",
      "posicion_5_last",
      "posicion_4_cuernos",
      "posicion_3_cuernos",
      "posicion_2_cuernos",
      "posicion_1_cuernos"
    );
  }

  document
    .getElementById("btn_clean_submit")
    .addEventListener("click", () => cleanSubmit());
  function cleanSubmit() {
    const casino = document.getElementById("casino");
    const nombre = document.getElementById("nombre");
    const cedula = document.getElementById("cedula");

    casino.value = "";
    nombre.value = "";
    cedula.value = "";
  }

  document
    .getElementById("btn_clean_secundario")
    .addEventListener("click", () => cleanSubmitSecundario());
  function cleanSubmitSecundario() {
    const casino = document.getElementById("casino_secundario");
    const categoria = document.getElementById("categoria-secundario");
    const cedula = document.getElementById("cedula_secundario");
    const nombre = document.getElementById("nombre_secundario");
    const bonoS = document.getElementById("bono_secundario");
    const portales = document.getElementById("portal_secundario");
    const fecha = document.getElementById("fecha_secundario");
    const hora = document.getElementById("hora_secundario");
    casino.value = "";
    categoria.value = "";
    cedula.value = "";
    nombre.value = "";
    bonoS.value = "";
    portales.value = "";
    fecha.value = "";
    hora.value = "";
  }

  document
    .getElementById("btn_clean_observacion")
    .addEventListener("click", () => cleanObservacion());
  function cleanObservacion() {
    const casino = document.getElementById("casino_observacion");
    const observacion = document.getElementById("descripcion_observacion");

    casino.value = "";
    observacion.value = "";
  }

  document
    .getElementById("btn_submit_secundario")
    .addEventListener("click", () => handleSecondSubmit());
  function handleSecondSubmit() {
    const casino = document.getElementById("casino_secundario");
    const categoria = document.getElementById("categoria-secundario");
    const cedula = document.getElementById("cedula_secundario");
    const nombre = document.getElementById("nombre_secundario");
    const bonoS = document.getElementById("bono_secundario");
    const portales = document.getElementById("portal_secundario");
    const fecha = document.getElementById("fecha_secundario");
    const hora = document.getElementById("hora_secundario");
    const loader = document.getElementById("loader");

    let portales_val = portales.value;
    let bonoS_val = bonoS.value;

    if (categoria.value == "ADICIONAL") {
      portales_val = "0";
      bonoS_val = "0";
    }

    if (
      casino.value == "" ||
      categoria.value == "" ||
      cedula.value == "" ||
      nombre.value == "" ||
      bonoS_val == "" ||
      portales_val == "" ||
      fecha.value == "" ||
      hora.value == ""
    ) {
      Swal.fire({
        icon: "warning",
        title: "Campos vacios!.",
        html: "Por favor, Completa la información antes de enviar.",
        customClass: {
          popup: "mi-popup",
          title: "mi-titulo",
          confirmButton: "btn btn-danger",
        },
      });
      return;
    }

    const data = {
      tipo: "envio_1",
      valor_1: hora.value,
      valor_2: fecha.value,
      valor_3: nombre.value,
      valor_4: cedula.value,
      valor_5: casino.value,
      valor_6: categoria.value,
      valor_7: portales_val,
      valor_8: bonoS_val,
      valor_9: promocion,
    };

    console.log(data, "data secundario");

    loader.style.display = "flex";
    fetch(url, {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify(data),
    })
      .then((res) => res.text())
      .then(() => {
        casino.value = "";
        categoria.value = "";
        cedula.value = "";
        nombre.value = "";
        bonoS.value = "";
        portales.value = "";
        fecha.value = "";
        hora.value = "";
        setTimeout(() => {
          Swal.fire({
            icon: "success",
            title: "Envió Exitoso",
            html: `
            <div>
              <p>La información se envió de maneta correcta.</p>
              <img class="img_corona_rama" src="/dinamicas/promocion-9-portales/resources/corona_rama.png" alt="promoAladdin">
            </div>`,
            customClass: {
              popup: "mi-popup",
              title: "mi-titulo",
              confirmButton: "btn btn-danger",
            },
          });
          loader.style.display = "none";
        }, 3000);
      })
      .catch((error) => {
        console.log(error.mensaje);
        loader.style.display = "none";
        Swal.fire({
          icon: "error",
          title: "Error en el envio",
          html: `
            <div>
              <p>Ha ocurrido un error en el envió de la información.</p>
              <img class="img_corona_rama" src="/dinamicas/promocion-9-portales/resources/corona_rama.png" alt="promoAladdin">
            </div>`,
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

  const btn = document.getElementById("full-screen");
  const target = document.documentElement; // o cambia a un div específico

  const isFullscreen = () =>
    document.fullscreenElement || document.webkitFullscreenElement;

  async function enterFullscreen() {
    if (target.requestFullscreen) return target.requestFullscreen();
    if (target.webkitRequestFullscreen) return target.webkitRequestFullscreen();
  }

  async function exitFullscreen() {
    if (document.exitFullscreen) return document.exitFullscreen();
    if (document.webkitExitFullscreen) return document.webkitExitFullscreen();
  }

  async function toggleFullscreen() {
    try {
      if (isFullscreen()) await exitFullscreen();
      else await enterFullscreen();
    } catch (e) {
      console.error("No se pudo cambiar fullscreen:", e);
    }
  }

  function syncButtonText() {
    btn.textContent = isFullscreen()
      ? "Salir de pantalla completa"
      : "Pantalla completa";
  }

  btn.addEventListener("click", toggleFullscreen);
  document.addEventListener("fullscreenchange", syncButtonText);
  document.addEventListener("webkitfullscreenchange", syncButtonText);

  syncButtonText();

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

  document
    .getElementById("abrirmodalopciones")
    .addEventListener("click", () => abrirmodalopciones());

  function abrirmodalopciones() {
    const btn_guardar_registro = document.getElementById(
      "btn_guardar_registro"
    );
    const result_modal = document.getElementById("result_modal");
    const conteo_lanzamientos = document.getElementById("conteo_lanzamientos");
    const Result_conteo = document.getElementById("Result_conteo");

    const posClass = getCurrentPosClass(antorcha_ficha);
    const portal = posClass ? CLASS_TO_PORTAL[posClass] : null;

    console.log(portal, "porta de la modal");
    result_modal.textContent =
      portal == null ? "Sin resultado" : "Resultado: " + "Portal " + portal;
    console.log(conteo_lanzamientos.textContent, "texto");
    Result_conteo.textContent =
      conteo_lanzamientos.textContent == 4
        ? `,Lanz... ${conteo_lanzamientos.textContent}`
        : `,Juego Pendiente...`;

    const view_guardar_registro = document.getElementById(
      "view_guardar_registro"
    );

    const view_envio_secundario = document.getElementById(
      "view_envio_secundario"
    );

    const view_tabla_premios = document.getElementById("view_tabla_premios");
    const view_registros_dia = document.getElementById("view_registros_dia");

    view_guardar_registro.style.display = "flex";
    view_envio_secundario.style.display = "none";
    view_tabla_premios.style.display = "none";
    view_registros_dia.style.display = "none";

    btn_guardar_registro.classList.add("select_menu");

    document.getElementById("modal_opciones_portales").style.display = "flex";
    lockBodyScroll();
  }

  document
    .getElementById("cerrarmodaleopciones")
    .addEventListener("click", () => cerrarmodalopciones());

  function cerrarmodalopciones() {
    document.getElementById("modal_opciones_portales").style.display = "none";

    const btn_guardar_registro = document.getElementById(
      "btn_guardar_registro"
    );
    const btn_envio_observacion = document.getElementById(
      "btn_envio_observacion"
    );
    const btn_envio_secundario = document.getElementById(
      "btn_envio_secundario"
    );
    const btn_tabla_premios = document.getElementById("btn_tabla_premios");
    const btn_registros_dia = document.getElementById("btn_registros_dia");
    const view_guardar_registro = document.getElementById(
      "view_guardar_registro"
    );
    const view_envio_observacion = document.getElementById(
      "view_envio_observacion"
    );
    const view_envio_secundario = document.getElementById(
      "view_envio_secundario"
    );
    const view_tabla_premios = document.getElementById("view_tabla_premios");
    const view_registros_dia = document.getElementById("view_registros_dia");
    view_guardar_registro.style.display = "none";
    view_envio_observacion.style.display = "none";
    view_envio_secundario.style.display = "none";
    view_tabla_premios.style.display = "none";
    view_registros_dia.style.display = "none";

    btn_guardar_registro.classList.remove("select_menu");
    btn_envio_secundario.classList.remove("select_menu");
    btn_tabla_premios.classList.remove("select_menu");
    btn_registros_dia.classList.remove("select_menu");
    btn_envio_observacion.classList.remove("select_menu");
    unlockBodyScroll();
  }
});

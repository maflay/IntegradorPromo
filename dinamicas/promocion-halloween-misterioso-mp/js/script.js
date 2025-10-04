window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  loader.style.display = "none";
});

window.addEventListener("DOMContentLoaded", () => {
   window.addEventListener("click", () => {
    const sonidoFondo = new Audio(
      "/dinamicas/promocion-9-portales/resources/Sonido_background.mp3"
    );

    sonidoFondo.play();
 sonidoFondo.loop = true;
    sonidoFondo.volume = 0.4;
  }, { once: true });
  // Loader
  const loader = document.getElementById("loader");

  // datos de envio principal y otros
  const categoria = document.getElementById("categoria");
  const casino = document.getElementById("casino");
  const nombre = document.getElementById("nombre");
  const cedula = document.getElementById("cedula");

  const url =
    "https://script.google.com/macros/s/AKfycbwsoyCjEk7p_9nFqO1UQ7mGJo7RXV3Ka2qT8CxSD_4aMOtysHoEQfBXo5rytbH5aDjI/exec";
  const promocion = "Halloween Misterioso";
  const fondo_board_1 = document.getElementById("fondo_board_1");

  // Botones fichas
  const btn_img_esqueleto = document.getElementById("img_esqueleto");
  const ficha_img_esqueleto_1 = document.getElementById(
    "ficha_img_esqueleto_1"
  );
  const ficha_img_esqueleto_2 = document.getElementById(
    "ficha_img_esqueleto_2"
  );
  const ficha_img_esqueleto_3 = document.getElementById(
    "ficha_img_esqueleto_3"
  );

  //Botones tablero
  const btn_reset_tablero_misterioso = document.getElementById(
    "btn_reset_tablero_misterioso"
  );
  const btn_reset_misterioso = document.getElementById("btn_reset_misterioso");

  //botones modales
  const btn_clean_secundario = document.getElementById("btn_clean_secundario");
  const btn_submit_secundario = document.getElementById(
    "btn_submit_secundario"
  );
  const btn_envia_observacion = document.getElementById(
    "btn_envia_observacion"
  );
  const btn_clean_observacion = document.getElementById(
    "btn_clean_observacion"
  );

  // Abrir Modal
  const abrirOpciones = document.getElementById("abrirOpciones");
  const cerrarmodaleopciones = document.getElementById("cerrarmodaleopciones");

  // img detras de la ficha principal
  const img_esqueleto_1 = document.getElementById("img_esqueleto_1");
  const img_esqueleto_2 = document.getElementById("img_esqueleto_2");
  const img_esqueleto_3 = document.getElementById("img_esqueleto_3");
  const score_esqueleto = document.getElementById("score_esqueleto");

  const btn_img_momia = document.getElementById("img_momia");
  const ficha_img_momia_1 = document.getElementById("ficha_img_momia_1");
  const ficha_img_momia_2 = document.getElementById("ficha_img_momia_2");
  const ficha_img_momia_3 = document.getElementById("ficha_img_momia_3");

  const img_momia_1 = document.getElementById("img_momia_1");
  const img_momia_2 = document.getElementById("img_momia_2");
  const img_momia_3 = document.getElementById("img_momia_3");
  const score_momia = document.getElementById("score_momia");

  const btn_img_calabaza = document.getElementById("img_calabaza");
  const ficha_img_calabaza_1 = document.getElementById("ficha_img_calabaza_1");
  const ficha_img_calabaza_2 = document.getElementById("ficha_img_calabaza_2");
  const ficha_img_calabaza_3 = document.getElementById("ficha_img_calabaza_3");

  const img_calabaza_1 = document.getElementById("img_calabaza_1");
  const img_calabaza_2 = document.getElementById("img_calabaza_2");
  const img_calabaza_3 = document.getElementById("img_calabaza_3");
  const score_calabaza = document.getElementById("score_calabaza");

  // Conteot de turno
  const conteo_turno = document.getElementById("conteo_turno");

  // Menu de la modal
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

  const btn_guardar_registro = document.getElementById("btn_guardar_registro");
  const btn_envio_secundario = document.getElementById("btn_envio_secundario");
  const btn_envio_observacion = document.getElementById(
    "btn_envio_observacion"
  );
  const btn_tabla_premios = document.getElementById("btn_tabla_premios");
  const btn_registros_dia = document.getElementById("btn_registros_dia");
  const notificacion_registro_dia = document.getElementById(
    "notificacion_registro_dia"
  );
  notificacion_registro_dia.style.display = "none";

  const btn_submit = document.getElementById("btn_submit");

  // varirables localStorage
  const IN_FLIGHT = new Set();
  const LS_KEY = "registrosMisterioso";
  const FECHA_KEY = "fechaMisterioso";

  const hoy = new Date().toDateString();
  if (localStorage.getItem(FECHA_KEY) !== hoy) {
    localStorage.setItem(LS_KEY, JSON.stringify([]));
    localStorage.setItem(FECHA_KEY, hoy);
  }

  var resultGlobal1 = "";
  var resultGlobal2 = "";
  var resultGlobal3 = "";

  // titulo premio
  const premio_acumulado = document.getElementById("premio_acumulado");
  const label_acumulado = document.getElementById("label_acumulado");

  // Vistas modal
  view_guardar_registro.style.display = "none";
  view_envio_observacion.style.display = "none";
  view_envio_secundario.style.display = "none";
  view_tabla_premios.style.display = "none";
  view_registros_dia.style.display = "none";

  btn_guardar_registro.addEventListener("click", () => {
    btn_guardar_registro.classList.add("select_menu");
    btn_envio_secundario.classList.remove("select_menu");
    btn_envio_observacion.classList.remove("select_menu");
    btn_tabla_premios.classList.remove("select_menu");
    btn_registros_dia.classList.remove("select_menu");

    view_guardar_registro.style.display = "flex";
    view_envio_observacion.style.display = "none";
    view_envio_secundario.style.display = "none";
    view_tabla_premios.style.display = "none";
    view_registros_dia.style.display = "none";
  });

  btn_envio_secundario.addEventListener("click", () => {
    btn_guardar_registro.classList.remove("select_menu");
    btn_envio_secundario.classList.add("select_menu");
    btn_envio_observacion.classList.remove("select_menu");
    btn_tabla_premios.classList.remove("select_menu");
    btn_registros_dia.classList.remove("select_menu");

    view_guardar_registro.style.display = "none";
    view_envio_secundario.style.display = "flex";
    view_envio_observacion.style.display = "none";
    view_tabla_premios.style.display = "none";
    view_registros_dia.style.display = "none";
  });

  btn_envio_observacion.addEventListener("click", () => {
    btn_guardar_registro.classList.remove("select_menu");
    btn_envio_secundario.classList.remove("select_menu");
    btn_envio_observacion.classList.add("select_menu");
    btn_tabla_premios.classList.remove("select_menu");
    btn_registros_dia.classList.remove("select_menu");

    view_guardar_registro.style.display = "none";
    view_envio_secundario.style.display = "none";
    view_envio_observacion.style.display = "flex";
    view_tabla_premios.style.display = "none";
    view_registros_dia.style.display = "none";
  });

  btn_tabla_premios.addEventListener("click", () => {
    btn_guardar_registro.classList.remove("select_menu");
    btn_envio_secundario.classList.remove("select_menu");
    btn_envio_observacion.classList.remove("select_menu");
    btn_tabla_premios.classList.add("select_menu");
    btn_registros_dia.classList.remove("select_menu");

    view_guardar_registro.style.display = "none";
    view_envio_secundario.style.display = "none";
    view_envio_observacion.style.display = "none";
    view_tabla_premios.style.display = "flex";
    view_registros_dia.style.display = "none";
  });

  btn_registros_dia.addEventListener("click", () => {
    btn_guardar_registro.classList.remove("select_menu");
    btn_envio_secundario.classList.remove("select_menu");
    btn_envio_observacion.classList.remove("select_menu");
    btn_tabla_premios.classList.remove("select_menu");
    btn_registros_dia.classList.add("select_menu");

    view_guardar_registro.style.display = "none";
    view_envio_secundario.style.display = "none";
    view_envio_observacion.style.display = "none";
    view_tabla_premios.style.display = "none";
    view_registros_dia.style.display = "flex";
  });

  let lanz = 0;
  let Max_TUR = 3;

  let ScoreEsquelto = 6;
  let ScoreMomia = 3;
  let ScoreCalabaza = 3;

  let TotalPremio = 0;

  conteo_turno.innerHTML = lanz;

  score_esqueleto.innerHTML = ScoreEsquelto;
  score_momia.innerHTML = ScoreMomia;
  score_calabaza.innerHTML = ScoreCalabaza;

  btn_img_esqueleto.addEventListener("click", () => {
      const audioFicha = new Audio(
        "/dinamicas/promocion-halloween-misterioso/resources/Sonido_ficha.mp3"
      );
    if (categoria.value == "" || casino.value == "") {
      Swal.fire({
        icon: "none",
        html: `
            <div class="content_swal_premio">
            <img class="img_corona_rama" src="/dinamicas/promocion-9-portales/resources/corona_rama.png" alt="promoAladdin">
            <div class="swal_premio_portal">
                <img id="swal-logo" src="/dinamicas/promocion-9-portales/resources/ojos_calabaza_prueba.png" alt="Logo premio">
                <br/>
              </div>
            <h2>Campos en Blanco.</h2>
            Por favor para poder continuar, selecciona una categoria.
            </div>
      `,
        confirmButtonColor: "#e08b0bff",
        allowOutsideClick: false,
        customClass: {
          popup: "mi-popup",
          title: "mi-titulo",
        },
      });
      return;
    }
    if (!img_esqueleto_1.classList.contains("posicion_esqueleto_1")) {
      if (casino.value == "A43" || casino.value == "A53") {
        ficha_img_esqueleto_1.dataset.valor =
          categoria.value == "ESTANDAR"
            ? 20000
            : categoria.value == "SUPERIOR"
            ? 30000
            : categoria.value == "GENIUS"
            ? 40000
            : categoria.value == "TITANIO"
            ? 40000
            : categoria.value == "LEGENDARIO"
            ? 40000
            : categoria.value == "GOLD"
            ? 30000
            : categoria.value == "SILVER"
            ? 30000
            : categoria.value == "BRONCE"
            ? 30000
            : 0;
      } else if (casino.value == "A108") {
        ficha_img_esqueleto_1.dataset.valor =
          categoria.value == "ESTANDAR"
            ? 30000
            : categoria.value == "SUPERIOR"
            ? 40000
            : categoria.value == "GENIUS"
            ? 40000
            : categoria.value == "TITANIO"
            ? 40000
            : categoria.value == "LEGENDARIO"
            ? 40000
            : categoria.value == "GOLD"
            ? 30000
            : categoria.value == "SILVER"
            ? 30000
            : categoria.value == "BRONCE"
            ? 30000
            : 0;
      } else {
        ficha_img_esqueleto_1.dataset.valor =
          categoria.value == "ESTANDAR"
            ? 30000
            : categoria.value == "SUPERIOR"
            ? 40000
            : categoria.value == "GENIUS"
            ? 40000
            : categoria.value == "TITANIO"
            ? 40000
            : categoria.value == "LEGENDARIO"
            ? 40000
            : categoria.value == "GOLD"
            ? 30000
            : categoria.value == "SILVER"
            ? 30000
            : categoria.value == "BRONCE"
            ? 20000
            : 0;
      }
      img_esqueleto_1.classList.add("posicion_esqueleto_1");
      ScoreEsquelto -= 1;
      lanz += 1;
      let valor = parseInt(ficha_img_esqueleto_1.dataset.valor);
      TotalPremio += valor;
      conteo_turno.innerHTML = lanz;
      validateTry(categoria.value, lanz, TotalPremio);
      score_esqueleto.innerHTML = ScoreEsquelto;
      audioFicha.play();
    } else if (!img_esqueleto_2.classList.contains("posicion_esqueleto_2")) {
      if (casino.value == "A43" || casino.value == "A53") {
        ficha_img_esqueleto_2.dataset.valor =
          categoria.value == "ESTANDAR"
            ? 20000
            : categoria.value == "SUPERIOR"
            ? 30000
            : categoria.value == "GENIUS"
            ? 40000
            : categoria.value == "TITANIO"
            ? 40000
            : categoria.value == "LEGENDARIO"
            ? 40000
            : categoria.value == "GOLD"
            ? 30000
            : categoria.value == "SILVER"
            ? 30000
            : categoria.value == "BRONCE"
            ? 30000
            : 0;
      } else if (casino.value == "A108") {
        ficha_img_esqueleto_2.dataset.valor =
          categoria.value == "ESTANDAR"
            ? 30000
            : categoria.value == "SUPERIOR"
            ? 40000
            : categoria.value == "GENIUS"
            ? 40000
            : categoria.value == "TITANIO"
            ? 40000
            : categoria.value == "LEGENDARIO"
            ? 40000
            : categoria.value == "GOLD"
            ? 30000
            : categoria.value == "SILVER"
            ? 30000
            : categoria.value == "BRONCE"
            ? 30000
            : 0;
      } else {
        ficha_img_esqueleto_2.dataset.valor =
          categoria.value == "ESTANDAR"
            ? 30000
            : categoria.value == "SUPERIOR"
            ? 40000
            : categoria.value == "GENIUS"
            ? 40000
            : categoria.value == "TITANIO"
            ? 40000
            : categoria.value == "LEGENDARIO"
            ? 40000
            : categoria.value == "GOLD"
            ? 30000
            : categoria.value == "SILVER"
            ? 30000
            : categoria.value == "BRONCE"
            ? 20000
            : 0;
      }
      img_esqueleto_2.classList.add("posicion_esqueleto_2");
      ScoreEsquelto -= 1;
      lanz += 1;
      let valor = parseInt(ficha_img_esqueleto_2.dataset.valor);
      TotalPremio += valor;
      conteo_turno.innerHTML = lanz;
      validateTry(categoria.value, lanz, TotalPremio);
      score_esqueleto.innerHTML = ScoreEsquelto;
      audioFicha.play();
    } else if (!img_esqueleto_3.classList.contains("posicion_esqueleto_3")) {
      if (casino.value == "A43" || casino.value == "A53") {
        ficha_img_esqueleto_3.dataset.valor =
          categoria.value == "ESTANDAR"
            ? 20000
            : categoria.value == "SUPERIOR"
            ? 30000
            : categoria.value == "GENIUS"
            ? 40000
            : categoria.value == "TITANIO"
            ? 40000
            : categoria.value == "LEGENDARIO"
            ? 40000
            : categoria.value == "GOLD"
            ? 30000
            : categoria.value == "SILVER"
            ? 30000
            : categoria.value == "BRONCE"
            ? 30000
            : 0;
      } else if (casino.value == "A108") {
        ficha_img_esqueleto_3.dataset.valor =
          categoria.value == "ESTANDAR"
            ? 30000
            : categoria.value == "SUPERIOR"
            ? 40000
            : categoria.value == "GENIUS"
            ? 40000
            : categoria.value == "TITANIO"
            ? 40000
            : categoria.value == "LEGENDARIO"
            ? 40000
            : categoria.value == "GOLD"
            ? 30000
            : categoria.value == "SILVER"
            ? 30000
            : categoria.value == "BRONCE"
            ? 30000
            : 0;
      } else {
        ficha_img_esqueleto_3.dataset.valor =
          categoria.value == "ESTANDAR"
            ? 30000
            : categoria.value == "SUPERIOR"
            ? 40000
            : categoria.value == "GENIUS"
            ? 40000
            : categoria.value == "TITANIO"
            ? 40000
            : categoria.value == "LEGENDARIO"
            ? 40000
            : categoria.value == "GOLD"
            ? 30000
            : categoria.value == "SILVER"
            ? 30000
            : categoria.value == "BRONCE"
            ? 20000
            : 0;
      }
      img_esqueleto_3.classList.add("posicion_esqueleto_3");
      ScoreEsquelto -= 1;
      lanz += 1;
      let valor = parseInt(ficha_img_esqueleto_3.dataset.valor);
      TotalPremio += valor;
      let totalpremio_fichas = TotalPremio.toLocaleString("es-CO", {
        style: "currency",
        currency: "COP",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      });
      premio_acumulado.innerHTML = totalpremio_fichas;
      conteo_turno.innerHTML = lanz;
      validateTry(categoria.value, lanz, TotalPremio);
      score_esqueleto.innerHTML = ScoreEsquelto;
      audioFicha.play();
    }
  });

    const audioFicha = new Audio(
        "/dinamicas/promocion-halloween-misterioso/resources/Sonido_ficha.mp3"
      );

  img_esqueleto_1.addEventListener("click", () => {
    if (img_esqueleto_1.classList.contains("posicion_esqueleto_1")) {
      img_esqueleto_1.classList.remove("posicion_esqueleto_1");
      ScoreEsquelto += 1;
      lanz -= 1;
      TotalPremio -= ficha_img_esqueleto_1.dataset.valor;
      let totalpremio_fichas = TotalPremio.toLocaleString("es-CO", {
        style: "currency",
        currency: "COP",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      });
      premio_acumulado.innerHTML = totalpremio_fichas;
      conteo_turno.innerHTML = lanz;
      score_esqueleto.innerHTML = ScoreEsquelto;
      audioFicha.play();
    }
  });

  img_esqueleto_2.addEventListener("click", () => {
    if (img_esqueleto_2.classList.contains("posicion_esqueleto_2")) {
      img_esqueleto_2.classList.remove("posicion_esqueleto_2");
      ScoreEsquelto += 1;
      lanz -= 1;
      TotalPremio -= ficha_img_esqueleto_2.dataset.valor;
      let totalpremio_fichas = TotalPremio.toLocaleString("es-CO", {
        style: "currency",
        currency: "COP",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      });
      premio_acumulado.innerHTML = totalpremio_fichas;
      conteo_turno.innerHTML = lanz;
      score_esqueleto.innerHTML = ScoreEsquelto;
      audioFicha.play();
    }
  });

  img_esqueleto_3.addEventListener("click", () => {
    if (img_esqueleto_3.classList.contains("posicion_esqueleto_3")) {
      img_esqueleto_3.classList.remove("posicion_esqueleto_3");
      ScoreEsquelto += 1;
      lanz -= 1;
      TotalPremio -= ficha_img_esqueleto_3.dataset.valor;
      let totalpremio_fichas = TotalPremio.toLocaleString("es-CO", {
        style: "currency",
        currency: "COP",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      });
      premio_acumulado.innerHTML = totalpremio_fichas;
      conteo_turno.innerHTML = lanz;
      score_esqueleto.innerHTML = ScoreEsquelto;
      audioFicha.play();
    }
  });

  btn_img_momia.addEventListener("click", () => {
    if (categoria.value == "" || casino.value == "") {
      Swal.fire({
        icon: "none",
        html: `
            <div class="content_swal_premio">
            <img class="img_corona_rama" src="/dinamicas/promocion-9-portales/resources/corona_rama.png" alt="promoAladdin">
            <div class="swal_premio_portal">
                <img id="swal-logo" src="/dinamicas/promocion-9-portales/resources/ojos_calabaza_prueba.png" alt="Logo premio">
                <br/>
              </div>
            <h2>Campos en Blanco.</h2>
            Por favor para poder continuar, completa la informacion.
            </div>
      `,
        confirmButtonColor: "#e08b0bff",
        allowOutsideClick: false,
        customClass: {
          popup: "mi-popup",
          title: "mi-titulo",
        },
      });
      return;
    }
    if (!img_momia_1.classList.contains("posicion_momia_1")) {
      if (casino.value == "A43" || casino.value == "A53") {
        ficha_img_momia_1.dataset.valor =
          categoria.value == "ESTANDAR"
            ? 20000
            : categoria.value == "SUPERIOR"
            ? 30000
            : categoria.value == "GENIUS"
            ? 50000
            : categoria.value == "TITANIO"
            ? 50000
            : categoria.value == "LEGENDARIO"
            ? 50000
            : categoria.value == "GOLD"
            ? 40000
            : categoria.value == "SILVER"
            ? 40000
            : categoria.value == "BRONCE"
            ? 40000
            : 0;
      } else if (casino.value == "A108") {
        ficha_img_momia_1.dataset.valor =
          categoria.value == "ESTANDAR"
            ? 40000
            : categoria.value == "SUPERIOR"
            ? 50000
             : categoria.value == "GENIUS"
            ? 50000
            : categoria.value == "TITANIO"
            ? 50000
            : categoria.value == "LEGENDARIO"
            ? 50000
            : categoria.value == "GOLD"
            ? 40000
            : categoria.value == "SILVER"
            ? 40000
            : categoria.value == "BRONCE"
            ? 40000
            : 0;
      } else {
        ficha_img_momia_1.dataset.valor =
          categoria.value == "ESTANDAR"
            ? 40000
            : categoria.value == "SUPERIOR"
            ? 50000
            : categoria.value == "GENIUS"
            ? 50000
            : categoria.value == "TITANIO"
            ? 50000
            : categoria.value == "LEGENDARIO"
            ? 50000
            : categoria.value == "GOLD"
            ? 40000
            : categoria.value == "SILVER"
            ? 40000
            : categoria.value == "BRONCE"
            ? 30000
            : 0;
      }

      img_momia_1.classList.add("posicion_momia_1");
      ScoreMomia -= 1;
      lanz += 1;
      let valor = parseInt(ficha_img_momia_1.dataset.valor);
      TotalPremio += valor;
      conteo_turno.innerHTML = lanz;
      validateTry(categoria.value, lanz, TotalPremio);
      score_momia.innerHTML = ScoreMomia;
      audioFicha.play();
    } else if (!img_momia_2.classList.contains("posicion_momia_2")) {
      if (casino.value == "A43" || casino.value == "A53") {
        ficha_img_momia_2.dataset.valor =
          categoria.value == "ESTANDAR"
            ? 20000
            : categoria.value == "SUPERIOR"
            ? 30000
            : categoria.value == "GENIUS"
            ? 50000
            : categoria.value == "TITANIO"
            ? 50000
            : categoria.value == "LEGENDARIO"
            ? 50000
            : categoria.value == "GOLD"
            ? 40000
            : categoria.value == "SILVER"
            ? 40000
            : categoria.value == "BRONCE"
            ? 40000
            : 0;
      } else if (casino.value == "A108") {
        ficha_img_momia_2.dataset.valor =
          categoria.value == "ESTANDAR"
            ? 40000
            : categoria.value == "SUPERIOR"
            ? 50000
             : categoria.value == "GENIUS"
            ? 50000
            : categoria.value == "TITANIO"
            ? 50000
            : categoria.value == "LEGENDARIO"
            ? 50000
            : categoria.value == "GOLD"
            ? 40000
            : categoria.value == "SILVER"
            ? 40000
            : categoria.value == "BRONCE"
            ? 40000
            : 0;
      } else {
        ficha_img_momia_2.dataset.valor =
          categoria.value == "ESTANDAR"
            ? 40000
            : categoria.value == "SUPERIOR"
            ? 50000
            : categoria.value == "GENIUS"
            ? 50000
            : categoria.value == "TITANIO"
            ? 50000
            : categoria.value == "LEGENDARIO"
            ? 50000
            : categoria.value == "GOLD"
            ? 40000
            : categoria.value == "SILVER"
            ? 40000
            : categoria.value == "BRONCE"
            ? 30000
            : 0;
      }
      img_momia_2.classList.add("posicion_momia_2");
      ScoreMomia -= 1;
      lanz += 1;
      let valor = parseInt(ficha_img_momia_2.dataset.valor);
      TotalPremio += valor;
      conteo_turno.innerHTML = lanz;
      validateTry(categoria.value, lanz, TotalPremio);
      score_momia.innerHTML = ScoreMomia;
      audioFicha.play();
    } else if (!img_momia_3.classList.contains("posicion_momia_3")) {
      if (casino.value == "A43" || casino.value == "A53") {
        ficha_img_momia_3.dataset.valor =
          categoria.value == "ESTANDAR"
            ? 20000
            : categoria.value == "SUPERIOR"
            ? 30000
            : categoria.value == "GENIUS"
            ? 50000
            : categoria.value == "TITANIO"
            ? 50000
            : categoria.value == "LEGENDARIO"
            ? 50000
            : categoria.value == "GOLD"
            ? 40000
            : categoria.value == "SILVER"
            ? 40000
            : categoria.value == "BRONCE"
            ? 40000
            : 0;
      } else if (casino.value == "A108") {
        ficha_img_momia_3.dataset.valor =
          categoria.value == "ESTANDAR"
            ? 40000
            : categoria.value == "SUPERIOR"
            ? 50000
             : categoria.value == "GENIUS"
            ? 50000
            : categoria.value == "TITANIO"
            ? 50000
            : categoria.value == "LEGENDARIO"
            ? 50000
            : categoria.value == "GOLD"
            ? 40000
            : categoria.value == "SILVER"
            ? 40000
            : categoria.value == "BRONCE"
            ? 40000
            : 0;
      } else {
        ficha_img_momia_3.dataset.valor =
          categoria.value == "ESTANDAR"
            ? 40000
            : categoria.value == "SUPERIOR"
            ? 50000
            : categoria.value == "GENIUS"
            ? 50000
            : categoria.value == "TITANIO"
            ? 50000
            : categoria.value == "LEGENDARIO"
            ? 50000
            : categoria.value == "GOLD"
            ? 40000
            : categoria.value == "SILVER"
            ? 40000
            : categoria.value == "BRONCE"
            ? 30000
            : 0;
      }
      img_momia_3.classList.add("posicion_momia_3");
      ScoreMomia -= 1;
      lanz += 1;
      let valor = parseInt(ficha_img_momia_3.dataset.valor);
      TotalPremio += valor;
      conteo_turno.innerHTML = lanz;
      validateTry(categoria.value, lanz, TotalPremio);
      score_momia.innerHTML = ScoreMomia;
      audioFicha.play();
    }
  });

  img_momia_1.addEventListener("click", () => {
    if (img_momia_1.classList.contains("posicion_momia_1")) {
      img_momia_1.classList.remove("posicion_momia_1");
      ScoreMomia += 1;
      lanz -= 1;
      TotalPremio -= ficha_img_momia_1.dataset.valor;
      let totalpremio_fichas = TotalPremio.toLocaleString("es-CO", {
        style: "currency",
        currency: "COP",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      });
      premio_acumulado.innerHTML = totalpremio_fichas;
      conteo_turno.innerHTML = lanz;
      score_momia.innerHTML = ScoreMomia;
      audioFicha.play();
    }
  });

  img_momia_2.addEventListener("click", () => {
    if (img_momia_2.classList.contains("posicion_momia_2")) {
      img_momia_2.classList.remove("posicion_momia_2");
      ScoreMomia += 1;
      lanz -= 1;
      TotalPremio -= ficha_img_momia_2.dataset.valor;
      let totalpremio_fichas = TotalPremio.toLocaleString("es-CO", {
        style: "currency",
        currency: "COP",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      });
      premio_acumulado.innerHTML = totalpremio_fichas;
      conteo_turno.innerHTML = lanz;
      score_momia.innerHTML = ScoreMomia;
      audioFicha.play();
    }
  });

  img_momia_3.addEventListener("click", () => {
    if (img_momia_3.classList.contains("posicion_momia_3")) {
      img_momia_3.classList.remove("posicion_momia_3");
      ScoreMomia += 1;
      lanz -= 1;
      TotalPremio -= ficha_img_momia_3.dataset.valor;
      let totalpremio_fichas = TotalPremio.toLocaleString("es-CO", {
        style: "currency",
        currency: "COP",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      });
      premio_acumulado.innerHTML = totalpremio_fichas;
      conteo_turno.innerHTML = lanz;
      score_momia.innerHTML = ScoreMomia;
      audioFicha.play();
    }
  });

  btn_img_calabaza.addEventListener("click", () => {
    if (categoria.value == "" || casino.value == "") {
      Swal.fire({
        icon: "none",
        html: `
            <div class="content_swal_premio">
            <img class="img_corona_rama" src="/dinamicas/promocion-9-portales/resources/corona_rama.png" alt="promoAladdin">
            <div class="swal_premio_portal">
                <img id="swal-logo" src="/dinamicas/promocion-9-portales/resources/ojos_calabaza_prueba.png" alt="Logo premio">
                <br/>
              </div>
            <h2>Campos en Blanco.</h2>
            Por favor para poder continuar, selecciona una categoria.
            </div>
      `,
        confirmButtonColor: "#e08b0bff",
        allowOutsideClick: false,
        customClass: {
          popup: "mi-popup",
          title: "mi-titulo",
        },
      });
      return;
    }
    if (!img_calabaza_1.classList.contains("posicion_calabaza_1")) {
      if (casino.value == "A43" || casino.value == "A53") {
        ficha_img_calabaza_1.dataset.valor =
          categoria.value == "ESTANDAR"
            ? 20000
            : categoria.value == "SUPERIOR"
            ? 30000
            : categoria.value == "GENIUS"
            ? 100000
            : categoria.value == "TITANIO"
            ? 90000
            : categoria.value == "LEGENDARIO"
            ? 80000
            : categoria.value == "GOLD"
            ? 70000
            : categoria.value == "SILVER"
            ? 60000
            : categoria.value == "BRONCE"
            ? 50000
            : 0;
      } else if (casino.value == "A108") {
        ficha_img_calabaza_1.dataset.valor =
          categoria.value == "ESTANDAR"
            ? 50000
            : categoria.value == "SUPERIOR"
            ? 60000
            : categoria.value == "GENIUS"
            ? 100000
            : categoria.value == "TITANIO"
            ? 90000
            : categoria.value == "LEGENDARIO"
            ? 80000
            : categoria.value == "GOLD"
            ? 70000
            : categoria.value == "SILVER"
            ? 60000
            : categoria.value == "BRONCE"
            ? 50000
            : 0;
      } else {
        ficha_img_calabaza_1.dataset.valor =
          categoria.value == "ESTANDAR"
            ? 50000
            : categoria.value == "SUPERIOR"
            ? 60000
            : categoria.value == "GENIUS"
            ? 90000
            : categoria.value == "TITANIO"
            ? 80000
            : categoria.value == "LEGENDARIO"
            ? 70000
            : categoria.value == "GOLD"
            ? 60000
            : categoria.value == "SILVER"
            ? 50000
            : categoria.value == "BRONCE"
            ? 40000
            : 0;
      }

      img_calabaza_1.classList.add("posicion_calabaza_1");
      ScoreCalabaza -= 1;
      lanz += 1;
      let valor = parseInt(ficha_img_calabaza_1.dataset.valor);
      TotalPremio += valor;
      conteo_turno.innerHTML = lanz;
      validateTry(categoria.value, lanz, TotalPremio);
      score_calabaza.innerHTML = ScoreCalabaza;
      audioFicha.play();
    } else if (!img_calabaza_2.classList.contains("posicion_calabaza_2")) {
      if (casino.value == "A43" || casino.value == "A53") {
        ficha_img_calabaza_2.dataset.valor =
          categoria.value == "ESTANDAR"
            ? 20000
            : categoria.value == "SUPERIOR"
            ? 30000
            : categoria.value == "GENIUS"
            ? 100000
            : categoria.value == "TITANIO"
            ? 90000
            : categoria.value == "LEGENDARIO"
            ? 80000
            : categoria.value == "GOLD"
            ? 70000
            : categoria.value == "SILVER"
            ? 60000
            : categoria.value == "BRONCE"
            ? 50000
            : 0;
      } else if (casino.value == "A108") {
        ficha_img_calabaza_2.dataset.valor =
          categoria.value == "ESTANDAR"
            ? 50000
            : categoria.value == "SUPERIOR"
            ? 60000
            : categoria.value == "GENIUS"
            ? 100000
            : categoria.value == "TITANIO"
            ? 90000
            : categoria.value == "LEGENDARIO"
            ? 80000
            : categoria.value == "GOLD"
            ? 70000
            : categoria.value == "SILVER"
            ? 60000
            : categoria.value == "BRONCE"
            ? 50000
            : 0;
      }  else {
        ficha_img_calabaza_2.dataset.valor =
          categoria.value == "ESTANDAR"
            ? 50000
            : categoria.value == "SUPERIOR"
            ? 60000
            : categoria.value == "GENIUS"
            ? 90000
            : categoria.value == "TITANIO"
            ? 80000
            : categoria.value == "LEGENDARIO"
            ? 70000
            : categoria.value == "GOLD"
            ? 60000
            : categoria.value == "SILVER"
            ? 50000
            : categoria.value == "BRONCE"
            ? 40000
            : 0;
      }
      img_calabaza_2.classList.add("posicion_calabaza_2");
      ScoreCalabaza -= 1;
      lanz += 1;
      let valor = parseInt(ficha_img_calabaza_1.dataset.valor);
      TotalPremio += valor;
      conteo_turno.innerHTML = lanz;
      validateTry(categoria.value, lanz, TotalPremio);
      score_calabaza.innerHTML = ScoreCalabaza;
      audioFicha.play();
    } else if (!img_calabaza_3.classList.contains("posicion_calabaza_3")) {
      if (casino.value == "A43" || casino.value == "A53") {
        ficha_img_calabaza_3.dataset.valor =
          categoria.value == "ESTANDAR"
            ? 20000
            : categoria.value == "SUPERIOR"
            ? 30000
            : categoria.value == "GENIUS"
            ? 100000
            : categoria.value == "TITANIO"
            ? 90000
            : categoria.value == "LEGENDARIO"
            ? 80000
            : categoria.value == "GOLD"
            ? 70000
            : categoria.value == "SILVER"
            ? 60000
            : categoria.value == "BRONCE"
            ? 50000
            : 0;
      } else if (casino.value == "A108") {
        ficha_img_calabaza_3.dataset.valor =
          categoria.value == "ESTANDAR"
            ? 50000
            : categoria.value == "SUPERIOR"
            ? 60000
            : categoria.value == "GENIUS"
            ? 100000
            : categoria.value == "TITANIO"
            ? 90000
            : categoria.value == "LEGENDARIO"
            ? 80000
            : categoria.value == "GOLD"
            ? 70000
            : categoria.value == "SILVER"
            ? 60000
            : categoria.value == "BRONCE"
            ? 50000
            : 0;
      }  else {
        ficha_img_calabaza_3.dataset.valor =
          categoria.value == "ESTANDAR"
            ? 50000
            : categoria.value == "SUPERIOR"
            ? 60000
            : categoria.value == "GENIUS"
            ? 90000
            : categoria.value == "TITANIO"
            ? 80000
            : categoria.value == "LEGENDARIO"
            ? 70000
            : categoria.value == "GOLD"
            ? 60000
            : categoria.value == "SILVER"
            ? 50000
            : categoria.value == "BRONCE"
            ? 40000
            : 0;
      }
      img_calabaza_3.classList.add("posicion_calabaza_3");
      ScoreCalabaza -= 1;
      lanz += 1;
      let valor = parseInt(ficha_img_calabaza_3.dataset.valor);
      TotalPremio += valor;
      conteo_turno.innerHTML = lanz;
      validateTry(categoria.value, lanz, TotalPremio);
      score_calabaza.innerHTML = ScoreCalabaza;
      audioFicha.play();
    }
  });

  img_calabaza_1.addEventListener("click", () => {
    if (img_calabaza_1.classList.contains("posicion_calabaza_1")) {
      img_calabaza_1.classList.remove("posicion_calabaza_1");
      ScoreCalabaza += 1;
      lanz -= 1;
      TotalPremio -= ficha_img_calabaza_1.dataset.valor;
      let totalpremio_fichas = TotalPremio.toLocaleString("es-CO", {
        style: "currency",
        currency: "COP",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      });
      premio_acumulado.innerHTML = totalpremio_fichas;
      conteo_turno.innerHTML = lanz;
      score_calabaza.innerHTML = ScoreCalabaza;
      audioFicha.play();
    }
  });

  img_calabaza_2.addEventListener("click", () => {
    if (img_calabaza_2.classList.contains("posicion_calabaza_2")) {
      img_calabaza_2.classList.remove("posicion_calabaza_2");
      ScoreCalabaza += 1;
      lanz -= 1;
      TotalPremio -= ficha_img_calabaza_1.dataset.valor;
      let totalpremio_fichas = TotalPremio.toLocaleString("es-CO", {
        style: "currency",
        currency: "COP",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      });
      premio_acumulado.innerHTML = totalpremio_fichas;
      conteo_turno.innerHTML = lanz;
      score_calabaza.innerHTML = ScoreCalabaza;
      audioFicha.play();
    }
  });

  img_calabaza_3.addEventListener("click", () => {
    if (img_calabaza_3.classList.contains("posicion_calabaza_3")) {
      img_calabaza_3.classList.remove("posicion_calabaza_3");
      ScoreCalabaza += 1;
      lanz -= 1;
      TotalPremio -= ficha_img_calabaza_1.dataset.valor;
      let totalpremio_fichas = TotalPremio.toLocaleString("es-CO", {
        style: "currency",
        currency: "COP",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      });
      premio_acumulado.innerHTML = totalpremio_fichas;
      conteo_turno.innerHTML = lanz;
      score_calabaza.innerHTML = ScoreCalabaza;
      audioFicha.play();
    }
  });

  abrirOpciones.addEventListener("click", () => {
    document.getElementById("modal_opciones_misterioso").style.display = "flex";
    btn_guardar_registro.classList.add("select_menu");
    view_guardar_registro.style.display = "flex";
    view_envio_observacion.style.display = "none";
    view_envio_secundario.style.display = "none";
    view_tabla_premios.style.display = "none";
    view_registros_dia.style.display = "none";
  });

  cerrarmodaleopciones.addEventListener("click", () => {
    document.getElementById("modal_opciones_misterioso").style.display = "none";
    view_guardar_registro.style.display = "none";
    view_envio_observacion.style.display = "none";
    view_envio_secundario.style.display = "none";
    view_tabla_premios.style.display = "none";
    view_registros_dia.style.display = "none";

    btn_guardar_registro.classList.remove("select_menu");
    btn_envio_secundario.classList.remove("select_menu");
    btn_envio_observacion.classList.remove("select_menu");
    btn_tabla_premios.classList.remove("select_menu");
    btn_registros_dia.classList.remove("select_menu");
  });

  function validateTry(cate, lanzamiento, premio) {
    let premioAcumulado = premio.toLocaleString("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
    premio_acumulado.innerHTML = premioAcumulado;
    if (lanzamiento == Max_TUR) {
      btn_img_calabaza.classList.add("ficha_disable_mov");
      btn_img_esqueleto.classList.add("ficha_disable_mov");
      btn_img_momia.classList.add("ficha_disable_mov");

      img_esqueleto_1.classList.add("ficha_disable");
      img_esqueleto_2.classList.add("ficha_disable");
      img_esqueleto_3.classList.add("ficha_disable");

      img_calabaza_1.classList.add("ficha_disable");
      img_calabaza_2.classList.add("ficha_disable");
      img_calabaza_3.classList.add("ficha_disable");

      img_momia_1.classList.add("ficha_disable");
      img_momia_2.classList.add("ficha_disable");
      img_momia_3.classList.add("ficha_disable");

      fondo_board_1.style.display = "flex";
      label_acumulado.style.display = "none";

             const audio = new Audio(
        "/dinamicas/promocion-9-portales/resources/aplausos.mp3"
      );

      // reproducir
      audio.play();

      let premioFormarte = premio.toLocaleString("es-CO", {
        style: "currency",
        currency: "COP",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      });

      premio_acumulado.innerHTML = ` Ganaste ${premioFormarte} en Dinero Promocional`;

      Swal.fire({
        icon: "none",
        html: `
      <div class="content_swal_premio">
      <img class="img_corona_rama" src="/dinamicas/promocion-9-portales/resources/corona_rama.png" alt="promoAladdin">
       <div class="swal_premio_portal">
          <img id="swal-logo" src="/dinamicas/promocion-9-portales/resources/ojos_calabaza_prueba.png" alt="Logo premio">
          <br/>
        </div>
      <h2>Categoria ${cate}</h2>
       Ganaste ${premioFormarte} en Dinero Promocional
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
  }

  btn_submit.addEventListener("click", () => handleSubmit());
  function handleSubmit() {
    let casino_val = casino.value;
    let categoria_val = categoria.value;
    let nombre_val = nombre.value;
    let cedula_val = cedula.value;
    let resultValor1 = "";
    let resutlValor2 = "";
    let resultValor3 = "";
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

    for (let i = 1; i < 4; i++) {
      let imgs = document.getElementById(`img_esqueleto_${i}`);
      for (let j = 1; j < 4; j++) {
        if (imgs.classList.contains(`posicion_esqueleto_${j}`)) {
          if (resultValor1 == "") {
            resultValor1 = "Esqueleto";
          } else if (resutlValor2 == "") {
            resutlValor2 = "Esqueleto";
          } else if (resultValor3 == "") {
            resultValor3 = "Esquelto";
          }
        }
      }
    }

    for (let i = 1; i < 4; i++) {
      for (let j = 1; j < 4; j++) {
        let imgs = document.getElementById(`img_momia_${i}`);
        if (imgs.classList.contains(`posicion_momia_${j}`)) {
          if (resultValor1 == "") {
            resultValor1 = "Momia";
          } else if (resutlValor2 == "") {
            resutlValor2 = "Momia";
          } else if (resultValor3 == "") {
            resultValor3 = "Momia";
          }
        }
      }
    }

    for (let i = 1; i < 4; i++) {
      for (let j = 1; j < 4; j++) {
        let imgs = document.getElementById(`img_calabaza_${i}`);
        if (imgs.classList.contains(`posicion_calabaza_${j}`)) {
          if (resultValor1 == "") {
            resultValor1 = "Calabaza";
          } else if (resutlValor2 == "") {
            resutlValor2 = "Calabaza";
          } else if (resultValor3 == "") {
            resultValor3 = "Calabaza";
          }
        }
      }
    }

    resultGlobal1 = resultValor1;
    resultGlobal2 = resutlValor2;
    resultGlobal3 = resultValor3;

    if (
      nombre_val == "" ||
      cedula_val == "" ||
      casino_val == "" ||
      categoria_val == ""
    ) {
      Swal.fire({
        icon: "none",
        html: `
            <div class="content_swal_premio">
            <img class="img_corona_rama" src="/dinamicas/promocion-9-portales/resources/corona_rama.png" alt="promoAladdin">
            <div class="swal_premio_portal">
                <img id="swal-logo" src="/dinamicas/promocion-9-portales/resources/ojos_calabaza_prueba.png" alt="Logo premio">
                <br/>
              </div>
            <h2>Campos en Blanco.</h2>
            Por favor para poder continuar, completa toda la información.
            </div>
      `,
        confirmButtonColor: "#e08b0bff",
        allowOutsideClick: false,
        customClass: {
          popup: "mi-popup",
          title: "mi-titulo",
        },
      });
      return;
    }
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
        valor_7: "0",
        valor_8: "0",
        valor_9: "0",
        valBono: "0",
        valor_10: "0",
        valor_11: promocion,
      };
    } else {
      data = {
        tipo: "envio_1",
        valor_1: hora,
        valor_2: fecha,
        valor_3: nombre_val,
        valor_4: cedula_val,
        valor_5: casino_val,
        valor_6: categoria_val,
        valor_7: resultValor1,
        valor_8: resutlValor2,
        valor_9: resultValor3,
        valor_11: promocion,
        valBono: "",
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
        .then((result) => {
          casino.value = "";
          categoria.value = "";
          nombre.value = "";
          cedula.value = "";
          resultValor1 = "";
          resutlValor2 = "";
          resultValor3 = "";
          setTimeout(() => {
            loader.style.display = "none";
            Swal.fire({
              icon: "none",
              html: `<div class="content_swal_premio">
              <img class="img_corona_rama" src="/dinamicas/promocion-9-portales/resources/corona_rama.png" alt="promoAladdin">
              <div class="swal_premio_portal">
              <img id="swal-logo" src="/dinamicas/promocion-9-portales/resources/ojos_calabaza_prueba.png" alt="Logo premio">
              <br/>
              </div>
              <h2>Con ${categoria_val}</h2>
              La información se envio de manera correcta
              </div>`,
              confirmButtonColor: "#e08b0bff",
              allowOutsideClick: false,
              customClass: {
                popup: "mi-popup",
                title: "mi-titulo",
              },
            });
          }, 2500);
          return;
        });
    }

    setTimeout(() => {
      casino.value = "";
      categoria.value = "";
      nombre.value = "";
      cedula.value = "";
      resultValor1 = "";
      resutlValor2 = "";
      resultValor3 = "";
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
  }

  function GetResgistroDia() {
    const content_registro_dia = document.getElementById(
      "result_dia_misterioso"
    );
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
                    data-resultado1="${r.valor_7}"
                    data-resultado2="${r.valor_8}"
                    data-resultado3="${r.valor_9}"
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
      {
        casino,
        categoria,
        nombre,
        cedula,
        fecha,
        hora,
        resultado1,
        resultado2,
        resultado3,
      },
      valBono
    ) {
      const regs = getRegs();
      const idx = regs.findIndex(
        (r) =>
          String(r.valor_9).trim() === String(resultado3).trim() &&
          String(r.valor_8).trim() === String(resultado2).trim() &&
          String(r.valor_7).trim() === String(resultado1).trim() &&
          String(r.valor_6).trim() === String(categoria).trim() &&
          String(r.valor_5).trim() === String(casino).trim() &&
          String(r.valor_4).trim() === String(cedula).trim() &&
          String(r.valor_3).trim() === String(nombre).trim() &&
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
        resultado1 = "",
        resultado2 = "",
        resultado3 = "",
      } = btn.dataset;

      const data = {
        tipo: "envio_1",
        valor_1: hora,
        valor_2: fecha,
        valor_3: nombre,
        valor_4: cedula,
        valor_5: casino,
        valor_6: categoria,
        valor_7: resultGlobal1,
        valor_8: resultGlobal2,
        valor_9: resultGlobal3,
        valor_10: valBonoregistr,
        valor_11: promocion,
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
            resultado1,
            resultado2,
            resultado3,
          },
          valBonoregistr
        );

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

  btn_submit_secundario.addEventListener("click", () => handleSecondSubmit());
  function handleSecondSubmit() {
    const casino_secundario = document.getElementById("casino_secundario");
    const categoria_secundario = document.getElementById(
      "categoria-secundario"
    );
    const cedula_secundario = document.getElementById("cedula_secundario");
    const nombre_secundario = document.getElementById("nombre_secundario");
    const fecha_secundario = document.getElementById("fecha_secundario");
    const hora_secundario = document.getElementById("hora_secundario");
    const bono_secundario = document.getElementById("bono_secundario");
    const resultValor1_secundario = document.getElementById(
      "resultValor1_secundario"
    );
    const resultValor2_secundario = document.getElementById(
      "resultValor2_secundario"
    );
    const resultValor3_secundario = document.getElementById(
      "resultValor3_secundario"
    );

    const btn_clean_secundario = document.getElementById(
      "btn_clean_secundario"
    );
    const btn_submit_secundario = document.getElementById(
      "btn_submit_secundario"
    );

    const casino_secundario_val = casino_secundario.value;
    const categoria_secundario_val = categoria_secundario.value;
    const cedula_secundario_val = cedula_secundario.value;
    const nombre_secundario_val = nombre_secundario.value;
    const fecha_secundario_val = fecha_secundario.value;
    const hora_secundario_val = hora_secundario.value;
    const bono_secundario_val = bono_secundario.value;
    const resultValor1_secundario_val = resultValor1_secundario.value;
    const resultValor2_secundario_val = resultValor2_secundario.value;
    const resultValor3_secundario_val = resultValor3_secundario.value;

    if (categoria_secundario_val == "ADICIONAL") {
      if (
        casino_secundario_val == "" ||
        cedula_secundario_val == "" ||
        nombre_secundario_val == "" ||
        fecha_secundario_val == "" ||
        hora_secundario_val == ""
      ) {
        Swal.fire({
          icon: "none",
          html: `
            <div class="content_swal_premio">
            <img class="img_corona_rama" src="/dinamicas/promocion-9-portales/resources/corona_rama.png" alt="promoAladdin">
            <div class="swal_premio_portal">
                <img id="swal-logo" src="/dinamicas/promocion-9-portales/resources/ojos_calabaza_prueba.png" alt="Logo premio">
                <br/>
              </div>
            <h2>Campos en Blanco.</h2>
            Por favor para poder continuar, completa toda la información.
            </div>
      `,
          confirmButtonColor: "#e08b0bff",
          allowOutsideClick: false,
          customClass: {
            popup: "mi-popup",
            title: "mi-titulo",
          },
        });
        return;
      }
    } else {
      if (
        casino_secundario_val == "" ||
        cedula_secundario_val == "" ||
        nombre_secundario_val == "" ||
        fecha_secundario_val == "" ||
        hora_secundario_val == "" ||
        bono_secundario_val == "" ||
        resultValor1_secundario_val == "" ||
        resultValor2_secundario_val == "" ||
        resultValor3_secundario_val == ""
      ) {
        Swal.fire({
          icon: "none",
          html: `
            <div class="content_swal_premio">
            <img class="img_corona_rama" src="/dinamicas/promocion-9-portales/resources/corona_rama.png" alt="promoAladdin">
            <div class="swal_premio_portal">
                <img id="swal-logo" src="/dinamicas/promocion-9-portales/resources/ojos_calabaza_prueba.png" alt="Logo premio">
                <br/>
              </div>
            <h2>Campos en Blanco.</h2>
            Por favor para poder continuar, completa toda la información.
            </div>
      `,
          confirmButtonColor: "#e08b0bff",
          allowOutsideClick: false,
          customClass: {
            popup: "mi-popup",
            title: "mi-titulo",
          },
        });
        return;
      }
    }

    const data = {
      tipo: "envio_1",
      valor_1: hora_secundario_val,
      valor_2: fecha_secundario_val,
      valor_3: nombre_secundario_val,
      valor_4: cedula_secundario_val,
      valor_5: casino_secundario_val,
      valor_6: categoria_secundario_val,
      valor_7:
        categoria_secundario_val == "ADICIONAL"
          ? "0"
          : resultValor1_secundario_val,
      valor_8:
        categoria_secundario_val == "ADICIONAL"
          ? "0"
          : resultValor2_secundario_val,
      valor_9:
        categoria_secundario_val == "ADICIONAL"
          ? "0"
          : resultValor3_secundario_val,
      valor_10:
        categoria_secundario_val == "ADICIONAL" ? "0" : bono_secundario_val,
      valor_11: promocion,
    };

    loader.style.display = "flex";
    fetch(url, {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify(data),
    })
      .then((res) => res.text())
      .then(() => {
        hora_secundario.value = "";
        fecha_secundario.value = "";
        nombre_secundario.value = "";
        cedula_secundario.value = "";
        casino_secundario.value = "";
        categoria_secundario.value = "";
        resultValor1_secundario.value = "";
        resultValor2_secundario.value = "";
        resultValor3_secundario.value = "";
        bono_secundario.value = "";

        setTimeout(() => {
          loader.style.display = "none";
          Swal.fire({
            icon: "none",
            html: `<div class="content_swal_premio">
              <img class="img_corona_rama" src="/dinamicas/promocion-9-portales/resources/corona_rama.png" alt="promoAladdin">
              <div class="swal_premio_portal">
              <img id="swal-logo" src="/dinamicas/promocion-9-portales/resources/ojos_calabaza_prueba.png" alt="Logo premio">
              <br/>
              </div>
              <h2>Envio Exitoso</h2>
              La información se envio de manera correcta
              </div>`,
            confirmButtonColor: "#e08b0bff",
            allowOutsideClick: false,
            customClass: {
              popup: "mi-popup",
              title: "mi-titulo",
            },
          });
        }, 3000);
      });
  }

  btn_envia_observacion.addEventListener("click", () =>
    handleObservacionSubmit()
  );
  function handleObservacionSubmit() {
    const casino_observacion = document.getElementById("casino_observacion");
    const descripcion_observacion = document.getElementById(
      "descripcion_observacion"
    );

    const casino_observacion_val = casino_observacion.value;
    const descripcion_observacion_val = descripcion_observacion.value;

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
        icon: "none",
        html: `
            <div class="content_swal_premio">
            <img class="img_corona_rama" src="/dinamicas/promocion-9-portales/resources/corona_rama.png" alt="promoAladdin">
            <div class="swal_premio_portal">
                <img id="swal-logo" src="/dinamicas/promocion-9-portales/resources/ojos_calabaza_prueba.png" alt="Logo premio">
                <br/>
              </div>
            <h2>Campos en Blanco.</h2>
            Por favor para poder continuar, completa toda la información.
            </div>
      `,
        confirmButtonColor: "#e08b0bff",
        allowOutsideClick: false,
        customClass: {
          popup: "mi-popup",
          title: "mi-titulo",
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

    loader.style.display = "flex";

    fetch(url, {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify(data),
    })
      .then((res) => res.text())
      .then(() => {
        casino_observacion.value = "";
        descripcion_observacion.value = "";
        setTimeout(() => {
          loader.style.display = "none";
          Swal.fire({
            icon: "none",
            html: `<div class="content_swal_premio">
              <img class="img_corona_rama" src="/dinamicas/promocion-9-portales/resources/corona_rama.png" alt="promoAladdin">
              <div class="swal_premio_portal">
              <img id="swal-logo" src="/dinamicas/promocion-9-portales/resources/ojos_calabaza_prueba.png" alt="Logo premio">
              <br/>
              </div>
              <h2>Envio Exitoso</h2>
              La información se envio de manera correcta
              </div>`,
            confirmButtonColor: "#e08b0bff",
            allowOutsideClick: false,
            customClass: {
              popup: "mi-popup",
              title: "mi-titulo",
            },
          });
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  btn_reset_misterioso.addEventListener("click", () => {
    Swal.fire({
      icon: "none",
      title: "Seguro?",
      html: `
        <div>
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
    })
      .then((result) => {
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
            }
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });

  btn_reset_tablero_misterioso.addEventListener("click", () => {
    lanz = 0;
    Max_TUR = 3;

    ScoreEsquelto = 6;
    ScoreMomia = 3;
    ScoreCalabaza = 3;

    TotalPremio = 0;

    conteo_turno.innerHTML = lanz;
    fondo_board_1.style.display = "none";
    label_acumulado.style.display = "flex";
    premio_acumulado.innerHTML = " $ 0";

    btn_img_calabaza.classList.remove("ficha_disable_mov");
    btn_img_esqueleto.classList.remove("ficha_disable_mov");
    btn_img_momia.classList.remove("ficha_disable_mov");

    img_esqueleto_1.classList.remove("ficha_disable");
    img_esqueleto_2.classList.remove("ficha_disable");
    img_esqueleto_3.classList.remove("ficha_disable");

    img_calabaza_1.classList.remove("ficha_disable");
    img_calabaza_2.classList.remove("ficha_disable");
    img_calabaza_3.classList.add("ficha_disable");

    img_momia_1.classList.remove("ficha_disable");
    img_momia_2.classList.remove("ficha_disable");
    img_momia_3.classList.remove("ficha_disable");

    score_esqueleto.innerHTML = ScoreEsquelto;
    score_momia.innerHTML = ScoreMomia;
    score_calabaza.innerHTML = ScoreCalabaza;

    img_esqueleto_1.classList.remove("posicion_esqueleto_1");
    img_esqueleto_2.classList.remove("posicion_esqueleto_2");
    img_esqueleto_3.classList.remove("posicion_esqueleto_3");

    img_momia_1.classList.remove("posicion_momia_1");
    img_momia_2.classList.remove("posicion_momia_2");
    img_momia_3.classList.remove("posicion_momia_3");

    img_calabaza_1.classList.remove("posicion_calabaza_1");
    img_calabaza_2.classList.remove("posicion_calabaza_2");
    img_calabaza_3.classList.remove("posicion_calabaza_3");
  });
});

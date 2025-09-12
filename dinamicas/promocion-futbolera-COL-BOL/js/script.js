window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  loader.style.display = "none";
});

document.addEventListener("DOMContentLoaded", () => {
  const View_guardar_participante = document.getElementById(
    "content_datos_participantes"
  );
  const View_consultar_participante = document.getElementById(
    "content_consulta_particiante"
  );
  const View_todos_participante = document.getElementById(
    "content_consulta_particiante_all"
  );
  const View_envia_observacion = document.getElementById(
    "content_form_observacion"
  );

  const btn_guardar_participante = document.getElementById("btn_guardar");
  const btn_consultar_participante = document.getElementById(
    "btn_consultar_participante"
  );
  const btn_all_participante = document.getElementById("btn_all_participante");
  const btn_observacion = document.getElementById("btn_observacion");

  View_guardar_participante.style.display = "flex";
  View_consultar_participante.style.display = "none";
  View_todos_participante.style.display = "none";
  View_envia_observacion.style.display = "none";

  btn_guardar_participante.addEventListener("click", () => {
    View_guardar_participante.style.display = "flex";
    View_consultar_participante.style.display = "none";
    View_todos_participante.style.display = "none";
    View_envia_observacion.style.display = "none";
  });

  btn_consultar_participante.addEventListener("click", () => {
    View_guardar_participante.style.display = "none";
    View_consultar_participante.style.display = "flex";
    View_todos_participante.style.display = "none";
    View_envia_observacion.style.display = "none";
  });

  btn_all_participante.addEventListener("click", () => {
    tableAllParticipantes();
    View_guardar_participante.style.display = "none";
    View_consultar_participante.style.display = "none";
    View_todos_participante.style.display = "flex";
    View_envia_observacion.style.display = "none";
  });

  btn_observacion.addEventListener("click", () => {
    View_guardar_participante.style.display = "none";
    View_consultar_participante.style.display = "none";
    View_todos_participante.style.display = "none";
    View_envia_observacion.style.display = "flex";
  });
});

let _scrollY = 0;
function lockBodyScroll() {
  _scrollY = window.scrollY || document.documentElement.scrollTop;
  document.body.style.top = `-${_scrollY}px`;
  document.body.classList.add("body-lock-game");
}
function unlockBodyScroll() {
  document.body.classList.remove("body-lock-game");
  document.body.style.top = "";
  window.scrollTo(0, _scrollY);
}

const url =
  "https://script.google.com/macros/s/AKfycbyw33Bo3WLlJvUD2CIJOn2rdCCtliayTQ23if6ZE8eveWyLkE_wNCUv3sBnyTXLxqXX/exec";
const resultado_equipo_1 = document.getElementById("resultado_equipo_1");
const resultado_equipo_2 = document.getElementById("resultado_equipo_2");
const resultado_equipo_view_1 = document.getElementById(
  "resultado_equipo_view_1"
);
const resultado_equipo_view_2 = document.getElementById(
  "resultado_equipo_view_2"
);

function handleSaveMarcador() {
  if (resultado_equipo_1.value == "" || resultado_equipo_2.value == "") {
    Swal.fire({
      icon: "error",
      title: `Error en el marcador!.`,
      html: `Debes digitar el marcador de cada equipo.`,
      customClass: {
        popup: "mi-popup",
        title: "mi-titulo",
        confirmButton: "btn btn-danger",
      },
    });
    return;
  }

  resultado_equipo_1.style.display = "none";
  resultado_equipo_2.style.display = "none";

  resultado_equipo_view_1.innerHTML = resultado_equipo_1.value;
  resultado_equipo_view_2.innerHTML = resultado_equipo_2.value;

  const resultado_equipo_1_val = resultado_equipo_1.value;
  const resultado_equipo_2_val = resultado_equipo_2.value;

  const data = {
    resultado_equipo_1_val,
    resultado_equipo_2_val,
  };

  console.log(data, "data");
}

function abrirSaveParticipante() {
  document.getElementById("guardar_participante").style.display = "flex";
  lockBodyScroll();
}

function cerrarSaveParticipante() {
  document.getElementById("guardar_participante").style.display = "none";
  document.getElementById("content_datos_participantes").style.display = "flex";
  document.getElementById("content_consulta_particiante").style.display =
    "none";
  document.getElementById("content_consulta_particiante_all").style.display =
    "none";
  document.getElementById("content_form_observacion").style.display = "none";
  unlockBodyScroll();
}

function handleSaveParticipante() {
  const casino = document.getElementById("casino");
  const casinoVal = casino.value;
  const categoria = document.getElementById("categoria");
  const categoriaVal = categoria.value;
  const nombre = document.getElementById("nombre");
  const nombreVal = nombre.value;
  const cedula = document.getElementById("cedula");
  const cedulaVal = cedula.value;
  const resultado_local = document.getElementById("resultado_local");
  const resultado_local_val = resultado_local.value;
  const resultado_visitante = document.getElementById("resultado_visitante");
  const resultado_visitante_val = resultado_visitante.value;
  const loader = document.getElementById("loader");
  const promocion = "Marca Gol";
  const resultadoJugador =
    resultado_local_val + " - " + resultado_visitante_val;

  if (
    casinoVal == "" ||
    categoriaVal == "" ||
    nombreVal == "" ||
    cedulaVal == "" ||
    resultado_local_val == "" ||
    resultado_visitante_val == ""
  ) {
    Swal.fire({
      icon: "warning",
      title: "Campos en blanco",
      html: "Debe digitar toda la información",
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

  const data = {
    tipo: "envio_1",
    valor_1: hora,
    valor_2: fecha,
    valor_3: casinoVal,
    valor_4: categoriaVal,
    valor_5: nombreVal,
    valor_6: cedulaVal,
    valor_7: promocion,
    valor_8: " - ",
    valor_9: resultadoJugador,
    valor_10: "",
    valor_11: "",
    valor_12: "",
    valor_13: "",
    valor_14: "",
    valor_15: "",
  };
  loader.style.display = "flex";

  fetch(url, {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify(data),
  })
    .then((response) => {
      setTimeout(() => {
        casino.value = "";
        categoria.value = "";
        nombre.value = "";
        cedula.value = "";
        resultado_local.value = "";
        resultado_visitante.value = "";
        getAllPaticipantes();
      }, 2000);
      setTimeout(() => {
        loader.style.display = "none";
        Swal.fire({
          icon: "success",
          title: `Exito!.`,
          html: `El envio de la información fue exitoso.`,
          customClass: {
            popup: "mi-popup",
            title: "mi-titulo",
            confirmButton: "btn btn-danger",
          },
        });
      }, 4000);
    })
    .catch((error) => {
      console.warn(error.textContent);
      Swal.fire({
        icon: "error",
        title: `Error en el envió!.`,
        html: `Ha ocurrido un error inesperado, por favor reportar error.`,
        customClass: {
          popup: "mi-popup",
          title: "mi-titulo",
          confirmButton: "btn btn-danger",
        },
      });
    });
}

getResultadoPartido();

function getCasino() {
  const casinoSel = document.getElementById("casino_marca_gol");
  const contenedor = document.getElementById(
    "content_participantes_card_casino"
  );
  const loader = document.getElementById("loader");
  if (!contenedor) {
    console.error("No existe el contenedor #content_participantes_card_casino");
    return;
  }
  const casino = (casinoSel?.value || "").trim();
  if (!casino) {
    contenedor.innerHTML = `<p>Selecciona un casino.</p>`;
    return;
  }

  loader.style.display = "flex";
  getResultadoPartido().then((resultadoPartido) => {
    console.log(resultadoPartido, "resultado");

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (!Array.isArray(data)) {
          console.error("La respuesta no es un array:", data);
          contenedor.innerHTML = `<p>Ocurrió un problema con los datos.</p>`;
          loader.style.display = "none";
          return;
        }

        const filtrados = data.filter(
          (r) => String(r.Casino).trim() === casino
        );

        if (filtrados.length === 0) {
          contenedor.innerHTML = `<p>No hay participantes para este casino.</p>`;
          loader.style.display = "none";
          return;
        }

        contenedor.innerHTML = filtrados
          .map((r, i) => {
            // Estado por registro
            const rf = (
              typeof resultadoPartido === "string" ? resultadoPartido : ""
            ).trim();
            let estadoHTML = `<t style="font-size:.7rem">Pendiente resultado.</t>`;
            if (rf && rf !== "-" && rf !== "Sin Resultado") {
              estadoHTML =
                String(r.Resultado_jugador).trim() === rf
                  ? `<t class="resultado_acertado">Acertado</t>, Ganaste un premio de $100.000`
                  : `<t class="resultado_no_acertado">No Acertado</t>, Ganaste un premio de $50.000`;
            }

            // Fechas y horas seguras
            const fHora = new Date(r.Hora_FF);
            const fDia = new Date(r.Fecha);
            const hora = isNaN(fHora)
              ? ""
              : fHora.toLocaleTimeString("es-CO", {
                  timeZone: "America/Bogota",
                  hour: "2-digit",
                  minute: "2-digit",
                });

            const fecha_larga = isNaN(fDia)
              ? ""
              : fDia.toLocaleDateString("es-CO", {
                  timeZone: "America/Bogota",
                  day: "2-digit",
                  month: "long",
                  year: "2-digit",
                });
            loader.style.display = "none";
            return `
            <div class="content_card">
              <h5>Datos del Participante</h5>
              <h4><span>Nombre</span> : ${r.Nombre ?? "-"}</h4>
              <p><span>Resultado</span> : ${r.Resultado_jugador ?? "-"}</p>
              <p><span>Categoria</span> : ${r.Categoria ?? "-"}</p>
              <p style="position:relative;"><span>Estado</span> : ${estadoHTML}</p>
              ${
                fecha_larga
                  ? `<span class="content_date_card">${fecha_larga}</span>`
                  : ""
              }
              ${hora ? `<small>${hora}</small>` : ""}
              <p><span>Casino</span> : ${casinoSel.value}</p>
            </div>
          `;
          })
          .join("");
      })
      .catch((err) => {
        console.error("Error en fetch:", err);
        contenedor.innerHTML = `<p>Ocurrió un error al cargar los participantes.</p>`;
        loader.style.display = "none";
      });
  });
}

function getAllPaticipantes() {
  // Usarlo en otro método

  const container = document.getElementById("content_participantes_card");
  const resultado_partido_final = document.getElementById(
    "resultado_partido_final"
  );

  const lastParticipante = document.getElementById(
    "content_last_participante_card"
  );

  container.innerHTML = ` 
    <div class="loader-local">
      <div class="spinner"></div>
      <p>Cargando Participantes...</p>
    </div>`;

  lastParticipante.innerHTML = ` 
    <div class="loader-local-last">
      <div class="spinner-last"></div>
      <p>Cargando Último Participante...</p>
    </div>`;

  resultado_partido_final.innerHTML = ` 
    <div class="loader-local-resultado-final">
      <div class="spinner-last"></div>
      <p>Cargando Resultado del Partido...</p>
    </div>`;

  getResultadoPartido().then((resultadoPartido) => {
    console.log("Resultado recibido:", resultadoPartido);
    resultado_partido_final.innerHTML = `${
      resultadoPartido == ""
        ? " <p>Sin Resultado...</p>"
        : `<div>Resultado<p>${resultadoPartido}</p></div>`
    }`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (!Array.isArray(data) || data.length === 0) {
          container.innerHTML = `No hay Participantes...`;
          lastParticipante.innerHTML = ` 
                <div class="loader-local-last">
                  <p>No Hay Participante...</p>
                </div>`;
          return;
        }

        // if (
        //   data[0].Resultado_local == "" &&
        //   data[0].Resultado_Visitante == ""
        // ) {
        //   resultado_partido_final.innerHTML = `
        //     <div class="loader-local-resultado-final">
        //       <p>Sin resultado</p>
        //     </div>`;
        // }

        // participantes
        const resultadoLocal = data[0].Resultado_local;
        const resultadoVisitante = data[0].Resultado_Visitante;

        const resultadoFijo = resultadoPartido;

        container.innerHTML = `
  ${[...data]
    .reverse()
    .slice(0, 6)
    .map((registro) => {
      const fecha = new Date(registro.Hora_FF);
      const fecha_dia = new Date(registro.Fecha);
      const hora = fecha.toLocaleTimeString("es-CO", {
        timeZone: "America/Bogota",
        hour: "2-digit",
        minute: "2-digit",
      });

      const fecha_larga = fecha_dia.toLocaleDateString("es-CO", {
        timeZone: "America/Bogota",
        day: "2-digit",
        month: "long",
        year: "2-digit",
      });

      let estado = "";

      // 👇 comparación
      if (
        resultadoFijo == " - " ||
        resultadoFijo == "Sin Resultado" ||
        resultadoFijo == ""
      ) {
        estado = `<t style="font-size: .7rem">Pendiente resultado.</t>`;
      } else {
        estado =
          registro.Resultado_jugador === resultadoFijo
            ? `<t class="resultado_acertado">Acertado</t>, Ganaste un premio de $100.000`
            : `<t class="resultado_no_acertado">No Acertado</t>, Ganaste un premio de $50.000`;
      }

      return `
        <div class="content_card">
          <h5>Datos del Participante</h5>
          <h4><span>Nombre</span> : ${registro.Nombre}</h4>
          <p><span>Resultado</span> : ${registro.Resultado_jugador}</p>
          <p><span>Categoria</span> : ${registro.Categoria}</p>
          <t style="position: relative;"><span>Estado</span> : ${estado}</t>
          <span class="content_date_card">${fecha_larga}</span>
          <small>${hora}</small>
        </div>
      `;
    })
    .join("")}
`;

        // último participante
        lastParticipante.innerHTML = `
        ${[...data]
          .reverse()
          .slice(0, 1)
          .map(
            (registro) => `
              <div class="content_card_last_participante">
                <h6>Último Participante</h6>
                <p>Nombre : ${registro.Nombre} 
                  <img class="img_last_participante" src="/resource/icono2.png">
                </p>
              </div>
            `
          )
          .join("")}
      `;

        resultado_partido_final.innerHTML = `
        ${[...data]
          .reverse()
          .slice(0, 1)
          .map(
            (registro) => `
                <h5>Resultado Final</h5>
                <p>${
                  resultadoFijo == "" ? "Sin Resultado aun" : resultadoFijo
                } </p>
            `
          )
          .join("")}
      `;
      })
      .catch((error) => {
        console.warn("Error al cargar los datos:", error);
        container.innerHTML = `<p>Error al cargar los datos.</p>`;
        lastParticipante.innerHTML = `<p>Error al cargar el último participante.</p>`;
      });
  });
}

getAllPaticipantes();

function GetParticipante() {
  const cedula_par = document.getElementById("cedula_par");
  const cedula_par_val = cedula_par.value;
  const contenedor = document.getElementById("content_result_participante");
  const loader = document.getElementById("loader");

  loader.style.display = "flex";
  getResultadoPartido().then((resultadoPartido) => {
    console.log("Resultado recibido:", resultadoPartido);
    fetch(`${url}?cedula=${cedula_par_val}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          let allData = data[0];
          contenedor.innerHTML = `<p>Nombre: ${allData.Nombre}</p>
        <p>Categoria: ${allData.Categoria}</p>
        <p>Resultado: ${
          allData.Resultado_jugador == resultadoPartido
            ? `<spam class="resultado_acertado">${allData.Resultado_jugador}, Resultado Correcto</spam>`
            : `<spam class="resultado_no_acertado">${allData.Resultado_jugador}, Resultado No Ganador.</spam>`
        }</p>`;
        } else {
          console.log("No se encontro coincidencias.");
        }
        loader.style.display = "none";
      });
  });
}

function getResultadoPartido() {
  const urlResultado =
    "https://script.google.com/macros/s/AKfycbwL1c-BPUpSSeF43CfWIVcpUA-URo9RrFh8H5fKIFoKEdveO2vcvDJq59xgxTiGt-d8cg/exec";

  return fetch(urlResultado)
    .then((response) => response.json())
    .then((data) => {
      if (data.length > 0) {
        const resultadoTest =
          data[0].Resultado_local + " - " + data[0].Resultado_Visitante;
        return resultadoTest;
      }
      return "";
    });
}

function refrescarScore() {
  const resultado_partido_final = document.getElementById(
    "resultado_partido_final"
  );
  resultado_partido_final.innerHTML = ` 
    <div class="loader-local-resultado-final">
      <div class="spinner-last"></div>
      <p>Cargando Resultado del Partido...</p>
    </div>`;
  getResultadoPartido().then((resultadoPartido) => {
    console.log(resultadoPartido, "resultado");
    if (resultadoPartido == "") {
      console.log("entro a resultado en blanco");
    } else {
      getAllPaticipantes();
    }
    resultado_partido_final.innerHTML = `${
      resultadoPartido == ""
        ? " <p>Sin Resultado...</p>"
        : `<div>Resultado<p>${resultadoPartido}</p></div>`
    }`;
  });
}

function tableAllParticipantes() {
  const contenedor = document.getElementById("content_result_participante_all");
  const miniloader = document.getElementById("mini-spinner");
  console.log("entro a tableAllParticipantes");
  contenedor.innerHTML = ``;

  miniloader.style.display = "flex";
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (!Array.isArray(data) || data.length === 0) {
        contenedor.innerHTML = `<p>No hay datos disponibles.</p>`;
        miniloader.style.display = "none";

        return;
      }
      miniloader.style.display = "none";

      contenedor.innerHTML = `
          <div class="table-result table-scrolld">
            <table class="styled-table">
              <thead>
                <tr>
                  <th># Registro</th>
                  <th>Nombre</th>
                  <th>Fecha</th>
                  <th>Cedula</th>
                  <th>Casino</th>
                </tr>
              </thead>
              <tbody>
                ${data
                  .map(
                    (registro, i) =>
                      `
                      <tr>
                        <td>${i + 1}</td>
                        <td>${registro.Nombre}</td>
                        <td>${formatFecha(registro.Fecha)}</td>
                        <td>${registro.Cedula}</td>
                        <td>${registro.Casino}</td>
                      </tr>
                    `
                  )
                  .join("")}
              </tbody>
            </table>
          </div>
        `;
    });
}

function formatFecha(valor) {
  // Si ya es Date, usar directamente
  let fecha = new Date(valor);

  // Ojo: si viene vacío o inválido
  if (isNaN(fecha)) return valor;

  // Devuelve en formato dd/mm/aaaa
  return fecha.toLocaleDateString("es-CO", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "America/Bogota",
  });
}

function HandleObservacion() {
  const casinoMG = document.getElementById("casino_marca_gol_observacion");
  const casinoMg_val = casinoMG.value;
  const observacion = document.getElementById("marca_gol_observacion");
  const observacion_val = observacion.value;
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

  if (casinoMg_val == "" || observacion_val == "") {
    Swal.fire({
      icon: "warning",
      title: "Campos Vacios!",
      html: "Debes completar el formulario primero.",
    });
    return;
  }

  const data = {
    tipo: "envio_2",
    valor_1: hora,
    valor_2: fecha,
    valor_3: casinoMg_val,
    valor_4: observacion_val,
    valor_5: "",
    valor_6: "",
    valor_7: "",
    valor_8: "",
    valor_9: "",
    valor_10: "",
    valor_11: "",
    valor_12: "",
    valor_13: "",
    valor_14: "",
    valor_15: "",
  };

  console.log(data, "data");

  loader.style.display = "flex";
  fetch(url, {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify(data),
  })
    .then((res) => res.text())
    .then(() => {
      casinoMG.value = "";
      observacion.value = "";
      setTimeout(() => {
        loader.style.display = "none";
      }, 3000);
    })
    .catch((error) => {
      console.log(error.response);
    });
}

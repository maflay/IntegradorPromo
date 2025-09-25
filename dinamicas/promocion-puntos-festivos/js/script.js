window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  loader.style.display = "none";
});

const url =
  "https://script.google.com/macros/s/AKfycbz7DP98nE5srMdTpTeexLFZ8LFtJB8orSs7cFG_dtzGYLSDl42HkkkJQGLhuG7P56Dt/exec";

function mostrarLoader(container, mensaje) {
  container.innerHTML = `
    <div class="loader-local">
      <div class="spinner2"></div>
      <p>${mensaje}</p>
    </div>
  `;
}

function handleSendInfo() {
  const cedula = document.getElementById("cedula");
  const nombre = document.getElementById("nombre");
  const casino = document.getElementById("casino");
  const loader = document.getElementById("loader");
  const bono = document.getElementById("bono");

  const urlBase = url;

  const cedulaVal = cedula.value.trim();
  const nombreVal = nombre.value.trim();
  const casinoVal = casino.value.trim();
  const bonoVal = bono.value.trim();

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

  if (!cedulaVal || !nombreVal || !casinoVal) {
    Swal.fire({
      icon: "warning",
      title: `Campos vacíos.`,
      text: `Por favor, completa toda la información`,
      confirmButtonColor: "#a13b22",
    });
    return;
  }

  loader.style.display = "flex";
  fetch(`${urlBase}?cedula=${cedulaVal}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.length > 0) {
        loader.style.display = "none";
        Swal.fire({
          icon: "info",
          title: "Registro existente",
          text: `Ya existe un registro con esta cédula.`,
          confirmButtonColor: "#a13b22",
        });
      } else {
        const dataToSend = {
          tipo: "registro",
          nombre: nombreVal,
          edad: fecha,
          cedula: cedulaVal,
          correo: casinoVal,
          bono: bonoVal,
        };
        fetch(urlBase, {
          method: "POST",
          mode: "no-cors",
          body: JSON.stringify(dataToSend),
        })
          .then(() => {
            nombre.value = "";
            casino.value = "";
            cedula.value = "";
            bono.value ="";
            getData();
            setTimeout(() => {
              loader.style.display = "none";
              Swal.fire({
                icon: "success",
                title: `Envío exitoso.`,
                text: `La información fue registrada correctamente.`,
              });
            }, 2000);
          })
          .catch((error) => {
            console.warn(error);
            loader.style.display = "none";
            Swal.fire({
              icon: "error",
              title: `Error en el envío.`,
              text: `Ocurrió un error. Por favor intenta más tarde.`,
            });
          });
      }
    })
    .catch((err) => {
      console.error("Error al consultar la cédula:", err);
      loader.style.display = "none";
      Swal.fire({
        icon: "error",
        title: `Error en la verificación.`,
        text: `No se pudo verificar si el registro existe.`,
      });
    });
}

function cleanTable() {
  const resultCliente = document.getElementById("content-result-cliente");
  resultCliente.innerHTML = "";
  document.getElementById("cedulaGet").value = "";
}

function getCliente() {
  const cedula = document.getElementById("cedulaGet").value;
  const loader = document.getElementById("loader");
  const resultCliente = document.getElementById("content-result-cliente");

  loader.style.display = "flex";
  fetch(`${url}?cedula=${cedula}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.length > 0) {
        resultCliente.innerHTML = `
          <div class="table-result table-scrolld">
            <table class="styled-table">
              <thead>
                <tr>
                  <th># Registro</th>
                  <th>Nombre</th>
                  <th>Fecha</th>
                  <th>Bono</th>
                  <th>Cedula</th>
                  <th>Casino</th>
                </tr>
              </thead>
              <tbody>
                ${data
                  .map(
                    (registro, i) => `
                      <tr>
                        <td>${i + 1}</td>
                        <td>${registro.Nombre}</td>
                        <td>${registro.Fecha}</td>
                        <td>${registro.Bono}</td>
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
      } else {
        console.log("No se encontró ninguna coincidencia.");
        Swal.fire({
          icon: "error",
          title: `Error en la verificación.`,
          text: `No se encontró ninguna coincidencia.`,
        });
      }
      loader.style.display = "none";
    })
    .catch((err) => {
      loader.style.display = "none";
      console.error("Error al consultar la cédula:", err);
    });
}

function getData() {
  const container = document.getElementById("content-all-result");
  mostrarLoader(container, "Cargando lista de jugadores...");

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (!Array.isArray(data) || data.length === 0) {
        container.innerHTML = `<p>No hay datos disponibles.</p>`;
        return;
      }

      container.innerHTML = `
        <div class="table-result table-scrolld">
          <table class="styled-table">
            <thead>
              <tr>
                <th># Registro</th>
                <th>Nombre</th>
                <th>Fecha</th>
                <th>Bono</th>
                <th>Cédula</th>
                <th>Casino</th>
              </tr>
            </thead>
            <tbody>
            ${[...data]
              .reverse()
              .map(
                (registro, i) =>
                  `<tr>
                    <td>${i + 1}</td>
                    <td>${registro.Nombre}</td>
                    <td>${registro.Fecha}</td>
                    <td>${registro.Bono}</td>
                    <td>${registro.Cedula || ""}</td>
                    <td>${registro.Casino || ""}</td>
                  </tr>
                `
              )
              .join("")}
            </tbody>
          </table>
        </div>
      `;
    })
    .catch((error) => {
      console.warn("Error al cargar los datos:", error);
      container.innerHTML = `<p>Error al cargar los datos.</p>`;
    });
}

getData();

function abrirModal() {
  document.getElementById("datos-modal-observacion").style.display = "flex";
}

function cerraModal() {
  document.getElementById("datos-modal-observacion").style.display = "none";
}

function handleObservacionSubmit() {
  const casino = document.getElementById("casino-modal-observacion");
  const observacion = document.getElementById("casino-modal-descripcion");
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
  loader.style.display = "flex";
  const [fecha, hora] = fechaCompleta.split(", ");

  const data = {
    tipo: "observacion",
    hora: hora,
    fecha: fecha,
    casino: casino.value,
    observacion: observacion.value,
  };

  fetch(url, {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify(data),
  })
    .then((response) => response.text())
    .then(() => {
      casino.value = "";
      observacion.value = "";
      setTimeout(() => {
        loader.style.display = "none";
        Swal.fire({
          icon: "success",
          title: `Envio Exitoso.`,
          text: `Observación enviada de manera correcta.`,
        });
      }, 2000);
    })
    .catch((error) => {
      console.log(error);
      loader.style.display = "none";
      Swal.fire({
        icon: "error",
        title: `Error.`,
        text: `Ha ocurrido un error.`,
      });
    });
}

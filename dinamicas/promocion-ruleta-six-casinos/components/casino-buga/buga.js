window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  loader.style.display = "none";
});

window.addEventListener("DOMContentLoaded", () => {
  const cedula_buga = document.getElementById("cedula_buga");
  const nombre_buga = document.getElementById("nombre_buga");
  const casino_buga = document.getElementById("casino_buga");
  const casino_modal_buga = document.getElementById("casino_modal_buga");
  const casino_modal_descripcion_buga = document.getElementById(
    "casino_modal_descripcion_buga"
  );
  const url =
    "https://script.google.com/macros/s/AKfycbwufNPc1KcHw1lTQEiC7TaV_Qya5VrendtTsrvTnNsfp6zMNYYEcsH9Hvw5hV3lM8MXFg/exec";
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
  const loader = document.getElementById("loader");
  const btn_submit_casino = document.getElementById("btn_submit_casino");
  const btnObservacionSubmit = document.getElementById("btnObservacionSubmit");
  const btn_consultat_finalista_casino = document.getElementById(
    "btn_consultat_finalista_casino"
  );
  const btn_clean_finalista_casino = document.getElementById(
    "btn_clean_finalista_casino"
  );
  const cedulaGet_buga = document.getElementById("cedulaGet_buga");

  btn_submit_casino.addEventListener("click", () => {
    const cedula_buga_val = cedula_buga.value;
    const nombre_buga_val = nombre_buga.value;
    const casino_buga_val = casino_buga.value;

    if (cedula_buga_val == "" || nombre_buga_val == "") {
      Swal.fire({
        icon: "warning",
        title: "Campos en blanco!",
        html: `Debes completar todos los campos antes de enviar.`,
      });
      return;
    }

    let fecha_all = hora + " - " + fecha;

    const data = {
      tipo: "registro",
      nombre: nombre_buga_val,
      edad: fecha_all,
      cedula: cedula_buga_val,
      correo: casino_buga_val,
      bono: "",
    };

    loader.style.display = "flex";

    fetch(`${url}?cedula=${cedula_buga_val}`)
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
            nombre: nombre_buga_val,
            edad: hora + " - " + fecha,
            cedula: cedula_buga_val,
            correo: casino_buga_val,
          };

          fetch(url, {
            method: "POST",
            mode: "no-cors",
            body: JSON.stringify(dataToSend),
          })
            .then(() => {
              nombre_buga.value = "";
              cedula_buga.value = "";
              getAllClientes();
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
  });

  btn_consultat_finalista_casino.addEventListener("click", () => {
    const cedulaGet_buga_val = cedulaGet_buga.value;

    if (cedulaGet_buga_val == "") {
      Swal.fire({
        icon: "warning",
        title: "Campos en blanco.",
        html: `Por favor digita el número de documento para poder consultar.`,
      });
      return;
    }

    loader.style.display = "flex";
    setTimeout(() => {
      loader.style.display = "none";
    }, 5000);
  });

  btn_clean_finalista_casino.addEventListener("click", () => {
    cedulaGet_buga.value = "";
  });

  document.getElementById("abrirmodal_casino").addEventListener("click", () => {
    document.getElementById("datos-modal-observacion").style.display = "flex";
  });

  document
    .getElementById("cerrarmodal_casino")
    .addEventListener("click", () => {
      document.getElementById("datos-modal-observacion").style.display = "none";
    });

  btnObservacionSubmit.addEventListener("click", () => {
    const casino_modal_buga_val = casino_modal_buga.value;
    const casino_modal_descripcion_buga_val =
      casino_modal_descripcion_buga.value;

    if (
      casino_modal_buga_val == "" ||
      casino_modal_descripcion_buga_val == ""
    ) {
      Swal.fire({
        icon: "warning",
        title: "Campos en blanco",
        html: `Completa la información antes de enviar.`,
      });
      return;
    }

    const data = {
      tipo: "observacion",
      hora: hora,
      fecha: fecha,
      casino: casino_modal_buga_val,
      observacion: casino_modal_descripcion_buga_val,
    };

    loader.style.display = "flex";
    fetch(url, {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify(data),
    })
      .then((response) => response.text())
      .then(() => {
        casino_modal_descripcion_buga.value = "";
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
  });

  function getAllClientes() {
    const miniloader = document.getElementById("mini-spinner");
    miniloader.style.display = "flex";
    const container = document.getElementById("content-all-result-finalista");
    container.innerHTML = ``;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (!Array.isArray(data) || data.length === 0) {
          container.innerHTML = `<p>No hay datos disponibles.</p>`;
          miniloader.style.display = "none";

          return;
        }
        container.innerHTML = `
        <div class="table-result-buga table-scrolld-buga">
          <table class="styled-table-buga">
            <thead>
              <tr>
                <th># Registro</th>
                <th>Nombre</th>
                <th>Fecha</th>
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
        miniloader.style.display = "none";
      });
  }

  getAllClientes();

  document
    .getElementById("btn_consultat_finalista_casino")
    .addEventListener("click", () => getCliente());
  function getCliente() {
    const cedula = document.getElementById("cedulaGet_buga").value;
    const loader = document.getElementById("loader");
    const resultCliente = document.getElementById("content-result-cliente");

    loader.style.display = "flex";
    fetch(`${url}?cedula=${cedula}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          resultCliente.innerHTML = `
        <div class="table-result-buga table-scrolld-buga">
          <table class="styled-table-buga">
            <thead>
              <tr>
                <th># Registro</th>
                <th>Nombre</th>
                <th>Fecha</th>
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
        } else {
          console.log("No se encontró ninguna coincidencia.");
          Swal.fire({
            icon: "warning",
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
});

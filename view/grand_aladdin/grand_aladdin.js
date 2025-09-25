function getDataFinalista() {
  const container = document.getElementById(
    "content_all_result_finalista_cali"
  );
  const urlBase_finalistas =
    "https://script.google.com/macros/s/AKfycbw1sOxdcBKMFcJdAyRaxe8EeOi76KOizQuOrjEkVN6gEHo7l6H00s9yuMhIGTYIR-Yw/exec";
  const loader_final = document.getElementById("loader_final_grand");
  fetch(urlBase_finalistas)
    .then((response) => response.json())
    .then((data) => {
      if (!Array.isArray(data) || data.length === 0) {
        container.innerHTML = `<p>No hay datos disponibles.</p>`;
        return;
      }
      loader_final.style.display = "none";
      container.innerHTML = `
        <div class="table-result table-scrolld">
          <table class="styled-table">
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
    })
    .catch((error) => {
      console.warn("Error al cargar los datos:", error);
      container.innerHTML = `<p>Error al cargar los datos.</p>`;
    });
}

getDataFinalista();

function getData() {
  const container = document.getElementById("content_all_result_semis_cali");
  const url_semis_cali =
    "https://script.google.com/macros/s/AKfycbx9d9oDthSMHUdS2HVVe4mtQALGkeGP7NGj9P8HsfTeC5pIq6lplMyrK0ycvruXik7N/exec";
  const loader_final_grand_semis = document.getElementById(
    "loader_final_grand_semis"
  );

  fetch(url_semis_cali)
    .then((response) => response.json())
    .then((data) => {
      if (!Array.isArray(data) || data.length === 0) {
        container.innerHTML = `<p>No hay datos disponibles.</p>`;
        return;
      }
      loader_final_grand_semis.style.display = "none";
      container.innerHTML = `
        <div class="table-result table-scrolld">
          <table class="styled-table">
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
    })
    .catch((error) => {
      console.warn("Error al cargar los datos:", error);
      container.innerHTML = `<p>Error al cargar los datos.</p>`;
    });
}

getData();

function getPereiraClientes() {
  const url_pereira =
    "https://script.google.com/macros/s/AKfycbz-dNMNpwNFfWEP5Vnxpu9RFVMeMJvhSoEpZwKplgMDYBBMHlLEPywEshkd5epQ__ujbg/exec";
  const miniloader = document.getElementById("loader_final_grand_pereira");
  miniloader.style.display = "flex";
  const container = document.getElementById(
    "content_all_result_finalista_pereira_1"
  );
  container.innerHTML = ``;
  fetch(url_pereira)
    .then((res) => res.json())
    .then((data) => {
      if (!Array.isArray(data) || data.length === 0) {
        container.innerHTML = `<p>No hay datos disponibles.</p>`;
        miniloader.style.display = "none";

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
    })
    .catch((error) => {
      console.log(error.mensaje);
      miniloader.style.display = "none";
      container.innerHTML = `<p>No hay datos disponibles.</p>`;
    });
}

getPereiraClientes();

function getBugaClientes() {
  const url_buga =
    "https://script.google.com/macros/s/AKfycbwufNPc1KcHw1lTQEiC7TaV_Qya5VrendtTsrvTnNsfp6zMNYYEcsH9Hvw5hV3lM8MXFg/exec";

  const miniloader = document.getElementById("loader_final_grand_buga");
  miniloader.style.display = "flex";
  const container = document.getElementById(
    "content_all_result_finalista_buga"
  );
  container.innerHTML = ``;
  fetch(url_buga)
    .then((res) => res.json())
    .then((data) => {
      if (!Array.isArray(data) || data.length === 0) {
        container.innerHTML = `<p>No hay datos disponibles.</p>`;
        miniloader.style.display = "none";

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

getBugaClientes();

function getTuluaClientes() {
  const url_tulua =
    "https://script.google.com/macros/s/AKfycbx-SUx8tlAJBNbhJV4jl07HxvIwoXvsZ_2UaotwJDfc_03EmHXih_S-N5-Ijgm2bvse/exec";

  const miniloader = document.getElementById("loader_final_grand_tulua");
  miniloader.style.display = "flex";
  const container = document.getElementById(
    "content_all_result_finalista_tulua"
  );
  container.innerHTML = ``;
  fetch(url_tulua)
    .then((res) => res.json())
    .then((data) => {
      if (!Array.isArray(data) || data.length === 0) {
        container.innerHTML = `<p>No hay datos disponibles.</p>`;
        miniloader.style.display = "none";
        return;
      }
      container.innerHTML = `
        <div class="table-result-tulua table-scrolld-tulua">
          <table class="styled-table-tulua">
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

getTuluaClientes();

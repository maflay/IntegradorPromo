function getAllUser() {
  const contenedor_usuarios = document.getElementById("content_table_info");
  const url =
    "https://script.google.com/macros/s/AKfycbwoQFpBcbOBhNbIvqo6UPlv9oV1H8IHKJMlonFOiK1T9cW6J0I8uZHAe5bPps4NxdmD3Q/exec";
  contenedor_usuarios.innerHTML = `Cargando ...`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      contenedor_usuarios.innerHTML = `
        <div class="table-result table-scrolld">
          <table class="styled-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Rol</th>
                <th>Area</th>
                <th># Cel</th>
              </tr>
            </thead>
            <tbody>
            ${[...data]
              .reverse()
              .map(
                (registro, i) =>
                  `<tr>
                    <td>${registro.Nombre}</td>
                    <td>${registro.Correo}</td>
                    <td>${registro.Rol || ""}</td>
                    <td>${registro.Area || ""}</td>
                    <td>${registro.Telefono || ""}</td>
                  </tr>
                `
              )
              .join("")}
            </tbody>
          </table>
        </div>
      `;
    })
    .catch(() => {
      contenedor_usuarios.innerHTML = `Error al cargar la informaión, Por favor refresca.`;
    });
}

getAllUser();


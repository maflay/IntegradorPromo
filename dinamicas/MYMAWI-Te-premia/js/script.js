  window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    loader.style.display = "none";
  });
(() => {
  const toggleBtn = document.getElementById("toggleBtn");
  const formBox = document.getElementById("formBox");
  const logo = document.getElementById("prueba");
  const btnEnviar = document.getElementById("enviarForm");

  // toggleBtn.addEventListener("click", () => {
  //   formBox.classList.toggle("hidden");

  //   const oculto = formBox.classList.contains("hidden");
  //   toggleBtn.textContent = oculto ? "Mostrar" : "Ocultar";

  //   if (oculto) {
  //     logo.classList.add("logo-centrado");
  //   } else {
  //     logo.classList.remove("logo-centrado");
  //   }
  // });
})();

function mostrarPremio(categoria) {
  const valganado = document.getElementById("valganado");
  const categoriaEl = document.getElementById("categoria");
  const cate = categoriaEl.value.trim().toUpperCase();

  const premios = {
    GENIUS: 150000,
    TITANIO: 130000,
    LEGENDARIO: 110000,
    GOLD: 90000,
    SILVER: 70000,
    BRONCE: 50000,
    SUPERIORALADDIN: 100000,
    ESTANDARALADDIN: 50000,
    ESTANDARMARCOPOLO: 80000,
    SUPERIORMARCOPOLO: 100000,
  };

  if (premios[categoria]) {
    Swal.fire({
      icon: "success",
      title: "Felicidades eres un ganador.",
      text: `Felicidades ganaste un premio de $${premios[
        categoria
      ].toLocaleString()}.`,
    });
    valganado.innerHTML = `<div style="text-align: center;">Felicidades ganaste un premio de $${premios[
      categoria
    ].toLocaleString()}, con categoria ${cate}</div>`;

    confetti({
      particleCount: 200,
      spread: 70,
      origin: { y: 0.6 },
    });
  }
}

function validatePremio() {
  const casinoEl = document.getElementById("casino");
  const categoriaEl = document.getElementById("categoria");
  const nombreEl = document.getElementById("nombre");
  const cedulaEl = document.getElementById("cedula");
  const casino = casinoEl.value.trim();
  const categoria = categoriaEl.value.trim().toUpperCase();
  const nombre = nombreEl.value.trim();
  const cedula = cedulaEl.value.trim();
  const loader = document.getElementById("loader");
  const valBono = document.getElementById("bono");

  // Validaci贸n
  if (!casino || !categoria || !nombre || !cedula) {
    Swal.fire({
      icon: "warning",
      title: "Campos incompletos",
      text: "Por favor, completa todos los campos antes de continuar.",
      confirmButtonColor: "#efb810",
    });
    return;
  }

  loader.style.display = "flex";
  setTimeout(() => {
    loader.style.display = "none";
    mostrarPremio(categoria);
    valBono.innerHTML =
      '<div style="display: flex;gap: 30px;"><div class="content-btn-enviar"><button onclick="reiniciar()" class="btn-dados">Reiniciar</button></div><div class="content-btn-enviar"><input class="form-control" id="valBono" type="text" placeholder="# bono." /></div><div class="content-btn-enviar"><button onclick="HandleSend()" id="enviarForm" class="btn-dados">Enviar</button></div></div>';
  }, 2000);
}

function reiniciar() {
  const casinoEl = document.getElementById("casino");
  const categoriaEl = document.getElementById("categoria");
  const nombreEl = document.getElementById("nombre");
  const cedulaEl = document.getElementById("cedula");
  const valBonoEl = document.getElementById("valBono");
  const valBonoF = document.getElementById("bono");
  const valganado = document.getElementById("valganado");

  casinoEl.value = "";
  categoriaEl.value = "";
  nombreEl.value = "";
  cedulaEl.value = "";
  valBonoEl.value = "";
  valBonoF.innerHTML = "";
  valganado.innerHTML = ``;
}

function HandleSend() {
  const casinoEl = document.getElementById("casino");
  const categoriaEl = document.getElementById("categoria");
  const nombreEl = document.getElementById("nombre");
  const cedulaEl = document.getElementById("cedula");
  const loader = document.getElementById("loader");
  const valBonoEl = document.getElementById("valBono");
  const valBonoF = document.getElementById("bono");
  const valganado = document.getElementById("valganado");

  const casino = casinoEl.value.trim();
  const categoria = categoriaEl.value.trim().toUpperCase();
  const nombre = nombreEl.value.trim();
  const cedula = cedulaEl.value.trim();
  const valBono = valBonoEl.value.trim();

  const hoy = new Date().toDateString(); // "Mon Jul 07 2025"
  const ultimaFecha = localStorage.getItem("fecha");

  // Si es un nuevo día, reiniciar registros
  if (ultimaFecha !== hoy) {
    localStorage.setItem("registros", JSON.stringify([]));
    localStorage.setItem("fecha", hoy);
  }

  // Validaci贸n
  if (!casino || !categoria || !nombre || !cedula) {
    Swal.fire({
      icon: "warning",
      title: "Campos incompletos",
      text: "Por favor, completa todos los campos antes de continuar.",
      confirmButtonColor: "#efb810",
    });
    return;
  }

  const promocion = "MYMAWI Te premia.";

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

  loader.style.display = "flex";

  const url =
    "https://script.google.com/macros/s/AKfycbxW9Bjaer7-OeaFUJAmE3rzEejwU1z270Dy4QmNtHJd1rfsJMuLxS57qOIlv4-807aflg/exec";

  const data = {
    casino,
    categoria,
    nombre,
    cedula,
    fecha,
    hora,
    promocion,
    valBono,
  };

  let registros = JSON.parse(localStorage.getItem("registros")) || [];
  registros.push(data);
  localStorage.setItem("registros", JSON.stringify(registros));

  fetch(url, {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify(data),
  })
    .then((response) => response.text())
    .then(() => {
      casinoEl.value = "";
      categoriaEl.value = "";
      nombreEl.value = "";
      cedulaEl.value = "";
      valBonoEl.value = "";
      valBonoF.innerHTML = "";
      valganado.innerHTML = "";

      // Mostrar mensaje segun categoria
      setTimeout(() => {
        loader.style.display = "none";
        Swal.fire({
          icon: "success",
          title: "Envio Exitoso.",
          text: `El envio de la informacion fue exitoso.`,
        });
      }, 2000);
    })
    .catch((err) => {
      loader.style.display = "none";
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo enviar la informacion. Intenta nuevamente.",
        confirmButtonColor: "#dc3545",
      });
    });
}

function HandleSecondSubmit() {
  const casinoEl = document.getElementById("casino-modal").value;
  const categoriaEl = document.getElementById("categoria-modal").value;
  const nombreEl = document.getElementById("nombre-modal").value;
  const cedulaEl = document.getElementById("cedula-modal").value;
  const horaEl = document.getElementById("hora-modal").value;
  const fechaEl = document.getElementById("fecha-modal").value;
  const promocionEl = "MYMAWI Te premia.";
  const bonoEl = document.getElementById("bono-modal").value;
  const loader = document.getElementById("loader");

  const casino = document.getElementById("casino-modal");
  const categoria = document.getElementById("categoria-modal");
  const cedula = document.getElementById("cedula-modal");
  const nombre = document.getElementById("nombre-modal");
  const hora = document.getElementById("hora-modal");
  const fecha = document.getElementById("fecha-modal");
  const bono = document.getElementById("bono-modal");

  if (
    casinoEl == "" ||
    categoriaEl == "" ||
    nombreEl == "" ||
    cedulaEl == "" ||
    horaEl == "" ||
    fechaEl == ""
  ) {
    Swal.fire({
      icon: "warning",
      title: "Alerta",
      text: "Debe enviar información.",
      confirmButtonColor: "#224fa1",
    });
    return;
  }

  loader.style.display = "flex";

  const url =
    "https://script.google.com/macros/s/AKfycbxW9Bjaer7-OeaFUJAmE3rzEejwU1z270Dy4QmNtHJd1rfsJMuLxS57qOIlv4-807aflg/exec";

  const data = {
    casino: casinoEl,
    categoria: categoriaEl,
    nombre: nombreEl,
    cedula: cedulaEl,
    fecha: fechaEl,
    hora: horaEl,
    promocion: promocionEl,
    valBono: bonoEl,
  };

  fetch(url, {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify(data),
  })
    .then((response) => response.text())
    .then(() => {
      casino.value = "";
      categoria.value = "";
      cedula.value = "";
      nombre.value = "";
      hora.value = "";
      fecha.value = "";
      bono.value = "";

      setTimeout(() => {
        loader.style.display = "none";
        Swal.fire({
          icon: "success",
          title: "Envio Secundario Exitoso.",
          text: `El envio de la informacion fue exitoso.`,
        });
        document.getElementById("datos-modal").style.display = "none";
      }, 2000);
    })
    .catch((err) => {
      loader.style.display = "none";
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo enviar la informacion. Intenta nuevamente.",
        confirmButtonColor: "#dc3545",
      });
    });
}

function abrirModal() {
  document.getElementById("datos-modal").style.display = "flex";
}

function cerrarModal() {
  document.getElementById("datos-modal").style.display = "none";
}

function abrirModal2() {
  const valCasino = document.getElementById("casino").value;

  if (valCasino == "") {
    Swal.fire({
      icon: "warning",
      title: "Advertencia",
      text: "Seleccione un casino.",
      confirmButtonColor: "#dc3545",
    });
    return;
  } else {
    mostrarRegistros();
    document.getElementById("modal-ultimos-registros").style.display = "flex";
  }
}

function cerrarModal2() {
  document.getElementById("modal-ultimos-registros").style.display = "none";
}

function mostrarRegistros() {
  const ultimosRegistros = document.getElementById("ultimos-registros");
  const registros = JSON.parse(localStorage.getItem("registros")) || [];
  const casinoNumero = document.getElementById("casino-numero");
  const valInfo = document.getElementById("Info");
  const valCasino = document.getElementById("casino").value;
  const filtrados = registros.filter((item) => item.casino === valCasino);
  casinoNumero.innerHTML = valCasino;

  if (filtrados.length === 0) {
    ultimosRegistros.innerHTML = `<p class="color-gray">No hay registros para este casino.</p>`;
    valInfo.innerHTML = ``;
  } else {
    valInfo.innerHTML = `<small class="color-gray">* Estos registros son temporales (se reinicia a las 00:00), por favor tener en
                          cuenta.</small>`;
    ultimosRegistros.innerHTML = `
  <div class="table-result">
    <table class="styled-table">
      <thead>
        <tr>
          <th># Registro</th>
          <th>Casino</th>
          <th>Categoria</th>
          <th>Nombre</th>
          <th>Cedula</th>
          <th>Bono</th>
          <th>Fecha</th>
        </tr>
      </thead>
      <tbody>
        ${filtrados
          .map(
            (registro, i) => `
              <tr>
                <td>${i + 1}</td>
                <td>${registro.casino}</td>
                <td>${registro.categoria}</td>
                <td>${registro.nombre}</td>
                <td>${registro.cedula}</td>
                <td>${registro.valBono}</td>
                <td>${registro.fecha} ${registro.hora}</td>
              </tr>
            `
          )
          .join("")}
      </tbody>
    </table>
  </div>
`;
  }
}

function verificarResetRegistro() {
  const hoy = new Date().toDateString();
  const ultimaFecha = localStorage.getItem("fecha");

  if (ultimaFecha !== hoy) {
    localStorage.setItem("registros", JSON.stringify([]));
    localStorage.setItem("fecha", hoy);
  }
}
verificarResetRegistro();

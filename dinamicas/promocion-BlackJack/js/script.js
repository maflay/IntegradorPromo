window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  const btnreinicar = document.getElementById("btn-reiniciar");
  const btnreinicarTablero = document.getElementById("btn-reiniciar-tablero");
  const btnPlantarse = document.getElementById("btn-plantarse");

  btnreinicarTablero.style.display = "none";
  btnPlantarse.style.display = "none";
  loader.style.display = "none";

  renderCard();
});

const toggleBtnView = document.getElementById("toggleBtnView");

toggleBtnView.addEventListener("click", () => {
  const contentView = document.getElementById("formBox");
  const btnObs = document.getElementById("btn-send-obs");
  const btnPremios = document.getElementById("btn-tabla-premios");
  const btnRegistroDia = document.getElementById("btn-registro-dia");
  const btnFueraPromo = document.getElementById("btn-envio-fuera-promocion");
  contentView.classList.toggle("hidden");
  btnObs.classList.toggle("hidden");
  btnPremios.classList.toggle("hidden");
  btnRegistroDia.classList.toggle("hidden");
  btnFueraPromo.classList.toggle("hidden");

  const ocultoView = contentView.classList.contains("hidden");
  toggleBtnView.textContent = ocultoView ? "Mostrar" : "Ocultar";
});

const requiredFields = ["casino", "categoria", "cedula", "nombre"];

const types = ["C", "D", "H", "S"];
const specials = ["A", "J", "Q", "K"];
const valBono = document.getElementById("valBono");
let deck = [];
let totalScore = 0;
const promocion = "BlackJack Express";
const url =
  "https://script.google.com/macros/s/AKfycbzcLJC2UrDaUKpG-HJZrtfOgJKBhSlhRUngd3wuPe12tBlJP0TqMMfjKSMDOzG2nVsigA/exec";

const premiosWin = {
  GENIUS: "$170.000",
  TITANIO: "$150.000",
  LEGENDARIO: "$130.000",
  GOLD: "$110.000",
  SILVER: "$90.000",
  BRONCE: "$70.000",
  SUPERIORMARCOPOLO: "$120.000",
  ESTANDARMARCOPOLO: "$100.000",
  SUPERIORALADDIN: "$90.000",
  ESTANDARALADDIN: "$70.000",
};

const premiosBJ = {
  GENIUS: "$500.000",
  TITANIO: "$450.000",
  LEGENDARIO: "$400.000",
  GOLD: "$350.000",
  SILVER: "$300.000",
  BRONCE: "$150.000",
  SUPERIORMARCOPOLO: "$300.000",
  ESTANDARMARCOPOLO: "$150.000",
  SUPERIORALADDIN: "$300.000",
  ESTANDARALADDIN: "$150.000",
};

const premiosLose = {
  GENIUS: "$150.000",
  TITANIO: "$130.000",
  LEGENDARIO: "$110.000",
  GOLD: "$90.000",
  SILVER: "$70.000",
  BRONCE: "$50.000",
  SUPERIORMARCOPOLO: "$100.000",
  ESTANDARMARCOPOLO: "$80.000",
  SUPERIORALADDIN: "$70.000",
  ESTANDARALADDIN: "$50.000",
};

const drawCard = () => {
  if (deck.length === 0) createDeck();
  return deck.pop();
};

const shuffleDeck = (deck) => {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
};

const createDeck = () => {
  deck = [];
  for (let i = 2; i <= 10; i++) {
    for (let type of types) {
      deck.push(i + type);
    }
  }
  for (let type of types) {
    for (let sp of specials) {
      deck.push(sp + type);
    }
  }
  return shuffleDeck(deck);
};
function renderCard() {
  const container = document.getElementById("content-card-player");
  container.innerHTML = "";

  const title = document.createElement("h3");
  title.classList.add("title-cards");
  title.textContent = "CARTAS";
  container.appendChild(title);

  const order = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
  ];

  types.forEach((type) => {
    const row = document.createElement("div");
    row.classList.add("card-row");

    order.forEach((value) => {
      if (type === "D") {
        const card = `${value}${type}`;
        const img = document.createElement("img");
        img.src = `/dinamicas/promocion-BlackJack/resources/cartas/${card}.svg`;
        img.alt = card;
        img.classList.add("card-image");
        img.setAttribute("data-carta", card);

        img.addEventListener("click", (e) => {
          e.target.style.pointerEvents = "none";
          document.getElementById("btn-reiniciar").style.display = "flex";
          document.getElementById("btn-reiniciar-tablero").style.display =
            "flex";
          document.getElementById("btn-plantarse").style.display = "flex";
          e.target.classList.add("disable");
          callCard(card);
        });

        row.appendChild(img);
      }
    });

    container.appendChild(row);
  });
  disableCards();
}

renderCard();

const valueCard = (card) => {
  const value = card.slice(0, -1);
  if (isNaN(value)) {
    if (value === "A") return { val: 11, isAce: true };
    return { val: 10, isAce: false };
  }

  return { val: +value, isAce: false };
};

function callCard(card) {
  const container = document.getElementById("CallCard");
  const scorePlayer = document.getElementById("content-score");
  const valCategoria = document.getElementById("categoria").value;

  const img = document.createElement("img");
  img.src = `/dinamicas/promocion-BlackJack/resources/cartas/${card}.svg`;
  img.alt = card;
  img.classList.add("card-image-call");
  container.appendChild(img);

  const { val, isAce } = valueCard(card);
  totalScore += val;

  if (isAce) {
    img.setAttribute("data-ace", "true");
  }

  const cantidad = container.querySelectorAll("img").length;

  const calcularScore = () => {
    let total = 0;
    let ases = 0;
    const cartas = document.querySelectorAll("#CallCard img");

    cartas.forEach((carta) => {
      const nombre = carta.alt;
      const { val, isAce } = valueCard(nombre);
      total += val;
      if (isAce) ases++;
    });

    let ajustado = total;
    while (ajustado > 21 && ases > 0) {
      ajustado -= 10;
      ases--;
    }

    return {
      ajustado,
      totalOriginal: total,
      hayAs: total !== ajustado || ases > 0, // detecta si hay algún As
    };
  };

  const { ajustado, totalOriginal, hayAs } = calcularScore();

  const perder = () => {
    disableCards();
    alertLose(premiosLose[valCategoria] || "0", valCategoria);
    valBono.innerHTML = getBonoForm();
  };

  const ganar = (monto, tipo) => {
    alertWin(valCategoria, monto, tipo);
    valBono.innerHTML = getBonoForm();
  };

  if (cantidad >= 2) {
    if (ajustado > 21) {
      perder();
    } else if ([18, 19, 20, 21].includes(ajustado)) {
      ganar(premiosWin[valCategoria] || "$0", "Ganaste");
    }
  }

  if (cantidad === 2) {
    if (ajustado > 21) {
      perder();
    } else if (ajustado === 21) {
      ganar(premiosBJ[valCategoria] || "$0", "BlackJack");
    }
  }

  if (hayAs && ajustado >= 13 && ajustado <= 17 && totalOriginal <= 21) {
    const valorAlterno = ajustado - 10;
    scorePlayer.innerHTML = `${valorAlterno} / ${ajustado}`;
  } else {
    scorePlayer.innerHTML = `${ajustado}`;
  }
}

function getBonoForm() {
  return `
    <div style="display:flex;gap:10px;">
      <div><br /><input class="form-control" id="valBonoB" type="text" placeholder="# bono." /></div>
      
    </div>
  `;
}

function resetGame() {
  const tblCallCard = document.getElementById("CallCard");
  const Score = document.getElementById("content-score");
  const btnReinicio = document.getElementById("btn-reiniciar");
  const btnReinicioTablero = document.getElementById("btn-reiniciar-tablero");
  const btnPlantarse = document.getElementById("btn-plantarse");

  const nombre = document.getElementById("nombre");
  const casino = document.getElementById("casino");
  const categoria = document.getElementById("categoria");
  const cedula = document.getElementById("cedula");

  btnReinicio.style.display = "none";
  btnReinicioTablero.style.display = "none";
  btnPlantarse.style.display = "none";
  enableCards();

  tblCallCard.innerHTML = "";
  Score.innerHTML = "";
  document.getElementById("textoGanador").innerHTML = ``;

  nombre.value = "";
  casino.value = "";
  categoria.value = "";
  cedula.value = "";

  valBono.innerHTML = ``;

  totalScore = 0;
  disableCards();
}

function resetTablero() {
  const tblCallCard = document.getElementById("CallCard");
  const btnReinicio = document.getElementById("btn-reiniciar");
  const btnReinicioTablero = document.getElementById("btn-reiniciar-tablero");
  const Score = document.getElementById("content-score");
  const btnPlantarse = document.getElementById("btn-plantarse");
  enableCards();
  tblCallCard.innerHTML = "";
  Score.innerHTML = "";
  // btnReinicio.style.display = "none";
  btnReinicioTablero.style.display = "none";
  btnPlantarse.style.display = "none";
  document.getElementById("textoGanador").innerHTML = ``;
  valBono.innerHTML = ``;
  totalScore = 0;
}

function disableCards() {
  const cartas = document.querySelectorAll(".card-image");

  cartas.forEach((carta) => {
    carta.style.pointerEvents = "none";
    carta.classList.add("disable");
  });
}

function enableCards() {
  const cartas = document.querySelectorAll(".card-image.disable");

  cartas.forEach((carta) => {
    carta.style.pointerEvents = "auto";
    carta.classList.remove("disable");
  });
}

function confettiVictoria() {
  confetti({
    particleCount: 200,
    spread: 70,
    origin: { y: 0.9, x: 0.2 },
  });
  confetti({
    particleCount: 200,
    spread: 70,
    origin: { y: 0.8, x: 0.2 },
  });
  confetti({
    particleCount: 200,
    spread: 70,
    origin: { y: 0.7, x: 0.2 },
  });
  confetti({
    particleCount: 200,
    spread: 70,
    origin: { y: 0.6, x: 0.2 },
  });

  confetti({
    particleCount: 200,
    spread: 70,
    origin: { y: 0.9 },
  });
  confetti({
    particleCount: 200,
    spread: 70,
    origin: { y: 0.8 },
  });
  confetti({
    particleCount: 200,
    spread: 70,
    origin: { y: 0.7 },
  });
  confetti({
    particleCount: 200,
    spread: 70,
    origin: { y: 0.6 },
  });

  confetti({
    particleCount: 200,
    spread: 70,
    origin: { y: 0.9, x: 0.8 },
  });
  confetti({
    particleCount: 200,
    spread: 70,
    origin: { y: 0.8, x: 0.8 },
  });
  confetti({
    particleCount: 200,
    spread: 70,
    origin: { y: 0.7, x: 0.8 },
  });
  confetti({
    particleCount: 200,
    spread: 70,
    origin: { y: 0.6, x: 0.8 },
  });
}

function alertWin(categoria, valor, opcion) {
  Swal.fire({
    icon: "success",
    title: `Categoria ${categoria}`,
    html: `${opcion} con un premio de <span class="valrecompensa">${valor}</span> en Dinero Promocional, con categoria ${categoria}.`,
    confirmButtonColor: "#efb810",
    customClass: {
      popup: "mi-popup",
      title: "mi-titulo",
      confirmButton: "btn-Send mi-boton",
    },
  });
  confettiVictoria();

  document.getElementById("textoGanador").innerHTML = getTextWinForm(
    categoria,
    valor,
    opcion
  );
}

function getTextWinForm(categoria, valor, opcion) {
  return `
    <div style="display:flex;gap:10px;">
      <div>${opcion} con un premio de <strong style="font-size: 2rem";>${valor}</strong> en Dinero Promocional, con categoria <strong style="font-size: 2rem";>${categoria}</strong>.</div>
    </div>
  `;
}

function alertLose(valor, categoria) {
  Swal.fire({
    icon: "warning",
    title: `Te has pasado.`,
    text: `Te has pasado pero ganas un premio de ${valor}, con categoria ${categoria}.`,
    confirmButtonColor: "#efb810",
    customClass: {
      popup: "mi-popup",
      title: "mi-titulo",
      confirmButton: "btn-Send mi-boton",
    },
  });
}
function handleSendInfo() {
  const loader = document.getElementById("loader");
  loader.style.display = "flex";

  const nombre = document.getElementById("nombre").value.trim();
  const casino = document.getElementById("casino").value.trim();
  const categoria = document.getElementById("categoria").value.trim();
  const cedula = document.getElementById("cedula").value.trim();
  const valBono = document.getElementById("valBonoB")?.value.trim();

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

  if (!nombre || !casino || !categoria || !cedula) {
    showAlert(
      "warning",
      "Campos obligatorios",
      "Por favor, completa todos los campos."
    );
    loader.style.display = "none";
    return;
  }

  if (categoria === "ADICIONAL") {
    enviarDatos({
      tipo: "dinamica",
      hora,
      fecha,
      nombre,
      cedula,
      casino,
      categoria,
      resultado: "0",
      valBono: "0",
      promocion,
    });
    return;
  }

  if (!valBono || valBono === "0") {
    showAlert(
      "warning",
      "Bono obligatorio",
      "Debes ingresar un valor válido para el bono."
    );
    loader.style.display = "none";
    return;
  }

  const hoy = new Date().toDateString();
  if (localStorage.getItem("fechaBlackJack") !== hoy) {
    localStorage.setItem("registrosBlackJack", JSON.stringify([]));
    localStorage.setItem("fechaBlackJack", hoy);
  }

  const cartas = document.querySelectorAll("#CallCard img");
  const { ajustado, totalOriginal } = calcularScore(cartas);
  let resultado = calcularResultado(ajustado, cartas.length);

  const data = {
    tipo: "dinamica",
    hora,
    fecha,
    nombre,
    cedula,
    casino,
    categoria,
    resultado,
    valBono,
    promocion,
  };

  enviarDatos(data);
}

function enviarDatos(data) {
  let registros = JSON.parse(localStorage.getItem("registrosBlackJack")) || [];
  registros.push(data);
  localStorage.setItem("registrosBlackJack", JSON.stringify(registros));
  fetch(url, {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify(data),
  })
    .then(() => {
      resetGame();
      setTimeout(() => {
        document.getElementById("loader").style.display = "none";
        showAlert(
          "success",
          "Envio Exitoso.",
          "La información fue enviada correctamente."
        );
      }, 2000);
    })
    .catch(() => {
      document.getElementById("loader").style.display = "none";
      showAlert(
        "error",
        "Error",
        "No se pudo enviar la información. Intenta nuevamente."
      );
    });
}

function calcularScore(cartas) {
  let total = 0;
  let ases = 0;
  cartas.forEach((carta) => {
    const { val, isAce } = valueCard(carta.alt);
    total += val;
    if (isAce) ases++;
  });
  let ajustado = total;
  while (ajustado > 21 && ases > 0) {
    ajustado -= 10;
    ases--;
  }
  return { ajustado, totalOriginal: total };
}

function calcularResultado(score, cantidad) {
  if (score === 21 && cantidad === 2) return "BLACK JACK";
  if (score >= 18 && score <= 21) return "GANADOR (18-21)";
  if (score === 17) return "ANCAR (17)";
  if (score > 21) return "SUPERIOR A 21";
  return "SIN RESULTADO";
}

function showAlert(icon, title, text) {
  Swal.fire({
    icon,
    title,
    text,
    confirmButtonColor: icon === "error" ? "#dc3545" : "#efb810",
    customClass: {
      popup: "mi-popup",
      title: "mi-titulo",
      confirmButton: "btn-Send mi-boton",
    },
  });
}

function verificarResetRegistro() {
  const hoy = new Date().toDateString();
  const ultimaFecha = localStorage.getItem("fechaBlackJack");

  if (ultimaFecha !== hoy) {
    localStorage.setItem("registrosBlackJack", JSON.stringify([]));
    localStorage.setItem("fechaBlackJack", hoy);
  }
}
verificarResetRegistro();

function abrirModal2() {
  const valCasino = document.getElementById("casino").value;

  if (valCasino == "") {
    Swal.fire({
      icon: "warning",
      title: "Advertencia",
      text: "Seleccione un casino.",
      confirmButtonColor: "#dc3545",
      customClass: {
        popup: "mi-popup",
        title: "mi-titulo",
        confirmButton: "btn-Send mi-boton",
      },
    });
    return;
  } else {
    mostrarRegistros();
    document.getElementById("modal-ultimos-registros-blackjack").style.display =
      "flex";
  }
}

function cerrarModal2() {
  document.getElementById("modal-ultimos-registros-blackjack").style.display =
    "none";
}

function abrirModal3() {
  document.getElementById("modal-tabla-premios").style.display = "flex";
}

function cerrarModal3() {
  document.getElementById("modal-tabla-premios").style.display = "none";
}

function abrirModal4() {
  document.getElementById("datos-modal-observacion").style.display = "flex";
}

function cerrarModal4() {
  document.getElementById("datos-modal-observacion").style.display = "none";
}

function mostrarRegistros() {
  const ultimosRegistros = document.getElementById(
    "ultimos-registros-blackjack"
  );
  const registros =
    JSON.parse(localStorage.getItem("registrosBlackJack")) || [];
  const casinoNumero = document.getElementById("casino-numero-blackjack");
  const valInfo = document.getElementById("Info-blackjack");
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
  <div class="table-result-blackjack">
    <table class="styled-table-blackjack">
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

function abrirModal() {
  document.getElementById("datos-modal-blackjack").style.display = "flex";
}

function cerrarModal() {
  document.getElementById("datos-modal-blackjack").style.display = "none";
}

function HandleSecondSubmit() {
  const casinoModal = document.getElementById("casino-modal-blackjack");
  const categoriaModal = document.getElementById("categoria-modal-blackjack");
  const cedulaModal = document.getElementById("cedula-modal-blackjack");
  const nombreModal = document.getElementById("nombre-modal-blackjack");
  const horaModal = document.getElementById("hora-modal-blackjack");
  const fechaModal = document.getElementById("fecha-modal-blackjack");
  const bonoModal = document.getElementById("bono-modal-blackjack");
  const opcionModal = document.getElementById("opcion-modal-blackjack");
  const loader = document.getElementById("loader");

  if (categoriaModal.value == "ADICIONAL") {
    console.log("entro al console");
    if (
      casinoModal.value == "" ||
      categoriaModal.value == "" ||
      cedulaModal.value == "" ||
      nombreModal.value == "" ||
      horaModal.value == "" ||
      fechaModal.value == ""
    ) {
      Swal.fire({
        icon: "warning",
        title: "Advertencia",
        text: "Completa toda la información.",
        confirmButtonColor: "#dc3545",
        customClass: {
          popup: "mi-popup",
          title: "mi-titulo",
          confirmButton: "btn-Send mi-boton",
        },
      });
      return;
    }
  } else {
    if (
      casinoModal.value == "" ||
      categoriaModal.value == "" ||
      cedulaModal.value == "" ||
      nombreModal.value == "" ||
      horaModal.value == "" ||
      fechaModal.value == "" ||
      bonoModal.value == ""
    ) {
      Swal.fire({
        icon: "warning",
        title: "Advertencia",
        text: "Completa toda la información.",
        confirmButtonColor: "#dc3545",
        customClass: {
          popup: "mi-popup",
          title: "mi-titulo",
          confirmButton: "btn-Send mi-boton",
        },
      });
      return;
    }
  }

  const nomModal = nombreModal.value;
  const cedModal = cedulaModal.value;
  const casModal = casinoModal.value;
  const catModal = categoriaModal.value;
  const valBonoModal = bonoModal.value;
  const valHora = horaModal.value;
  const valFecha = fechaModal.value;
  const valOpcion = opcionModal.value;

  var tipoOpcion = "";

  if (valOpcion == 1) {
    tipoOpcion = "BLACK JACK";
  } else if (valOpcion == 2) {
    tipoOpcion = "GANADOR (18-21)";
  } else if (valOpcion == 3) {
    tipoOpcion = "ANCAR (17)";
  } else if (valOpcion == 4) {
    tipoOpcion = "SUPERIOR A 21";
  }

  const data = {
    tipo: "dinamica",
    hora: valHora,
    fecha: valFecha,
    nombre: nomModal,
    cedula: cedModal,
    casino: casModal,
    categoria: catModal,
    promocion,
    valBono: valBonoModal,
    resultado: tipoOpcion,
  };

  loader.style.display = "flex";

  fetch(url, {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify(data),
  })
    .then((response) => response.text())
    .then((res) => {
      casinoModal.value = "";
      categoriaModal.value = "";
      cedulaModal.value = "";
      nombreModal.value = "";
      horaModal.value = "";
      fechaModal.value = "";
      bonoModal.value = "";
      setTimeout(() => {
        loader.style.display = "none";
        Swal.fire({
          icon: "success",
          title: "Exito",
          text: "Envio Secundario Exitoso.",
          confirmButtonColor: "#dc3545",
          customClass: {
            popup: "mi-popup",
            title: "mi-titulo",
            confirmButton: "btn-Send mi-boton",
          },
        });
      }, 2000);
    })
    .catch((error) => {
      console.log(error.error);
      loader.style.display = "none";
    });
}

function handlePlantarse() {
  const valCategoria = document.getElementById("categoria").value;

  const calcularScore = () => {
    let total = 0;
    let ases = 0;
    const cartas = document.querySelectorAll("#CallCard img");

    cartas.forEach((carta) => {
      const nombre = carta.alt;
      const { val, isAce } = valueCard(nombre);
      total += val;
      if (isAce) ases++;
    });

    let ajustado = total;
    while (ajustado > 21 && ases > 0) {
      ajustado -= 10;
      ases--;
    }

    return {
      ajustado,
      totalOriginal: total,
      hayAs: total !== ajustado || ases > 0, // detecta si hay algún As
    };
  };
  const { ajustado } = calcularScore();
  if (ajustado === 17) {
    if (valCategoria == "GENIUS") {
      alertWin(valCategoria, "$160.000", "Ancar");
    } else if (valCategoria == "TITANIO") {
      alertWin(valCategoria, "$140.000", "Ancar");
    } else if (valCategoria == "LEGENDARIO") {
      alertWin(valCategoria, "$120.000", "Ancar");
    } else if (valCategoria == "GOLD") {
      alertWin(valCategoria, "$100.000", "Ancar");
    } else if (valCategoria == "SILVER") {
      alertWin(valCategoria, "$80.000", "Ancar");
    } else if (valCategoria == "BRONCE") {
      alertWin(valCategoria, "$60.000", "Ancar");
    } else if (valCategoria == "SUPERIORMARCOPOLO") {
      alertWin(valCategoria, "$110.000", "Ancar");
    } else if (valCategoria == "ESTANDARMARCOPOLO") {
      alertWin(valCategoria, "$90.000", "Ancar");
    } else if (valCategoria == "SUPERIORALADDIN") {
      alertWin(valCategoria, "$80.000", "Ancar");
    } else if (valCategoria == "ESTANDARALADDIN") {
      alertWin(valCategoria, "$60.000", "Ancar");
    }

    valBono.innerHTML = getBonoForm();
  } else {
    Swal.fire({
      title: "Estas seguro de plantarte?",
      text: "Si no cumple con el puntaje minimo no ganaras premio.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Me planto!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Perdiste!",
          text: "Tu puntaje con tiene premio.",
          icon: "warning",
        });
        disableCards();
      }
    });
  }
}

function HandleObservacionSend() {
  const valCasino = document.getElementById("casino-modal-observacion");
  const valObservacion = document.getElementById("casino-modal-descripcion");
  const loader = document.getElementById("loader");

  const valCasinoObs = valCasino.value.trim();
  const valObservacionObs = valObservacion.value.trim();

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

  if (!valCasinoObs || !valObservacionObs) {
    Swal.fire({
      icon: "warning",
      title: "Campos vacíos",
      text: "Debes llenar todos los campos.",
      confirmButtonColor: "#dc3545",
      customClass: {
        popup: "mi-popup",
        title: "mi-titulo",
        confirmButton: "btn-Send mi-boton",
      },
    });
    return;
  }

  loader.style.display = "flex";

  const data = {
    tipo: "observacion",
    hora,
    fecha,
    casino: valCasinoObs,
    observacion: valObservacionObs,
  };

  fetch(url, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((response) => response.text())
    .then(() => {
      valCasino.value = "";
      valObservacion.value = "";

      loader.style.display = "none";

      Swal.fire({
        icon: "success",
        title: "Éxito",
        text: "El envío de la información fue exitoso.",
        confirmButtonColor: "#dc3545",
        customClass: {
          popup: "mi-popup",
          title: "mi-titulo",
          confirmButton: "btn-Send mi-boton",
        },
      });
    })
    .catch((error) => {
      console.error("Error al enviar:", error);
      loader.style.display = "none";
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ocurrió un problema al enviar la información.",
        confirmButtonColor: "#dc3545",
        customClass: {
          popup: "mi-popup",
          title: "mi-titulo",
          confirmButton: "btn-Send mi-boton",
        },
      });
    });
}

requiredFields.forEach((id) => {
  const el = document.getElementById(id);
  el.addEventListener("input", checkFields);
});
function checkFields() {
  const allFilled = requiredFields.every((id) => {
    const el = document.getElementById(id);
    return el && el.value.trim() !== "";
  });

  if (allFilled) {
    enableCards();
  } else {
    disableCards();
  }
}

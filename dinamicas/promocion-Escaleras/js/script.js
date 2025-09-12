// Elimina esto:
// rollButton.addEventListener("click", rollDice);

// Nueva forma: inputs = dados
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  loader.style.display = "none";
});
document.getElementById("input1").addEventListener("input", (e) => {
  const input2 = document.getElementById("input2");
  setTimeout(() => {
    input2.disabled = false;
  }, 1500);
  handleAutoInput(e);
});
document.getElementById("input2").addEventListener("input", (e) => {
  const input3 = document.getElementById("input3");
  setTimeout(() => {
    input3.disabled = false;
  }, 1500);
  handleAutoInput(e);
});
document.getElementById("input3").addEventListener("input", (e) => {
  handleAutoInput(e);
});

// IDs de los campos requeridos
const requiredFields = ["casino", "categoria", "cedula", "nombre"];
const input1 = document.getElementById("input1");

let checkpoints = [0, 0, 0, 0]; // posición ANTES de cada tirada: [dummy, t1, t2, t3]
let isMoving = false;

// Función que revisa si todos tienen valor
function checkFields() {
  const allFilled = requiredFields.every((id) => {
    const el = document.getElementById(id);
    return el && el.value.trim() !== "";
  });

  input1.disabled = !allFilled;
}

// Asignar el evento "input" a todos los campos
requiredFields.forEach((id) => {
  const el = document.getElementById(id);
  el.addEventListener("input", checkFields);
});

// Deshabilitar por defecto
input1.disabled = true;

var cellMap = {};
let posicionTirada1 = 0;
let posicionTirada2 = 0;
let posicionTirada3 = 0;
let tiradaActual = 1;
const url =
  "https://script.google.com/macros/s/AKfycbyBkHeJPy2k1qhUeQamTGqebxQfjWhP7x8lc35MvzOBvkv3DFFhN-NG_x6xfwZ2cHjw/exec";

const promocion = "Tren de Premios";
const toggleBtnView = document.getElementById("toggleBtnView");

toggleBtnView.addEventListener("click", () => {
  const contentView = document.getElementById("formBox");
  const btnTablaPremios = document.getElementById("btn-tabla-premios");
  const btnObservacion = document.getElementById("btn-observacion");
  const btnReiniciar = document.getElementById("btn-reiniciar");
  const btnRegistroDia = document.getElementById("btn-registro-dia");
  const btnFueraPromo = document.getElementById("btn-fuera-promo");

  contentView.classList.toggle("hidden");
  btnTablaPremios.classList.toggle("hidden");
  btnObservacion.classList.toggle("hidden");
  btnReiniciar.classList.toggle("hidden");
  btnRegistroDia.classList.toggle("hidden");
  btnFueraPromo.classList.toggle("hidden");

  const ocultoView = contentView.classList.contains("hidden");
  toggleBtnView.textContent = ocultoView ? "Mostrar" : "Ocultar";
});

function emptyInput1() {
  const val1 = document.getElementById("input1");
  const val2 = document.getElementById("input2");
  val1.value = "";
  val1.disabled = false;
  val2.disabled = true;
}

function handleAutoInput(e) {
  const valor = parseInt(e.target.value);
  const valCategoria = document.getElementById("categoria").value;
  const valGanador = document.getElementById("resultado-ganador");
  valGanador.innerHTML = ``;

  if (!isNaN(valor) && valor >= 1 && valor <= 6) {
    checkpoints[tiradaActual] = playerPosition;
    e.target.disabled = true;

    movePlayer(valor, () => {
      if (tiradaActual === 1) {
        posicionTirada1 = playerPosition;
        document.getElementById(
          "pos1"
        ).innerText = `Lanz 1: ${posicionTirada1}`;
        let htmlTiro = `${playerName} Lanzó y obtuvo ${valor}, estas en la estación ${posicionTirada1}`;
        message.innerText = htmlTiro;
      } else if (tiradaActual === 2) {
        posicionTirada2 = playerPosition;
        document.getElementById(
          "pos2"
        ).innerText = `Tirada 2: ${posicionTirada2}`;
        let htmlTiro = `${playerName} Lanzó y obtuvo ${valor}, estas en la estación ${posicionTirada2}`;
        message.innerText = htmlTiro;
      } else if (tiradaActual === 3) {
        posicionTirada3 = playerPosition;
        document.getElementById(
          "pos3"
        ).innerText = `Tirada 3: ${posicionTirada3}`;

        let htmlTiro = `${playerName} Lanzó y obtuvo ${valor}, estas en la estación ${posicionTirada3}`;
        message.innerText = htmlTiro;

        const ValBono = document.getElementById("valBono");

        // PREMIOS

        if (valCategoria == "GENIUS") {
          if (posicionTirada3 == 3) {
            alertaExito(posicionTirada3, valCategoria, "$450.000");
          } else if (posicionTirada3 == 4) {
            alertaExito(posicionTirada3, valCategoria, "$220.000");
          } else if (posicionTirada3 == 5) {
            alertaExito(posicionTirada3, valCategoria, "$200.000");
          } else if (posicionTirada3 == 6) {
            alertaExito(posicionTirada3, valCategoria, "$200.000");
          } else if (posicionTirada3 == 7) {
            alertaExito(posicionTirada3, valCategoria, "$190.000");
          } else if (posicionTirada3 == 8) {
            alertaExito(posicionTirada3, valCategoria, "$190.000");
          } else if (posicionTirada3 == 9) {
            alertaExito(posicionTirada3, valCategoria, "$180.000");
          } else if (posicionTirada3 == 10) {
            alertaExito(posicionTirada3, valCategoria, "$180.000");
          } else if (posicionTirada3 == 12) {
            alertaExito(posicionTirada3, valCategoria, "$180.000");
          } else if (posicionTirada3 == 13) {
            alertaExito(posicionTirada3, valCategoria, "$190.000");
          } else if (posicionTirada3 == 14) {
            alertaExito(posicionTirada3, valCategoria, "$190.000");
          } else if (posicionTirada3 == 15) {
            alertaExito(posicionTirada3, valCategoria, "$200.000");
          } else if (posicionTirada3 == 17) {
            alertaExito(posicionTirada3, valCategoria, "$220.000");
          } else if (posicionTirada3 == 18) {
            alertaExito(posicionTirada3, valCategoria, "$450.000");
          } else if (posicionTirada3 == 19) {
            alertaExito(posicionTirada3, valCategoria, "$500.000");
          } else if (posicionTirada3 == 20) {
            alertaExito(posicionTirada3, valCategoria, "$600.000");
          }
        } else if (valCategoria == "TITANIO") {
          if (posicionTirada3 == 3) {
            alertaExito(posicionTirada3, valCategoria, "$400.000");
          } else if (posicionTirada3 == 4) {
            alertaExito(posicionTirada3, valCategoria, "$200.000");
          } else if (posicionTirada3 == 5) {
            alertaExito(posicionTirada3, valCategoria, "$180.000");
          } else if (posicionTirada3 == 6) {
            alertaExito(posicionTirada3, valCategoria, "$180.000");
          } else if (posicionTirada3 == 7) {
            alertaExito(posicionTirada3, valCategoria, "$170.000");
          } else if (posicionTirada3 == 8) {
            alertaExito(posicionTirada3, valCategoria, "$170.000");
          } else if (posicionTirada3 == 9) {
            alertaExito(posicionTirada3, valCategoria, "$160.000");
          } else if (posicionTirada3 == 10) {
            alertaExito(posicionTirada3, valCategoria, "$160.000");
          } else if (posicionTirada3 == 12) {
            alertaExito(posicionTirada3, valCategoria, "$160.000");
          } else if (posicionTirada3 == 13) {
            alertaExito(posicionTirada3, valCategoria, "$170.000");
          } else if (posicionTirada3 == 14) {
            alertaExito(posicionTirada3, valCategoria, "$170.000");
          } else if (posicionTirada3 == 15) {
            alertaExito(posicionTirada3, valCategoria, "$180.000");
          } else if (posicionTirada3 == 17) {
            alertaExito(posicionTirada3, valCategoria, "$200.000");
          } else if (posicionTirada3 == 18) {
            alertaExito(posicionTirada3, valCategoria, "$400.000");
          } else if (posicionTirada3 == 19) {
            alertaExito(posicionTirada3, valCategoria, "$450.000");
          } else if (posicionTirada3 == 20) {
            alertaExito(posicionTirada3, valCategoria, "$550.000");
          }
        } else if (valCategoria == "LEGENDARIO") {
          if (posicionTirada3 == 3) {
            alertaExito(posicionTirada3, valCategoria, "$350.000");
          } else if (posicionTirada3 == 4) {
            alertaExito(posicionTirada3, valCategoria, "$180.000");
          } else if (posicionTirada3 == 5) {
            alertaExito(posicionTirada3, valCategoria, "$160.000");
          } else if (posicionTirada3 == 6) {
            alertaExito(posicionTirada3, valCategoria, "$160.000");
          } else if (posicionTirada3 == 7) {
            alertaExito(posicionTirada3, valCategoria, "$150.000");
          } else if (posicionTirada3 == 8) {
            alertaExito(posicionTirada3, valCategoria, "$150.000");
          } else if (posicionTirada3 == 9) {
            alertaExito(posicionTirada3, valCategoria, "$140.000");
          } else if (posicionTirada3 == 10) {
            alertaExito(posicionTirada3, valCategoria, "$140.000");
          } else if (posicionTirada3 == 12) {
            alertaExito(posicionTirada3, valCategoria, "$140.000");
          } else if (posicionTirada3 == 13) {
            alertaExito(posicionTirada3, valCategoria, "$150.000");
          } else if (posicionTirada3 == 14) {
            alertaExito(posicionTirada3, valCategoria, "$150.000");
          } else if (posicionTirada3 == 15) {
            alertaExito(posicionTirada3, valCategoria, "$160.000");
          } else if (posicionTirada3 == 17) {
            alertaExito(posicionTirada3, valCategoria, "$180.000");
          } else if (posicionTirada3 == 18) {
            alertaExito(posicionTirada3, valCategoria, "$350.000");
          } else if (posicionTirada3 == 19) {
            alertaExito(posicionTirada3, valCategoria, "$400.000");
          } else if (posicionTirada3 == 20) {
            alertaExito(posicionTirada3, valCategoria, "$500.000");
          }
        } else if (valCategoria == "GOLD") {
          if (posicionTirada3 == 3) {
            alertaExito(posicionTirada3, valCategoria, "$300.000");
          } else if (posicionTirada3 == 4) {
            alertaExito(posicionTirada3, valCategoria, "$160.000");
          } else if (posicionTirada3 == 5) {
            alertaExito(posicionTirada3, valCategoria, "$140.000");
          } else if (posicionTirada3 == 6) {
            alertaExito(posicionTirada3, valCategoria, "$140.000");
          } else if (posicionTirada3 == 7) {
            alertaExito(posicionTirada3, valCategoria, "$130.000");
          } else if (posicionTirada3 == 8) {
            alertaExito(posicionTirada3, valCategoria, "$130.000");
          } else if (posicionTirada3 == 9) {
            alertaExito(posicionTirada3, valCategoria, "$120.000");
          } else if (posicionTirada3 == 10) {
            alertaExito(posicionTirada3, valCategoria, "$120.000");
          } else if (posicionTirada3 == 12) {
            alertaExito(posicionTirada3, valCategoria, "$120.000");
          } else if (posicionTirada3 == 13) {
            alertaExito(posicionTirada3, valCategoria, "$130.000");
          } else if (posicionTirada3 == 14) {
            alertaExito(posicionTirada3, valCategoria, "$130.000");
          } else if (posicionTirada3 == 15) {
            alertaExito(posicionTirada3, valCategoria, "$140.000");
          } else if (posicionTirada3 == 17) {
            alertaExito(posicionTirada3, valCategoria, "$160.000");
          } else if (posicionTirada3 == 18) {
            alertaExito(posicionTirada3, valCategoria, "$300.000");
          } else if (posicionTirada3 == 19) {
            alertaExito(posicionTirada3, valCategoria, "$350.000");
          } else if (posicionTirada3 == 20) {
            alertaExito(posicionTirada3, valCategoria, "$450.000");
          }
        } else if (valCategoria == "SILVER") {
          if (posicionTirada3 == 3) {
            alertaExito(posicionTirada3, valCategoria, "$250.000");
          } else if (posicionTirada3 == 4) {
            alertaExito(posicionTirada3, valCategoria, "$150.000");
          } else if (posicionTirada3 == 5) {
            alertaExito(posicionTirada3, valCategoria, "$120.000");
          } else if (posicionTirada3 == 6) {
            alertaExito(posicionTirada3, valCategoria, "$120.000");
          } else if (posicionTirada3 == 7) {
            alertaExito(posicionTirada3, valCategoria, "$110.000");
          } else if (posicionTirada3 == 8) {
            alertaExito(posicionTirada3, valCategoria, "$110.000");
          } else if (posicionTirada3 == 9) {
            alertaExito(posicionTirada3, valCategoria, "$100.000");
          } else if (posicionTirada3 == 10) {
            alertaExito(posicionTirada3, valCategoria, "$100.000");
          } else if (posicionTirada3 == 12) {
            alertaExito(posicionTirada3, valCategoria, "$100.000");
          } else if (posicionTirada3 == 13) {
            alertaExito(posicionTirada3, valCategoria, "$110.000");
          } else if (posicionTirada3 == 14) {
            alertaExito(posicionTirada3, valCategoria, "$110.000");
          } else if (posicionTirada3 == 15) {
            alertaExito(posicionTirada3, valCategoria, "$120.000");
          } else if (posicionTirada3 == 17) {
            alertaExito(posicionTirada3, valCategoria, "$140.000");
          } else if (posicionTirada3 == 18) {
            alertaExito(posicionTirada3, valCategoria, "$250.000");
          } else if (posicionTirada3 == 19) {
            alertaExito(posicionTirada3, valCategoria, "$300.000");
          } else if (posicionTirada3 == 20) {
            alertaExito(posicionTirada3, valCategoria, "$400.000");
          }
        } else if (valCategoria == "BRONCE") {
          if (posicionTirada3 == 3) {
            alertaExito(posicionTirada3, valCategoria, "$200.000");
          } else if (posicionTirada3 == 4) {
            alertaExito(posicionTirada3, valCategoria, "$120.000");
          } else if (posicionTirada3 == 5) {
            alertaExito(posicionTirada3, valCategoria, "$100.000");
          } else if (posicionTirada3 == 6) {
            alertaExito(posicionTirada3, valCategoria, "$100.000");
          } else if (posicionTirada3 == 7) {
            alertaExito(posicionTirada3, valCategoria, "$90.000");
          } else if (posicionTirada3 == 8) {
            alertaExito(posicionTirada3, valCategoria, "$90.000");
          } else if (posicionTirada3 == 9) {
            alertaExito(posicionTirada3, valCategoria, "$80.000");
          } else if (posicionTirada3 == 10) {
            alertaExito(posicionTirada3, valCategoria, "$80.000");
          } else if (posicionTirada3 == 12) {
            alertaExito(posicionTirada3, valCategoria, "$80.000");
          } else if (posicionTirada3 == 13) {
            alertaExito(posicionTirada3, valCategoria, "$90.000");
          } else if (posicionTirada3 == 14) {
            alertaExito(posicionTirada3, valCategoria, "$90.000");
          } else if (posicionTirada3 == 15) {
            alertaExito(posicionTirada3, valCategoria, "$100.000");
          } else if (posicionTirada3 == 17) {
            alertaExito(posicionTirada3, valCategoria, "$120.000");
          } else if (posicionTirada3 == 18) {
            alertaExito(posicionTirada3, valCategoria, "$200.000");
          } else if (posicionTirada3 == 19) {
            alertaExito(posicionTirada3, valCategoria, "$250.000");
          } else if (posicionTirada3 == 20) {
            alertaExito(posicionTirada3, valCategoria, "$300.000");
          }
        } else if (valCategoria == "SUPERIOR") {
          if (posicionTirada3 == 3) {
            alertaExito(posicionTirada3, valCategoria, "$250.000");
          } else if (posicionTirada3 == 4) {
            alertaExito(posicionTirada3, valCategoria, "$150.000");
          } else if (posicionTirada3 == 5) {
            alertaExito(posicionTirada3, valCategoria, "$120.000");
          } else if (posicionTirada3 == 6) {
            alertaExito(posicionTirada3, valCategoria, "$120.000");
          } else if (posicionTirada3 == 7) {
            alertaExito(posicionTirada3, valCategoria, "$110.000");
          } else if (posicionTirada3 == 8) {
            alertaExito(posicionTirada3, valCategoria, "$110.000");
          } else if (posicionTirada3 == 9) {
            alertaExito(posicionTirada3, valCategoria, "$100.000");
          } else if (posicionTirada3 == 10) {
            alertaExito(posicionTirada3, valCategoria, "$100.000");
          } else if (posicionTirada3 == 12) {
            alertaExito(posicionTirada3, valCategoria, "$100.000");
          } else if (posicionTirada3 == 13) {
            alertaExito(posicionTirada3, valCategoria, "$110.000");
          } else if (posicionTirada3 == 14) {
            alertaExito(posicionTirada3, valCategoria, "$110.000");
          } else if (posicionTirada3 == 15) {
            alertaExito(posicionTirada3, valCategoria, "$120.000");
          } else if (posicionTirada3 == 17) {
            alertaExito(posicionTirada3, valCategoria, "$150.000");
          } else if (posicionTirada3 == 18) {
            alertaExito(posicionTirada3, valCategoria, "$250.000");
          } else if (posicionTirada3 == 19) {
            alertaExito(posicionTirada3, valCategoria, "$300.000");
          } else if (posicionTirada3 == 20) {
            alertaExito(posicionTirada3, valCategoria, "$400.000");
          }
        } else if (valCategoria == "ESTANDAR") {
          if (posicionTirada3 == 3) {
            alertaExito(posicionTirada3, valCategoria, "$200.000");
          } else if (posicionTirada3 == 4) {
            alertaExito(posicionTirada3, valCategoria, "$120.000");
          } else if (posicionTirada3 == 5) {
            alertaExito(posicionTirada3, valCategoria, "$100.000");
          } else if (posicionTirada3 == 6) {
            alertaExito(posicionTirada3, valCategoria, "$100.000");
          } else if (posicionTirada3 == 7) {
            alertaExito(posicionTirada3, valCategoria, "$90.000");
          } else if (posicionTirada3 == 8) {
            alertaExito(posicionTirada3, valCategoria, "$90.000");
          } else if (posicionTirada3 == 9) {
            alertaExito(posicionTirada3, valCategoria, "$80.000");
          } else if (posicionTirada3 == 10) {
            alertaExito(posicionTirada3, valCategoria, "$80.000");
          } else if (posicionTirada3 == 12) {
            alertaExito(posicionTirada3, valCategoria, "$80.000");
          } else if (posicionTirada3 == 13) {
            alertaExito(posicionTirada3, valCategoria, "$90.000");
          } else if (posicionTirada3 == 14) {
            alertaExito(posicionTirada3, valCategoria, "$90.000");
          } else if (posicionTirada3 == 15) {
            alertaExito(posicionTirada3, valCategoria, "$100.000");
          } else if (posicionTirada3 == 17) {
            alertaExito(posicionTirada3, valCategoria, "$120.000");
          } else if (posicionTirada3 == 18) {
            alertaExito(posicionTirada3, valCategoria, "$200.000");
          } else if (posicionTirada3 == 19) {
            alertaExito(posicionTirada3, valCategoria, "$250.000");
          } else if (posicionTirada3 == 20) {
            alertaExito(posicionTirada3, valCategoria, "$300.000");
          }
        }

        ValBono.innerHTML =
          '<div style="display: flex;flex-direcction: column gap: 30px;"><div class="content-btn-enviar"><input class="form-control" id="valBono-promo" type="text" placeholder="# bono." /></div></div>';
      }
      tiradaActual++;
    });
  } else if (e.target.value.length >= 1) {
    alert("Ingresa un número entre 1 y 6");
    e.target.value = "";
  }
}

const board = document.getElementById("board");
const rollButton = document.getElementById("roll-button");
const message = document.getElementById("message");

const boardSize = 20;
let playerPosition = 0;
let playerName = "Jugador";

const fondoTablero = document.createElement("img");

fondoTablero.src = "/dinamicas/promocion-Escaleras/resources/fondo-borrar.png";
fondoTablero.alt = "fondo-tablero";
fondoTablero.className = "fondo-tablero";
board.appendChild(fondoTablero);

// Definir las escaleras y las serpientes
const snakes = {};
const ladders = {
  11: 14,
  16: 17,
};

function createBoard() {
  const rows = 5;
  const columns = 4;
  // board.innerHTML = "";
  cellMap = {}; // reinicia mapeo si se vuelve a crear

  let currentNumber = 1;
  const allRows = [];

  for (let r = 0; r < rows; r++) {
    const rowCells = [];

    for (let c = 0; c < columns; c++) {
      const cell = document.createElement("div");
      cell.id = `cell${currentNumber}`;
      cell.className = "cell";
      cell.innerText = currentNumber;
      cellMap[currentNumber] = cell;

      if (cell.id == "cell1") {
        cell.className += " cell1";

        const img = document.createElement("img");
        img.src = "/dinamicas/promocion-Escaleras/resources/tablon.png";
        img.alt = "Tablon";
        img.className = "tablon";
        cell.appendChild(img);

        const imgNumber = document.createElement("img");
        imgNumber.src = "/dinamicas/promocion-Escaleras/resources/numero-1.png";
        imgNumber.alt = "Numero 1";
        imgNumber.className = "numero-1";
        cell.appendChild(imgNumber);
      }

      if (cell.id == "cell2") {
        cell.className += " cell2";

        const img = document.createElement("img");
        img.src = "/dinamicas/promocion-Escaleras/resources/tablon.png";
        img.alt = "Tablon";
        img.className = "tablon";
        cell.appendChild(img);

        const imgSemaforo = document.createElement("img");
        imgSemaforo.src = "/dinamicas/promocion-Escaleras/resources/semaforo-2.png";
        imgSemaforo.alt = "semaforo-1";
        imgSemaforo.className = "semaforo-1";
        cell.appendChild(imgSemaforo);

        const imgNumber = document.createElement("img");
        imgNumber.src = "/dinamicas/promocion-Escaleras/resources/numero-2.png";
        imgNumber.alt = "Numero 2";
        imgNumber.className = "numero-1";
        cell.appendChild(imgNumber);

        if (screen.width >= 2000) {
          const img = document.createElement("img");
          img.src = "/dinamicas/promocion-Escaleras/resources/barilla.png";
          img.alt = "union";
          img.className = "union";
          cell.appendChild(img);
        }
      }

      if (cell.id == "cell3") {
        cell.className += " cell3";

        const img = document.createElement("img");
        img.src = "/dinamicas/promocion-Escaleras/resources/tablon.png";
        img.alt = "Tablon";
        img.className = "tablon";
        cell.appendChild(img);

        const imgNumber = document.createElement("img");
        imgNumber.src = "/dinamicas/promocion-Escaleras/resources/numero-3.png";
        imgNumber.alt = "Numero 3";
        imgNumber.className = "numero-1";
        cell.appendChild(imgNumber);

        if (screen.width >= 2000) {
          const img = document.createElement("img");
          img.src = "/dinamicas/promocion-Escaleras/resources/barilla.png";
          img.alt = "union";
          img.className = "union";
          cell.appendChild(img);
        }
      }

      if (cell.id == "cell4") {
        cell.className += " cell4";

        const imgCarril = document.createElement("img");
        imgCarril.src = "/dinamicas/promocion-Escaleras/resources/carril-2.png";
        imgCarril.alt = "Escalera";
        imgCarril.className = "content-union-carril";
        cell.appendChild(imgCarril);

        const imgNumber = document.createElement("img");
        imgNumber.src = "/dinamicas/promocion-Escaleras/resources/numero-4.png";
        imgNumber.alt = "Numero 4";
        imgNumber.className = "numero-1";
        cell.appendChild(imgNumber);

        if (screen.width >= 2000) {
          const img = document.createElement("img");
          img.src = "/dinamicas/promocion-Escaleras/resources/barilla-2.png";
          img.alt = "union";
          img.className = "union-2";
          cell.appendChild(img);
        }
      }

      if (cell.id == "cell5") {
        cell.className += " cell5";

        const img = document.createElement("img");
        img.src = "/dinamicas/promocion-Escaleras/resources/tablon.png";
        img.alt = "Tablon";
        img.className = "tablon-2";
        cell.appendChild(img);

        const imgNumber = document.createElement("img");
        imgNumber.src = "/dinamicas/promocion-Escaleras/resources/numero-5.png";
        imgNumber.alt = "Numero 5";
        imgNumber.className = "numero-1";
        cell.appendChild(imgNumber);

        if (screen.width >= 2000) {
          const img = document.createElement("img");
          img.src = "/dinamicas/promocion-Escaleras/resources/barilla.png";
          img.alt = "union";
          img.className = "union-3";
          cell.appendChild(img);
        }

        if (screen.width >= 2000) {
          const imgSemaforo2 = document.createElement("img");

          imgSemaforo2.src = "/dinamicas/promocion-Escaleras/resources/semaforo-1.png";
          imgSemaforo2.alt = "semaforo 2";
          imgSemaforo2.className = "semaforo-tv";
          cell.appendChild(imgSemaforo2);
        }
      }

      if (cell.id == "cell6") {
        cell.className += " cell6";

        const img = document.createElement("img");
        img.src = "/dinamicas/promocion-Escaleras/resources/tablon.png";
        img.alt = "Tablon";
        img.className = "tablon-2";
        cell.appendChild(img);

        const imgNumber = document.createElement("img");
        imgNumber.src = "/dinamicas/promocion-Escaleras/resources/numero-6.png";
        imgNumber.alt = "Numero 6";
        imgNumber.className = "numero-1";
        cell.appendChild(imgNumber);

        if (screen.width >= 2000) {
          const img = document.createElement("img");
          img.src = "/dinamicas/promocion-Escaleras/resources/barilla.png";
          img.alt = "union";
          img.className = "union-3";
          cell.appendChild(img);
        }
      }

      if (cell.id == "cell7") {
        cell.className += " cell7";
        const img = document.createElement("img");
        img.src = "/dinamicas/promocion-Escaleras/resources/tablon-2.png";
        img.alt = "Tablon";
        img.className = "tablon-3";
        cell.appendChild(img);

        const imgNumber = document.createElement("img");
        imgNumber.src = "/dinamicas/promocion-Escaleras/resources/numero-7.png";
        imgNumber.alt = "Numero 7";
        imgNumber.className = "numero-1";
        cell.appendChild(imgNumber);

        if (screen.width >= 2000) {
          const img = document.createElement("img");
          img.src = "/dinamicas/promocion-Escaleras/resources/barilla.png";
          img.alt = "union";
          img.className = "union-3";
          cell.appendChild(img);
        }
      }

      if (cell.id == "cell8") {
        cell.className += " cell8";

        const imgCarril = document.createElement("img");
        imgCarril.src = "/dinamicas/promocion-Escaleras/resources/carril-2.png";
        imgCarril.alt = "Escalera";
        imgCarril.className = "content-union-carril-2";
        cell.appendChild(imgCarril);

        const imgNumber = document.createElement("img");
        imgNumber.src = "/dinamicas/promocion-Escaleras/resources/numero-8.png";
        imgNumber.alt = "Numero 8";
        imgNumber.className = "numero-1";
        cell.appendChild(imgNumber);

        if (screen.width >= 2000) {
          const img = document.createElement("img");
          img.src = "/dinamicas/promocion-Escaleras/resources/barilla-2.png";
          img.alt = "union";
          img.className = "union-2";
          cell.appendChild(img);
        }
      }

      if (cell.id == "cell9") {
        cell.className += " cell9";

        const img = document.createElement("img");
        img.src = "/dinamicas/promocion-Escaleras/resources/tablon-2.png";
        img.alt = "Tablon";
        img.className = "tablon-4";
        cell.appendChild(img);

        const imgNumber = document.createElement("img");
        imgNumber.src = "/dinamicas/promocion-Escaleras/resources/numero-9.png";
        imgNumber.alt = "Numero 9";
        imgNumber.className = "numero-1";
        cell.appendChild(imgNumber);

        if (screen.width >= 2000) {
          const img = document.createElement("img");
          img.src = "/dinamicas/promocion-Escaleras/resources/barilla.png";
          img.alt = "union";
          img.className = "union";
          cell.appendChild(img);
        }
      }

      if (cell.id == "cell10") {
        cell.className += " cell10";
        const img = document.createElement("img");
        img.src = "/dinamicas/promocion-Escaleras/resources/tablon-2.png";
        img.alt = "Tablon";
        img.className = "tablon-4";
        cell.appendChild(img);

        const imgNumber = document.createElement("img");
        imgNumber.src = "/dinamicas/promocion-Escaleras/resources/numero-10.png";
        imgNumber.alt = "Numero 10";
        imgNumber.className = "numero-2";
        cell.appendChild(imgNumber);

        if (screen.width >= 2000) {
          const img = document.createElement("img");
          img.src = "/dinamicas/promocion-Escaleras/resources/barilla.png";
          img.alt = "union";
          img.className = "union";
          cell.appendChild(img);
        }
      }

      if (cell.id == "cell11") {
        cell.className += " cell11";
        const img = document.createElement("img");
        img.src = "/dinamicas/promocion-Escaleras/resources/tablon-2.png";
        img.alt = "Tablon";
        img.className = "tablon-4";
        cell.appendChild(img);

        const imgNumber = document.createElement("img");
        imgNumber.src = "/dinamicas/promocion-Escaleras/resources/numero-11.png";
        imgNumber.alt = "Numero 11";
        imgNumber.className = "numero-2";
        cell.appendChild(imgNumber);

        if (screen.width >= 2000) {
          const img = document.createElement("img");
          img.src = "/dinamicas/promocion-Escaleras/resources/barilla.png";
          img.alt = "union";
          img.className = "union";
          cell.appendChild(img);
        }

        if (screen.width >= 2000) {
          const imgCalleunion = document.createElement("img");
          img.src = "/dinamicas/promocion-Escaleras/resources/calle-union.png";
          img.alt = "calle-union";
          img.className = "calle-union";
          cell.appendChild(imgCalleunion);
        }

        const imgCalle = document.createElement("img");
        imgCalle.src = "/dinamicas/promocion-Escaleras/resources/calle.png";
        imgCalle.alt = "Tablon";
        imgCalle.className = "calle";
        cell.appendChild(imgCalle);
      }

      if (cell.id == "cell12") {
        cell.className += " cell12";

        const imgCarril = document.createElement("img");
        imgCarril.src = "/dinamicas/promocion-Escaleras/resources/carril-2.png";
        imgCarril.alt = "Escalera";
        imgCarril.className = "content-union-carril";
        cell.appendChild(imgCarril);

        const imgNumber = document.createElement("img");
        imgNumber.src = "/dinamicas/promocion-Escaleras/resources/numero-12.png";
        imgNumber.alt = "Numero 12";
        imgNumber.className = "numero-2";
        cell.appendChild(imgNumber);

        if (screen.width >= 2000) {
          const img = document.createElement("img");
          img.src = "/dinamicas/promocion-Escaleras/resources/barilla-2.png";
          img.alt = "union";
          img.className = "union-2";
          cell.appendChild(img);
        }
      }

      if (cell.id == "cell13") {
        cell.className += " cell13";

        const img = document.createElement("img");
        img.src = "/dinamicas/promocion-Escaleras/resources/tablon.png";
        img.alt = "Tablon";
        img.className = "tablon-2";
        cell.appendChild(img);

        const imgNumber = document.createElement("img");
        imgNumber.src = "/dinamicas/promocion-Escaleras/resources/numero-13.png";
        imgNumber.alt = "Numero 13";
        imgNumber.className = "numero-2";
        cell.appendChild(imgNumber);

        if (screen.width >= 2000) {
          const img = document.createElement("img");
          img.src = "/dinamicas/promocion-Escaleras/resources/barilla.png";
          img.alt = "union";
          img.className = "union-3";
          cell.appendChild(img);
        }
      }

      if (cell.id == "cell14") {
        cell.className += " cell14";

        const img = document.createElement("img");
        img.src = "/dinamicas/promocion-Escaleras/resources/tablon.png";
        img.alt = "Tablon";
        img.className = "tablon-2";
        cell.appendChild(img);

        const imgNumber = document.createElement("img");
        imgNumber.src = "/dinamicas/promocion-Escaleras/resources/numero-14.png";
        imgNumber.alt = "Numero 14";
        imgNumber.className = "numero-2";
        cell.appendChild(imgNumber);

        if (screen.width >= 2000) {
          const img = document.createElement("img");
          img.src = "/dinamicas/promocion-Escaleras/resources/barilla.png";
          img.alt = "union";
          img.className = "union-3";
          cell.appendChild(img);
        }

        const imgSemaforo2 = document.createElement("img");

        imgSemaforo2.src = "/dinamicas/promocion-Escaleras/resources/semaforo-1.png";
        imgSemaforo2.alt = "semaforo 2";
        imgSemaforo2.className = "semaforo-2";
        cell.appendChild(imgSemaforo2);
      }

      if (cell.id == "cell15") {
        cell.className += " cell15";

        const img = document.createElement("img");
        img.src = "/dinamicas/promocion-Escaleras/resources/tablon.png";
        img.alt = "Tablon";
        img.className = "tablon-2";
        cell.appendChild(img);

        const imgNumber = document.createElement("img");
        imgNumber.src = "/dinamicas/promocion-Escaleras/resources/numero-15.png";
        imgNumber.alt = "Numero 15";
        imgNumber.className = "numero-2";
        cell.appendChild(imgNumber);

        if (screen.width >= 2000) {
          const img = document.createElement("img");
          img.src = "/dinamicas/promocion-Escaleras/resources/barilla.png";
          img.alt = "union";
          img.className = "union-3";
          cell.appendChild(img);
        }
      }

      if (cell.id == "cell16") {
        cell.className += " cell16";

        const imgCarril = document.createElement("img");
        imgCarril.src = "/dinamicas/promocion-Escaleras/resources/carril-3.png";
        imgCarril.alt = "Escalera";
        imgCarril.className = "content-union-carril-2";
        cell.appendChild(imgCarril);

        const imgNumber = document.createElement("img");
        imgNumber.src = "/dinamicas/promocion-Escaleras/resources/numero-16.png";
        imgNumber.alt = "Numero 16";
        imgNumber.className = "numero-2";
        cell.appendChild(imgNumber);

        if (screen.width >= 2000) {
          const img = document.createElement("img");
          img.src = "/dinamicas/promocion-Escaleras/resources/barilla-2.png";
          img.alt = "union";
          img.className = "union-2";
          cell.appendChild(img);
        }
      }

      if (cell.id == "cell17") {
        cell.className += " cell17";

        const img = document.createElement("img");
        img.src = "/dinamicas/promocion-Escaleras/resources/tablon-2.png";
        img.alt = "Tablon";
        img.className = "tablon-4";
        cell.appendChild(img);

        const imgNumber = document.createElement("img");
        imgNumber.src = "/dinamicas/promocion-Escaleras/resources/numero-17.png";
        imgNumber.alt = "Numero 17";
        imgNumber.className = "numero-2";
        cell.appendChild(imgNumber);

        if (screen.width >= 2000) {
          const img = document.createElement("img");
          img.src = "/dinamicas/promocion-Escaleras/resources/barilla.png";
          img.alt = "union";
          img.className = "union";
          cell.appendChild(img);
        }

        if (screen.width >= 2000) {
          const imgSemaforo2 = document.createElement("img");

          imgSemaforo2.src = "/dinamicas/promocion-Escaleras/resources/semaforo-2.png";
          imgSemaforo2.alt = "semaforo 2";
          imgSemaforo2.className = "semaforo-tv-2";
          cell.appendChild(imgSemaforo2);
        }
      }

      if (cell.id == "cell18") {
        cell.className += " cell18";

        const img = document.createElement("img");
        img.src = "/dinamicas/promocion-Escaleras/resources/tablon-3.png";
        img.alt = "Tablon";
        img.className = "tablon-4";
        cell.appendChild(img);

        const imgNumber = document.createElement("img");
        imgNumber.src = "/dinamicas/promocion-Escaleras/resources/numero-18.png";
        imgNumber.alt = "Numero 18";
        imgNumber.className = "numero-2";
        cell.appendChild(imgNumber);

        if (screen.width >= 2000) {
          const img = document.createElement("img");
          img.src = "/dinamicas/promocion-Escaleras/resources/barilla.png";
          img.alt = "union";
          img.className = "union";
          cell.appendChild(img);
        }
      }

      if (cell.id == "cell19") {
        cell.className += " cell19";

        const img = document.createElement("img");
        img.src = "/dinamicas/promocion-Escaleras/resources/tablon.png";
        img.alt = "Tablon";
        img.className = "tablon-4";
        cell.appendChild(img);

        const imgNumber = document.createElement("img");
        imgNumber.src = "/dinamicas/promocion-Escaleras/resources/numero-19.png";
        imgNumber.alt = "Numero 19";
        imgNumber.className = "numero-2";
        cell.appendChild(imgNumber);
      }

      if (cell.id == "cell20") {
        cell.className += " cell20";
        const img = document.createElement("img");
        img.src = "/dinamicas/promocion-Escaleras/resources/confetti.gif";
        img.alt = "Escalera";
        img.className = "content-flecha-curva-5";
        cell.appendChild(img);

        const imgNumber = document.createElement("img");
        imgNumber.src = "/dinamicas/promocion-Escaleras/resources/numero-20.png";
        imgNumber.alt = "Numero 20";
        imgNumber.className = "numero-2";
        cell.appendChild(imgNumber);
      }

      rowCells.push(cell);
      currentNumber++;
    }

    if (r % 2 !== 0) rowCells.reverse();
    allRows.push(rowCells);
  }

  allRows.reverse().forEach((row) => {
    row.forEach((cell) => board.appendChild(cell));
  });
}

function rollDice() {
  const diceValue = Math.floor(Math.random() * 6) + 1;
  message.innerText = `${playerName} a sacado ${diceValue}`;
  movePlayer(diceValue);
}

function movePlayer(diceValue, callbackFinal = () => {}) {
  isMoving = true; // === NUEVO ===
  let steps = 0;
  const contentTren = document.getElementById("content-tren");

  const interval = setInterval(() => {
    if (steps < diceValue) {
      playerPosition++;
      if (playerPosition > boardSize) playerPosition = boardSize;

      if (playerPosition == 5) contentTren.src = "/dinamicas/promocion-Escaleras/resources/tren-2.png";
      if (playerPosition == 9) contentTren.src = "/dinamicas/promocion-Escaleras/resources/tren.png";
      if (playerPosition == 13) contentTren.src = "/dinamicas/promocion-Escaleras/resources/tren-2.png";
      if (playerPosition == 17) contentTren.src = "/dinamicas/promocion-Escaleras/resources/tren.png";

      updateBoard(true);
      steps++;
    } else {
      clearInterval(interval);

      const finish = () => {
        updateBoard(false);
        isMoving = false; // === NUEVO ===
        callbackFinal();
      };

      if (snakes[playerPosition]) {
        playerPosition = snakes[playerPosition];
        message.innerText += ` ¡Ay! Serpiente, ahora estás en ${playerPosition}`;
        finish();
      } else if (ladders[playerPosition]) {
        playerPosition = ladders[playerPosition];
        Swal.fire({
          icon: "success",
          title: "Gran avance.",
          text: `¡Bien! Carril de atajo, ahora estás en la estación ${playerPosition}`,
          confirmButtonColor: "#a13b22",
          customClass: {
            popup: "mi-popup",
            title: "mi-titulo",
            confirmButton: "btn-Send mi-boton",
          },
        }).then((result) => {
          if (result.isConfirmed) {
            if (playerPosition == 14) contentTren.src = "/dinamicas/promocion-Escaleras/resources/tren-2.png";
            if (playerPosition == 17) contentTren.src = "/dinamicas/promocion-Escaleras/resources/tren.png";
            message.innerText += `¡Bien! Carril de atajo, ahora estás en la estación ${playerPosition}`;
            finish();
          } else {
            isMoving = false; // seguridad
          }
        });
      } else {
        finish();
      }
    }
  }, 300);
}

function deshacerTirada() {
  if (isMoving) {
    Swal.fire({
      icon: "info",
      title: "Espera",
      text: "El tren aún está en movimiento.",
    });
    return;
  }

  // Si no has hecho ninguna tirada, no hay nada que deshacer
  if (tiradaActual <= 1 && checkpoints[1] === 0) {
    Swal.fire({ icon: "info", title: "Nada para deshacer" });
    return;
  }

  // La "última tirada realizada" es tiradaActual - 1
  const ultima = Math.max(1, tiradaActual - 1);
  let volverA = checkpoints[ultima];

  // Volver a la posición guardada (si 0, regresar a la casilla inicial)
  if (volverA === 0) {
    playerPosition = 0;
    placePlayerAtStart();
  } else {
    playerPosition = volverA;
    updateBoard(false);
  }
  setTrainImageByPosition(playerPosition);

  const inp1 = document.getElementById("input1");
  const inp2 = document.getElementById("input2");
  const inp3 = document.getElementById("input3");
  const valGanador = document.getElementById("resultado-ganador");
  const ValBono = document.getElementById("valBono");

  // Limpia UI de premio y bono si estabas en la 3ra tirada
  if (ValBono) ValBono.innerHTML = "";
  valGanador.innerHTML = "";

  if (ultima === 3) {
    // Deshacer la 3ra tirada: reintentar input3
    posicionTirada3 = 0;
    const pos3 = document.getElementById("pos3");
    if (pos3) pos3.innerText = "Tirada 3: -";
    inp3.value = "";
    inp3.disabled = false;
    tiradaActual = 3;
  } else if (ultima === 2) {
    // Deshacer la 2da: reintentar input2 y bloquear input3
    posicionTirada2 = 0;
    const pos2 = document.getElementById("pos2");
    if (pos2) pos2.innerText = "Tirada 2: -";
    inp2.value = "";
    inp2.disabled = false;
    inp3.value = "";
    inp3.disabled = true;
    tiradaActual = 2;
  } else {
    // Deshacer la 1ra: reintentar input1 y bloquear 2 y 3
    posicionTirada1 = 0;
    const pos1 = document.getElementById("pos1");
    if (pos1) pos1.innerText = "Tirada 1: -";
    inp1.value = "";
    inp1.disabled = false;
    inp2.value = "";
    inp2.disabled = true;
    inp3.value = "";
    inp3.disabled = true;
    tiradaActual = 1;
  }

  message.innerText = "Tirada deshecha. Vuelve a ingresar el Lanz.";
}

function reiniciarRonda() {
  if (isMoving) {
    Swal.fire({
      icon: "info",
      title: "Espera",
      text: "El tren aún está en movimiento.",
    });
    return;
  }
  posicionTirada1 = 0;
  posicionTirada2 = 0;
  posicionTirada3 = 0;
  tiradaActual = 1;
  playerPosition = 0;
  placePlayerAtStart();
  setTrainImageByPosition(playerPosition);

  const pos1 = document.getElementById("pos1");
  const pos2 = document.getElementById("pos2");
  const pos3 = document.getElementById("pos3");
  if (pos1) pos1.innerText = "Tirada 1: -";
  if (pos2) pos2.innerText = "Tirada 2: -";
  if (pos3) pos3.innerText = "Tirada 3: -";

  const inp1 = document.getElementById("input1");
  const inp2 = document.getElementById("input2");
  const inp3 = document.getElementById("input3");
  inp1.value = "";
  inp2.value = "";
  inp3.value = "";
  // respeta tu validación de campos requeridos
  checkFields(); // esto habilita/inhabilita input1 según tus requiredFields
  inp2.disabled = true;
  inp3.disabled = true;

  const valGanador = document.getElementById("resultado-ganador");
  const ValBono = document.getElementById("valBono");
  if (valGanador) valGanador.innerHTML = "";
  if (ValBono) ValBono.innerHTML = "";

  // Limpia checkpoints
  checkpoints = [0, 0, 0, 0];

  message.innerText = "Ronda reiniciada.";
}

function updateBoard() {
  const token = document.getElementById("player-token");
  const cell = cellMap[playerPosition];
  if (!cell || !token) return;

  const left = cell.offsetLeft + cell.offsetWidth / 2 - token.offsetWidth / 2;
  const top = cell.offsetTop + cell.offsetHeight / 2 - token.offsetHeight / 2;

  token.style.left = `${left}px`;
  token.style.top = `${top}px`;
}

function alertaExito(posicion, valCate, recompensa) {
  const valGanador = document.getElementById("resultado-ganador");
  valGanador.innerHTML = `Has llegado a la estación ${posicion}, con un premio de ${recompensa} en Dinero Promocional, con categoria ${valCate}
  `;
  Swal.fire({
    icon: "success",
    title: `Categoría ${valCate}.`,
    html: `Has llegado a la estación ${posicion}, con un premio de <span class="valrecompensa">${recompensa} en Dinero Promocional</span>`,
    confirmButtonColor: "#a13b22",
    customClass: {
      popup: "mi-popup",
      title: "mi-titulo",
      confirmButton: "btn-Send mi-boton",
    },
  });
}

createBoard();
placePlayerAtStart();

function placePlayerAtStart() {
  const token = document.getElementById("player-token");
  const cell = cellMap[1];

  const left = cell.offsetLeft + cell.offsetWidth / 2 - token.offsetWidth / 2;
  const top = cell.offsetTop + cell.offsetHeight / 2 - token.offsetHeight / 2;

  if (!cell || !token) return;

  token.style.left = `${left}px`;
  token.style.top = `${top}px`;
}

function handleSendInfo() {
  const valor1 = document.getElementById("input1").value;
  const valor2 = document.getElementById("input2").value;
  const valor3 = document.getElementById("input3").value;

  const nombre = document.getElementById("nombre").value;
  const categoria = document.getElementById("categoria").value;
  const casino = document.getElementById("casino").value;
  const cedula = document.getElementById("cedula").value;
  const loader = document.getElementById("loader");

  const val1 = parseInt(valor1);
  const val2 = parseInt(valor2);
  const val3 = parseInt(valor3);

  const lastposicion = posicionTirada3;

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

  if (categoria == "ADICIONAL") {
    loader.style.display = "flex";
    const dataAd = {
      tipo: "dinamica",
      hora,
      fecha,
      nombre,
      cedula,
      casino,
      categoria,
      resultado: lastposicion,
      valBono: "0",
      promocion,
    };

    fetch(url, {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify(dataAd),
    })
      .then((response) => response.text())
      .then(() => {
        setTimeout(() => {
          loader.style.display = "none";
          Swal.fire({
            icon: "success",
            title: "Envió Exitoso.",
            text: `El envió de la información fue exitoso.`,
          }).then((result) => {
            if (result.isConfirmed) {
              location.reload();
            }
          });
        }, 2000);
      });
    return;
  }

  if (!document.getElementById("valBono-promo")) {
    Swal.fire({
      icon: "warning",
      title: `Campos vacios.`,
      text: `Por favor, completa toda la información`,
      confirmButtonColor: "#a13b22",
    });
    return;
  }
  const valBono = document.getElementById("valBono-promo").value;


  loader.style.display = "flex";

  if (nombre == "" || categoria == "" || casino == "" || cedula == "") {
    Swal.fire({
      icon: "warning",
      title: `Campos vacios.`,
      text: `Por favor, completa toda la información`,
      confirmButtonColor: "#a13b22",
    });
    return;
  }

  const data = {
    tipo: "dinamica",
    hora,
    fecha,
    nombre,
    cedula,
    casino,
    categoria,
    resultado: lastposicion,
    valBono,
    promocion,
  };

  const hoy = new Date().toDateString();
  const ultimaFecha = localStorage.getItem("fechaTren");

  if (ultimaFecha !== hoy) {
    localStorage.setItem("registrosTren", JSON.stringify([]));
    localStorage.setItem("fechaTren", hoy);
  }

  let registrosTren = JSON.parse(localStorage.getItem("registrosTren")) || [];
  registrosTren.push(data);
  localStorage.setItem("registrosTren", JSON.stringify(registrosTren));

  fetch(url, {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify(data),
  })
    .then((response) => response.text())
    .then(() => {
      setTimeout(() => {
        loader.style.display = "none";
        Swal.fire({
          icon: "success",
          title: "Envió Exitoso.",
          text: `El envió de la información fue exitoso.`,
        }).then((result) => {
          if (result.isConfirmed) {
            location.reload();
          }
        });
      }, 2000);
    })
    .catch((error) => {
      console.warn(error, "error");
      loader.style.display = "none";
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo enviar la información. Intenta nuevamente.",
        confirmButtonColor: "#dc3545",
      });
    });
}

function AllReset() {
  cellMap = {};
}

function verificarResetRegistro() {
  const hoy = new Date().toDateString();
  const ultimaFecha = localStorage.getItem("fechaTren");

  if (ultimaFecha !== hoy) {
    localStorage.setItem("registrosTren", JSON.stringify([]));
    localStorage.setItem("fechaTren", hoy);
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
    });
    return;
  } else {
    mostrarRegistros();
    document.getElementById("modal-ultimos-registros-tren").style.display =
      "flex";
  }
}

function cerrarModal2() {
  document.getElementById("modal-ultimos-registros-tren").style.display =
    "none";
}

function abrirModal() {
  document.getElementById("datos-modal-tren").style.display = "flex";
}

function cerrarModal() {
  document.getElementById("datos-modal-tren").style.display = "none";
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

function setTrainImageByPosition(pos) {
  const contentTren = document.getElementById("content-tren");
  if (!contentTren) return;
  if (pos >= 17) contentTren.src = "/dinamicas/promocion-Escaleras/resources/tren.png";
  else if (pos >= 13) contentTren.src = "/dinamicas/promocion-Escaleras/resources/tren-2.png";
  else if (pos >= 9) contentTren.src = "/dinamicas/promocion-Escaleras/resources/tren.png";
  else if (pos >= 5) contentTren.src = "/dinamicas/promocion-Escaleras/resources/tren-2.png";
  else contentTren.src = "/dinamicas/promocion-Escaleras/resources/tren.png";
}

function mostrarRegistros() {
  const ultimosRegistros = document.getElementById("ultimos-registros-tren");
  const registros = JSON.parse(localStorage.getItem("registrosTren")) || [];
  const casinoNumero = document.getElementById("casino-numero-tren");
  const valInfo = document.getElementById("Info-tren");
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
  <div class="table-result-tren">
    <table class="styled-table-tren">
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

function HandleSecondSubmit() {
  const casinoModal = document.getElementById("casino-modal-tren");
  const categoriaModal = document.getElementById("categoria-modal-tren");
  const cedulaModal = document.getElementById("cedula-modal-tren");
  const nombreModal = document.getElementById("nombre-modal-tren");
  const horaModal = document.getElementById("hora-modal-tren");
  const fechaModal = document.getElementById("fecha-modal-tren");
  const posicionModal = document.getElementById("posicion-modal-tren");
  const bonoModal = document.getElementById("bono-modal-tren");

  const valCasinoModal = casinoModal.value.trim();
  const valCategoriaModal = categoriaModal.value.trim();
  const valCedulaModal = cedulaModal.value.trim();
  const valNombreModal = nombreModal.value.trim();
  const valHoraModal = horaModal.value.trim();
  const valFechaModal = fechaModal.value.trim();
  const valPosicionModal = posicionModal.value.trim();
  const valBonoModal = bonoModal.value.trim();

  const loader = document.getElementById("loader");

  const data = {
    tipo: "dinamica",
    casino: valCasinoModal,
    categoria: valCategoriaModal,
    cedula: valCedulaModal,
    nombre: valNombreModal,
    hora: valHoraModal,
    fecha: valFechaModal,
    resultado: valPosicionModal,
    valBono: valBonoModal,
    promocion,
  };

  loader.style.display = "flex";

  fetch(url, {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify(data),
  })
    .then((response) => response.text())
    .then(() => {
      casinoModal.value = "";
      categoriaModal.value = "";
      cedulaModal.value = "";
      nombreModal.value = "";
      horaModal.value = "";
      fechaModal.value = "";
      bonoModal.value = "";
      posicionModal.value = "";

      setTimeout(() => {
        loader.style.display = "none";
        Swal.fire({
          icon: "success",
          title: "EXITO",
          text: "El envio de la información fue exitoso.",
          confirmButtonColor: "#dc3545",
        }).then((result) => {
          if (result.isConfirmed) {
            location.reload();
          }
        }, 1000);
      });
    })
    .catch((error) => {});
}

function HandleObservacionSend() {
  const valCasino = document.getElementById("casino-modal-observacion");
  const valObservacion = document.getElementById("casino-modal-descripcion");
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

  const valCasinoObs = valCasino.value.trim();
  const valObservacionObs = valObservacion.value.trim();

  if (!valCasinoObs || !valObservacionObs) {
    Swal.fire({
      icon: "warning",
      title: "Campos vacíos",
      text: "Debes llenar todos los campos.",
      confirmButtonColor: "#dc3545",
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
      });
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
    origin: { y: 0.5, x: 0.2 },
  });
  confetti({
    particleCount: 200,
    spread: 70,
    origin: { y: 0.4, x: 0.2 },
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
    origin: { y: 0.5 },
  });
  confetti({
    particleCount: 200,
    spread: 70,
    origin: { y: 0.4 },
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
  confetti({
    particleCount: 200,
    spread: 70,
    origin: { y: 0.5, x: 0.8 },
  });
  confetti({
    particleCount: 200,
    spread: 70,
    origin: { y: 0.4, x: 0.8 },
  });
}

window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  const btn_send = document.getElementById("btn_send_info");
  if (loader) loader.style.display = "none";
  if (btn_send) btn_send.style.display = "none";
});

const promocion = "El Flechazo de Cupido";
const casino = document.getElementById("casino");
const categoria = document.getElementById("categoria");
const cedula = document.getElementById("cedula");
const nombre = document.getElementById("nombre");
const board = document.querySelector(".board");
const onlyImg9 = document.getElementById("img_9");

document.addEventListener("DOMContentLoaded", () => {
  initCupidoStorage();
  const notificacionRegitro = document.getElementById(
    "notificacion_registro_dia"
  );
  notificacionRegitro.style.display = "none";
  document.getElementById("categoria").addEventListener("input", () => {
    if (document.getElementById("categoria").value == "ADICIONAL") {
      document.getElementById("btn_send_info").style.display = "flex";
      document.getElementById("bono").style.display = "none";
      board.style.display = "none";
    } else {
      document.getElementById("btn_send_info").style.display = "none";
      document.getElementById("bono").style.display = "flex";
      board.style.display = "flex";
    }
  });

  document.getElementById("envio_suplementario").style.display = "none";
  document.getElementById("envio_observacion").style.display = "none";
  document.getElementById("tabla_premios_cupido").style.display = "none";
  document.getElementById("tabla_premios").style.display = "none";

  document
    .getElementById("btn_envio_suplementario")
    .addEventListener("click", () => {
      document.getElementById("envio_suplementario").style.display = "flex";
      document.getElementById("envio_observacion").style.display = "none";
      document.getElementById("tabla_premios_cupido").style.display = "none";
      document.getElementById("tabla_premios").style.display = "none";
    });

  document
    .getElementById("btn_envio_observacion")
    .addEventListener("click", () => {
      document.getElementById("envio_suplementario").style.display = "none";
      document.getElementById("envio_observacion").style.display = "flex";
      document.getElementById("tabla_premios_cupido").style.display = "none";
      document.getElementById("tabla_premios").style.display = "none";
    });

  document.getElementById("btn_tabla_premios").addEventListener("click", () => {
    document.getElementById("envio_suplementario").style.display = "none";
    document.getElementById("envio_observacion").style.display = "none";
    document.getElementById("tabla_premios_cupido").style.display = "flex";
    document.getElementById("tabla_premios").style.display = "none";
  });

  document.getElementById("btn_registros_dia").addEventListener("click", () => {
    document.getElementById("envio_suplementario").style.display = "none";
    document.getElementById("envio_observacion").style.display = "none";
    document.getElementById("tabla_premios_cupido").style.display = "none";
    document.getElementById("tabla_premios").style.display = "flex";
  });

  document.getElementById("btn_ocultar_info").addEventListener("click", () => {
    document.getElementById("btn_send_info").classList.toggle("hidden");
    document.getElementById("btn_open_info").classList.toggle("hidden");
    document
      .getElementById("btn_ocultar_info")
      .classList.toggle("posicion_real");

    document
      .getElementById("btn_ocultar_info")
      .classList.toggle("posicion_btn");

    document
      .getElementById("info-control-finalista")
      .classList.toggle("hidden");

    const ocultoView = document
      .getElementById("info-control-finalista")
      .classList.contains("hidden");

    document.getElementById("btn_ocultar_info").textContent = ocultoView
      ? "Mostrar"
      : "Ocultar";
  });

  if (!board) return;

  function isFormOk() {
    return (
      casino.value.trim() !== "" &&
      categoria.value.trim() !== "" &&
      nombre.value.trim() !== "" &&
      /^\d+$/.test(cedula.value.trim())
    );
  }

  function sync() {
    const ok = isFormOk();
    board.classList.toggle("locked", !ok);

    if (ok) {
      document;
      if (onlyImg9) onlyImg9.style.pointerEvents = "auto";
    }
  }

  sync();

  [casino, categoria, cedula, nombre].forEach((el) => {
    ["input", "change"].forEach((evt) => el.addEventListener(evt, sync));
  });

  const MAX = 4;
  const totalEl = document.getElementById("total-cupido");
  const maxEl = document.getElementById("max-cupido");
  const ficha = document.getElementById("ficha-cupido");
  const btnUndo = document.getElementById("btn-undo");
  const btnReset = document.getElementById("btn-reset");
  const btnResetTablero = document.getElementById("btn-reset-teblero");
  const tirosEl = document.getElementById("tiros-cupido");
  const url = "";

  if (maxEl) maxEl.textContent = MAX;

  let total = 0;
  const selectedStack = []; // historial de IDs seleccionados (para deshacer)

  let tiros = 0;

  const imgs = Array.from(
    document.querySelectorAll(".board .img-content-text img")
  );

  function getTotal() {
    return imgs.reduce((acc, el) => {
      const score = Number(el.dataset.score || 0); // <-- ANTES: Number(1)
      return (
        acc + (score === 1 && el.classList.contains("is-selected") ? 1 : 0)
      );
    }, 0);
  }

  // Tabla de premios por categoría y aciertos
  const PRIZES = {
    GENIUS: { 4: "$600.000", 3: "$170.000", 2: "$160.000", 1: "$150.000" },
    TITANIO: { 4: "$500.000", 3: "$150.000", 2: "$140.000", 1: "$130.000" },
    LEGENDARIO: { 4: "$400.000", 3: "$130.000", 2: "$120.000", 1: "$110.000" },
    GOLD: { 4: "$300.000", 3: "$110.000", 2: "$100.000", 1: "$90.000" },
    SILVER: { 4: "$250.000", 3: "$90.000", 2: "$80.000", 1: "$70.000" },
    BRONCE: { 4: "$200.000", 3: "$70.000", 2: "$60.000", 1: "$50.000" },
    SUPERIORMARCOPOLO: {
      4: "$300.000",
      3: "$120.000",
      2: "$110.000",
      1: "$100.000",
    },
    ESTANDARMARCOPOLO: {
      4: "$200.000",
      3: "$100.000",
      2: "$90.000",
      1: "$80.000",
    },
    SUPERIORALADDIN: {
      4: "$300.000",
      3: "$90.000",
      2: "$80.000",
      1: "$70.000",
    },
    ESTANDARALADDIN: {
      4: "$200.000",
      3: "$70.000",
      2: "$60.000",
      1: "$50.000",
    },
  };

  const getPrize = (categoria, aciertos) =>
    PRIZES[categoria]?.[aciertos] ?? null;

  function updateUI() {
    const total2 = getTotal(); // <-- calcula siempre desde el DOM
    if (totalEl) totalEl.textContent = total2; // <-- ANTES: total
    if (tirosEl) tirosEl.textContent = tiros;
    if (ficha) {
      const pct = (total2 / MAX) * 100; // <-- ANTES: total
      ficha.style.bottom = pct + "%";
    }
    window.cupidoTotal = total2; // <-- ANTES: total
    if (typeof test === "function") test(total2); // evita error si test no existe

    const categoria = document.getElementById("categoria").value;

    const prize = getPrize(categoria, total2);
    if (tirosEl.textContent == "4") {
      if (categoria == "GENIUS") {
        if (total2 == "4") {
          alertWin(total2, categoria, prize);
        } else if (total2 == "3") {
          alertWin(total2, categoria, prize);
        } else if (total2 == "2") {
          alertWin(total2, categoria, prize);
        } else if (total2 == "1") {
          alertWin(total2, categoria, prize);
        } else {
          alertNoPremio(categoria);
        }
      } else if (categoria == "TITANIO") {
        if (total2 == "4") {
          alertWin(total2, categoria, prize);
        } else if (total2 == "3") {
          alertWin(total2, categoria, prize);
        } else if (total2 == "2") {
          alertWin(total2, categoria, prize);
        } else if (total2 == "1") {
          alertWin(total2, categoria, prize);
        } else {
          alertNoPremio(categoria);
        }
      } else if (categoria == "LEGENDARIO") {
        if (total2 == "4") {
          alertWin(total2, categoria, prize);
        } else if (total2 == "3") {
          alertWin(total2, categoria, prize);
        } else if (total2 == "2") {
          alertWin(total2, categoria, prize);
        } else if (total2 == "1") {
          alertWin(total2, categoria, prize);
        } else {
          alertNoPremio(categoria);
        }
      } else if (categoria == "GOLD") {
        if (total2 == "4") {
          alertWin(total2, categoria, prize);
        } else if (total2 == "3") {
          alertWin(total2, categoria, prize);
        } else if (total2 == "2") {
          alertWin(total2, categoria, prize);
        } else if (total2 == "1") {
          alertWin(total2, categoria, prize);
        } else {
          alertNoPremio(categoria);
        }
      } else if (categoria == "SILVER") {
        if (total2 == "4") {
          alertWin(total2, categoria, "$250.000");
        } else if (total2 == "3") {
          alertWin(total2, categoria, "$90.000");
        } else if (total2 == "2") {
          alertWin(total2, categoria, "$80.000");
        } else if (total2 == "1") {
          alertWin(total2, categoria, "$70.000");
        } else {
          alertNoPremio(categoria);
        }
      } else if (categoria == "BRONCE") {
        if (total2 == "4") {
          alertWin(total2, categoria, "$200.000");
        } else if (total2 == "3") {
          alertWin(total2, categoria, "$70.000");
        } else if (total2 == "2") {
          alertWin(total2, categoria, "$60.000");
        } else if (total2 == "1") {
          alertWin(total2, categoria, "$50.000");
        } else {
          alertNoPremio(categoria);
        }
      } else if (categoria == "SUPERIORMARCOPOLO") {
        if (total2 == "4") {
          alertWin(total2, categoria, "$300.000");
        } else if (total2 == "3") {
          alertWin(total2, categoria, "$120.000");
        } else if (total2 == "2") {
          alertWin(total2, categoria, "$110.000");
        } else if (total2 == "1") {
          alertWin(total2, categoria, "$100.000");
        } else {
          alertNoPremio(categoria);
        }
      } else if (categoria == "ESTANDARMARCOPOLO") {
        if (total2 == "4") {
          alertWin(total2, categoria, "$200.000");
        } else if (total2 == "3") {
          alertWin(total2, categoria, "$100.000");
        } else if (total2 == "2") {
          alertWin(total2, categoria, "$90.000");
        } else if (total2 == "1") {
          alertWin(total2, categoria, "$80.000");
        } else {
          alertNoPremio(categoria);
        }
      } else if (categoria == "SUPERIORALADDIN") {
        if (total2 == "4") {
          alertWin(total2, categoria, "$300.000");
        } else if (total2 == "3") {
          alertWin(total2, categoria, "$90.000");
        } else if (total2 == "2") {
          alertWin(total2, categoria, "$80.000");
        } else if (total2 == "1") {
          alertWin(total2, categoria, "$70.000");
        } else {
          alertNoPremio(categoria);
        }
      } else if (categoria == "ESTANDARALADDIN") {
        if (total2 == "4") {
          alertWin(total2, categoria, "$200.000");
        } else if (total2 == "3") {
          alertWin(total2, categoria, "$70.000");
        } else if (total2 == "2") {
          alertWin(total2, categoria, "$60.000");
        } else if (total2 == "1") {
          alertWin(total2, categoria, "$50.000");
        } else {
          alertNoPremio(categoria);
        }
      }
    }
  }

  function alertWin(totalM, categoriaM, premioM) {
    const btn_send_info = document.getElementById("btn_send_info");
    btn_send_info.style.display = "flex";
    const textPremio = document.getElementById("result_premio_modal");
    textPremio.innerHTML = `Flechazo Exitoso, Ganaste un premio de <strong style="font-size : 2rem">${premioM}</strong> en Dinero Promocional con <strong style="font-size : 2rem">${totalM}</strong> ${
      totalM == 1 ? "flechazo" : "flechazos"
    }`;
    Swal.fire({
      icon: "success",
      title: `Con ${categoriaM}.`,
      html: `Flechazo Exitoso, Ganaste premio de <strong style="font-size : 2rem">${premioM}</strong> en Dinero Promocional con ${totalM} ${
        totalM == 1 ? "flechazo" : "flechazos"
      }.`,
      allowOutsideClick: false,
      confirmButtonColor: "#dc3545",
      customClass: {
        popup: "mi-popup",
        title: "mi-titulo",
        confirmButton: "btn btn-danger",
      },
    });

    board.classList.add("locked-alert");
    confetti({
      particleCount: 200,
      spread: 70,
      origin: { y: 0.8, x: 0.2 },
    });
    confetti({
      particleCount: 200,
      spread: 70,
      origin: { y: 0.8 },
    });
    confetti({
      particleCount: 200,
      spread: 70,
      origin: { y: 0.8, x: 0.8 },
    });
  }

  function alertNoPremio(categoriaNoPremio) {
    Swal.fire({
      icon: "error",
      title: `Con ${categoriaNoPremio}.`,
      html: `Lo sentimos, no ganaste premio, Deseas reiniciar el tablero ahora?.`,
      allowOutsideClick: false,
      showCancelButton: true,
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#dc3545",
      confirmButtonText: "Si quiero!",
      cancelButtonText: "No quiero!",
      customClass: {
        popup: "mi-popup",
        title: "mi-titulo",
        confirmButton: "btn btn-danger",
        cancelButton: " btn btn-danger",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        document
          .querySelectorAll(".board .img-content-text img")
          .forEach((img) => {
            img.classList.remove(
              "is-selected",
              "limit",
              "select_plus",
              "select_none",
              "select_down"
            );
            img.style.removeProperty("pointer-events");
          });

        selectedStack.length = 0;
        tiros = 0;
        total = 0;

        const totalCupid = document.getElementById("total-cupido");
        const tirosCupido = document.getElementById("tiros-cupido");
        const premio = document.getElementById("result_premio_modal");
        if (totalCupid) totalCupid.textContent = "0";
        if (tirosCupido) tirosCupido.textContent = "0";
        if (premio) premio.innerHTML = "";

        updateUI();
      }
    });
  }

  document.querySelectorAll(".board .img-content-text img").forEach((img) => {
    const value = Number(img.dataset.score || 0);
    img.addEventListener("click", () => {

      let imgVal = img.id;
      let valor = document.getElementById(`${imgVal}`);

      if (imgVal == "img_1") {
        valor.classList.toggle("posicion_img_1");
      } else if (imgVal == "img_2") {
        valor.classList.toggle("posicion_img_2");
      } else if (imgVal == "img_3") {
        valor.classList.toggle("posicion_img_3");
      } else if (imgVal == "img_4") {
        valor.classList.toggle("posicion_img_4");
      } else if (imgVal == "img_5") {
        valor.classList.toggle("posicion_img_5");
      } else if (imgVal == "img_6") {
        valor.classList.toggle("posicion_img_6");
      } else if (imgVal == "img_7") {
        valor.classList.toggle("posicion_img_7");
      } else if (imgVal == "img_8") {
        valor.classList.toggle("posicion_img_8");
      } else if (imgVal == "img_9") {
        valor.classList.toggle("posicion_img_9");
      }

      if (img.dataset.score == 1) {
        img.classList.toggle("select_plus");
      }
      // else {
      //   img.classList.toggle("select_none");
      // }

      img.addEventListener(
        "animationend",
        () => {
          img.classList.remove("select_plus");
        },
        { once: true }
      );

      // if (value !== 1) {
      //   return;
      // }

      const willSelect = !img.classList.contains("is-selected");

      if (willSelect && total >= MAX) {
        img.classList.add("limit");
        setTimeout(() => img.classList.remove("limit"), 450);
        return;
      }

      // Evita pasar el máximo
      if (willSelect && total >= MAX) {
        img.classList.add("limit");
        setTimeout(() => img.classList.remove("limit"), 450);
        return;
      }

      if (willSelect) {
        img.classList.add("is-selected");
        total = Math.min(MAX, total + 1);
        selectedStack.push(img.id);
        tiros += 1;
      } else {
        img.classList.remove("is-selected");
        total = Math.max(0, total - 1);
        tiros -= 1;
        // remueve la última ocurrencia de esta imagen del historial
        const i = selectedStack.lastIndexOf(img.id);
        if (i !== -1) selectedStack.splice(i, 1);
      }

      updateUI();
    });
  });

  document.getElementById("btn_send_info").addEventListener("click", () => {
    const totalEl = document.getElementById("total-cupido");
    const ficha = document.getElementById("ficha-cupido");
    const casino = document.getElementById("casino");
    const categoria = document.getElementById("categoria");
    const cedula = document.getElementById("cedula");
    const nombre = document.getElementById("nombre");
    const bono = document.getElementById("bono");
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

    const casinoVal = casino.value;
    const categoriaVal = categoria.value;
    const cedulaVal = cedula.value;
    const nombreVal = nombre.value;
    const bonoVal = bono.value;

    if (bonoVal == "") {
      if (categoria.value == "ADICIONAL") {
        if (
          casinoVal == "" ||
          categoriaVal == "" ||
          cedulaVal == "" ||
          nombreVal == ""
        ) {
          Swal.fire({
            icon: "warning",
            title: `Antes de continuar.`,
            text: `Por favor, completa toda la información`,
            allowOutsideClick: false,
            confirmButtonColor: "#a13b22",
            customClass: {
              popup: "mi-popup",
              title: "mi-titulo",
              confirmButton: "btn btn-danger",
            },
          });
          return;
        }
      } else {
        if (
          casinoVal == "" ||
          categoriaVal == "" ||
          cedulaVal == "" ||
          nombreVal == ""
        ) {
          Swal.fire({
            icon: "warning",
            title: `Antes de continuar.`,
            text: `Por favor, completa toda la información`,
            allowOutsideClick: false,
            confirmButtonColor: "#a13b22",
            customClass: {
              popup: "mi-popup",
              title: "mi-titulo",
              confirmButton: "btn btn-danger",
            },
          });
          return;
        }
      }
      const flechas = `${totalEl.textContent ?? 0} FLECHAZO`;

      var data = {
        tipo: "dinamica",
        hora: hora,
        fecha: fecha,
        nombre: nombreVal,
        cedula: cedulaVal,
        casino: casinoVal,
        categoria: categoriaVal,
        resultado: categoriaVal == "ADICIONAL" ? "0 FLECHAZO" : flechas,
        valBono: categoriaVal == "ADICIONAL" ? "0" : bonoVal,
        promocion: promocion,
      };

      // const hoy = new Date().toDateString();
      // if (localStorage.getItem("fechaCupido") !== hoy) {
      //   localStorage.setItem("registrosCupido", JSON.stringify([]));
      //   localStorage.setItem("fechaCupido", hoy);
      // }

      let registros = JSON.parse(localStorage.getItem("registrosCupido")) || [];
      registros.push(data);
      localStorage.setItem("registrosCupido", JSON.stringify(registros));

      const selCasino = document.getElementById("casino");
      if (selCasino) {
        selCasino.value = "";
        selCasino.dispatchEvent(new Event("change"));
      }

      requestAnimationFrame(() => {
        if (typeof mostrarRegistros === "function") {
          mostrarRegistros();
        } else {
          console.warn("mostrarRegistros no está disponible");
        }
      });

      loader.style.display = "flex";

      setTimeout(() => {
        const textPremio = document.getElementById("result_premio_modal");
        textPremio.innerHTML = ``;

        casino.value = "";
        categoria.value = "";
        cedula.value = "";
        nombre.value = "";
        bono.value = "";

        document
          .querySelectorAll(".board .img-content-text img")
          .forEach((img) => {
            img.classList.remove(
              "is-selected",
              "limit",
              "select_plus",
              "select_none",
              "select_down"
            );
            img.style.removeProperty("pointer-events");
          });

        selectedStack.length = 0;
        tiros = 0;
        total = 0;

        const board = document.querySelector(".board");
        if (board) board.classList.add("locked");
        if (typeof sync === "function") sync();

        updateUI();
        loader.style.display = "none";

        if (categoriaVal == "ADICIONAL") {
          const board = document.querySelector(".board");
          if (board.style.display == "none") {
            board.style.display = "flex";
          }
          fetch(
            "https://script.google.com/macros/s/AKfycbyzS4ShkcZg04qAvLDUFz4X3NlM7eEcDcVYqdgZV0IfwHuc2gorbnCg0-9Zd7Bnxyxe/exec",
            {
              method: "POST",
              mode: "no-cors",
              body: JSON.stringify(data),
            }
          );
          Swal.fire({
            icon: "success",
            title: "Exito!",
            text: `El envío de la información fue exitoso con categoria ${categoriaVal}.`,
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

        Swal.fire({
          icon: "info",
          title: "Guardado local",
          text: "Se guardó el registro sin # de bono. Puedes asignarlo y enviarlo después.",
          allowOutsideClick: false,
          confirmButtonColor: "#dc3545",
          customClass: {
            popup: "mi-popup",
            title: "mi-titulo",
            confirmButton: "btn btn-danger",
          },
        });
      }, 3000);
    } else {
      if (categoria.value == "ADICIONAL") {
        if (
          casinoVal == "" ||
          categoriaVal == "" ||
          cedulaVal == "" ||
          nombreVal == ""
        ) {
          Swal.fire({
            icon: "warning",
            title: `Antes de continuar.`,
            text: `Por favor, completa toda la información`,
            allowOutsideClick: false,
            confirmButtonColor: "#a13b22",
            customClass: {
              popup: "mi-popup",
              title: "mi-titulo",
              confirmButton: "btn btn-danger",
            },
          });
          return;
        }
      } else {
        if (
          casinoVal == "" ||
          categoriaVal == "" ||
          cedulaVal == "" ||
          nombreVal == ""
        ) {
          Swal.fire({
            icon: "warning",
            title: `Antes de continuar.`,
            text: `Por favor, completa toda la información`,
            allowOutsideClick: false,
            confirmButtonColor: "#a13b22",
            customClass: {
              popup: "mi-popup",
              title: "mi-titulo",
              confirmButton: "btn btn-danger",
            },
          });
          return;
        }
      }
      const flechas = `${totalEl.textContent ?? 0} FLECHAZO`;

      const data = {
        tipo: "dinamica",
        hora: hora,
        fecha: fecha,
        nombre: nombreVal,
        cedula: cedulaVal,
        casino: casinoVal,
        categoria: categoriaVal,
        resultado: flechas,
        valBono: bonoVal,
        promocion: promocion,
      };

      const hoy = new Date().toDateString();
      if (localStorage.getItem("fechaCupido") !== hoy) {
        localStorage.setItem("registrosCupido", JSON.stringify([]));
        localStorage.setItem("fechaCupido", hoy);
      }
      // guardar en LS (ya lo tienes)
      let registros = JSON.parse(localStorage.getItem("registrosCupido")) || [];
      registros.push(data);
      localStorage.setItem("registrosCupido", JSON.stringify(registros));

      // 👉 repintar YA mismo
      // (opcional: quitar filtro para ver TODOS)
      const selCasino = document.getElementById("casino");
      if (selCasino) {
        selCasino.value = ""; // "Todos"
        selCasino.dispatchEvent(new Event("change"));
      }

      // da un "tick" al navegador y pinta
      requestAnimationFrame(() => {
        // usa el nombre correcto de TU función
        if (typeof mostrarRegistros === "function") {
          mostrarRegistros(); // o mostrarRegistrosCupido(true) si tienes variante con flag
        } else {
          console.warn("mostrarRegistros no está disponible");
        }
      });

      loader.style.display = "flex";

      setTimeout(() => {
        const textPremio = document.getElementById("result_premio_modal");
        textPremio.innerHTML = ``;

        casino.value = "";
        categoria.value = "";
        cedula.value = "";
        nombre.value = "";
        bono.value = "";

        document
          .querySelectorAll(".board .img-content-text img")
          .forEach((img) => {
            img.classList.remove(
              "is-selected",
              "limit",
              "select_plus",
              "select_none",
              "select_down"
            );
            img.style.removeProperty("pointer-events");
          });

        selectedStack.length = 0;
        tiros = 0;
        total = 0;

        const board = document.querySelector(".board");
        if (board) board.classList.add("locked");
        if (typeof sync === "function") sync();

        updateUI();
      }, 3000);
      fetch(
        "https://script.google.com/macros/s/AKfycbyzS4ShkcZg04qAvLDUFz4X3NlM7eEcDcVYqdgZV0IfwHuc2gorbnCg0-9Zd7Bnxyxe/exec",
        {
          method: "POST",
          mode: "no-cors",
          body: JSON.stringify(data),
        }
      )
        .then(() => {
          const textPremio = document.getElementById("result_premio_modal");
          textPremio.innerHTML = ``;

          casino.value = "";
          categoria.value = "";
          cedula.value = "";
          nombre.value = "";
          bono.value = "";

          document
            .querySelectorAll(".board .img-content-text img")
            .forEach((img) => {
              img.classList.remove(
                "is-selected",
                "limit",
                "select_plus",
                "select_none",
                "select_down"
              );
              img.style.removeProperty("pointer-events");
            });

          selectedStack.length = 0;
          tiros = 0;
          total = 0;

          const board = document.querySelector(".board");
          if (board) board.classList.add("locked");
          if (typeof sync === "function") sync();

          updateUI();

          setTimeout(() => {
            document.getElementById("loader").style.display = "none";
            Swal.fire({
              icon: "success",
              title: "Éxito",
              text: "El envío de la información fue exitoso.",
              allowOutsideClick: false,
              confirmButtonColor: "#dc3545",
              customClass: {
                popup: "mi-popup",
                title: "mi-titulo",
                confirmButton: "btn btn-danger",
              },
            });
            loader.style.display = "none";
          }, 2000);
        })
        .catch(() => {
          document.getElementById("loader").style.display = "none";
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Ocurrió un problema al enviar la información.",
            allowOutsideClick: false,
            confirmButtonColor: "#dc3545",
          });
        });
    }
  });

  // DESHACER último movimiento válido (solo de imágenes con valor 1)
  if (btnUndo) {
    btnUndo.addEventListener("click", () => {
      if (!selectedStack.length) {
        // pequeño feedback si no hay nada que deshacer
        btnUndo.disabled = true;
        setTimeout(() => {
          btnUndo.disabled = false;
        }, 300);
        return;
      }
      const lastId = selectedStack.pop();
      const lastImg = document.getElementById(lastId);
      if (lastImg && lastImg.classList.contains("is-selected")) {
        lastImg.classList.remove("is-selected");
        total = Math.max(0, total - 1);
        // animación opcional de “bajar”
        lastImg.classList.add("select_down");
        lastImg.addEventListener(
          "animationend",
          () => {
            lastImg.classList.remove("select_down");
          },
          { once: true }
        );
        updateUI();
      }
    });
  }

  if (btnResetTablero) {
    btnResetTablero.addEventListener("click", () => {
      const casino = document.getElementById("casino").value;
      const categoria = document.getElementById("categoria").value;
      const nombre = document.getElementById("nombre").value;
      const cedula = document.getElementById("cedula").value;
      if (casino == "" || categoria == "" || nombre == "" || cedula == "") {
        Swal.fire({
          icon: "warning",
          title: "Reinicio de tablero no completado",
          text: "El Juego no ha iniciado.",
          allowOutsideClick: false,
          confirmButtonColor: "#dc3545",
          customClass: {
            popup: "mi-popup",
            title: "mi-titulo",
            confirmButton: "btn btn-danger",
          },
        });
      } else {
        document
          .querySelectorAll(".board .img-content-text img")
          .forEach((img) => {
            img.classList.remove(
              "is-selected",
              "limit",
              "select_plus",
              "select_none",
              "select_down",
              "posicion_img_1",
              "posicion_img_2",
              "posicion_img_3",
              "posicion_img_4",
              "posicion_img_5",
              "posicion_img_6",
              "posicion_img_7",
              "posicion_img_8",
              "posicion_img_9"
            );
            img.style.removeProperty("pointer-events");
          });

        selectedStack.length = 0;
        tiros = 0;
        total = 0;
        board.classList.remove("locked-alert");

        const totalCupid = document.getElementById("total-cupido");
        const tirosCupido = document.getElementById("tiros-cupido");
        const premio = document.getElementById("result_premio_modal");
        if (totalCupid) totalCupid.textContent = "0";
        if (tirosCupido) tirosCupido.textContent = "0";
        if (premio) premio.innerHTML = "";

        const btn_send_info = document.getElementById("btn_send_info");
        btn_send_info.style.display = "none";
        board.classList.remove("locked");
        updateUI();
      }
    });
  }

  // REINICIAR TODO
  if (btnReset) {
    btnReset.addEventListener("click", () => {
      Swal.fire({
        title: "Seguro de reiniciar?",
        text: "Se reiniciará todo en pantalla!.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "rgba(187, 58, 58, 1)",
        cancelButtonColor: "rgba(128, 30, 30, 1)",
        confirmButtonText: "Aceptar",
        cancelButtonText: "Cancelar",
        allowOutsideClick: false,
        customClass: {
          popup: "mi-popup",
          title: "mi-titulo",
          confirmButton: "btn btn-danger",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          document
            .querySelectorAll(".board .img-content-text img")
            .forEach((img) => {
              img.classList.remove(
                "is-selected",
                "limit",
                "select_plus",
                "select_none",
                "select_down",
                "posicion_img_1",
                "posicion_img_2",
                "posicion_img_3",
                "posicion_img_4",
                "posicion_img_5",
                "posicion_img_6",
                "posicion_img_7",
                "posicion_img_8",
                "posicion_img_9"
              );
              img.style.removeProperty("pointer-events");
            });

          selectedStack.length = 0;
          tiros = 0;
          total = 0;

          updateUI();
          board.classList.remove("locked-alert");

          const ids = ["casino", "categoria", "nombre", "cedula", "bono"];
          ids.forEach((id) => {
            const el = document.getElementById(id);
            if (el) el.value = "";
          });

          const totalCupid = document.getElementById("total-cupido");
          const tirosCupido = document.getElementById("tiros-cupido");
          const premio = document.getElementById("result_premio_modal");
          if (totalCupid) totalCupid.textContent = "0";
          if (tirosCupido) tirosCupido.textContent = "0";
          if (premio) premio.innerHTML = "";

          const btn_send_info = document.getElementById("btn_send_info");
          btn_send_info.style.display = "none";

          Swal.fire({
            icon: "info",
            title: "Juego reiniciado",
            text: "Ya puedes comenzar de nuevo.",
            allowOutsideClick: false,
            confirmButtonColor: "#27314F",
            customClass: {
              popup: "mi-popup",
              title: "mi-titulo",
              confirmButton: "btn btn-danger",
            },
          });

          const board = document.querySelector(".board");
          if (board) board.classList.add("locked");
          if (typeof sync === "function") sync();
        }
      });
    });
  }

  updateUI();

  const casino_val_categoria = document.getElementById("casino");
  const val_categoria = document.getElementById("categoria");
  const superior_marcopolo = document.getElementById("superior_marcopolo");
  const estandar_marcopolo = document.getElementById("estandar_marcopolo");
  const superior_aladdin = document.getElementById("superior_aladdin");
  const estandar_aladdin = document.getElementById("estandar_aladdin");

  function showMarcoPolo() {
    superior_marcopolo.style.display = "flex";
    estandar_marcopolo.style.display = "flex";
    superior_aladdin.style.display = "none";
    estandar_aladdin.style.display = "none";
    // si venía una cat. de Aladdin, límpiala
    if (
      val_categoria.value === "SUPERIORALADDIN" ||
      val_categoria.value === "ESTANDARALADDIN"
    ) {
      val_categoria.value = "";
    }
  }

  function showAladdin() {
    superior_marcopolo.style.display = "none";
    estandar_marcopolo.style.display = "none";
    superior_aladdin.style.display = "flex";
    estandar_aladdin.style.display = "flex";
    // si venía una cat. de MarcoPolo, límpiala
    if (
      val_categoria.value === "SUPERIORMARCOPOLO" ||
      val_categoria.value === "ESTANDARMARCOPOLO"
    ) {
      val_categoria.value = "";
    }
  }

  casino_val_categoria.addEventListener("change", () => {
    const valor = (casino_val_categoria.value || "").trim().toUpperCase(); // ej: "MP100-MESAS"
    if (!valor) return;

    const letras = valor.match(/^[A-Z]+/)?.[0] || ""; // "MP" o "A"

    // 1) EXCEPCIONES primero
    if (valor === "MP100") {
      // MP100 -> Aladdin
      showAladdin();
      return;
    }
    if (valor === "MP108" || valor === "MP108-MESAS") {
      // MP108 -> Aladdin
      showAladdin();
      return;
    }
    if (valor === "MP100-MESAS") {
      // MP100-MESAS -> MarcoPolo
      showMarcoPolo();
      return;
    }

    // 2) REGLAS generales por prefijo o códigos sueltos
    // MarcoPolo
    if (
      letras === "MP" ||
      valor === "A781" ||
      valor === "A36" ||
      valor === "A36-MESAS"
    ) {
      showMarcoPolo();
      return;
    }

    // Aladdin
    if (letras === "A") {
      showAladdin();
      return;
    }

    // 3) Fallback (si nada coincidió)
    showAladdin(); // o showMarcoPolo() según prefieras
  });
});

// Ejemplo: cómo leer el total al enviar
function test() {
  const total = window.cupidoTotal || 0;
  console.log("TOTAL SELECCIONADO:", total);
  // aquí haces tu envío junto con el resto de campos
}

function abrirmodalacciones() {
  document.getElementById("datos-modal-observacion").style.display = "flex";
  document.getElementById("envio_suplementario").style.display = "flex";
  document.getElementById("envio_observacion").style.display = "none";
  document.getElementById("tabla_premios_cupido").style.display = "none";
  document.getElementById("tabla_premios").style.display = "none";
  const notificacionRegitro = document.getElementById(
    "notificacion_registro_dia"
  );
  const registros = JSON.parse(localStorage.getItem("registrosCupido")) || [];
  const valCasino = (document.getElementById("casino")?.value || "").trim();

  // Filtra correctamente por casino (si hay filtro)
  const filtrados = valCasino
    ? registros.filter((item) => String(item.casino).trim() === valCasino)
    : registros;

  // Vacío = null/undefined o string vacío/espacios.
  // OJO: "0" y 0 NO son vacíos.
  const isBlank = (v) =>
    v == null || (typeof v === "string" && v.trim() === "");

  // ¿Existe al menos un registro con bono vacío?
  const hayBonoVacio = filtrados.some((item) => isBlank(item.valBono));

  // Muestra la notificación SOLO si hay bonos vacíos
  notificacionRegitro.style.display = hayBonoVacio ? "flex" : "none";
}

function cerrarmodalacciones() {
  document.getElementById("datos-modal-observacion").style.display = "none";
}

function verificarResetRegistro() {
  const hoy = new Date().toDateString();
  const ultimaFecha = localStorage.getItem("fechaCupido");

  if (ultimaFecha !== hoy) {
    localStorage.setItem("registrosCupido", JSON.stringify([]));
    localStorage.setItem("fechaCupido", hoy);
  }
}
verificarResetRegistro();

const IN_FLIGHT = new Set();

function mostrarRegistros() {
  const ultimosRegistros = document.getElementById("ultimos_registro_cupido");
  const casinoNumero = document.getElementById("casino-numero-cupido");
  const valInfo = document.getElementById("Info-cupido");
  const loader = document.getElementById("loader");
  const notificacionRegitro = document.getElementById(
    "notificacion_registro_dia"
  );

  if (!ultimosRegistros || !casinoNumero || !valInfo) return;

  const registros = JSON.parse(localStorage.getItem("registrosCupido")) || [];
  const valCasino = (document.getElementById("casino")?.value || "").trim();

  const filtrados = valCasino
    ? registros.filter((item) => item.casino === valCasino)
    : registros;

  casinoNumero.textContent = valCasino || "Actual";

  // Validación de columna (todos con valBono > 0)
  const todosValidos = filtrados.every((item) => Number(item.valBono) > 0);
  if (todosValidos) {
    notificacionRegitro.style.display = "none";
  } else {
    notificacionRegitro.style.display = "flex";
  }

  if (filtrados.length === 0) {
    ultimosRegistros.innerHTML = `<p class="color-gray">No hay registros ${
      valCasino ? "para este casino." : "aún."
    }</p>`;
    valInfo.innerHTML = "";
    return;
  }

  valInfo.innerHTML = `<small class="color-gray">* Estos registros son temporales (se reinicia a las 00:00), por favor tener en cuenta.</small>`;

  // Render de la tabla (nota: input ahora usa CLASE, no ID repetido)
  ultimosRegistros.innerHTML = `
    <div class="table-wrapper">
      <table class="styled-table table-scrolld ajuste_table_result">
        <thead>
          <tr>
            <th># Registro</th><th>Casino</th><th>Categoría</th><th>Nombre</th>
            <th>Cédula</th><th>Bono</th><th>Acciones</th><th>Fecha</th>
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
                    data-casino="${r.casino}"
                    data-categoria="${r.categoria}"
                    data-nombre="${r.nombre}"
                    data-cedula="${r.cedula}"
                    data-bono="${bono || "0"}"
                    data-fecha="${r.fecha}"
                    data-hora="${r.hora}"
                    data-resultado="${r.resultado}"
                    data-id="${r.id}"
                 >Enviar</button>`
                  : `<small class="table_ya_tiene_bono">Ya contiene Bono.</small>`;

              return `
              <tr>
                <td>${i + 1}</td>
                <td>${r.casino}</td>
                <td>${r.categoria}</td>
                <td>${r.nombre}</td>
                <td>${r.cedula}</td>
                <td>${
                  bono ||
                  `<input class="table_input_bono" type="text" placeholder="#Bono">`
                }</td>
                <td>${accion}</td>
                <td>${r.fecha} ${r.hora}</td>
              </tr>`;
            })
            .join("")}
        </tbody>
      </table>
    </div>
  `;

  // --- helpers ---
  const LS_REG = "registrosCupido";

  function getRegs() {
    try {
      return JSON.parse(localStorage.getItem(LS_REG)) || [];
    } catch {
      localStorage.setItem(LS_REG, "[]");
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
        String(r.casino).trim() === String(casino).trim() &&
        String(r.categoria).trim() === String(categoria).trim() &&
        String(r.nombre).trim() === String(nombre).trim() &&
        String(r.cedula).trim() === String(cedula).trim() &&
        String(r.fecha).trim() === String(fecha).trim() &&
        String(r.hora).trim() === String(hora).trim()
    );
    if (idx === -1) return false;

    regs[idx].valBono = valBono;
    regs[idx].bonoAsignado = true;
    localStorage.setItem(LS_REG, JSON.stringify(regs));
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

  // --- listener único (evita acumular handlers) ---
  // Si ya había un handler previo, lo removemos
  if (ultimosRegistros._clickHandler) {
    ultimosRegistros.removeEventListener(
      "click",
      ultimosRegistros._clickHandler
    );
  }

  ultimosRegistros._clickHandler = async (e) => {
    const btn = e.target.closest(".table_btn_enviar_bono");
    if (!btn) return;

    // Toma el input de la MISMA FILA
    const tr = btn.closest("tr");
    const bonoInput = tr?.querySelector(".table_input_bono");
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
      tipo: "dinamica",
      hora,
      fecha,
      nombre,
      cedula,
      casino,
      categoria,
      resultado,
      valBono: valBonoregistr,
      promocion, // debe existir en tu scope
    };

    // Clave única por registro para evitar duplicados
    const key = [casino, categoria, nombre, cedula, fecha, hora].join("|");
    if (IN_FLIGHT.has(key)) return; // ya se está enviando
    IN_FLIGHT.add(key);

    // Evita doble click en el mismo botón
    if (btn.dataset.sending === "1") return;
    btn.dataset.sending = "1";

    const prevText = btn.textContent;
    btn.disabled = true;
    btn.textContent = "Enviando…";
    if (loader?.style) loader.style.display = "flex";

    try {
      await fetch(
        "https://script.google.com/macros/s/AKfycbyzS4ShkcZg04qAvLDUFz4X3NlM7eEcDcVYqdgZV0IfwHuc2gorbnCg0-9Zd7Bnxyxe/exec",
        {
          method: "POST",
          mode: "no-cors",
          body: JSON.stringify(data),
        }
      );

      const ok = updateLocalBono(
        { casino, categoria, nombre, cedula, fecha, hora },
        valBonoregistr
      );

      // Actualiza la fila actual de inmediato
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
        text: ok
          ? "Se envió la información de manera correcta"
          : "No se pudo localizar el registro en localStorage.",
        allowOutsideClick: false,
      });

      // Si quieres re-render completo:
      // mostrarRegistros();
      alertBonoEmpty();
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo enviar el bono al servidor.",
        allowOutsideClick: false,
      });
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
    alertBonoEmpty();
  };

  // Lo agregamos una sola vez (limpio)
  ultimosRegistros.addEventListener("click", ultimosRegistros._clickHandler);
}

mostrarRegistros();

function alertBonoEmpty() {
  const registros = JSON.parse(localStorage.getItem("registrosMatch")) || [];
  const valCasino = (document.getElementById("casino")?.value || "").trim();
  const notificacionRegitro = document.getElementById(
    "notificacion_registro_dia"
  );

  // Filtra correctamente por casino (si hay filtro)
  const filtrados = valCasino
    ? registros.filter((item) => String(item.casino).trim() === valCasino)
    : registros;

  // Vacío = null/undefined o string vacío/espacios.
  // OJO: "0" y 0 NO son vacíos.
  const isBlank = (v) =>
    v == null || (typeof v === "string" && v.trim() === "");

  // ¿Existe al menos un registro con bono vacío?
  const hayBonoVacio = filtrados.some((item) => isBlank(item.valBono));

  // Muestra la notificación SOLO si hay bonos vacíos
  notificacionRegitro.style.display = hayBonoVacio ? "flex" : "none";
}

function handleSuplementarioClean() {
  document.getElementById("casino_sup").value = "";
  document.getElementById("categoria_sup").value = "";
  document.getElementById("cedula_sup").value = "";
  document.getElementById("nombre_sup").value = "";
  document.getElementById("hora_sup").value = "";
  document.getElementById("bono_sup").value = "";
  document.getElementById("flechazos_sup").value = "";
  document.getElementById("fecha_sup").value = "";
}

function handleSuplementarioSend() {
  const casino_sup = document.getElementById("casino_sup");
  const casino_sup_val = casino_sup.value;
  const categoria_sup = document.getElementById("categoria_sup");
  const categoria_sup_val = categoria_sup.value;
  const cedula_sup = document.getElementById("cedula_sup");
  const cedula_sup_val = cedula_sup.value;
  const nombre_sup = document.getElementById("nombre_sup");
  const nombre_sup_val = nombre_sup.value;
  const hora_sup = document.getElementById("hora_sup");
  const hora_sup_val = hora_sup.value;
  const bono_sup = document.getElementById("bono_sup");
  const bono_sup_val = bono_sup.value;
  const flechazos_sup = document.getElementById("flechazos_sup");
  const flechazos_sup_val = flechazos_sup.value;
  const fecha_sup = document.getElementById("fecha_sup");
  const fecha_sup_val = fecha_sup.value;
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

  if (categoria_sup_val == "ADICIONAL") {
    if (
      casino_sup_val == "" ||
      categoria_sup_val == "" ||
      cedula_sup_val == "" ||
      nombre_sup_val == "" ||
      hora_sup_val == "" ||
      fecha_sup_val == ""
    ) {
      Swal.fire({
        icon: "warning",
        title: "Campos vacíos",
        text: "Debes llenar todos los campos.",
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
  } else {
    if (
      casino_sup_val == "" ||
      categoria_sup_val == "" ||
      cedula_sup_val == "" ||
      nombre_sup_val == "" ||
      hora_sup_val == "" ||
      bono_sup_val == "" ||
      flechazos_sup_val == "" ||
      fecha_sup_val == ""
    ) {
      Swal.fire({
        icon: "warning",
        title: "Campos vacíos",
        text: "Debes llenar todos los campos.",
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
  }

  const flechas = `${flechazos_sup_val ?? 0} FLECHAZO`;

  const data = {
    tipo: "dinamica",
    hora: hora_sup_val,
    fecha: fecha_sup_val,
    nombre: nombre_sup_val,
    cedula: cedula_sup_val,
    casino: casino_sup_val,
    categoria: categoria_sup_val,
    resultado: flechas,
    valBono: bono_sup_val,
    promocion: promocion,
  };
  loader.style.display = "flex";

  fetch(
    "https://script.google.com/macros/s/AKfycbyzS4ShkcZg04qAvLDUFz4X3NlM7eEcDcVYqdgZV0IfwHuc2gorbnCg0-9Zd7Bnxyxe/exec",
    {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify(data),
    }
  )
    .then(() => {
      nombre_sup.value = "";
      cedula_sup.value = "";
      casino_sup.value = "";
      categoria_sup.value = "";
      flechazos_sup.value = "";
      bono_sup.value = "";
      hora_sup.value = "";
      fecha_sup.value = "";
      const textPremio = document.getElementById("result_premio_modal");
      textPremio.innerHTML = ``;
      setTimeout(() => {
        Swal.fire({
          icon: "success",
          title: "Éxito",
          text: "El envío de la información fue exitoso.",
          allowOutsideClick: false,
          confirmButtonColor: "#dc3545",
          customClass: {
            popup: "mi-popup",
            title: "mi-titulo",
            confirmButton: "btn btn-danger",
          },
        });
        document.getElementById("loader").style.display = "none";
      }, 2000);
    })
    .catch(() => {
      document.getElementById("loader").style.display = "none";
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ocurrió un problema al enviar la información.",
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

function handleObservacionClean() {
  document.getElementById("casino_obs").value = "";
  document.getElementById("desc_obs_modal").value = "";
}

function handleObservacionSend() {
  const casino_obs = document.getElementById("casino_obs");
  const casino_obs_val = casino_obs.value;
  const desc_obs_modal = document.getElementById("desc_obs_modal");
  const desc_obs_modal_val = desc_obs_modal.value;
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

  if (!casino_obs_val || !desc_obs_modal_val) {
    Swal.fire({
      icon: "warning",
      title: "Campos vacíos",
      text: "Debes llenar todos los campos.",
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
    tipo: "observacion",
    hora: hora,
    fecha: fecha,
    casino: casino_obs_val,
    observacion: desc_obs_modal_val,
  };

  loader.style.display = "flex";

  fetch(
    "https://script.google.com/macros/s/AKfycbyzS4ShkcZg04qAvLDUFz4X3NlM7eEcDcVYqdgZV0IfwHuc2gorbnCg0-9Zd7Bnxyxe/exec",
    {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }
  )
    .then((response) => response.text())
    .then(() => {
      casino_obs.value = "";
      desc_obs_modal.value = "";
      loader.style.display = "none";

      Swal.fire({
        icon: "success",
        title: "Éxito",
        text: "El envío de la información fue exitoso.",
        allowOutsideClick: false,
        confirmButtonColor: "#dc3545",
        customClass: {
          popup: "mi-popup",
          title: "mi-titulo",
          confirmButton: "btn btn-danger",
        },
      });
    })
    .catch((error) => {
      loader.style.display = "none";
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ocurrió un problema al enviar la información.",
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

// Claves LS
const LS_REGISTROS = "registrosCupido";
const LS_LAST_CLEAR = "registrosCupido_lastClearAt"; // timestamp (ms) del último borrado/corte

// Devuelve el timestamp (ms) del "bucket" 3:00 a.m. vigente (día que va de 3:00 a 2:59)
function currentCutoffBucketMs(now = new Date()) {
  const cut = new Date(now);
  cut.setHours(3, 0, 0, 0); // 3:00 de HOY
  if (now < cut) cut.setDate(cut.getDate() - 1); // antes de las 3 → pertenece al día anterior
  return cut.getTime();
}

// Devuelve el timestamp (ms) del PRÓXIMO 3:00 a.m.
function nextCutoffMs(now = new Date()) {
  const cut = new Date(now);
  cut.setHours(3, 0, 0, 0);
  if (now >= cut) cut.setDate(cut.getDate() + 1); // si ya pasaron las 3am de hoy → mañana
  return cut.getTime();
}

// Borra registros y marca el momento de corte
function clearRegistros(atMs) {
  localStorage.setItem(LS_REGISTROS, JSON.stringify([]));
  localStorage.setItem(LS_LAST_CLEAR, String(atMs));
}

// Inicializa limpieza 3:00 a.m. (llamar al cargar la app)
function initCupidoStorage() {
  const nowMs = Date.now();
  const bucketMs = currentCutoffBucketMs(new Date(nowMs));
  const lastClear = parseInt(localStorage.getItem(LS_LAST_CLEAR) || "0", 10);

  // Si nunca se limpió o fue antes del bucket vigente → limpiar
  if (!lastClear || lastClear < bucketMs) {
    clearRegistros(bucketMs);
  }

  // Programa el próximo 3:00 a.m. si la página queda abierta
  const tNext = nextCutoffMs(new Date(nowMs));
  const delay = Math.max(0, tNext - nowMs);
  setTimeout(() => {
    clearRegistros(currentCutoffBucketMs(new Date()));
    // a partir de ahí, cada 24h
    setInterval(() => {
      clearRegistros(currentCutoffBucketMs(new Date()));
    }, 24 * 60 * 60 * 1000);
  }, delay);
}

// Utilidad para guardar un registro en el LS vigente
function pushRegistroLS(item) {
  const arr = JSON.parse(localStorage.getItem(LS_REGISTROS) || "[]");
  arr.push(item);
  localStorage.setItem(LS_REGISTROS, JSON.stringify(arr));
}

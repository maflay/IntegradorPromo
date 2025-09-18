window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  document.getElementById("encuentro_col_bol").style.display = "none";
  document.getElementById("encuentro_ven_col").style.display = "none";
  loader.style.display = "none";
});

const url_col_bol =
  "https://script.google.com/macros/s/AKfycbz8HEBzuGdiXDQlfjiwSHvCWAFart4ttIxrhEq0A9tRnAdRXX_udUwpRw2tJn7WaEFikw/exec";

const url_ven_col =
  "https://script.google.com/macros/s/AKfycbz4vww95EpRipc3eMTrj7swvrQwkAPn473DB7D1_Uj9K-M1y5w9T6ykqkeN1JeMouWb9Q/exec";
const btn_col_bol = document.getElementById("btn_col_bol");
const btn_ven_col = document.getElementById("btn_ven_col");

function PostResult() {
  const valor_local = document.getElementById("valor_local");
  const valor_Visitante = document.getElementById("valor_visitante");

  const valor_local_val = valor_local.value;
  const valor_Visitante_val = valor_Visitante.value;

  const data = {
    valor_1: valor_local_val,
    valor_2: valor_Visitante_val,
  };

  fetch(url_col_bol, {
    method: "POST",
    body: JSON.stringify(data),
  })
    .then((r) => r.json())
    .then(console.log);
}

function cleanScore() {
  const loader = document.getElementById("loader");
  const content_resultado = document.getElementById(
    "content_resultado_col_bol"
  );

  const data = {
    mode: "clear",
  };
  loader.style.display = "flex";
  fetch(url_col_bol, {
    method: "POST",
    body: JSON.stringify(data),
  })
    .then((r) => r.json())
    .then((response) => {
      loader.style.display = "none";
      content_resultado.textContent = "Marcador Reiniciado...";
      getAllresult();
      setTimeout(() => {
        content_resultado.textContent = "";
      }, 3000);
    });
}

function PutResult() {
  const valor_local = document.getElementById("valor_local");
  const valor_visitante = document.getElementById("valor_visitante");
  const content_resultado = document.getElementById("content_resultado");
  const loader = document.getElementById("loader");

  const valor_local_val = valor_local.value;
  const valor_visitante_val = valor_visitante.value;

  const data = {
    mode: "overwrite",
    valor_1: valor_local_val == "" ? "0" : valor_local_val,
    valor_2: valor_visitante_val == "" ? "0" : valor_visitante_val,
  };

  loader.style.display = "flex";
  fetch(url_col_bol, {
    method: "POST",
    body: JSON.stringify(data),
  })
    .then((r) => r.json())
    .then((response) => {
      content_resultado.textContent = "Marcador actualizado...";
      loader.style.display = "none";
      getAllresult();
      setTimeout(() => {
        content_resultado.textContent = "";
        valor_local.value = "";
        valor_visitante.value = "";
      }, 3000);
    });
}

function getAllresult() {
  const viw1 = document.getElementById("resultLocal");
  const viw2 = document.getElementById("resultVisitante");

  viw1.innerHTML = `<span style="font-size: .8rem;">Cargando el Marcador...</span>`;
  viw2.textContent = "";
  fetch(
    "https://script.google.com/macros/s/AKfycbz8HEBzuGdiXDQlfjiwSHvCWAFart4ttIxrhEq0A9tRnAdRXX_udUwpRw2tJn7WaEFikw/exec"
  )
    .then((res) => res.json())
    .then((data) => {
      if (data[0] != undefined) {
        viw1.textContent = data[0].Resultado_local;
        viw2.textContent = data[0].Resultado_Visitante;
      } else {
        viw1.textContent = `<span style="font-size: .8rem;">No hay marcador registrado...</span>`;
      }
    });
}

function getAllrestultVC() {
  const resultVen = document.getElementById("resultVen");
  const resultCol = document.getElementById("resultCol");

  resultVen.innerHTML = `<span style="font-size: .8rem;">Cargando el Marcador...</span>`;
  resultCol.textContent = "";

  fetch(url_ven_col)
    .then((res) => res.json())
    .then((data) => {
      if (data[0] != undefined) {
        resultVen.textContent = data[0].Resultado_local;
        resultCol.textContent = data[0].Resultado_Visitante;
      } else {
        resultVen.innerHTML = `<span style="font-size: .8rem;">No hay marcador registrado...</span>`;
      }
    });
}

getAllrestultVC();

function PutResultVC() {
  const encuentro_ven_col = document.getElementById(
    "content_resultado_ven_col"
  );
  const valor_ven = document.getElementById("valor_ven");
  const valor_ven_val = valor_ven.value;
  const valor_colombia = document.getElementById("valor_colombia");
  const valor_colombia_val = valor_colombia.value;
  const loader = document.getElementById("loader");

  const data = {
    mode: "overwrite",
    valor_1: valor_ven_val,
    valor_2: valor_colombia_val,
  };

  loader.style.display = "flex";

  fetch(url_ven_col, {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify(data),
  })
    .then((res) => res.text())
    .then((response) => {
      encuentro_ven_col.textContent = "Marcador Actualizado";
      getAllrestultVC();
      loader.style.display = "none";
      valor_ven.value = "";
      valor_colombia.value = "";
      valor_colombia.valor_1 = "";
      setTimeout(() => {
        encuentro_ven_col.textContent = "";
      }, 3000);
    });
}

function cleanScoreVC() {
  const loader = document.getElementById("loader");
  const content_view = document.getElementById("content_resultado_ven_col");

  const data = {
    mode: "clear",
  };

  loader.style.display = "flex";
  fetch(url_ven_col, {
    method: "POST",
    body: JSON.stringify(data),
  })
    .then((res) => res.text())
    .then((response) => {
      loader.style.display = "none";
      content_view.textContent = "Mensaje Reiniciado...";
      getAllrestultVC();
      setTimeout(() => {
        content_view.textContent = "";
      }, 3000);
    });
}

getAllresult();

btn_col_bol.addEventListener("click", () => {
  document.getElementById("encuentro_col_bol").style.display = "flex";
  document.getElementById("encuentro_ven_col").style.display = "none";
});

btn_ven_col.addEventListener("click", () => {
  document.getElementById("encuentro_col_bol").style.display = "none";
  document.getElementById("encuentro_ven_col").style.display = "flex";
});

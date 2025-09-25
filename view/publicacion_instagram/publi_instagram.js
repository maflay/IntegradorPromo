const desiredHash = "#publicacion_instagram";
let lastHash = null;
const links = Array.from(
  document.querySelectorAll('[data-route], .sidebar-nav .nav-link[href^="#"]')
);

if (!location.hash) location.hash = "#publicacion_instagram";
setActive(location.hash);
function setActive(hash) {
  if (!hash) hash = "#publicacion_instagram";
  if (hash === lastHash) return;
  lastHash = hash;
}

// Inicializar
if (!location.hash) location.hash = "#publicacion_instagram";
setActive(location.hash);
window.addEventListener("hashchange", () => setActive(location.hash));

const url_ala =
  "https://script.google.com/macros/s/AKfycbyUUfvNpSQI8bSOZTO9mJ5IvQyVk3jz_U3E6Zu84j--eb3rbsE5vT_f5q6Don_2sxUl7w/exec";
const miniloader = document.getElementById("loader_instagram_publi");
miniloader.style.display = "flex";
function getAllClientesAla() {
  const miniloader = document.getElementById("loader_instagram_publi");
  miniloader.style.display = "flex";
  const container = document.getElementById("content_info_urls");
  container.innerHTML = ``;
  fetch(url_ala)
    .then((res) => res.json())
    .then((data) => {
      //   console.log(data);
      if (!Array.isArray(data) || data.length === 0) {
        container.innerHTML = `<p>No hay datos disponibles.</p>`;
        miniloader.style.display = "none";

        return;
      }

      for (let i = 0; i < data.length; i++) {
        container.innerHTML = `
              ${[...data]
                .reverse()
                .slice(0, 4)
                .map(
                  (registro, i) =>
                    `
                    <a target="_blank" href="${registro.url}">${registro.url}</a>
                  `
                )
                .join("")}
        `;
      }
      miniloader.style.display = "none";
    });
}

getAllClientesAla();

document
  .getElementById("btn_enviar_url")
  .addEventListener("click", postUlrInstagram);

function postUlrInstagram() {
  const val_url_ins = document.getElementById("val_url_ins");
  const val_url_ins_val = val_url_ins.value;
  const container = document.getElementById("content_info_urls");
  container.innerHTML = ``;
  miniloader.style.display = "flex";

  const data = {
    tipo: "publicacion",
    url: val_url_ins_val,
  };

  //   console.log(data);

  fetch(url_ala, {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify(data),
  })
    .then((res) => {
      console.log("Respuesta del servidor:", res);
      val_url_ins.value = "";
      getAllClientes();
    })
    .catch((error) => {
      console.error("Error al enviar los datos:", error);
      miniloader.style.display = "none";
    });
}

const url_mp =
  "https://script.google.com/macros/s/AKfycbzKETj9JU9WkbTB87JzrhFxKdCc2KWxmVOBxghA4tV_3VCzwBUeuLuTS0jcgHB__VJrow/exec";

function getAllClientesMp() {
  const miniloader = document.getElementById("loader_instagram_publi_mp");
  miniloader.style.display = "flex";
  const container = document.getElementById("content_info_urls_mp");
  container.innerHTML = ``;
  fetch(url_mp)
    .then((res) => res.json())
    .then((data) => {
      //   console.log(data);
      if (!Array.isArray(data) || data.length === 0) {
        container.innerHTML = `<p>No hay datos disponibles.</p>`;
        miniloader.style.display = "none";

        return;
      }

      for (let i = 0; i < data.length; i++) {
        container.innerHTML = `
              ${[...data]
                .reverse()
                .slice(0, 4)
                .map(
                  (registro, i) =>
                    `
                    <a target="_blank" href="${registro.url}">${registro.url}</a>
                  `
                )
                .join("")}
        `;
      }
      miniloader.style.display = "none";
    });
}

getAllClientesMp();

document
  .getElementById("btn_enviar_url_mp")
  .addEventListener("click", postUlrInstagramMp);

function postUlrInstagramMp() {
  const miniloader = document.getElementById("loader_instagram_publi_mp");
  const val_url_ins = document.getElementById("val_url_ins_mp");
  const val_url_ins_val = val_url_ins.value;
  const container = document.getElementById("content_info_urls_mp");
  container.innerHTML = ``;
  miniloader.style.display = "flex";

  const data = {
    tipo: "publicacion",
    url: val_url_ins_val,
  };

  //   console.log(data);

  fetch(url_mp, {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify(data),
  })
    .then((res) => {
      console.log("Respuesta del servidor:", res);
      val_url_ins.value = "";
      getAllClientesMp();
    })
    .catch((error) => {
      console.error("Error al enviar los datos:", error);
      miniloader.style.display = "none";
    });
}
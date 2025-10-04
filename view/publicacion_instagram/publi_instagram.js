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

document
  .getElementById("btn_enviar_url")
  .addEventListener("click", postUlrInstagram);

function postUlrInstagram() {
  const val_url_ins = document.getElementById("val_url_ins");
  const val_url_ins_val = val_url_ins.value;
  const container = document.getElementById("content_info_urls");
  const message_result_ala = document.getElementById("message_result_ala");

  if (val_url_ins_val == "") {
    Swal.fire({
      icon: "warning",
      title: "Campos en Blanco",
      html: "Por favor ingresa un link valido para poder enviarlo.",
      allowOutsideClick: false,
    });
    return;
  }

  const data = {
    tipo: "publicacion",
    url: val_url_ins_val,
  };

  message_result_ala.textContent = "Cargando...";
  fetch(url_ala, {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify(data),
  })
    .then((res) => {
      Swal.fire({
        icon: "success",
        title: "Exito!",
        html: "Url enviada de forma correcta.",
        allowOutsideClick: false,
      });
      val_url_ins.value = "";
      message_result_ala.textContent = "Correcto";
      setTimeout(() => {
        message_result_ala.innerHTML = "";
      }, 2000);
    })
    .catch((error) => {
      console.error("Error al enviar los datos:", error);
      message_result_ala.textContent = "Error";
    });
}

const url_mp =
  "https://script.google.com/macros/s/AKfycbzKETj9JU9WkbTB87JzrhFxKdCc2KWxmVOBxghA4tV_3VCzwBUeuLuTS0jcgHB__VJrow/exec";

document
  .getElementById("btn_enviar_url_mp")
  .addEventListener("click", postUlrInstagramMp);

function postUlrInstagramMp() {
  const val_url_ins = document.getElementById("val_url_ins_mp");
  const val_url_ins_val = val_url_ins.value;
  const container = document.getElementById("content_info_urls_mp");
  const message_result_mp = document.getElementById("message_result_mp");

  if (val_url_ins_val == "") {
    Swal.fire({
      icon: "warning",
      title: "Campos en Blanco",
      html: "Por favor ingresa un link valido para poder enviarlo.",
      allowOutsideClick: false,
    });
    return;
  }

  const data = {
    tipo: "publicacion",
    url: val_url_ins_val,
  };

  message_result_mp.innerHTML = "Cargando...";
  fetch(url_mp, {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify(data),
  })
    .then((res) => {
      Swal.fire({
        icon: "success",
        title: "Exito!",
        html: "Url enviada de forma correcta.",
        allowOutsideClick: false,
      });
      val_url_ins.value = "";
      message_result_mp.innerHTML = "Correcto";
      setTimeout(() => {
        message_result_mp.innerHTML = "";
      }, 2000);
    })
    .catch((error) => {
      console.error("Error al enviar los datos:", error);
      message_result_mp.innerHTML = "Error";
    });
}

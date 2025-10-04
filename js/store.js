function OpenModalInfo() {
  const contenedor = document.getElementById("view_info_user");
  lockBodyScroll();
  contenedor.style.display = "flex";
}

let scrollY = 0;

function lockBodyScroll() {
  _scrollY = window.scrollY || document.documentElement.scrollTop;
  document.body.style.top = `-${_scrollY}px`;
  document.body.classList.add("body-lock");
  document.body.style.backgroundColor = "white";
}

function unlockBodyScroll() {
  document.body.classList.remove("body-lock");
  document.body.style.top = "";
  window.scrollTo(0, _scrollY);
}
window.OpenModalInfo = OpenModalInfo;

function CloseModalInfo() {
  const contenedor = document.getElementById("view_info_user");
  unlockBodyScroll();
  contenedor.style.display = "none";
}

window.CloseModalInfo = CloseModalInfo;

function validateAdmin() {
  let user = getCookie("__Secure_1nf0_US3R");
  const btn_info = document.querySelectorAll(".btn_admin_test");
  // Recorremos cada botón
  btn_info.forEach((btn) => {
    const valor = user.Nivel;

    // Ejemplo: ocultar los que no cumplan condición
    if (valor != "1") {
      btn.style.display = "none"; // oculta
    } else {
      btn.style.display = "inline-block"; // muestra
    }
  });
}

function metodoprueba() {
  let objUser = getCookie("__Secure_1nf0_US3R");
  const funcionario_nombre = document.getElementById("funcionario_nombre");
  const funcionario_cedula = document.getElementById("funcionario_cedula");
  const funcionario_rol = document.getElementById("funcionario_rol");
  const funcionario_email = document.getElementById("funcionario_email");
  const funcionario_telefono = document.getElementById("funcionario_telefono");
  const funcionario_area = document.getElementById("funcionario_area");
  funcionario_nombre.textContent = objUser.Nombre;
  funcionario_cedula.textContent = objUser.Cedula;
  funcionario_rol.textContent = objUser.rol;
  funcionario_email.textContent = objUser.Correo;
  funcionario_telefono.textContent = objUser.Telefono;
  funcionario_area.textContent = objUser.Area;

  // admin
  const btn_info = document.querySelectorAll(".item_admin_view");
  // items solo para admin

  // social media
  const item_social_media = document.querySelectorAll(".item_social_media");
  const item_view_social = document.querySelectorAll(".item_view_social");
  // sirve para mostrar solo items solo para social media

  // promotor-admin
  const item_admin_promotor = document.querySelectorAll(".item_admin_promotor");

  // promotor
  const item_promotor = document.querySelectorAll(".item_promotor");

  // grand aladdin
  const header_table_no = document.querySelectorAll(".header_table_no");
  const header_table_no_2 = document.querySelectorAll(".header_table_no_2");

  // Recorremos cada botón
  btn_info.forEach((btn) => {
    const valor = objUser.Nivel;

    // Ejemplo: ocultar los que no cumplan condición
    if (valor == "1") {
      btn.style.display = "flex"; // muestra
    } else {
      btn.style.display = "none"; // oculta
    }
  });

  // mostrar solo para social media
  item_social_media.forEach((item) => {
    const valor = objUser.Nivel;

    // Ejemplo: ocultar los que no cumplan condición
    if (valor == "1" || valor == "3") {
      item.style.display = "flex"; // muestra
    } else {
      item.style.display = "none"; // oculta
    }
  });

  // mostrar solo para promotor
  item_promotor.forEach((item) => {
    const valor = objUser.Nivel;

    // Ejemplo: ocultar los que no cumplan condición
    if (valor == "1" || valor == "2" || valor == "4") {
      item.style.display = "flex"; // muestra
    } else {
      item.style.display = "none"; // oculta
    }
  });

  const user = getCookie("__Secure_1nf0_US3R");
  // Recorremos cada botón
  item_admin_promotor.forEach((btn) => {
    const valor = user.Nivel;

    // Ejemplo: ocultar los que no cumplan condición
    if (valor == "1" || valor == "2") {
      btn.style.display = "inline-block"; // muestra
    } else {
      btn.style.display = "none"; // oculta
    }
  });

  header_table_no.forEach((htn) => {
    const valor = user.Nivel;

    // Ejemplo: ocultar los que no cumplan condición
    if (valor == "1" || valor == "2") {
      htn.style.display = "none"; // oculta
    }
  });

  header_table_no_2.forEach((htn2) => {
    const valor = user.Nivel;

    // Ejemplo: ocultar los que no cumplan condición
    if (valor == "1" || valor == "2") {
      htn2.style.display = "contents"; // oculta
    } else {
      htn2.style.display = "none"; // oculta
    }
  });

  // Recorremos cada botón
  item_view_social.forEach((item) => {
    const valor = user.Nivel;

    if (valor == "1" || valor == "3") {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
}

window.metodoprueba = metodoprueba;

document.getElementById("registro_form_view").addEventListener("click", () => {
  document.getElementById("content_register_form").style.display = "flex";
  document.getElementById("content_login_form").style.display = "none";
  document.getElementById("iniciar_form_view").style.display = "flex";
  document.getElementById("registro_form_view").style.display = "none";
});

document.getElementById("iniciar_form_view").addEventListener("click", () => {
  document.getElementById("content_register_form").style.display = "none";
  document.getElementById("content_login_form").style.display = "flex";
  document.getElementById("iniciar_form_view").style.display = "none";
  document.getElementById("registro_form_view").style.display = "flex";
});

document
  .getElementById("btn_registro")
  .addEventListener("click", () => registroUser());

function registroUser() {
  const loader = document.getElementById("loader-login");
  loader.style.display = "flex";
  const urlGetToken =
    "https://script.google.com/macros/s/AKfycbw1mfC3g3PEcr_0Zm4stXBUraqCOp5FgdR7OqFDiEs7osYF0LjYluf2y28VlMs2w2R1/exec";
  // fetch(urlGetToken)
  //   .then((result) => result.json())
  //   .then((res) => {
  //     console.log(res[0].token);
  //   });
}

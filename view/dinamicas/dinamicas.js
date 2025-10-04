function mostrarItemPromotor() {
  const btn_info = document.querySelectorAll(".item_view");

  const user = getCookie("__Secure_1nf0_US3R");
  // Recorremos cada botón
  btn_info.forEach((btn) => {
    const valor = user.Nivel;

    if (valor == "1" || valor == "2") {
      btn.style.display = "flex";
    } else {
      btn.style.display = "none";
    }
  });
}

mostrarItemPromotor();

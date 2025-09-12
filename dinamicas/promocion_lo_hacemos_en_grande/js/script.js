function abrirModal() {
  document.getElementById("datos-modal-observacion").style.display = "flex";
}

function cerraModal() {
  document.getElementById("datos-modal-observacion").style.display = "none";
}

function abrirModal2() {
  document.getElementById("datos-modal-premios").style.display = "flex";
}

function cerraModal2() {
  document.getElementById("datos-modal-premios").style.display = "none";
}

fetch('/dinamicas/promocion_lo_hacemos_en_grande/components/premios/premios.html')
.then(res => res.text())
.then(html => {
  document.getElementById('viewCar').innerHTML = html;
})
.catch(err => console.error('Error cargando partial:', err));

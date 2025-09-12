// fetch('/dinamicas/promocion-ruleta-six-casinos/finalista-casinos-view.html')
// .then(res => res.text())
// .then(html => {
//   document.getElementById('vista_otros_casino').innerHTML = html;
// })
// .catch(err => console.error('Error cargando partial:', err));

window.addEventListener("DOMContentLoaded", () => {
  const img_send_obs = document.getElementById("img_send_obs");
  const rol_desc_obser = document.getElementById("rol_desc_obser");
  const mini_spinner_observacion_integrador = document.getElementById(
    "mini_spinner_observacion_integrador"
  );
  const mini_spinner_any = document.getElementById("mini_spinner_any");
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
  const desc_obser_integrador = document.getElementById(
    "desc_obser_integrador"
  );
  const url =
    "https://script.google.com/macros/s/AKfycbxFxJQBmeWPIHjFX11Mxvi1XcC_19owDjHtnB3GMK5MpErIrFIHore-6celJL6uoI5r8g/exec";

  const btn_recargarcomentario = document.getElementById("recargarcomentario");

  img_send_obs.addEventListener("click", () => {
    console.log("entro al enviar");

    const valor_mensaje = desc_obser_integrador.value;
    const valor_rol = rol_desc_obser.value;

    if (valor_mensaje == "" || valor_rol == "") {
      Swal.fire({
        title: "Campos en Blanco",
        text: "Antes de continuar completa la información.",
        icon: "info",
        heightAuto: false, // opcional, evita “brinco” en algunos casos
      });
      return;
    }
    let data = {
      tipo: "envio_1",
      valor_1: hora,
      valor_2: fecha,
      valor_3: valor_rol,
      valor_4: valor_mensaje,
    };
    img_send_obs.style.display = "none";
    mini_spinner_any.style.display = "flex";
    desc_obser_integrador.style.opacity = "0.7";
    desc_obser_integrador.style.pointerEvents = "none";
    fetch(url, {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify(data),
    }).then(() => {
      getAllMensajes();
      img_send_obs.style.display = "flex";
      mini_spinner_any.style.display = "none";
      desc_obser_integrador.style.opacity = "1";
      desc_obser_integrador.style.pointerEvents = "auto";
      desc_obser_integrador.value = "";
    });
  });

  function getAllMensajes() {
    const container = document.getElementById("GetDataOberservacion");
    mini_spinner_observacion_integrador.style.display = "flex";
    container.innerHTML = ``;
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log(data);
        if (!Array.isArray(data) || data.length === 0) {
          container.innerHTML = `<p>No hay Comentarios.</p>`;
          mini_spinner_observacion_integrador.style.display = "none";
          return;
        }
        mini_spinner_observacion_integrador.style.display = "none";
        container.innerHTML = `
            ${[...data]
              .reverse()
              .map((registro) => {
                const fecha = new Date(registro.hora);
                const fecha_dia = new Date(registro.fecha);
                const hora = fecha.toLocaleTimeString("es-CO", {
                  timeZone: "America/Bogota",
                  hour: "2-digit",
                  minute: "2-digit",
                });

                const fecha_larga = fecha_dia.toLocaleDateString("es-CO", {
                  timeZone: "America/Bogota",
                  day: "2-digit",
                  month: "long",
                  year: "2-digit",
                });

                return `
                    <div class="content_mensaje_chat">
                    <span class="nombre_int">${registro.nombre}:</span>
                    <span class="mensaje_int">${registro.mensaje}</span>
                    <div class="content_date_chat">
                    <span class="hora_int">${hora}</span>
                    <span class="fecha_int">${fecha_larga}</span>
                    </div>
                    </div>
                `;
              })
              .join("")}
            `;
      })
      .catch((err) => {
        console.error("Ocurrió un error:", err);
      });
  }

  getAllMensajes();

  btn_recargarcomentario.addEventListener("click", () => {
    getAllMensajes();
  });
});

window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  loader.style.display = "none";
});

window.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("loader");
  const nombre_pedido = document.getElementById("nombre_pedido");
  const cedula_pedido = document.getElementById("cedula_pedido");
  const mesa_pedido = document.getElementById("mesa_pedido");
  const foto_pedido = document.getElementById("foto_pedido");

  // const foto_pedido_camara = document.getElementById("foto_pedido_camara");
  const descripcion_pedido = document.getElementById("descripcion_pedido");
  const btn_enviar_pedido = document.getElementById("btn_enviar_pedido");

  // menu
  const precio_cafe_espresso_pequeño = document.getElementById(
    "precio_cafe_espresso_pequeño"
  );

  const precio_cafe_americano_pequeño = document.getElementById(
    "precio_cafe_americano_pequeño"
  );
  const precio_cafe_americano_mediano = document.getElementById(
    "precio_cafe_americano_mediano"
  );
  const precio_cafe_americano_grande = document.getElementById(
    "precio_cafe_americano_grande"
  );

  precio_cafe_espresso_pequeño.addEventListener("click", () => {
    let precioCafe = precio_cafe_espresso_pequeño.innerHTML;
    let nombreCafe = document.getElementById(
      "nombre_cafe_espresso"
    ).innerHTML;
    PaintCardPedido(precioCafe, nombreCafe);
  });

  precio_cafe_americano_pequeño.addEventListener("click", () => {
    let nombreCafe = document.getElementById(
      "nombre_cafe_americano"
    ).innerHTML;
    let precioCafe = precio_cafe_americano_pequeño.innerHTML;
    PaintCardPedido(precioCafe, nombreCafe);
  });

  precio_cafe_americano_mediano.addEventListener("click", () => {
    console.log(precio_cafe_americano_mediano.innerHTML);
    let nombreCafe = document.getElementById(
      "nombre_cafe_americano"
    ).innerHTML;
    let precioCafe = precio_cafe_americano_mediano.innerHTML;
    PaintCardPedido(precioCafe, nombreCafe);
  });

  precio_cafe_americano_grande.addEventListener("click", () => {
    console.log(precio_cafe_americano_grande.innerHTML);
    let nombreCafe = document.getElementById(
      "nombre_cafe_americano"
    ).innerHTML;
    let precioCafe = precio_cafe_americano_grande.innerHTML;
    PaintCardPedido(precioCafe, nombreCafe);
  });

  // btnWhat
  const btn_what_pedido = document.getElementById("btn_what_pedido");
  btn_what_pedido.addEventListener("click", () => {
    let telCliente = mesa_pedido.value;
    if (telCliente == "") {
      Swal.fire({
        icon: "info",
        title: "Antes de continuar",
        html: "Digita un numero valido para poderte comunicar con nosotros.",
      });
      return;
    }
    // console.log(`wa.me/57${telCliente}`);
    window.open(`wa.me/57${telCliente}`, (target = "_blank"));
  });

  const WEBAPP_URL =
    "https://script.google.com/macros/s/AKfycbz6N5YHKvx7m2v6QIUv22cQt6rquoVAynhyvK4eczfIuXEo4-CVYomVqsnpExB_0jb98Q/exec"; // <-- cámbiala

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
  btn_enviar_pedido.addEventListener("click", () => handleSubmitPedido());

  function fileToDataURL(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = () => reject(reader.error);
      reader.onload = () => resolve(reader.result); // "data:image/png;base64,...."
      reader.readAsDataURL(file);
    });
  }

  async function handleSubmitPedido() {
    const nombre = (nombre_pedido.value || "").trim();
    const cedula = (cedula_pedido.value || "").trim();
    const mesa = (mesa_pedido.value || "").trim();
    const descripcion = (descripcion_pedido.value || "").trim();

    // tomar archivo de cualquiera de los dos inputs
    const fileGaleria = foto_pedido.files?.[0] || null;
    // const fileCamara = foto_pedido_camara.files?.[0] || null;

    // aquí elige el primero que exista
    const file = fileGaleria;

    // validación
    if (!nombre || !cedula || !mesa || !descripcion || !file) {
      Swal.fire({
        title: "Campos incompletos",
        text: "Completa los campos y sube una foto (galería o cámara).",
        icon: "info",
        heightAuto: false,
      });
      return;
    }

    // convertir a base64
    const base64 = await fileToDataURL(file);

    const payload = {
      tipo: "envio_1",
      valor_1: hora,
      valor_2: fecha,
      valor_3: nombre,
      valor_4: descripcion,
      imagen_base64: base64,
      nombreArchivoImagen: `pedido_${cedula}_${Date.now()}`,
    };

    loader.style.display = "flex";
    fetch(WEBAPP_URL, {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify(payload),
    })
      .then((res) => res.text())
      .then(() => {
        nombre_pedido.value = "";
        cedula_pedido.value = "";
        mesa_pedido.value = "";
        descripcion_pedido.value = "";
        foto_pedido.value = "";
        loader.style.display = "none";
        Swal.fire({
          icon: "success",
          title: "Envio exitoso",
          html: "Su pedido ha sido enviado con éxito.",
        });
      })
      .catch((error) => {
        console.log("Error en el post");
        loader.style.display = "none";
        Swal.fire({
          icon: "error",
          title: "Ha ocurrido un error",
          html: "Por favor inténtalo más tarde, intenta refrescar o coméntale al personal.",
        });
      });
  }
});

 let pedidos = [];

  function renderPedidos() {
    const container = document.getElementById("content_card_item_carrito_map");

    
    container.innerHTML = pedidos
      .map(
        (pedido, index) => `
        <div class="card_item_carrito">
          <p class="pedido_nombre">${pedido.nombre}</p>
          <p class="pedido_precio">${pedido.precio}</p>
          <input type="number" min="1" value="${pedido.cantidad}" 
                 onchange="updateCantidad(${index}, this.value)">
          <button id="btn_remove_pedido" onclick="removePedido(${index})">
            <img src="/dinamicas/CoWorking/resources/basura.png" 
                 alt="Eliminar" width="20">
          </button>
        </div>
      `
      )
      .join("");
      
    }
    
    function PaintCardPedido(precioCafe, nombreCafe) {
      pedidos.push({ nombre: nombreCafe, precio: precioCafe, cantidad: 1 });
      renderPedidos();
    }
  
    // --- Eliminar pedido ---
    function removePedido(index) {
      pedidos.splice(index, 1);
      renderPedidos();
    }
  // --- Agregar un pedido ---


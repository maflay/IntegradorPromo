window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  loader.style.display = "none";
});

window.addEventListener("DOMContentLoaded", () => {
  const loader_envio = document.getElementById("loader-envio");
  loader_envio.style.display = "none";
  const loader = document.getElementById("loader");
  const nombre_pedido = document.getElementById("nombre_pedido");
  const cedula_pedido = document.getElementById("cedula_pedido");
  const mesa_pedido = document.getElementById("mesa_pedido");
  const foto_pedido = document.getElementById("foto_pedido");
  const descripcion_pedido = document.getElementById("descripcion_pedido");
  const btn_enviar_pedido = document.getElementById("btn_enviar_pedido");
  const btn_what_pedido = document.getElementById("btn_what_pedido");
  const tipo_pago = document.getElementById("tipo_pago");
  const monto_efectivo = document.getElementById("monto_efectivo");
  const producto_add = document.getElementById("producto_add");
  const producto_del = document.getElementById("producto_del");

  tipo_pago.addEventListener("change", (e) => {
    if (e.target.value === "Efectivo") {
      document.getElementById("monto_efectivo").style.display = "flex";
    } else {
      document.getElementById("monto_efectivo").style.display = "none";
    }
  });

  const formatoPesos_monto_efectivo = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  });

  monto_efectivo.addEventListener("input", (e) => {
    let valor = e.target.value;

    // Eliminar caracteres que no sean dígitos
    valor = valor.replace(/\D/g, "");

    if (valor) {
      // Convertir a número
      const numero = parseInt(valor, 10);

      // Mostrar con formato COP
      e.target.value = formatoPesos_monto_efectivo.format(numero);
    } else {
      e.target.value = "";
    }
  });

  const Total_del_pedido = document.getElementById("Total_del_pedido");
  const container = document.getElementById("content_card_item_carrito_map");

  // Menús: soporta .menu_card_1 y #menu_productos
  const menuPrincipal = document.querySelector(".menu_card_1");
  const menuProductos = document.getElementById("menu_productos");

  const WEBAPP_URL =
    "https://script.google.com/macros/s/AKfycbz6N5YHKvx7m2v6QIUv22cQt6rquoVAynhyvK4eczfIuXEo4-CVYomVqsnpExB_0jb98Q/exec";

  const URL_DETALLE =
    "https://script.google.com/macros/s/AKfycbxD4p_NAnJ5PD7ORn-LF7CQelaxe9AOsoJmTU4fZIiimXhk4inRKZGM4WJp1VfFB8Fg/exec";
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

  // ===== Estado único del carrito =====
  let pedidos = [];

  // ===== Helpers de formato COP =====
  function textoAPesosNumero(t) {
    const limpio = String(t).replace(/[^\d]/g, "");
    return Number(limpio || 0);
  }
  function formatoCOP(n) {
    return n.toLocaleString("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
    });
  }

  // ===== Render del carrito (sin listeners adentro) =====
  function renderPedidos() {
   producto_del.style.display == "flex" ? producto_add.style.display = "none" : producto_add.style.display = "flex";
    setTimeout(() => {
      producto_add.style.display = "none";
    }, 1500);
    // console.log(pedidos);
    container.innerHTML = pedidos
  .map((p, index, arr) => {
    const i = arr.length - 1 - index; // índice invertido
    const item = arr[i];
    return `
      <div class="card_item_carrito" data-index="${i}">
        <p class="pedido_nombre">${item.nombre}${item.size ? ` (${item.size})` : ""}</p>
        <p class="pedido_precio">${formatoCOP(item.precio)}</p>
        <input class="cantidad-input" type="number" min="1" value="${item.cantidad}">
        <button class="btn_eliminar_item" title="Eliminar">🗑️</button>
      </div>
    `;
  })
  .join("");


    recalcularTotal();
  }

  function recalcularTotal() {
    const total = pedidos.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
    Total_del_pedido.textContent = total ? formatoCOP(total) : "";
  }

  function resumenLineas() {
    return pedidos
      .map((p) => `${p.nombre}${p.size ? ` (${p.size})` : ""} x${p.cantidad}`)
      .join("\n");
  }

  // ===== Agregar ítem desde una "card" del MENÚ =====
  function addDesdeCardMenu(card, precioElOpt) {
    // nombre
    const nombre =
      (
        card.querySelector(".nombre_producto") ||
        card.querySelector(".title_menu_producto h5") ||
        card.querySelector("h5")
      )?.textContent
        ?.trim()
        .replace(/\s+/g, " ") || "Producto";

    // precio (si vino el <p class="precio-item"> clickeado úsalo, si no toma el primero del card)
    const precioEl =
      precioElOpt ||
      card.querySelector(".precio-item") ||
      card.querySelector(".mini_card_adicional .precio-item");
    const precioTxt = (precioEl?.textContent || "").trim();
    if (!precioTxt || precioTxt === "-") return; // sin precio, no agregues
    const precioNumber = textoAPesosNumero(precioTxt);

    // tamaño (h6 hermano del precio; si no hay, "")
    const size = (
      precioEl?.parentElement?.querySelector("h6")?.textContent || ""
    ).trim();

    // cantidad (si el card trae .cantidad-input; si no, 1)
    const inputCant = card.querySelector(".cantidad-input");
    const cant = inputCant ? Math.max(1, Number(inputCant.value) || 0) : 1;

    // clave única por nombre+size
    const key = `${nombre}|${size}`;
    const existente = pedidos.find(
      (p) => `${p.nombre}|${p.size || ""}` === key
    );

    if (!existente) {
      pedidos.push({
        nombre,
        precio: precioNumber,
        cantidad: cant,
        size,
      });
    }
    renderPedidos();
  }

  // ===== Delegación en MENÚS (agregar al carrito) =====
  function handleClickMenu(e) {
    // Clic específico en un precio
    const precioEl = e.target.closest(".precio-item");
    if (precioEl) {
      const card = precioEl.closest(
        ".menu_card_producto, .menu_card_produto, .mini_card_adicional"
      );
      if (card) addDesdeCardMenu(card, precioEl);
      return;
    }
    // o clic en toda la card (según tu UX)
    const card = e.target.closest(
      ".menu_card_producto, .menu_card_produto, .mini_card_adicional"
    );
    if (card) addDesdeCardMenu(card);
  }
  menuPrincipal?.addEventListener("click", handleClickMenu);
  menuProductos?.addEventListener("click", handleClickMenu);

  // ===== Delegación en el CONTENEDOR del carrito (cambiar cantidad / eliminar) =====
  container.addEventListener("input", (e) => {
    if (!e.target.matches(".cantidad-input")) return;
    const card = e.target.closest(".card_item_carrito");
    const index = Number(card.dataset.index);
    const n = Math.max(1, Number(e.target.value) || 1);
    pedidos[index].cantidad = n;
    recalcularTotal();
  });

  container.addEventListener("click", (e) => {
    if (!e.target.closest(".btn_eliminar_item")) return;
    producto_del.style.display = "flex";
    setTimeout(() => {
      producto_del.style.display = "none";
    }, 1500);
    const card = e.target.closest(".card_item_carrito");
    const index = Number(card.dataset.index);
    pedidos.splice(index, 1);
    renderPedidos();
  });

  // ===== WhatsApp =====
  btn_what_pedido.addEventListener("click", () => {
    // const telCliente = (mesa_pedido.value || "").trim();
    // if (!telCliente) {
    //   Swal.fire({
    //     icon: "info",
    //     title: "Antes de continuar",
    //     html: "Digita un número válido para poderte comunicar con nosotros.",
    //     heightAuto: false,
    //   });
    //   return;
    // }
    window.open(`https://wa.me/573159490246`, "_blank");
  });

  // ===== Archivo a base64 =====
  function fileToDataURL(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = () => reject(reader.error);
      reader.onload = () => resolve(reader.result); // "data:image/png;base64,...."
      reader.readAsDataURL(file);
    });
  }

  // ===== Enviar pedido =====
  btn_enviar_pedido.addEventListener("click", handleSubmitPedido);

  async function handleSubmitPedido() {
    const nombre = (nombre_pedido.value || "").trim();
    const cedula = (cedula_pedido.value || "").trim();
    const mesa = (mesa_pedido.value || "").trim();
    const descripcion = (descripcion_pedido.value || "").trim();
    const file = foto_pedido.files?.[0] || null;
    const tipoPago = tipo_pago.value;

    const montoEfectivo = Number(monto_efectivo.value);

    const formatoPesos = montoEfectivo.toLocaleString("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    });

    if (!nombre || !cedula || !mesa || !file || !tipoPago) {
      Swal.fire({
        title: "Campos incompletos",
        text: "Completa los campos y sube una foto.",
        icon: "info",
        heightAuto: false,
        allowOutsideClick: false,
      });
      return;
    }
    if (!pedidos.length) {
      Swal.fire({
        icon: "info",
        title: "Sin productos",
        text: "Agrega productos antes de enviar.",
        heightAuto: false,
        allowOutsideClick: false,
      });
      return;
    }

    // preparar adjunto
    const base64 = await fileToDataURL(file);

    // resumen para el segundo envío
    const totalNumero = pedidos.reduce(
      (acc, p) => acc + p.precio * p.cantidad,
      0
    );
    const pedidos_envio = pedidos.map((p) => ({
      nombre: p.nombre,
      size: p.size || null,
      precio_unit: p.precio,
      cantidad: p.cantidad,
      subtotal: p.precio * p.cantidad,
    }));

    const payloadResumen = {
      tipo: "envio_1",
      valor_1: hora,
      valor_2: fecha,
      valor_3: nombre,
      valor_4: descripcion,
      valor_5: formatoCOP(totalNumero), // o totalNumero si tu GAS espera número
      valor_6: JSON.stringify(pedidos_envio), // guardar carrito como JSON en una celda
      valor_7: cedula, // por si quieres tenerlo en la hoja
      valor_8: monto_efectivo.value,
      valor_9: mesa,
      resumen: resumenLineas(),
      imagen_base64: base64,
      nombreArchivoImagen: `pedido_${cedula}_${Date.now()}`,
    };

    // helpers fetch
    const fetchOpts = (bodyObj) => ({
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify(bodyObj),
    });

    btn_enviar_pedido.disabled = true;
    loader_envio.style.display = "flex";

    try {
      // 1) PRIMERA FASE: enviar cada ítem (secuencial)
      for (const p of pedidos) {
        const data_item = {
          tipo: "envio_1", // el tipo que maneje tu GAS de detalle
          valor_1: `${p.nombre}-${p.size || ""}`.trim(), // nombre-size
          valor_2: p.cantidad, // cantidad
          valor_3: cedula, // cédula del cliente
          // agrega más campos si necesitas (mesa, precio, subtotal, etc.)
        };
        await fetch(URL_DETALLE, fetchOpts(data_item));
      }

      // 2) SEGUNDA FASE: enviar resumen al WEBAPP_URL
      await fetch(WEBAPP_URL, fetchOpts(payloadResumen));

      // limpiar UI
      nombre_pedido.value = "";
      cedula_pedido.value = "";
      mesa_pedido.value = "";
      descripcion_pedido.value = "";
      foto_pedido.value = "";
      tipo_pago.value = "";
      monto_efectivo.value = "";
      pedidos = [];
      renderPedidos();

      Swal.fire({
        icon: "success",
        title: "Envío exitoso",
        html: "Tu pedido ha sido enviado con éxito, estaremos contigo en unos minutos.",
        heightAuto: false,
        allowOutsideClick: false,
      });
    } catch (err) {
      console.error("Error en el envío:", err);
      Swal.fire({
        icon: "error",
        title: "Ha ocurrido un error",
        html: "Por favor inténtalo de nuevo por favor.",
        heightAuto: false,
        allowOutsideClick: false,
      });
    } finally {
      loader_envio.style.display = "none";
      btn_enviar_pedido.disabled = false;
    }
  }
});

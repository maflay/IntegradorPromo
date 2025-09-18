window.addEventListener("load", () => {
  const loader = document.getElementById("loader-despacho");
  if (loader) loader.style.display = "none";
});

window.addEventListener("DOMContentLoaded", () => {
  const pedidos_despacho = document.getElementById("pedidos_despacho");
  if (!pedidos_despacho) return;

  // 👇 pon aquí tu URL del WebApp (doGet) que devuelve JSON de la hoja "Clientes"
  const WEBAPP_URL =
    "https://script.google.com/macros/s/AKfycbz6N5YHKvx7m2v6QIUv22cQt6rquoVAynhyvK4eczfIuXEo4-CVYomVqsnpExB_0jb98Q/exec";

  const FALLBACK_IMG =
    "data:image/svg+xml;utf8,\
<svg xmlns='http://www.w3.org/2000/svg' width='600' height='400'>\
<rect width='100%' height='100%' fill='%23f3f4f6'/>\
<text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%239ca3af' font-size='20'>Sin imagen</text>\
</svg>";

  // -------- utilidades --------
  const normalizeKey = (k) =>
    String(k || "")
      .replace(/\uFEFF/g, "") // BOM
      .trim()
      .replace(/\s+/g, " "); // colapsa espacios múltiples

  const byKey = (row, keys) => {
    // mapa de claves normalizadas → valor
    const map = {};
    for (const k of Object.keys(row)) map[normalizeKey(k)] = row[k];
    for (const k of keys) {
      const norm = normalizeKey(k);
      if (map[norm] != null && String(map[norm]).trim() !== "")
        return map[norm];
    }
    return "";
  };

  // ID "puro" de Drive
  const isDriveId = (v) =>
    !!v && /^[a-zA-Z0-9_-]{20,}$/.test(v) && !/^https?:\/\//.test(v);

  const extractDriveIdFromUrl = (urlStr = "") => {
    try {
      const u = new URL(urlStr);
      const idParam = u.searchParams.get("id");
      if (idParam) return idParam;
      const m = u.pathname.match(/\/d\/([^/]+)/);
      if (m && m[1]) return m[1];
      return "";
    } catch {
      return "";
    }
  };

  const resolveImage = (raw) => {
    const v = String(raw || "")
      .trim()
      .replace(/&amp;/g, "&");
    if (!v) return "";
    if (v.startsWith("data:image/")) return v; // base64 ya sirve
    if (isDriveId(v)) return `https://drive.google.com/uc?export=view&id=${v}`;
    if (/^https?:\/\//i.test(v)) {
      if (v.includes("drive.google.com")) {
        const id = extractDriveIdFromUrl(v);
        return id ? `https://drive.google.com/uc?export=view&id=${id}` : v;
      }
      return v; // otra URL pública
    }
    return "";
  };

  // formatea hora si es una fecha/ISO
  const formatHora = (v) => {
    if (!v) return "";
    // si ya parece ser solo hora simple, devuélvela
    if (typeof v === "string" && /^\d{1,2}:\d{2}(:\d{2})?$/.test(v)) return v;
    const d = new Date(v);
    if (isNaN(d)) return String(v); // no es fecha válida: devuélvelo tal cual
    return d.toLocaleTimeString("es-CO", {
      timeZone: "America/Bogota",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // formatea fecha en es-CO
  const formatFecha = (v) => {
    if (!v) return "";
    const d = new Date(v);
    if (isNaN(d)) return String(v); // si no es fecha válida, la devuelve tal cual
    return d.toLocaleDateString("es-CO", {
      timeZone: "America/Bogota",
      day: "2-digit",
      month: "long", // cambia a "long" para ver "septiembre"
      year: "numeric",
    });
  };

  // helper para agarrar el primer campo existente
  const pick = (obj, ...keys) => {
    for (const k of keys) {
      if (obj?.[k] != null && obj[k] !== "") return obj[k];
    }
    return "";
  };

  function GetAllPedidos() {
    fetch(WEBAPP_URL)
      .then(async (r) => {
        const text = await r.text();
        // intenta parsear JSON o lanza un error claro
        let data;
        try {
          data = JSON.parse(text);
        } catch (e) {
          throw new Error(
            "La respuesta no es JSON (¿WebApp público con 'Cualquiera con el enlace'?)."
          );
        }
        return data;
      })
      .then((rows) => {
        // normaliza a array
        let arr = [];
        if (Array.isArray(rows)) arr = rows;
        else if (Array.isArray(rows?.resultados)) arr = rows.resultados;
        else if (Array.isArray(rows?.data)) arr = rows.data;
        else if (rows && typeof rows === "object") {
          const vals = Object.values(rows);
          // si el primer valor es un array, úsalo; si no, usa todos los valores
          if (Array.isArray(vals[0])) arr = vals[0];
          else arr = vals;
        }
console.log(rows,"rows");
        if (!arr.length) {
          pedidos_despacho.innerHTML = "<p>No hay pedidos.</p>";
          return;
        }
        const html = arr
          .reverse()
          .map((row) => {
            // Lee EXACTAMENTE tus encabezados (con tolerancia a espacios extra)
            const horaStr = pick(
              row,
              "Hora",
              "hora",
              "Hora_FF",
              "timestamp",
              "created_at"
            );
            console.log(row,"row");
            const fechaStr = pick(row, "Fecha", "fecha", "Fecha_FF");
            const nombre = byKey(row, ["Nombre"]) || "—";
            const pedido = byKey(row, ["Pedido"]) || "—";
            const llave = byKey(row, ["Pedido Llave"]) || "—";
            const fotoVal = byKey(row, [
              "Foto_cliente",
              "Foto cliente",
              "Foto",
            ]);

            const fechaObj = formatFecha(fechaStr);
            const horaObj = formatHora(horaStr);

            const imgUrl = resolveImage(fotoVal);
            const safeImg = imgUrl || FALLBACK_IMG;

            // Debug útil: ver qué llega
            console.log({
              fechaObj,
              horaObj,
              nombre,
              pedido,
              llave,
              fotoVal,
              imgUrl,
            });
            // <img src="${safeImg}" alt="foto del pedido" loading="lazy"
            //      onerror="this.src='${FALLBACK_IMG}'">

            return `
          <article class="card-pedido-despacho">
            <div class="card-body-despacho">
              <h3 class="card-title-despacho-nombre">${nombre}</h3>
              <div class="card-meta-despacho-fecha"><strong>Fecha:</strong> ${fechaObj}</div>
              <div class="card-meta-despacho-hora"><strong>Hora:</strong> ${horaObj}</div>
              <div class="card-meta-despacho-pedido"><strong>Pedido:</strong> ${pedido}</div>
              ${
                imgUrl
                  ? `<a class="badge-despacho" href="${imgUrl}" target="_blank" rel="noopener">Ver Foto</a>`
                  : ""
              }
            </div>
          </article>
        `;
          })
          .join("");

        pedidos_despacho.innerHTML = html;
      })
      .catch((e) => {
        console.error(e);
        pedidos_despacho.innerHTML = `<p>Error cargando los pedidos: ${
          e.message || e
        }</p>`;
        Swal?.fire?.("Error", String(e.message || e), "error");
      });
  }
  GetAllPedidos();

  setInterval(() => {
    GetAllPedidos();
  }, 10000);
});

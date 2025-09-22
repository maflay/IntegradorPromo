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

    const URL_EXTRA = "https://script.google.com/macros/s/AKfycbxD4p_NAnJ5PD7ORn-LF7CQelaxe9AOsoJmTU4fZIiimXhk4inRKZGM4WJp1VfFB8Fg/exec";

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
//   function getPedidoPorCedula (){
//     let url_Pedido = "https://script.google.com/macros/s/AKfycbxD4p_NAnJ5PD7ORn-LF7CQelaxe9AOsoJmTU4fZIiimXhk4inRKZGM4WJp1VfFB8Fg/exec";
//     fetch(`${url_Pedido}`)
//       .then(async (r) => {
//         const text = await r.json();
//         console.log(text);
//   })
//   }  

// getPedidoPorCedula();


  const normCed = (v) => String(v ?? "").replace(/\D/g, ""); // deja solo dígitos

function GetAllPedidos() {
  Promise.all([
    fetch(WEBAPP_URL).then(r => { if(!r.ok) throw new Error(`A HTTP ${r.status}`); return r.json(); }),
    fetch(URL_EXTRA).then(r => { if(!r.ok) throw new Error(`B HTTP ${r.status}`); return r.json(); })
  ])
  .then(([rowsA, rowsB]) => {
    // normaliza respuesta a arrays
    let A = Array.isArray(rowsA) ? rowsA : (rowsA?.data || rowsA?.resultados || []);
    let B = Array.isArray(rowsB) ? rowsB : (rowsB?.data || rowsB?.resultados || []);
    if (!Array.isArray(A)) A = [];
    if (!Array.isArray(B)) B = [];

    if (!A.length) {
      pedidos_despacho.innerHTML = "<p>No hay pedidos.</p>";
      return;
    }

    // 🔹 agrupa B por cédula → Map(cedulaNormalizada -> Array de filas B)
    const groupB = new Map();
    for (const r of B) {
      const key = normCed(byKey(r, ["Cedula","cedula"]));
      if (!key) continue;
      if (!groupB.has(key)) groupB.set(key, []);
      groupB.get(key).push(r);
    }

    // 🔹 render de A, listando TODOS los matches de B
    const html = A.reverse().map(rowA => {
      const cedNorm = normCed(byKey(rowA, ["Cedula","cedula"]));
      const nombre  = byKey(rowA, ["Nombre"]) || "—";
      const pedidoA = byKey(rowA, ["Pedido"]) || "—";
      const fecha   = formatFecha(byKey(rowA, ["Fecha","fecha"]));
      const hora    = formatHora(byKey(rowA, ["Hora","hora"]));
      const fotoVal = byKey(rowA, ["Foto_cliente","Foto cliente","Foto"]);
      const imgUrl  = resolveImage(fotoVal);

      // todos los registros relacionados en URL_EXTRA para esta cédula
      const matches = groupB.get(cedNorm) || [];

      // cómo mostrar cada match de B (ajusta las claves según tu hoja B)
      const listaB = matches.map((m, i) => {
        const pedidoB = byKey(m, ["Pedido"]) || "(sin pedido)";
        const cantidadB    = byKey(m, ["Cantidad","cantidad"]) || "";
        const estado  = byKey(m, ["Estado","estado"]) || "";
        // agrega más campos si quieres
        return `
          <span><strong>♦️</strong> ${pedidoB}. ${cantidadB}</span>
          `;
      }).join("");

      return `
        <article class="card-pedido-despacho">
          <div class="card-body-despacho">
            <h3 class="card-title-despacho-nombre">${nombre} - ${cedNorm || "-"}</h3>
            <div class="card-meta-despacho-fecha"><strong>Fecha:</strong> ${fecha}</div>
            <div class="card-meta-despacho-hora"><strong>Hora:</strong> ${hora}</div>
            ${imgUrl ? `<a class="badge-despacho" href="${imgUrl}" target="_blank" rel="noopener">Ver Foto</a>` : ""}

            ${matches.length ? `
              <div class="card-meta-despacho-rel">
                <div class="lista-relacionados">${listaB}</div>
              </div>` 
            : `<div class="badge-despacho badge-warn">Sin registros en URL_EXTRA</div>`}
          </div>
        </article>
      `;
    }).join("");

    pedidos_despacho.innerHTML = html || "<p>No hay pedidos.</p>";
  })
  .catch(e => {
    console.error(e);
    pedidos_despacho.innerHTML = `<p>Error cargando los pedidos: ${e.message || e}</p>`;
    Swal?.fire?.("Error", String(e.message || e), "error");
  });
}

  GetAllPedidos();

  setInterval(() => {
    GetAllPedidos();
  }, 1000000);
});

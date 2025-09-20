function cleanUrl({ keepQuery = false, hash = "" } = {}) {
  const base = location.origin + location.pathname;
  const q = keepQuery ? location.search : "";
  const h = hash ? hash : ""; // p.ej. "#login" o "" para sin hash
  history.replaceState(null, document.title, base + q + h);
}
 cleanUrl({ keepQuery: false, hash: "#grand_aladdin" });
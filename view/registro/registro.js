export async function init(root) {
  const form = root.querySelector("#form-registro");
  const err = root.querySelector("#reg-error");
  const btn = root.querySelector("#btn-reg");
  const usuario = root.querySelector("#reg-usuario");
  const nombre = root.querySelector("#reg-nombre");
  const pass = root.querySelector("#reg-pass");
  const key = root.querySelector("#reg-key");
  const toggle = root.querySelector(".toggle-pwd");

  toggle?.addEventListener("click", () => {
    const isPwd = pass.type === "password";
    pass.type = isPwd ? "text" : "password";
    toggle.setAttribute("aria-pressed", String(isPwd));
  });

  usuario?.focus?.();

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    err.style.display = "none";
    btn.classList.add("loading");
    btn.disabled = true;

    const payload = {
      tipo: "public_register", // <-- agrega este endpoint en Apps Script
      usuario: usuario.value.trim(),
      password: pass.value,
      nombre: nombre.value.trim(),
      // rol fijo de entrada:
      rol: "viewer",
      // clave/invitación si usas:
      register_key: key.value.trim() || undefined,
    };
    console.log(payload);
    if (!payload.usuario || !payload.password || payload.password.length < 6) {
      err.textContent = "Verifica usuario y contraseña (mín 6 caracteres).";
      err.style.display = "block";
      btn.classList.remove("loading");
      btn.disabled = false;
      return;
    }

    try {
      const res = await apiFetch("", { body: payload });
      if (!res.ok) throw new Error(res.error || "No fue posible registrarte");

      // Listo: mandamos al login
      alert("Cuenta creada. Ahora inicia sesión.");
      location.hash = "#login";
    } catch (e2) {
      err.textContent = e2.message;
      err.style.display = "block";
    } finally {
      btn.classList.remove("loading");
      btn.disabled = false;
    }

    try {
      const res = await apiFetch("", { body: payload });
      if (!res.ok) throw new Error(res.error || "No fue posible registrarte");
      alert("Cuenta creada. Ahora inicia sesión.");
      location.hash = "#login";
    } catch (e2) {
      err.textContent = e2.message;
      err.style.display = "block";
    }
  });
}
export async function destroy() {}

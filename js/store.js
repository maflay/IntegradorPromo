// /js/store.js (clásico, global)
(function () {
  const LS_USER = "app:user";

  const listeners = new Set();
  let state = {
    user: null,
  };

  // --- Rehidratar al cargar ---
  try {
    const raw = localStorage.getItem(LS_USER);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === "object") state.user = parsed;
    }
  } catch {}

  function emit() {
    for (const fn of listeners) {
      try {
        fn(state);
      } catch {}
    }
  }

  function persist() {
    try {
      if (state.user) localStorage.setItem(LS_USER, JSON.stringify(state.user));
      else localStorage.removeItem(LS_USER);
    } catch {}
  }

  window.AppStore = {
    getState() {
      return state;
    },
    getUser() {
      return state.user;
    },

    setUser(user) {
      state = { ...state, user };
      persist();
      emit();
    },
    clearUser() {
      state = { ...state, user: null };
      persist();
      emit();
    },

    subscribe(fn) {
      if (typeof fn === "function") listeners.add(fn);
      try {
        fn(state);
      } catch {}
      return () => listeners.delete(fn);
    },
  };

  // 🔄 Sincronizar entre pestañas/ventanas
  window.addEventListener("storage", (e) => {
    if (e.key !== LS_USER) return;
    try {
      const nextUser = e.newValue ? JSON.parse(e.newValue) : null;
      state = { ...state, user: nextUser };
      emit();
    } catch {}
  });
})();

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

function metodoprueba(data) {
  const funcionario_nombre = document.getElementById("funcionario_nombre");
  const funcionario_cedula = document.getElementById("funcionario_cedula");
  const funcionario_rol = document.getElementById("funcionario_rol");
  const funcionario_email = document.getElementById("funcionario_email");
  const funcionario_telefono = document.getElementById("funcionario_telefono");
  funcionario_nombre.innerHTML = data[0].Nombre;
  funcionario_cedula.innerHTML = data[0].Cedula;
  funcionario_rol.innerHTML = data[0].Rol;
  funcionario_email.innerHTML = data[0].Correo;
  funcionario_telefono.innerHTML = data[0].Telefono;
}

window.metodoprueba = metodoprueba;

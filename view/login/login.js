// /view/login/login.js
export async function init(root) {
  const form = root.querySelector('#form-login');
  const err  = root.querySelector('#login-error');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    err.style.display = 'none';

    const usuario  = root.querySelector('#login-usuario').value.trim();
    const password = root.querySelector('#login-password').value;

    try {
      const res = await apiFetch('', { body: { tipo: 'auth_login', usuario, password } });
      if (!res.ok) throw new Error(res.error || 'Error de login');

      // guarda sesión (usa helpers del principal)
      const { token, exp, user } = res;
      localStorage.setItem('auth_token', token);
      localStorage.setItem('auth_exp', String(exp));
      localStorage.setItem('auth_user', JSON.stringify(user));

      const redirect = sessionStorage.getItem('post_login_redirect') || '#inicio';
      sessionStorage.removeItem('post_login_redirect');
      location.hash = redirect;
    } catch (e2) {
      err.textContent = e2.message;
      err.style.display = 'block';
    }
  });
}
export async function destroy() {}

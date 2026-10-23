// dark mode
function initDarkMode() {
  const btn = document.getElementById('dark-toggle');
  if (!btn) return;

  const saved = localStorage.getItem('theme');
  if (saved === 'light') document.body.classList.add('light-mode');

  btn.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const isLight = document.body.classList.contains('light-mode');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    btn.textContent = isLight ? '◑ Escuro' : '◑ Claro';
  });

  const isLight = document.body.classList.contains('light-mode');
  btn.textContent = isLight ? '◑ Escuro' : '◑ Claro';
}

// tamanho da fonte
function initFontSize() {
  const increase = document.getElementById('font-increase');
  const decrease = document.getElementById('font-decrease');
  if (!increase || !decrease) return;

  let size = parseFloat(localStorage.getItem('fontSize')) || 16;
  document.documentElement.style.fontSize = size + 'px';

  increase.addEventListener('click', () => {
    if (size >= 22) return;
    size += 1;
    document.documentElement.style.fontSize = size + 'px';
    localStorage.setItem('fontSize', size);
  });

  decrease.addEventListener('click', () => {
    if (size <= 12) return;
    size -= 1;
    document.documentElement.style.fontSize = size + 'px';
    localStorage.setItem('fontSize', size);
  });
}

// validação do formulário de contato
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nome  = form.querySelector('#nome');
    const email = form.querySelector('#email');
    const msg   = form.querySelector('#mensagem');
    let ok = true;

    [nome, email, msg].forEach(el => el.classList.remove('input-error'));

    if (!nome.value.trim()) {
      nome.classList.add('input-error');
      ok = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value.trim())) {
      email.classList.add('input-error');
      ok = false;
    }

    if (!msg.value.trim()) {
      msg.classList.add('input-error');
      ok = false;
    }

    const feedback = document.getElementById('form-feedback');
    if (!ok) {
      feedback.textContent = '// preencha todos os campos corretamente.';
      feedback.style.color = '#ff4466';
    } else {
      feedback.textContent = '// mensagem enviada com sucesso!';
      feedback.style.color = 'var(--neon)';
      form.reset();
    }
  });
}

// init
document.addEventListener('DOMContentLoaded', () => {
  initDarkMode();
  initFontSize();
  initContactForm();
});

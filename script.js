const body = document.body;
const buttons = document.querySelectorAll('[data-lang-toggle]');

const setLanguage = (lang) => {
  body.setAttribute('data-lang', lang);

  buttons.forEach((button) => {
    const active = button.dataset.langToggle === lang;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  });

  document.querySelectorAll('.lang-panel').forEach((panel) => {
    panel.classList.toggle('active', panel.classList.contains(lang));
  });
};

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    setLanguage(button.dataset.langToggle);
  });
});

setLanguage('en');

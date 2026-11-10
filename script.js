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

const pluralRu = (n, one, few, many) => {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return one;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return few;
  return many;
};

const formatUnit = (n, lang, unit) => {
  if (lang === 'ru') {
    return unit === 'year'
      ? `${n} ${pluralRu(n, 'год', 'года', 'лет')}`
      : `${n} ${pluralRu(n, 'месяц', 'месяца', 'месяцев')}`;
  }
  return `${n} ${unit}${n === 1 ? '' : 's'}`;
};

// Counts months inclusively (start month and current month both count),
// matching how the closed periods on the CV are written.
const updateDurations = () => {
  const now = new Date();
  document.querySelectorAll('[data-duration-since]').forEach((el) => {
    const [year, month] = el.dataset.durationSince.split('-').map(Number);
    const totalMonths = (now.getFullYear() - year) * 12 + (now.getMonth() + 1 - month) + 1;
    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;
    const lang = el.dataset.durationLang || 'en';

    if (el.dataset.durationFormat === 'years') {
      el.textContent = formatUnit(years, lang, 'year');
      return;
    }

    const parts = [];
    if (years) parts.push(formatUnit(years, lang, 'year'));
    if (months || !years) parts.push(formatUnit(months, lang, 'month'));
    el.textContent = parts.join(' ');
  });
};

updateDurations();

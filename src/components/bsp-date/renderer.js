'use strict';

const months = {
  en: [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
  ],
  cy: [
    'Ionawr', 'Chwefror', 'Mawrth', 'Ebrill', 'Mai', 'Mehefin', 'Gorffennaf',
    'Awst', 'Medi', 'Hydref', 'Tachwedd', 'Rhagfyr'
  ]
};

exports.renderer = function (input, out) {
  const reqLang = (out.stream.req || {}).language;
  const dateLang = (reqLang === 'cy') ? 'cy' : 'en';
  const date = new Date();
  const monthId = date.getMonth();

  out.write(
    `<time datetime="${date.toISOString()}">` +
      `${date.getDay()} ${months[dateLang][monthId]} ${date.getFullYear()}` +
    `</time>`
  );
};

/* LORDEN PROMPTS — script.js
   Часть 1: КОНФИГУРАЦИЯ (здесь меняются цены, контакт, тексты). Часть 2: поведение. */
(() => {
'use strict';
const CONFIG = {
  brand: 'LORDEN PROMPTS',
  tgUser: 'rozovoye',
  plans: [
    { id: 'START', price: 20, desc: 'Простой промт для небольшой, чётко сформулированной задачи.',
      items: ['уточнение цели', 'подготовка индивидуального текста', 'базовая структура', 'основные ограничения', 'одна корректировка в пределах задания'] },
    { id: 'PRO', price: 25, desc: 'Подробный промт для задачи с несколькими требованиями.',
      items: ['уточнение требований', 'структурированные разделы', 'описание контекста', 'требования к результату', 'ограничения и критерии проверки', 'до двух корректировок'] },
    { id: 'ADVANCED', price: 50, desc: 'Сложный или многоэтапный промт.',
      items: ['подробный сбор требований', 'декомпозиция задачи', 'несколько логических этапов', 'требования к качеству', 'дополнительные сценарии и ограничения', 'критерии проверки', 'до двух корректировок'] }
  ],
  improve: { id: 'IMPROVE', name: 'Улучшение существующего промта', price: 'От 20 ₽ — после оценки задачи (предварительно)' },
  categories: [
    { id: 'WEB', short: 'Сайты', name: 'WEBSITE PROMPTS', icon: 'M3 5h18v14H3z M3 9h18', desc: 'Промты для создания сайтов с помощью нейросетей.', tasks: ['лендинги и портфолио', 'интернет-магазины', 'сайты цифровых услуг', 'адаптивные интерфейсы', 'редизайн сайтов', 'ТЗ для веб-проектов'] },
    { id: 'CODE', short: 'Код', name: 'CODE PROMPTS', icon: 'M8 8l-4 4 4 4 M16 8l4 4-4 4 M13 6l-2 12', desc: 'Промты для написания, объяснения и улучшения кода.', tasks: ['Python-скрипты', 'обработка ошибок', 'рефакторинг', 'поиск причин неисправностей', 'разбор чужого кода', 'небольшие утилиты'] },
    { id: 'APP', short: 'Приложения', name: 'APP PROMPTS', icon: 'M7 3h10v18H7z M11 18h2', desc: 'Промты для планирования и создания приложений через ИИ.', tasks: ['структура приложения', 'пользовательские сценарии', 'требования к интерфейсу', 'архитектура проекта', 'описание MVP', 'порядок разработки'] },
    { id: 'DESIGN', short: 'Дизайн', name: 'DESIGN PROMPTS', icon: 'M4 20l4-1 11-11-3-3L5 16z M14 6l3 3', desc: 'Промты для генерации визуальных концепций и дизайна.', tasks: ['аватары и логотипы', 'обложки и баннеры', 'иллюстрации', 'оформление профиля', 'цветовые палитры', 'визуальные концепции'] },
    { id: 'PYAUTO', short: 'Автоматизация', name: 'PYTHON & AUTOMATION', icon: 'M12 8a4 4 0 100 8 4 4 0 000-8z M12 2v3 M12 19v3 M2 12h3 M19 12h3', desc: 'Промты для автоматизации рутинных задач.', tasks: ['обработка файлов', 'переименование файлов', 'сортировка данных', 'обработка CSV', 'повторяющиеся действия', 'вспомогательные скрипты'] },
    { id: 'TG', short: 'Telegram', name: 'TELEGRAM PROMPTS', icon: 'M21 4L3 11l6 2 2 7 3-5 5 4z', desc: 'Промты для планирования Telegram-проектов.', tasks: ['Telegram-боты', 'команды бота', 'структура проекта', 'сценарии взаимодействия', 'сообщения интерфейса', 'инструкции ИИ для кода бота'] },
    { id: 'CONTENT', short: 'Контент', name: 'CONTENT PROMPTS', icon: 'M5 4h14v16H5z M8 9h8 M8 13h8 M8 17h5', desc: 'Промты для подготовки текстового контента.', tasks: ['публикации', 'описания продуктов', 'контент-планы', 'тексты для соцсетей', 'структуры статей', 'описания цифровых услуг'] },
    { id: 'CUSTOM', short: 'Индивидуальные', name: 'CUSTOM PROMPTS', icon: 'M12 3l2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5z', desc: 'Индивидуальная проработка нестандартных задач.', tasks: ['многоэтапные инструкции', 'анализ требований', 'комбинированные задачи', 'нестандартные процессы', 'задачи вне других категорий'] }
  ],
  examples: [
    { cat: 'WEB', title: 'Современный сайт цифровых услуг', desc: 'Промт для адаптивного сайта с каталогом, карточками услуг, контактами и тёмным дизайном.',
      text: `РОЛЬ: Ты — senior frontend-разработчик и UI/UX-дизайнер.\n\nЦЕЛЬ: Создать адаптивный сайт студии цифровых услуг.\n\nАУДИТОРИЯ: владельцы небольших проектов, 20–40 лет, заходят с телефона и ноутбука.\n\nДИЗАЙН: тёмный минимализм (#0B0B0D, #18181D, текст #F4F4F5), системные шрифты, умеренные радиусы, без ярких градиентов.\n\nФУНКЦИИ: шапка с мобильным меню; главный экран; каталог из 6 услуг; тарифы; FAQ-аккордеон; контакт в Telegram.\n\nТЕХНИЧЕСКИЕ ОГРАНИЧЕНИЯ: только HTML, CSS и JavaScript без фреймворков; семантическая вёрстка; один h1; видимый focus; без внешних скриптов.\n\nФОРМАТ ОТВЕТА: сначала структура файлов, затем полный код каждого файла отдельным блоком, затем инструкция запуска на Windows.\n\nКРИТЕРИИ ГОТОВНОСТИ: нет горизонтальной прокрутки на 320 px; все кнопки работают; нет заглушек вместо функций.` },
    { cat: 'CODE', title: 'Python-утилита для обработки файлов', desc: 'Промт для небольшой программы с понятной структурой, обработкой ошибок и инструкцией запуска.',
      text: `ЦЕЛЬ: Напиши Python-утилиту, которая сортирует файлы папки по расширениям.\n\nОКРУЖЕНИЕ: Windows 11, Python 3.12, только стандартная библиотека, пользователь — новичок.\n\nТРЕБОВАНИЯ:\n1. Путь к папке запрашивается через input().\n2. Для каждого расширения создаётся подпапка.\n3. Файлы переносятся, существующие не перезаписываются (добавляй суффикс _1, _2).\n4. В конце выводится отчёт: сколько файлов перенесено.\n\nОБРАБОТКА ОШИБОК: несуществующая папка, нет прав доступа, занятый файл — понятное сообщение, программа не падает.\n\nФОРМАТ ВЫДАЧИ: один файл main.py с комментариями и команда запуска для PowerShell.\n\nПРОВЕРКА: предложи 3 теста на тестовой папке и объясни, что должно получиться.` },
    { cat: 'DESIGN', title: 'Минималистичный визуальный стиль', desc: 'Промт для графической концепции с заданной палитрой, композицией и требованиями к читаемости.',
      text: `ОБЪЕКТ: логотип-монограмма «L.» для цифрового бренда.\n\nКОМПОЗИЦИЯ: по центру, много свободного пространства, квадратный формат 1:1.\n\nПАЛИТРА: графитовый фон #0B0B0D, знак светло-серый #F4F4F5, один тонкий акцент линией #3B3B44.\n\nОСВЕЩЕНИЕ: мягкое рассеянное, без бликов и резких теней.\n\nМАТЕРИАЛЫ: матовая поверхность, без объёма и текстур.\n\nОГРАНИЧЕНИЯ: без градиентов, без лишних символов, читаемость при размере 32×32 px.\n\nИТОГОВЫЙ ФОРМАТ: 4 варианта, 1024×1024, фон однотонный.` },
    { cat: 'TG', title: 'Планирование Telegram-бота', desc: 'Промт для требований к боту, его командам, сценариям и структуре проекта.',
      text: `РОЛЬ: Ты — разработчик Telegram-ботов на Python (aiogram).\n\nЦЕЛЬ: Спланируй бота для записи на консультацию.\n\nСДЕЛАЙ:\n1. Список команд (/start, /book, /cancel, /help) и что делает каждая.\n2. Сценарий диалога по шагам, тексты сообщений.\n3. Структуру папок проекта.\n4. Что хранить и где (без лишних персональных данных).\n5. Токен — только в переменной окружения.\n\nФОРМАТ: сначала план, потом код по файлам, потом запуск на Windows.\n\nПРОВЕРКА: список ситуаций, которые нужно протестировать вручную.` },
    { cat: 'APP', title: 'Проектирование приложения', desc: 'Промт для определения функций, экранов, сценариев и последовательности разработки MVP.',
      text: `РОЛЬ: Ты — продуктовый аналитик и архитектор приложений.\n\nЗАДАЧА: Спроектировать MVP приложения-трекера привычек.\n\nНУЖНО ВЫДАТЬ:\n1. Целевого пользователя и главную проблему.\n2. Список функций: обязательные для MVP и отложенные.\n3. Экраны и переходы между ними.\n4. Основные пользовательские сценарии.\n5. Рекомендуемый стек для новичка и обоснование.\n6. Порядок разработки по шагам с критерием готовности каждого шага.\n\nОГРАНИЧЕНИЯ: один разработчик, бесплатные инструменты, срок 4 недели.\n\nФОРМАТ: заголовки и нумерованные списки, без воды.` }
  ],
  faq: [
    ['Что именно я покупаю?', 'Ты оплачиваешь подготовку индивидуального текста промта для выбранной задачи. Готовый текст можно использовать в подходящей нейросети самостоятельно.'],
    ['Вы создаёте сами сайты и приложения?', 'В рамках этой услуги мы готовим промты, с помощью которых ты сможешь попросить нейросеть создать сайт, приложение или другой продукт. Разработка самого продукта не входит в стоимость промта.'],
    ['Для каких нейросетей подходят промты?', 'Мы можем подготовить промт под Claude, ChatGPT или другую подходящую модель. Возможности конкретной нейросети необходимо учитывать при составлении задания.'],
    ['Гарантирует ли промт идеальный результат?', 'Нет. Качественный промт делает требования более понятными, но не гарантирует идеальный ответ. Результат зависит от модели, исходных данных и сложности задачи.'],
    ['Можно ли заказать промт для сложного проекта?', 'Да. Для сложных задач мы можем разбить требования на этапы, определить формат результата и согласовать объём работы заранее.'],
    ['Что входит в корректировки?', 'Корректировки относятся к согласованному заданию. Изменение цели или существенное расширение задачи может потребовать отдельного согласования.'],
    ['Как происходит оплата?', 'Способ оплаты и условия выполнения заказа согласовываются индивидуально до начала работы. Сайт не принимает и не обрабатывает платежи автоматически.'],
    ['Как я получу промт?', 'После выполнения заказа готовый текст передаётся согласованным способом, например в Telegram.'],
    ['Нужно ли уметь программировать?', 'Нет. Мы помогаем сформулировать задачу для нейросети. Для запуска созданного программного продукта могут потребоваться отдельные технические действия.'],
    ['Можно ли улучшить мой существующий промт?', 'Да. Можно отправить исходный текст и объяснить, какой результат нужно улучшить. Стоимость зависит от объёма задачи.']
  ]
};

/* ---------- Поведение ---------- */
const $ = (s) => document.querySelector(s);
const rub = (n) => `${n} ₽`;
const tgUrl = (text) => `https://t.me/${CONFIG.tgUser}` + (text ? `?text=${encodeURIComponent(text)}` : '');
const catById = (id) => CONFIG.categories.find((c) => c.id === id);
function el(tag, props = {}, ...kids) {
  const n = document.createElement(tag);
  for (const [k, v] of Object.entries(props)) {
    if (k === 'text') n.textContent = v; else if (k === 'dataset') Object.assign(n.dataset, v); else n.setAttribute(k, v);
  }
  kids.forEach((k) => n.append(k));
  return n;
}
function icon(d) {
  const ns = 'http://www.w3.org/2000/svg';
  const s = document.createElementNS(ns, 'svg'); s.setAttribute('viewBox', '0 0 24 24'); s.setAttribute('aria-hidden', 'true');
  const p = document.createElementNS(ns, 'path'); p.setAttribute('d', d); s.append(p); return s;
}
function orderBtn(label, cat, plan, cls = 'btn') {
  return el('button', { type: 'button', class: cls, text: label, dataset: { order: '', cat: cat || '', plan: plan || '' } });
}
async function copyText(text, node, out) {
  try { await navigator.clipboard.writeText(text); out.textContent = 'Текст скопирован.'; }
  catch (e) {
    const r = document.createRange(); r.selectNodeContents(node);
    const s = getSelection(); s.removeAllRanges(); s.addRange(r);
    if (node.select) node.select();
    out.textContent = 'Автоматическое копирование не удалось: текст выделен, скопируйте его вручную (Ctrl+C).';
  }
}

// Каталог и фильтры
function renderCatalog(filter = 'ALL') {
  const box = $('#catalog'); box.replaceChildren();
  CONFIG.categories.filter((c) => filter === 'ALL' || c.id === filter).forEach((c) => {
    box.append(el('article', { class: 'card', id: `cat-${c.id}` }, icon(c.icon), el('span', { class: 'tag', text: c.name }),
      el('p', { text: c.desc }), el('ul', {}, ...c.tasks.map((t) => el('li', { text: t }))), orderBtn('Заказать промт', c.id, '')));
  });
  reveal(box);
}
function renderFilters() {
  const box = $('#filters');
  [{ id: 'ALL', short: 'Все' }, ...CONFIG.categories].forEach((c) => {
    const b = el('button', { type: 'button', text: c.short, 'aria-pressed': String(c.id === 'ALL') });
    b.addEventListener('click', () => {
      box.querySelectorAll('button').forEach((x) => x.setAttribute('aria-pressed', 'false'));
      b.setAttribute('aria-pressed', 'true'); renderCatalog(c.id);
    });
    box.append(b);
  });
}
// Тарифы
function renderPlans() {
  const box = $('#plans');
  CONFIG.plans.forEach((p) => box.append(el('article', { class: 'card' }, el('span', { class: 'tag', text: p.id }),
    el('div', { class: 'price', text: rub(p.price), dataset: { v: p.price } }), el('p', { text: p.desc }),
    el('ul', {}, ...p.items.map((i) => el('li', { text: i }))), orderBtn(`Выбрать ${p.id}`, '', p.id, 'btn primary'))));
  $('#improvePrice').textContent = CONFIG.improve.price;
}
// Примеры
const exDlg = $('#exDlg'); let currentEx = null;
function renderExamples() {
  const box = $('#exlist');
  CONFIG.examples.forEach((ex) => {
    const b = el('button', { type: 'button', class: 'btn', text: 'Открыть пример' });
    b.addEventListener('click', () => {
      currentEx = ex; $('#exTitle').textContent = ex.title; $('#exText').textContent = ex.text; $('#exState').textContent = '';
      exDlg.showModal();
    });
    box.append(el('article', { class: 'card' }, el('span', { class: 'tag', text: `${catById(ex.cat).name} · ДЕМО` }),
      el('h3', { text: ex.title }), el('p', { text: ex.desc }), b));
  });
}
// FAQ
function renderFaq() {
  const box = $('#faqlist'); box.className = 'faq';
  CONFIG.faq.forEach(([q, a], i) => {
    const btn = el('button', { type: 'button', 'aria-expanded': 'false', 'aria-controls': `faq-a${i}`, id: `faq-q${i}` }, el('span', { text: q }), el('span', { text: '+', 'aria-hidden': 'true' }));
    const panel = el('div', { class: 'a', id: `faq-a${i}`, role: 'region', 'aria-labelledby': `faq-q${i}` }, el('div', {}, el('p', { text: a })));
    btn.addEventListener('click', () => {
      const open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!open)); panel.classList.toggle('open', !open);
    });
    box.append(btn, panel);
  });
}
// Заказ
const orderDlg = $('#orderDlg'), form = $('#orderForm');
function fillSelect(sel, opts) { sel.replaceChildren(...opts.map(([v, t]) => el('option', { value: v, text: t }))); }
function openOrder(cat, plan) {
  fillSelect($('#fCat'), CONFIG.categories.map((c) => [c.id, c.name]));
  fillSelect($('#fPlan'), [...CONFIG.plans.map((p) => [p.id, `${p.id} — ${rub(p.price)}`]), ['IMPROVE', `${CONFIG.improve.name} — ${CONFIG.improve.price}`], ['UNSURE', 'Пока не определился']]);
  $('#fCat').value = cat || 'CUSTOM'; $('#fPlan').value = plan || 'UNSURE';
  $('#result').hidden = true; $('#taskErr').textContent = ''; $('#fTask').removeAttribute('aria-invalid');
  orderDlg.showModal();
}
function planLabel(id) {
  const p = CONFIG.plans.find((x) => x.id === id);
  return p ? `${p.id} (${rub(p.price)}, стартовая цена)` : id === 'IMPROVE' ? CONFIG.improve.name : 'Пока не определился';
}
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const task = $('#fTask').value.trim();
  if (!task) { $('#taskErr').textContent = 'Ошибка: опишите задачу, чтобы сформировать сообщение.'; $('#fTask').setAttribute('aria-invalid', 'true'); $('#fTask').focus(); return; }
  $('#taskErr').textContent = ''; $('#fTask').removeAttribute('aria-invalid');
  const extra = $('#fExtra').value.trim() || 'нет';
  const msg = `Здравствуйте! Хочу заказать промт.\n\nКатегория: ${catById($('#fCat').value).name}\nТариф: ${planLabel($('#fPlan').value)}\n\nЗадача:\n${task}\n\nНейросеть:\n${$('#fAi').value}\n\nДополнительные требования:\n${extra}`;
  $('#msg').value = msg; $('#tgLink').href = tgUrl(msg); $('#copyState').textContent = '';
  $('#result').hidden = false; $('#msg').focus();
});
$('#copyMsg').addEventListener('click', () => copyText($('#msg').value, $('#msg'), $('#copyState')));
$('#copyEx').addEventListener('click', () => copyText($('#exText').textContent, $('#exText'), $('#exState')));
$('#orderSimilar').addEventListener('click', () => { const c = currentEx && currentEx.cat; exDlg.close(); openOrder(c, ''); });
// Общие обработчики
document.addEventListener('click', (e) => {
  const o = e.target.closest('[data-order]');
  if (o) { document.getElementById('nav').classList.remove('open'); burger.setAttribute('aria-expanded', 'false'); openOrder(o.dataset.cat, o.dataset.plan); }
  if (e.target.closest('[data-close]')) e.target.closest('dialog').close();
  if (e.target instanceof HTMLDialogElement) e.target.close(); // клик по фону
});
const burger = $('#burger'), nav = $('#nav');
burger.addEventListener('click', () => { const open = nav.classList.toggle('open'); burger.setAttribute('aria-expanded', String(open)); });
nav.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => { nav.classList.remove('open'); burger.setAttribute('aria-expanded', 'false'); }));
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && nav.classList.contains('open')) { nav.classList.remove('open'); burger.setAttribute('aria-expanded', 'false'); burger.focus(); } });

// Анимации: появление при прокрутке, счётчик цен, «печать» с мигающей чертой
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const io = 'IntersectionObserver' in window ? new IntersectionObserver((entries) => {
  entries.forEach((en) => {
    if (!en.isIntersecting) return;
    const n = en.target; n.classList.add('in'); io.unobserve(n);
    const price = n.matches('.price') ? n : n.querySelector('.price');
    if (price) countUp(price);
  });
}, { threshold: 0.12 }) : null;
function reveal(root = document) {
  if (reduced) return;
  const used = new Map();
  root.querySelectorAll('.eyebrow,.lead,.actions,.panel,.sec h2,.sub,.card,.note,.faq button,.plain li,.ftr p').forEach((n) => {
    if (n.classList.contains('rv')) return;
    const k = used.get(n.parentElement) || 0; used.set(n.parentElement, k + 1);
    n.style.setProperty('--d', `${Math.min(k * 0.08, 0.4)}s`);
    n.classList.add('rv');
    if (io) io.observe(n); else n.classList.add('in');
  });
}
function countUp(n) {
  if (reduced) return;
  const v = Number(n.dataset.v), t0 = performance.now();
  (function f(t) {
    const k = Math.min((t - t0) / 800, 1);
    n.textContent = rub(Math.round(v * (1 - Math.pow(1 - k, 3))));
    if (k < 1) requestAnimationFrame(f);
  })(t0);
}
const caret = el('span', { class: 'caret', 'aria-hidden': 'true' });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function typeInto(node, text, speed) {
  const t = el('span'), r = el('span', { class: 'ghost' });
  node.replaceChildren(t, r);
  for (let i = 1; i <= text.length; i++) {
    t.textContent = text.slice(0, i); r.textContent = text.slice(i);
    t.after(caret); await sleep(speed);
  }
}
async function typeHero() {
  const h = $('h1'), pre = $('.hero .panel pre');
  const lines = ['Твоя идея.', 'Точный промт.', 'Больше возможностей.'];
  h.setAttribute('aria-label', lines.join(' '));
  if (reduced) return;
  const code = pre.textContent;
  const spans = lines.map((l, i) => el('span', { 'aria-hidden': 'true', class: i === 2 ? 'dim' : '' }, el('span', { class: 'ghost', text: l })));
  h.replaceChildren(spans[0], el('br'), spans[1], el('br'), spans[2]);
  pre.replaceChildren(el('span', { class: 'ghost', text: code }));
  await sleep(300);
  for (let i = 0; i < 3; i++) { await typeInto(spans[i], lines[i], 45); await sleep(200); }
  await typeInto(pre, code, 14);
}

renderFilters(); renderCatalog(); renderPlans(); renderExamples(); renderFaq();
$('#year').textContent = new Date().getFullYear();
reveal(); typeHero();
})();

# LORDEN PROMPTS

Статический сайт-витрина: продаёт тексты промтов для нейросетей. Без сервера, без Node.js.

## Файлы
- `index.html` — структура страницы
- `style.css` — оформление (цвета в `:root`)
- `script.js` — настройки сверху (`CONFIG`) и логика
- `assets/favicon.svg` — иконка

## 1. VS Code (Windows)
1. Распакуйте архив (ПКМ → «Извлечь всё»). Должна получиться папка `lorden-prompts` с файлами и подпапкой `assets`.
2. VS Code → Файл → Открыть папку → выберите `lorden-prompts`.
3. Откройте `index.html` двойным щелчком в проводнике — сайт откроется в браузере. Правки: Ctrl+S, затем F5 в браузере.

## 2. Что менять (начало `script.js`, блок `CONFIG`)
Цены — `plans` → `price`; Telegram — `tgUser`; категории — `categories`; примеры — `examples`; FAQ — `faq`.

## 3. GitHub Pages
1. github.com → New repository → имя `lorden-prompts`, Public → Create.
2. «uploading an existing file» → перетащите `index.html`, `style.css`, `script.js` и папку `assets` → Commit changes.
3. Settings → Pages → Source: «Deploy from a branch», Branch: `main`, `/ (root)` → Save.
4. Через 1–5 минут адрес появится вверху страницы Pages: `https://ВАШ-ЛОГИН.github.io/lorden-prompts/`.
Обновление: в репозитории Add file → Upload files, загрузите изменённые файлы с заменой.

## 4. Netlify (netlify.app)
Способ А — самый простой:
1. app.netlify.com → войдите (можно через GitHub) → Add new site → Deploy manually.
2. Перетащите в окно ПАПКУ `lorden-prompts` целиком (с `index.html` в корне).
3. Через несколько секунд появится адрес вида `случайное-имя.netlify.app`.
4. Имя: Site configuration → Change site name.
Обновление: Deploys → перетащите папку снова.

Способ Б — из GitHub: Add new site → Import an existing project → GitHub → выберите репозиторий → Build command оставьте пустым, Publish directory: `.` → Deploy. Дальше каждое обновление файлов на GitHub обновляет сайт само.

## Ограничения
Сайт статический: заказы не сохраняются и не отправляются на сервер, оплата не принимается — всё согласуется в Telegram.

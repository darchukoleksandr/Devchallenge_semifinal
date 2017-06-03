
<h2>Основні відомості</h2>
Цільовий сайт: http://brovary-rada.gov.ua/documents/ <br/>
При запуску проекту планувальник автоматично починає сканувати кожну сторінку 
цільового сайту предмет оновлення. Для цього попередньо з бази даних будуть вибрані 
останні зміні для кожної сторінки. Якщо в базі немає даних про сторінку з певним 
<code>sourceId</code>, вона додається в список для оновлення. Якщо ж сторінка вже
була присутня в базі даних то порівнюється текст і в разі наявності відмінностей 
заноситься до списку, який в рамках однієї транзакції заноситься в базу. Парсинг 
відбувається POST запитом та за планувальником.<br/>
Back-end сервіс лише віддає запарсені версії документів. Розраховується, що саме 
відображення відмінностей між версіями буде виконуватися на клієнтській стороні з 
використанням JavaScript бібліотек.

<h2>База даних</h2>
Вибір SQLite зумовлений відсутністю окремого процесу бази даних, що зменшує 
накладні витрати і час відгуку. <br/>

Таблиця [documents]: <br/>
<code>[sourceId] integer</code> - первинний ключ, посилання типу 
http://brovary-rada.gov.ua/documents/{sourceId}.html <br/>
<code>[name] text</code> - назва рішення міської ради<br/>
<code>[deleted] datetime</code> - дата виявлення видалення<br/>

Таблиця [versions]: <br/>
<code>[id] integer</code> - первинний ключ <br/>
<code>[sourceId] integer</code> - зовнішній ключ до таблиці [documents]<br/>
<code>[text] text</code> - текст рішення міської ради<br/>
<code>[updated] datetime</code> - дата виявлення останньої зміни<br/>

<h2>Парсинг</h2>
<h3>Налаштування планувальника</h3>

Налаштування автоматичного оновлення відбувається шляхом POST запиту до 
контролера <code>SheluderController</code>. В тілі запиту необхідно 
помістити значення, яке буде конвертовано в TimeSpan 
(<code>[дні].[години]:[хвилини]:[секунди]</code>): <br/>
<br/>
<code>POST /api/sheluder/update HTTP/1.1</code><br/>
<code>Content-Type: application/json</code><br/>
<code>"1.10:00:21"</code><br />
За замовчуванням парсинг буде відбуватися кожні 3 години.

<h3>Ручний запуск парсера</h3>
Запуск відбувається шляхом POST запиту до контролерра <code>UpdateController</code>.<br/>
<code>POST /api/update/all HTTP/1.1</code><br/>
В ідеалі бажано дозволити дану функцію лише для авторизованих користувачів (OAuth, тощо).

<h2>Доступ до збережених документів</h2>
Доступ до збережених документів відбувається шляхом GET запиту до контролера 
<code>DocumentController</code>.<br/> 
Доступ до списку з конкретних документів здійснюється GET запитом до 
<code>api/documents</code>. Список можливих параметрів для масштабування: <br />
<code>amount</code> (int) - кількість документів<br/>
<code>page</code> (int) - сторінка (кількість пропущених елементів = amount * page)<br/>
<code>deleted</code> (boolean) - документи, що помічені, як видалені<br/>
<code>inclVers</code> (boolean) - чи необхідно повернути версії документу<br/>
Доступ до конкретного документу, враховуючи повну історію змін здійснюється 
GET запитом до <code>api/documents/{sourceId}</code>

<h2>Клієнтська частина</h2>
Клієнтська частина побудована з використанням Angular2. При вибірці документу 
будуть підвантажені його версії. Для відображення явних розрізнень у версіях 
використовується бібліотека google-diff-match-patch.

<h2>Docker</h2>
Запуск був успішно виконаний на Linux-контейнері. За основу Dockerfile було взято 
<a href="https://hub.docker.com/r/microsoft/aspnetcore-build/">1.1.2-jessie</a>. 
Порядок команд для відновлення проекту: <br />
1. dotnet restore Devchallenge_semifinal.sln - відновлення NuGet-пакетів. <br />
2. dotnet publish Devchallenge_semifinal.sln - компіляція проекту 
(вихідні файли використвуватимуться в контейнері) <br />
3. docker-compose build - створення та налаштування контейнера (node.js, npm install) <br />
3. docker-compose up

<h2>Використані сторонні бібліотеки</h2>
<a href="https://github.com/AngleSharp/AngleSharp">AngleSharp</a>, 
<a href="https://code.google.com/archive/p/google-diff-match-patch/">google-diff-match-patch</a>, 
<a href="https://www.quartz-scheduler.net">Quartz.NET</a>

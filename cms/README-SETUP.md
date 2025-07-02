# Strapi CMS - Налаштування та запуск

> ✅ **Проблему виправлено!** Помилка `Cannot find module '../data/initial-setup'` вирішена. Всі функції налаштування тепер інтегровані безпосередньо в Strapi.

## 🚀 Швидкий старт

### 1. Встановлення залежностей

```bash
cd cms
npm install
```

### 2. Налаштування змінних середовища

Створіть файл `.env` в папці `cms`:

```env
# Основні налаштування
HOST=0.0.0.0
PORT=1337
APP_KEYS="your-app-keys-here"
API_TOKEN_SALT="your-api-token-salt"
ADMIN_JWT_SECRET="your-admin-jwt-secret"
TRANSFER_TOKEN_SALT="your-transfer-token-salt"
JWT_SECRET="your-jwt-secret"

# База даних (використовується SQLite за замовчуванням)
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db

# Налаштування Supabase (опціонально)
# DATABASE_CLIENT=postgres
# DATABASE_HOST=your-supabase-host
# DATABASE_PORT=5432
# DATABASE_NAME=your-database-name
# DATABASE_USERNAME=your-username
# DATABASE_PASSWORD=your-password
# DATABASE_SSL=true

# Frontend URL для CORS
FRONTEND_URL=http://localhost:3000
```

### 3. Запуск в режимі розробки

```bash
npm run develop
```

### 4. Створення адміністратора

При першому запуску відкрийте http://localhost:1337/admin та створіть адміністратора.

## 📁 Структура проекту

```
cms/
├── src/
│   ├── api/                    # API endpoints
│   │   ├── home/              # Головна сторінка
│   │   ├── article/           # Сторінка статей
│   │   ├── services/          # Сторінка послуг
│   │   ├── contact/           # Контактна сторінка
│   │   └── post/              # Блог пости (існуючий)
│   └── components/            # Компоненти
│       ├── banner/           # Банер компонент
│       ├── social-link/      # Соціальні мережі
│       ├── service/          # Послуги
│       └── shared/           # Загальні компоненти (SEO)
├── config/                    # Конфігурація
├── data/                      # Початкові дані та скрипти
└── public/                    # Статичні файли
```

## 🎯 Компоненти

### Banner (`components.banner`)

Універсальний банер з налаштуваннями:

- ✅ Заголовок та опис
- ✅ Умовне відображення кнопки
- ✅ Зміна кольору кнопки
- ✅ Умовне відображення іконки
- ✅ Завантаження медіа файлів

### Social Link (`components.social-link`)

Посилання на соціальні мережі:

- ✅ Назва платформи
- ✅ URL посилання
- ✅ Опціональна іконка

### Service (`components.service`)

Послуги з індивідуальними налаштуваннями:

- ✅ Назва та опис
- ✅ Ціна та валюта
- ✅ Умовна кнопка з власним кольором
- ✅ Іконка послуги

### SEO (`components.shared.seo`)

Мета-теги для пошукової оптимізації:

- ✅ Meta title та description
- ✅ Keywords та OG image
- ✅ Canonical URL
- ✅ Structured data

## 📄 Single Types

### Home Page

- Banner компонент
- Rich text контент
- Соціальні мережі
- SEO налаштування

### Article Page

- Banner компонент
- Налаштування відображення постів
- Кількість постів на сторінку

### Services Page

- Banner компонент
- Список послуг
- Налаштування відображення цін
- CTA секція

### Contact Page

- Banner компонент
- Умовна контактна форма
- Контактна інформація (email, телефон, адреса)
- Робочі години
- Код для вбудованої карти

## 🔧 Автоматичне налаштування

При першому запуску автоматично (через `src/index.ts`):

1. **Налаштовуються права доступу** для публічної ролі
2. **Створюються початкові дані** для всіх сторінок
3. **Конфігурується CORS** для підключення Next.js

## 🔗 API Endpoints

Після запуску доступні наступні endpoints:

```
GET /api/home?populate[banner][populate]=*&populate[socialLinks]=*
GET /api/article?populate[banner][populate]=*&populate[socialLinks]=*
GET /api/services?populate[banner][populate]=*&populate[services][populate]=*&populate[socialLinks]=*
GET /api/contact?populate[banner][populate]=*&populate[socialLinks]=*
GET /api/posts?populate=*
```

## 🎨 Для адміністраторів

### Легко змінювати:

- 📝 Тексти заголовків та описів
- 🎨 Кольори кнопок (HEX коди: #ff0000)
- 👁️ Показ/приховування елементів (перемикачі)
- 📱 Соціальні мережі (додавати/видаляти)
- 🖼️ Іконки та зображення
- 💰 Ціни послуг та валюти

### Приклади використання:

1. **Банер з кнопкою**: вкажіть текст, посилання та колір
2. **Банер без кнопки**: вимкніть `showButton`
3. **Послуга з ціною**: вкажіть ціну та валюту
4. **Послуга без кнопки**: вимкніть `showButton`

## 🔍 Налагодження

### Логи

Всі операції логуються в консоль з емодзі:

- 🚀 Запуск системи
- 🔧 Налаштування прав
- 📝 Створення даних
- ✅ Успішні операції
- ❌ Помилки

### Типові проблеми

1. **CORS помилки**: перевірте `FRONTEND_URL` в `.env`
2. **Немає даних**: перевірте права доступу в `/admin/settings/users-permissions/roles`
3. **Помилки API**: перевірте логи в терміналі

## 🚀 Продакшн

### Збірка

```bash
npm run build
npm start
```

### Docker

```bash
docker build -t strapi-cms .
docker run -p 1337:1337 strapi-cms
```

### Змінні середовища для продакшн

```env
NODE_ENV=production
HOST=0.0.0.0
PORT=1337
FRONTEND_URL=https://yourdomain.com
DATABASE_CLIENT=postgres
# ... інші налаштування БД
```

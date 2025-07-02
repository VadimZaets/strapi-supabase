# 🚀 Швидкий запуск Strapi + Next.js

## Проблему виправлено! ✅

Була виправлена помилка `Cannot find module '../data/initial-setup'`. Тепер всі функції налаштування інтегровані безпосередньо в Strapi.

## Запуск проекту

### 1. Запуск Strapi CMS

```bash
cd cms
npm install
npm run develop
```

### 2. Перший вхід в адмін панель

1. Відкрийте http://localhost:1337/admin
2. Створіть адміністратора (ім'я, email, пароль)
3. Увійдіть в систему

### 3. Автоматичне налаштування

При запуску автоматично:

- ✅ Налаштуються права доступу для API
- ✅ Створяться початкові дані для всіх сторінок
- ✅ Конфігурується CORS для Next.js

### 4. Створення API токена

1. В адмін панелі: `Settings` → `API Tokens`
2. `Create new API Token`
3. Name: `Frontend Token`
4. Token type: `Read-only`
5. Скопіюйте токен

### 5. Налаштування Next.js

```bash
cd frontend
```

Створіть файл `.env.local`:

```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
NEXT_PUBLIC_STRAPI_TOKEN=your_token_here
```

### 6. Запуск Next.js фронтенду

```bash
npm install
npm run dev
```

### 7. Відкрийте сайт

http://localhost:3000

## 🎯 Що ви побачите

### Strapi адмін панель (http://localhost:1337/admin):

- **Content Manager**: керування вмістом сторінок
- **Home Page**: банер головної сторінки
- **Services Page**: послуги з цінами
- **Contact Page**: контактна інформація
- **Article Page**: налаштування блогу

### Next.js сайт (http://localhost:3000):

- **Навігація** між сторінками
- **Головна сторінка** з банером та постами
- **Сторінка послуг** з картками
- **Сторінка контактів** з формою
- **Сторінка статей** з блогом

## 🎨 Тестування адміністративного інтерфейсу

### Зміна банера головної сторінки:

1. `Content Manager` → `Home Page`
2. `Edit`
3. Змініть Banner → Title на "Новий заголовок"
4. Змініть Button Color на `#ff6b6b`
5. `Save` → `Publish`
6. Оновіть http://localhost:3000

### Додавання нової послуги:

1. `Content Manager` → `Services Page`
2. `Edit`
3. Services → `Add component`
4. Заповніть поля:
   - Title: "SEO оптимізація"
   - Description: "Підвищення позицій в Google"
   - Price: 5000, Currency: UAH
   - Show Button: ✅
   - Button Text: "Замовити SEO"
   - Button Color: `#17a2b8`
5. `Save` → `Publish`

### Зміна соціальних мереж:

1. `Content Manager` → `Home Page`
2. Social Links → `Add component`
3. Platform: "LinkedIn"
4. URL: "https://linkedin.com/company/yourcompany"
5. `Save` → `Publish`

## 🛠️ Компоненти для налаштування

### Banner:

- ✅ Заголовок та опис
- ✅ Показ/приховування кнопки
- ✅ Зміна кольору кнопки (HEX)
- ✅ Завантаження іконок

### Services:

- ✅ Назва та опис послуги
- ✅ Ціна (UAH/USD/EUR)
- ✅ Індивідуальні кнопки з кольорами
- ✅ Іконки послуг

### Social Links:

- ✅ Назва платформи
- ✅ URL посилання
- ✅ Додавання/видалення

## 🐛 Вирішення проблем

### CORS помилки:

```bash
# Перевірте змінні середовища в cms/.env
FRONTEND_URL=http://localhost:3000
```

### Немає даних на фронтенді:

1. Перевірте API токен в `frontend/.env.local`
2. Перевірте що сторінки опубліковані в Strapi
3. Відкрийте http://localhost:1337/api/home у браузері

### Strapi не запускається:

```bash
cd cms
rm -rf .tmp
rm -rf node_modules
npm install
npm run develop
```

## 🎉 Готово!

Тепер у вас є повноцінна CMS система де адміністратор може керувати всім контентом без коду!

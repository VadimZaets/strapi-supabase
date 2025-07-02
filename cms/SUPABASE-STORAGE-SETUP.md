# 📸 Налаштування Supabase Storage для Strapi CMS

Ця інструкція допоможе вам налаштувати автоматичне завантаження зображень в Supabase Storage замість локального зберігання.

## 🚀 Переваги Supabase Storage

- ✅ **CDN доставка** - швидке завантаження зображень по всьому світу
- ✅ **Автоматичні URL** - миттєве отримання публічних посилань
- ✅ **Масштабованість** - без обмежень на місце
- ✅ **Безпека** - підтримка приватних та публічних файлів
- ✅ **Оптимізація** - автоматичне стиснення зображень

## 📋 Крок 1: Налаштування Supabase проекту

### 1.1 Створіть bucket в Supabase Storage

```sql
-- Виконайте в SQL Editor вашого Supabase проекту
INSERT INTO storage.buckets (id, name, public)
VALUES ('uploads', 'uploads', true);
```

### 1.2 Налаштуйте правила доступу (RLS)

```sql
-- Дозволити публічний доступ для читання
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'uploads');

-- Дозволити вставку файлів (для Strapi)
CREATE POLICY "Enable insert for service role" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'uploads');

-- Дозволити видалення файлів (для Strapi)
CREATE POLICY "Enable delete for service role" ON storage.objects FOR DELETE USING (bucket_id = 'uploads');
```

## 📋 Крок 2: Налаштування змінних середовища

Створіть файл `.env` в папці `cms` з наступними змінними:

```env
# Основні налаштування Strapi
HOST=0.0.0.0
PORT=1337
APP_KEYS="your-unique-app-keys-here"
API_TOKEN_SALT="your-api-token-salt"
ADMIN_JWT_SECRET="your-admin-jwt-secret"
TRANSFER_TOKEN_SALT="your-transfer-token-salt"
JWT_SECRET="your-jwt-secret"

# База даних
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db

# Налаштування Supabase Storage (ОБОВ'ЯЗКОВО)
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_BUCKET=uploads
SUPABASE_DIRECTORY=strapi-uploads

# Frontend URL для CORS
FRONTEND_URL=http://localhost:3000
```

### Де знайти дані для Supabase:

1. **SUPABASE_URL**: В Dashboard → Settings → API → Project URL
2. **SUPABASE_ANON_KEY**: В Dashboard → Settings → API → Project API Keys → anon key

## 📋 Крок 3: Перезапуск Strapi

```bash
cd cms
npm run develop
```

## 🎯 Тестування роботи

### 1. Завантаження через адмін панель

1. Відкрийте http://localhost:1337/admin
2. Перейдіть в Content Manager → Post
3. Створіть новий пост
4. Завантажте зображення в поле "Featured Image"
5. Збережіть пост

### 2. Перевірка в Supabase

1. Відкрийте ваш Supabase проект
2. Перейдіть в Storage → uploads
3. Ви повинні побачити завантажений файл

### 3. API endpoints для роботи з медіа

```bash
# Отримати всі медіа файли з URL
GET http://localhost:1337/api/media

# Отримати конкретний файл
GET http://localhost:1337/api/media/:id

# Створити підписаний URL (для приватних файлів)
POST http://localhost:1337/api/media/:id/signed-url
{
  "expiresIn": 3600
}

# Статистика сховища
GET http://localhost:1337/api/media/stats/storage
```

## 📊 Приклад використання в API

### Отримання постів з зображеннями:

```bash
GET http://localhost:1337/api/posts?populate[featuredImage]=*&populate[gallery]=*
```

Відповідь буде містити автоматично згенеровані URL:

```json
{
  "data": [
    {
      "id": 1,
      "attributes": {
        "Title": "Мій пост",
        "Description": "Опис поста",
        "featuredImage": {
          "data": {
            "attributes": {
              "url": "https://your-project-id.supabase.co/storage/v1/object/public/uploads/strapi-uploads/hash_filename.jpg",
              "provider": "supabase",
              "provider_metadata": {
                "bucket": "uploads",
                "key": "strapi-uploads/hash_filename.jpg",
                "public_url": "https://..."
              }
            }
          }
        }
      }
    }
  ]
}
```

## 🔧 Налагодження

### Проблема: "Файли не завантажуються"

✅ **Перевірте**:

- Чи правильно вказані SUPABASE_URL та SUPABASE_ANON_KEY
- Чи створений bucket "uploads" в Supabase
- Чи налаштовані правила доступу (RLS policies)

### Проблема: "Access denied"

✅ **Перевірте RLS policies**:

```sql
-- Перегляньте існуючі правила
SELECT * FROM pg_policies WHERE tablename = 'objects';
```

### Проблема: "Файли завантажуються, але не відображаються"

✅ **Перевірте**:

- Чи bucket публічний (public = true)
- Чи правильний URL в відповіді API

## 💡 Додаткові можливості

### Автоматична оптимізація зображень

Strapi автоматично створює різні розміри зображень (thumbnail, small, medium, large) які також зберігаються в Supabase Storage.

### Підписані URL для приватних файлів

Для створення тимчасових посилань на приватні файли:

```javascript
// POST /api/media/:id/signed-url
const response = await fetch("/api/media/1/signed-url", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ expiresIn: 3600 }), // 1 година
});

const { signedUrl, expiresAt } = await response.json();
```

## 🎉 Готово!

Тепер ваш Strapi CMS автоматично завантажує всі зображення в Supabase Storage і повертає публічні URL для використання у фронтенді.

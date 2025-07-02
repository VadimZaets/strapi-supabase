# 🚀 Продакшен налаштування Supabase Storage

## ⚠️ Важливо!

В продакшені Strapi **НЕ МОЖЕ** використовувати провайдери з `node_modules`, тому ми перенесли провайдер в `src/providers/`.

## 🔧 Змінні середовища для продакшену

Переконайтесь, що ці змінні налаштовані в вашому продакшен середовищі:

```env
# Обов'язкові змінні Supabase Storage
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_BUCKET=uploads
SUPABASE_DIRECTORY=strapi-uploads

# Також потрібні основні змінні Strapi
APP_KEYS=your-production-app-keys
API_TOKEN_SALT=your-production-api-token-salt
ADMIN_JWT_SECRET=your-production-admin-jwt-secret
TRANSFER_TOKEN_SALT=your-production-transfer-token-salt
JWT_SECRET=your-production-jwt-secret
```

## 📋 Налаштування для різних платформ:

### **Heroku:**

```bash
heroku config:set SUPABASE_URL=https://your-project-id.supabase.co
heroku config:set SUPABASE_ANON_KEY=your-anon-key
heroku config:set SUPABASE_BUCKET=uploads
heroku config:set SUPABASE_DIRECTORY=strapi-uploads
```

### **Vercel:**

В Dashboard → Settings → Environment Variables додайте:

- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_BUCKET`
- `SUPABASE_DIRECTORY`

### **Railway:**

```bash
railway variables:set SUPABASE_URL=https://your-project-id.supabase.co
railway variables:set SUPABASE_ANON_KEY=your-anon-key
railway variables:set SUPABASE_BUCKET=uploads
railway variables:set SUPABASE_DIRECTORY=strapi-uploads
```

### **DigitalOcean App Platform:**

В App Spec додайте в `envs`:

```yaml
envs:
  - key: SUPABASE_URL
    value: https://your-project-id.supabase.co
  - key: SUPABASE_ANON_KEY
    value: your-anon-key
  - key: SUPABASE_BUCKET
    value: uploads
  - key: SUPABASE_DIRECTORY
    value: strapi-uploads
```

## 🛠️ Суpabase налаштування

### 1. Створіть bucket в Supabase (якщо не створений):

```sql
-- В SQL Editor вашого Supabase проекту
INSERT INTO storage.buckets (id, name, public)
VALUES ('uploads', 'uploads', true)
ON CONFLICT (id) DO NOTHING;
```

### 2. Налаштуйте RLS policies:

```sql
-- Видаліть старі policies
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Allow anon uploads" ON storage.objects;
DROP POLICY IF EXISTS "Allow anon select" ON storage.objects;
DROP POLICY IF EXISTS "Allow anon delete" ON storage.objects;

-- Створіть нові policies
CREATE POLICY "Allow anon uploads" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'uploads');

CREATE POLICY "Allow anon select" ON storage.objects
FOR SELECT USING (bucket_id = 'uploads');

CREATE POLICY "Allow anon delete" ON storage.objects
FOR DELETE USING (bucket_id = 'uploads');
```

### 3. Альтернатива (простіше, але менш безпечно):

```sql
-- Вимкнути RLS повністю
ALTER TABLE storage.objects DISABLE ROW LEVEL SECURITY;
```

## 🔍 Дебагінг в продакшені

### Перевірте логи для цих повідомлень:

```
✅ Правильні логи:
🔧 Ініціалізація Supabase Storage провайдера
📍 URL: встановлено
🔑 API Key: встановлено
🪣 Bucket: uploads
📁 Directory: strapi-uploads

❌ Проблемні логи:
📍 URL: НЕ ВСТАНОВЛЕНО
🔑 API Key: НЕ ВСТАНОВЛЕНО
❌ SUPABASE_URL або SUPABASE_ANON_KEY не налаштовані!
```

### Тестування в продакшені:

1. **Завантажте файл** через адмін панель
2. **Перевірте логи** сервера на наявність помилок
3. **Перевірте Supabase Storage** чи з'явився файл
4. **Перевірте API відповідь** чи правильний URL

## 📊 Структура файлів в Supabase:

```
uploads/
└── strapi-uploads/    ← SUPABASE_DIRECTORY
    ├── abc123def.jpg   ← Оригінал
    ├── large_abc123def.jpg
    ├── medium_abc123def.jpg
    ├── small_abc123def.jpg
    └── thumbnail_abc123def.jpg
```

## 🎯 URL формат:

```
https://your-project-id.supabase.co/storage/v1/object/public/uploads/strapi-uploads/filename.jpg
```

## ⚡ Швидке тестування:

```bash
# Перевірте змінні середовища
echo $SUPABASE_URL
echo $SUPABASE_ANON_KEY

# Тест підключення до Supabase
curl -H "Authorization: Bearer $SUPABASE_ANON_KEY" \
     "$SUPABASE_URL/storage/v1/bucket/uploads"
```

## 🚨 Типові проблеми:

1. **"НЕ ВСТАНОВЛЕНО"** - змінні середовища не налаштовані
2. **"row-level security policy"** - RLS policies неправильні
3. **"bucket not found"** - bucket не створений в Supabase
4. **"invalid JWT"** - неправильний SUPABASE_ANON_KEY

## ✅ Готово!

Після правильного налаштування всіх змінних та Supabase policies, ваші файли автоматично завантажуватимуться в Supabase Storage в продакшені! 🎉

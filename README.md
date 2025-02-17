# Проект "Акции Озон" 🛒

## Описание проекта

Проект "Акции Озон" представляет собой веб-приложение, которое помогает пользователям анализировать акции на платформе Ozon и определять наиболее выгодные предложения для участия. Приложение использует JavaScript для обработки данных и взаимодействует с API Ozon для получения актуальной информации о товарах и акциях.

---

## Функционал проекта

- **Получение данных через API Ozon**:
  - Подключение к API для получения списка товаров и их параметров.
  - Получение информации об активных акциях.

- **Анализ акций**:
  - Расчет выгодности участия в акции для каждого товара.
  - Классификация товаров на "выгодные" и "не выгодные" акции.

- **Отображение результатов**:
  - Вывод списка товаров с информацией о текущих акциях.
  - Подсветка наиболее выгодных предложений.

---

## Важное
- **Файлы**:
  - main.js - главный файл откуда запускается вся логика программы.
  - modules/apiKey.js - файл со всеми импортами и переменными для экспорта в main.js.

## Технологический стек

- **Язык программирования**: JavaScript (ES6+)
- **API**: RESTful API Ozon
- **Инструменты разработки**:
  - Fetch API для работы с HTTP-запросами.
  - Модульная архитектура для организации кода.
  - Локальное хранение данных (например, через LocalStorage).

---

## Установка и запуск проекта
 **Клонирование репозитория**:
   git clone https://github.com/your-repository-name.git
   Установка зависимостей :
    npm install
    Создайте файл .env в корневой директории проекта и добавьте следующие переменные: 
    OZON_API_KEY=ваш_api_ключ_ozon
    OZON_CLIENT_ID=ваш_client_id_ozon
    Запуск приложения : 
    npm start

Эта разметка предоставляет полное описание проекта, его функционала, технического стека, примеры кода и инструкции по установке. Вы можете адаптировать её под свои потребности!
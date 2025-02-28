# Реализованные пункты по ТЗ

## 1. Рассылки
- Возможность отправлять массовые рассылки пользователям бота.
- Триггерные рассылки, основанные на событиях (например, окончание подписки, успешная оплата, брошенная корзина), реализованы с помощью `node-cron`.

## 2. Интеграции
- **Интеграция с HelpDeskEddy**: реализована отправка сообщений в хелпдеск.
- **Интеграция с базой данных** на базе PostgreSQL для хранения и получения данных.
- **Интеграция с платежной системой Робокасса** для оплаты через бот.

## 3. Каталог товаров
- Реализовано получение списка товаров из базы данных.
- Реализованы функции поиска по ключевым словам и фильтрации товаров по категории.
- Реализована возможность добавления товаров в избранное.
  
## 4. Регистрация и авторизация
- Поддержка регистрации и авторизации через Telegram с возможностью синхронизации данных между сайтом и ботом.
- Реализована возможность регистрации и авторизации пользователя через API.

## 5. Обработка заказов и оплат
- Реализована возможность оформления заказов и оплат через Mini App.
- Обработка заказов, изменение статуса на «оплачен» после успешной оплаты через Робокассу.
- Реализована автоматическая отправка товара (например, цифрового кода) после успешной оплаты.

## 6. Технические требования
- Использован **Node.js** для реализации бэкенда.
- Взаимодействие с внешними сервисами через **REST API**.
- Обработка вебхуков для обмена данными с хелпдеском и системой управления заказами.
- Масштабируемая архитектура с возможностью дальнейшего расширения.

 
 

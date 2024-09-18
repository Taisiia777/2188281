const express = require('express');
const catalog = require('./catalog');
const orders = require('./orders');
const auth = require('./auth');
const helpdesk = require('./helpdesk');
const sendMassMailing = require('./massMailing');
const { addToFavorites, getFavorites } = require('./favorites');

require('dotenv').config();

const app = express();
app.use(express.json());

// Роуты для каталога
app.get('/api/products', async (req, res) => {
  const products = await catalog.getAllProducts();
  res.json(products);
});

app.get('/api/products/search', async (req, res) => {
  const keyword = req.query.q;
  const products = await catalog.searchProducts(keyword);
  res.json(products);
});

app.get('/api/products/filter', async (req, res) => {
  const category = req.query.category;
  const products = await catalog.filterProductsByCategory(category);
  res.json(products);
});

// Роуты для заказов
app.post('/api/orders', async (req, res) => {
  const { userId, productId, quantity } = req.body;
  const order = await orders.createOrder(userId, productId, quantity);
  res.json(order);
});

app.post('/api/orders/pay', async (req, res) => {
  const { orderId, amount } = req.body;
  await orders.handleOrderPayment(orderId, amount);
  res.send('Оплата завершена');
});

app.post('/api/mailing', async (req, res) => {
    const { message } = req.body;
    await sendMassMailing(message);
    res.send('Массовая рассылка завершена.');
  });

// Роуты для авторизации
app.post('/api/auth/register', async (req, res) => {
  const { telegramId, userData } = req.body;
  const response = await auth.registerUser(telegramId, userData);
  res.json(response);
});

app.post('/api/auth/login', async (req, res) => {
  const { telegramId } = req.body;
  const response = await auth.loginUser(telegramId);
  res.json(response);
});

// Роут для интеграции с хелпдеском
app.post('/api/helpdesk', async (req, res) => {
  const { userId, message } = req.body;
  const response = await helpdesk.sendHelpDeskMessage(userId, message);
  res.json(response);
});

// Роуты для доавления в избранное
app.post('/api/favorites', async (req, res) => {
    const { userId, productId } = req.body;
    const response = await addToFavorites(userId, productId);
    res.json(response);
  });
  
app.get('/api/favorites/:userId', async (req, res) => {
    const { userId } = req.params;
    const favorites = await getFavorites(userId);
    res.json(favorites);
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
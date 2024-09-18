const axios = require('axios');
require('dotenv').config();

// Регистрация пользователя через Telegram
async function registerUser(telegramId, userData) {
  try {
    const response = await axios.post(process.env.WEB_SITE_API, {
      telegramId: telegramId,
      ...userData
    });
    return response.data;
  } catch (error) {
    console.error('Ошибка регистрации пользователя:', error);
  }
}

// Авторизация через сайт
async function loginUser(telegramId) {
  try {
    const response = await axios.post(process.env.WEB_SITE_API, {
      telegramId: telegramId
    });
    return response.data;
  } catch (error) {
    console.error('Ошибка авторизации:', error);
  }
}

module.exports = {
  registerUser,
  loginUser
};

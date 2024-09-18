const cron = require('node-cron');
const pool = require('./db');
const api = require('./telegramBot');

// Ежедневная рассылка сообщений о подписке
cron.schedule('0 0 * * *', async () => {
  try {
    const users = await pool.query('SELECT * FROM users WHERE subscription_expires_soon = TRUE');
    users.rows.forEach(user => {
      api.sendMessage({
        chat_id: user.telegram_id,
        text: 'Ваша подписка скоро истекает, пожалуйста, продлите её.'
      });
    });
  } catch (error) {
    console.error('Ошибка при отправке уведомлений о подписке:', error);
  }
});

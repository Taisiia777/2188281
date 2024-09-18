const pool = require('./db');
const api = require('./telegramBot');

// Функция для массовой рассылки
async function sendMassMailing(message) {
  try {
    const users = await pool.query('SELECT telegram_id FROM users');
    users.rows.forEach(user => {
      api.sendMessage({
        chat_id: user.telegram_id,
        text: message
      });
    });
  } catch (error) {
    console.error('Ошибка при массовой рассылке:', error);
  }
}

module.exports = sendMassMailing;

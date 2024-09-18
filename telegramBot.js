const TelegramBot = require('telegram-bot-api');
require('dotenv').config();

const api = new TelegramBot({
  token: process.env.TELEGRAM_BOT_TOKEN,
  updates: {
    enabled: true
  }
});

api.on('message', function (message) {
  console.log(message); 
  api.sendMessage({
    chat_id: message.chat.id,
    text: 'Hello! How can I assist you?'
  });
});

module.exports = api;

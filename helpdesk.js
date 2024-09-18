const axios = require('axios');
require('dotenv').config();

async function sendHelpDeskMessage(userId, message) {
  try {
    const response = await axios.post(`${process.env.HELPEDDY_API}/tickets`, {
      user_id: userId,
      message: message
    });
    return response.data;
  } catch (error) {
    console.error('Ошибка при отправке сообщения в HelpDeskEddy:', error);
  }
}
// получение сообщений от хелпдеска
async function fetchHelpDeskMessages() {
    try {
      const response = await axios.get(`${process.env.HELPEDDY_API}/tickets`);
      return response.data;
    } catch (error) {
      console.error('Ошибка получения сообщений от HelpDeskEddy:', error);
    }
  }
  
module.exports = sendHelpDeskMessage;

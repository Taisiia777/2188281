const axios = require('axios');
require('dotenv').config();

async function processPayment(orderId, amount) {
  try {
    const response = await axios.post(process.env.ROBO_KASSA_API, {
      orderId: orderId,
      amount: amount
    });
    return response.data;
  } catch (error) {
    console.error('Ошибка платежа через RoboKassa:', error);
  }
}

module.exports = processPayment;

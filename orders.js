const pool = require('./db');
const processPayment = require('./payment');

// Создание заказа
async function createOrder(userId, productId, quantity) {
  try {
    const result = await pool.query(
      'INSERT INTO orders (user_id, product_id, quantity, status) VALUES ($1, $2, $3, $4) RETURNING *',
      [userId, productId, quantity, 'pending']
    );
    return result.rows[0];
  } catch (error) {
    console.error('Ошибка создания заказа:', error);
  }
}

async function handleOrderPayment(orderId, amount) {
    const paymentResult = await processPayment(orderId, amount);
    if (paymentResult.success) {
      try {
        await pool.query('UPDATE orders SET status = $1 WHERE id = $2', ['paid', orderId]);
        
        // Пример отправки товара (например, кода активации)
        const order = await pool.query('SELECT * FROM orders WHERE id = $1', [orderId]);
        const product = await pool.query('SELECT * FROM products WHERE id = $1', [order.rows[0].product_id]);
  
        // Отправляем код пользователю через Telegram
        api.sendMessage({
          chat_id: order.rows[0].user_id,
          text: `Ваш код активации: ${product.rows[0].activation_code}`
        });
  
        console.log(`Заказ ${orderId} оплачен и товар отправлен`);
      } catch (error) {
        console.error('Ошибка обработки заказа:', error);
      }
    }
  }
  

module.exports = {
  createOrder,
  handleOrderPayment
};

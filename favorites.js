const pool = require('./db');

// Добавить товар в избранное
async function addToFavorites(userId, productId) {
  try {
    await pool.query('INSERT INTO favorites (user_id, product_id) VALUES ($1, $2)', [userId, productId]);
    return { message: 'Товар добавлен в избранное' };
  } catch (error) {
    console.error('Ошибка добавления в избранное:', error);
  }
}

// Получить список избранных товаров пользователя
async function getFavorites(userId) {
  try {
    const result = await pool.query('SELECT * FROM products WHERE id IN (SELECT product_id FROM favorites WHERE user_id = $1)', [userId]);
    return result.rows;
  } catch (error) {
    console.error('Ошибка получения избранных товаров:', error);
  }
}

module.exports = { addToFavorites, getFavorites };

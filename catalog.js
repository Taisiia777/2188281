const pool = require('./db');

// Получить все товары
async function getAllProducts() {
  try {
    const result = await pool.query('SELECT * FROM products');
    return result.rows;
  } catch (error) {
    console.error('Ошибка получения товаров:', error);
  }
}

// Поиск товаров по ключевому слову
async function searchProducts(keyword) {
  try {
    const result = await pool.query('SELECT * FROM products WHERE name ILIKE $1', [`%${keyword}%`]);
    return result.rows;
  } catch (error) {
    console.error('Ошибка поиска товаров:', error);
  }
}

// Фильтрация товаров по категории
async function filterProductsByCategory(category) {
  try {
    const result = await pool.query('SELECT * FROM products WHERE category = $1', [category]);
    return result.rows;
  } catch (error) {
    console.error('Ошибка фильтрации товаров:', error);
  }
}

module.exports = {
  getAllProducts,
  searchProducts,
  filterProductsByCategory
};

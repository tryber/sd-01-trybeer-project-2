const conn = require('../connection');

const cartId = async (email) => await new Promise((resolve, reject) => {
  conn.query(`SELECT getUserCart("${email}")`, (err, results) => {
    if (err) return reject(err);
    return resolve(results[0][`getUserCart("${email}")`]);
  });
});

const getProductsInCart = async (email) => {
  const id = await cartId(email);
  return new Promise((resolve, reject) => {
    conn.query(`CALL getCartProducts(${id})`, (err, results) => {
      if (err) return reject(err);
      return resolve(results[0]);
    });
  });
} 

const getAllProducts = async () => await new Promise((resolve, reject) => {
  conn.query('SELECT * FROM trybeer.product;', (err, results) => {
    if (err) return reject(err);
    return resolve(results);
  });
});

async function getProducts(email) {
  const productsInCart = await getProductsInCart(email);
  let allProducts = await getAllProducts();
  allProducts.forEach((product, productIndex) => {
     productsInCart.forEach(cartProducts => {
      if(product.name === cartProducts.name) allProducts[productIndex].quantity = cartProducts.quantity;
    })
  });
  return allProducts;
}

module.exports = getProducts;

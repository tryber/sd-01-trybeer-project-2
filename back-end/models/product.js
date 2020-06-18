const conn = require('../connection');

class Products {
  constructor(productId, name, price) {
    this.productId = productId;
    this.name = name;
    this.price = price;
  }

  static async allProducts() {
    const query = 'SELECT * FROM trybeer.product;';
    return new Promise((resolve, reject) => {
      conn.query(query, (err, results) => {
        if (err) return reject(err);
        return resolve(results);
      });
    });
  }
}

module.exports = Products;

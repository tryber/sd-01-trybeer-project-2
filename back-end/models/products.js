const conn = require('../connection');

class Products {
  constructor(product_id, name, price) {
    this.product_id = product_id;
    this.name = name;
    this.price = price;
  }

  static async allProducts() {
    const query = `SELECT * FROM trybeer.product;`;
    return new Promise((resolve, reject) => {
      conn.query(query, (err, results) => {
        if (err) return reject(err);
        return resolve(results);
      });
    });
  }
}

module.exports = Products;

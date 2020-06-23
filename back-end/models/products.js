const conn = require('../connection');
const getProducts = require('../service/getProducts');
class Products {
  constructor(productId, name, price) {
    this.productId = productId;
    this.name = name;
    this.price = price;
  }

  static async getAllProducts(email) {
    return getProducts(email);
  }
}

module.exports = Products;

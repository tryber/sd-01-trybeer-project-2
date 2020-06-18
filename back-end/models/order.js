const conn = require('../connection');

class Order {
  constructor(street, number, finished, cartId) {
    this.street = street;
    this.number = number;
    this.finished = finished;
    this.cartId = cartId;
  }

  async create() {
    const { street, number, finished, cartId } = this;
    const query = ``;
    return new Promise((resolve, reject) => {
      conn.query(query, (err, _results) => {
        if (err) return reject(err);
        return resolve(results);
      });
    });
  }
}

module.exports = Order;

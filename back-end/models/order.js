const conn = require('../connection');

class Order {
  constructor(street, number, finished, cartId) {
    this.street = street;
    this.number = number;
    this.finished = finished;
    this.cartId = cartId;
  }

  async create() {
    const { street, number, cartId } = this;
    const query = `INSERT INTO purchase (street, number, cart_id) VALUES ('${street}', '${number}', '${cartId}')`;
    return new Promise((resolve, reject) => {
      conn.query(query, (err, _results) => {
        if (err) return reject(err);
        return resolve(this);
      });
    });
  }
}

module.exports = Order;

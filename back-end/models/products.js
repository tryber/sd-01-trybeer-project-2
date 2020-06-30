const {
  getProducts,
  getProductsInCart,
  deleteBuy,
  updateBuy,
  createBuy,
} = require('../service/getProducts');

class Products {
  constructor(productId, name, price) {
    this.productId = productId;
    this.name = name;
    this.price = price;
  }

  static async getAllProducts(email) {
    return getProducts(email);
  }

  static async updateCart(email, productName, quantity) {
    const { data, id } = await getProductsInCart(email);
    if (data.map(each => each.name).includes(productName)) {
      if (quantity === 0) return deleteBuy(productName, id);
      return updateBuy(productName, quantity, id);
    }
    return createBuy(productName, id);
  }

  static async getCart(email) {
    return getProductsInCart(email);
  }
}

module.exports = Products;

function inputForms(setName, name, isAdmin, savedName, setSavedName) {
  return (
    <form onSubmit={e => submitData(e, name, user)}>
      <label htmlFor='name'>Nome: </label>
      <input
        type='text'
        data-testid={testId('name', isAdmin)}
        value={name}
        id='name'
        name='name'
        pattern='^[a-zA-Z\s]{12,40}$'
        onChange={e => setName(e.target.value)}
        readOnly={isAdmin}
        required
      />
      <label htmlFor='email'>Email: </label>
      <input
        type='email'
        data-testid={testId('email', isAdmin)}
        value={data.email}
        id='email'
        name='email'
        readOnly
      />
      {!isAdmin && (
        <button
          data-testid='profile-save-btn'
          onClick={() => setSavedName(name)}
          disabled={name === savedName}>
          Salvar
        </button>
      )}
    </form>
  );
}

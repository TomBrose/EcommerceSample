const Repoitory = require('./repository');
const Repository = require('./repository');

class CartsRepository extends Repoitory {}

module.exports = new CartsRepository('carts.json');

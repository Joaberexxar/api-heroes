class NotImplementExpection extends Error {
  constructor() {
    super('Not Implemented Expection');
  }
}

class ICrud {

  create(item) {
    throw new NotImplementExpection();
  }
  read(query) {
    throw new NotImplementExpection();
  }
  update(id, item) {
    throw new NotImplementExpection();
  }
  delete(id) {
    throw new NotImplementExpection();
  }
  isConnected() {
    throw new NotImplementExpection();
  }
  connect() {
    throw new NotImplementExpection();
  }
}

module.exports = ICrud
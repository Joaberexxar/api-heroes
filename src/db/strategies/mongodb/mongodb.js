const ICrud = require('../interfaces/Icrud');
const Mongoose = require('mongoose');
const STATUS = {
  0: 'Disconectado',
  1: 'Conectado',
  2: 'Conectando',
  3: 'Disconectando',
}

class MongoDb extends ICrud {

  constructor(connection, schema) {
    super();
    this._schema = schema;
    this._connection = connection;
  }

  async isConnected() {
    const state = STATUS[this._connection.readyState];
    if (state === STATUS[1]) return state;
    if (state !== STATUS[2]) return state;
      await new Promise(resolve => setTimeout(resolve, 1000));

    return STATUS[this.connection.readyState] ;
  }
  static connect() {
    Mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true, useUnifiedTopology: true
    })
    .then(() => console.log("Conectado ao MongoDB com sucesso"))
    .catch(error => console.log('Falha ao conectar', error));

    const connection = Mongoose.connection;
    connection.once('open', () => console.log("Conectado ao MongoDB com sucesso uhullllll!!!!"));
    return connection;

  }
  defineModel() {
      const heroiSchema = new Mongoose.Schema({
      nome: {
        type: String,
        required: true
      },
      poder: {
        type: String,
        required: true
      },
      insertedAt: {
        type: Date,
        default: new Date()
      }
    })

    this._schema = Mongoose.model('heroi', heroiSchema);
  }
  create(item) {
    return this._schema.create(item);
  }
  read(query, skip=0, limit = 10) {
    return this._schema.find(query).skip(skip).limit(limit);
  }
  update(id, item) {
    console.log('item', item);
    return this._schema.updateOne({ _id: id }, { $set: item});
  }
  delete(id) {
    return this._schema.deleteOne({ _id: id });
  }
}

module.exports = MongoDb;
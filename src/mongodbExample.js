const Mongoose = require('mongoose');
Mongoose.connect('mongodb://joabe:1234567@localhost:27017/heroes', {
  useNewUrlParser: true, useUnifiedTopology: true
})
.then(() => console.log("Conectado ao MongoDB com sucesso"))
.catch(error => console.log('Falha ao conectar', error));

const connection = Mongoose.connection;
connection.once('open', () => console.log("Conectado ao MongoDB com sucesso uhullllll!!!!"));

const state = connection.readyState;

console.log('state', state);

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

const model = Mongoose.model('heroi', heroiSchema);

async function main() {
  const result = await model.create({
    nome: 'Lanterna Verde',
    poder: 'Anel'
  })
  console.log('result', result);

  const list = await model.find();
  console.log('list', list);
}
main()
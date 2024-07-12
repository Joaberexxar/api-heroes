const assert = require('assert');
const Context = require('../db/strategies/base/contextStrategy');
const HeroiSchema = require('../db/strategies/mongodb/schemas/heroiSchema');
const MongoDb = require('../db/strategies/mongodb/mongodb');


const MOCK_HEROI_CADASTRAR = {
  nome: 'Gaviao Negro',
  poder: 'flexas'
}
const MOCK_HEROI_ATUALIZAR = {
  nome: 'Homem Aranha',
  poder: 'Super teia'
}
let MOCK_HEROI_ID = '';
let context = {};

describe.skip('MongoDB Strategy', function() {
  this.timeout(Infinity);
  this.beforeAll(async function () {
    const connection = MongoDb.connect();
    context = new Context(new MongoDb(connection, HeroiSchema));
    await context.create(MOCK_HEROI_CADASTRAR);
    const result = await context.create(MOCK_HEROI_ATUALIZAR);
    MOCK_HEROI_ID = result._id;
  })
  it('MongoDB deve conectar', async function() {
    const result = await context.isConnected();
    const expect = 'Conectado';
    assert.equal(result, expect);
  });
  it('MongoDB deve cadastrar', async function() {
    const { nome, poder } = await context.create(MOCK_HEROI_CADASTRAR);
    assert.deepEqual({ nome, poder }, MOCK_HEROI_CADASTRAR);
  });
  it('MongoDB deve listar', async function() {
    const [{ nome, poder }] = await context.read({ nome: MOCK_HEROI_CADASTRAR.nome });
    assert.deepEqual({ nome, poder }, MOCK_HEROI_CADASTRAR);
  });
  it('MongoDB deve atualizar', async function() {
    // const [itemAtualizar] = await context.read({ nome: MOCK_HEROI_ATUALIZAR.nome });
    // const novoItem = {
    //   ...MOCK_HEROI_ATUALIZAR,
    //   nome: 'Mulher Maravilha'
    // }
    // const result = await context.update(itemAtualizar.id, novoItem);
    const result = await context.update(MOCK_HEROI_ID, {
      nome: 'Pernalonga',
    });
    console.log('result', result);
    assert.strictEqual(result.acknowledged, true);
    assert.strictEqual(result.matchedCount, 1);
    assert.strictEqual(result.modifiedCount, 1);
    assert.strictEqual(result.upsertedCount, 0);
    assert.strictEqual(result.upsertedId, null);
  });
  it('MongoDB deve remover', async function() {
    const result = await context.delete(MOCK_HEROI_ID);
    assert.deepEqual(result.n, 1);
  });
})
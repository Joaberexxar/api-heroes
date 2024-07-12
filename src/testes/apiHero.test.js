const assert = require('assert');
const api = require('./../../api');
let app = {};
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ilh1eGFkYXNpbHZhIiwiaWQiOjEsImlhdCI6MTcyMDY3MTg0MH0.7as1t2PaVRuW56RrxTKr_bs5FJn9cfBwvm8YjvRN9ao';
const headers = {
  Authorization: TOKEN
}


const DEFAULT_HEROI_CADASTRAR = {
  nome: 'Chapolin Colorado',
  poder: 'Marreta Biona'
}
const MOCK_HEROI_INICIAL = {
  nome: 'Gaviao Negro',
  poder: 'Flexas'
}
let MOCK_ID = '';
let MOCK_INVALID_ID = '668e1ece2613608b131f594e'
describe('Suite de teste API Heroes', function() {
  this.timeout(Infinity)
  this.beforeAll(async function() {
    app = await api;
    const result = await app.inject({
      method: 'POST',
      url: '/heroes',
      headers,
      payload: JSON.stringify(MOCK_HEROI_INICIAL)
    })
    MOCK_ID = JSON.parse(result.payload)._id;
    console.log('MOCK_ID', MOCK_ID);
  })
  it('listar /heroes, deve retornar um array', async () => {
    const result = await app.inject({
      method: 'GET',
      headers,
      url: '/heroes?skip=0&limit=10'

    });
    const statusCode = result.statusCode;
    const dados = JSON.parse(result.payload);
    assert.ok(statusCode === 200);
    assert.ok(Array.isArray(dados));
  });
  it('listar /heroes com 10 resultados', async () => {
    const TAMANHO_LISTA = 1;
    const result = await app.inject({
      method: 'GET',
      headers,
      url: `/heroes?skip=0&limit=${TAMANHO_LISTA}`
    });
    const dados = JSON.parse(result.payload);
    console.log('dados', dados);
    assert.ok(dados.length === TAMANHO_LISTA);
  });

  it('create POST /heroes, deve retornar um objeto', async () => {
    const result = await app.inject({
      method: 'POST',
      url: '/heroes',
      headers,
      payload: JSON.stringify(DEFAULT_HEROI_CADASTRAR)
    });
    const statusCode = result.statusCode;
    console.log('result', result.payload);

    const {message, _id} = JSON.parse(result.payload);
    assert.ok(statusCode === 200);
    assert.deepEqual(message, "Heroi cadastrado com sucesso");
    assert.notStrictEqual(_id, undefined);
  });

  it("Atulizar PATCH /heroes/:id", async () => {
    const _id = MOCK_ID;
    const expect = {
      poder: "Super Mira"
    }
    const result = await app.inject({
      method: 'PATCH',
      headers,
      url: `/heroes/${_id}`,
      payload: JSON.stringify(expect)
    });
    const statusCode = result.statusCode;
    const dados = JSON.parse(result.payload);
    assert.ok(statusCode === 200);
    assert.deepEqual(dados.message, "Heroi atualizado com sucesso");
  })
  it("Atulizar PATCH /heroes/:id - não deve atualizar se ID ta incorreto", async () => {
    const _id = MOCK_INVALID_ID;
    const expect = {
      poder: "Super Mira"
    }
    const result = await app.inject({
      method: 'PATCH',
      headers,
      url: `/heroes/${_id}`,
      payload: JSON.stringify(expect)
    });
    const statusCode = result.statusCode;
    const dados = JSON.parse(result.payload);
    assert.ok(statusCode === 200);
    assert.deepEqual(dados.message, "Heroi nao atualizado");
  });

  it('Deve remover DELETE /heroes/:id', async () => {
    const _id = MOCK_ID;
    const result = await app.inject({
      method: 'DELETE',
      headers,
      url: `/heroes/${_id}`,
    });

    const statusCode = result.statusCode;
    console.log('statusssssssssss', statusCode)
    const dados = JSON.parse(result.payload);

    assert.ok(statusCode === 200);
    assert.deepEqual(dados.message, 'Heroi removido com sucesso');

  })
})
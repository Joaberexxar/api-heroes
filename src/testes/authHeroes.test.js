const assert = require('assert');
const api = require('../../api');
const Context = require('./../db/strategies/base/contextStrategy');
const mongodb = require('./../db//strategies/mongodb/mongodb');
const userSchema = require('./../db/strategies/mongodb/schemas/userSchema');
let app = {};
const USER = {
  username: 'Xuxadasilva',
  password: '123',
}
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ilh1eGFkYXNpbHZhIiwiaWQiOjEsImlhdCI6MTcyMDY3MTg0MH0.7as1t2PaVRuW56RrxTKr_bs5FJn9cfBwvm8YjvRN9ao';
const USER_DB = {
  ...USER,
  password: TOKEN
}
let context = {}


describe('Deve validar o fluxo de auth', function() {
  this.beforeAll(async () => {
    app = await api;

    const connectionDB =  mongodb.connect();
    context = new Context(new mongodb(connectionDB, userSchema));
    await context.create(USER_DB);
  })

  it('deve obter um token', async () => {
    const result = await app.inject({
      method: 'POST',
      url: '/login',
      payload: USER,
    })

    const statusCode = result.statusCode;
    const dados = JSON.parse(result.payload);
    console.log('dados', dados)
    assert.deepEqual(statusCode, 200);
    assert.ok(dados.token.length > 10);
  })
})
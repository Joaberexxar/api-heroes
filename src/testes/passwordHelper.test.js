const assert = require('assert')
const PasswordHelper = require('../db/helpers/passwordHelper')
const SENHA = 'Joabe123456@';
const HASH = '$2b$10$PmI3CX.gt/iFX2rApcCwd.PW5buQaXFyZhJXbINEC05YMwjAU2EMW';


describe('UserHelper test suite', function () {
  this.timeout(5000);
  it('deve gerar um hash a partir de uma senha', async() => {
    const result = await PasswordHelper.hashPassword(SENHA);
    assert.ok(result.length > 10)
  });

  it('deve validar a senha', async() => {
    const result = await PasswordHelper.comparePassword(SENHA, HASH)
    assert.ok(result)
  })
})
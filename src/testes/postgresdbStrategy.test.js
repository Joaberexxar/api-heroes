const assert = require("assert");
const ContextStrategy = require("../db/strategies/base/contextStrategy");
const HeroiSchema = require("../db/strategies/postgres/schemas/heroiSchema");
const Postgres = require("../db/strategies/postgres/postgres");

const MOCK_HEROI_CADASTRAR = {
  name: "Gaviao Negro",
  poder: "flexas",
};
const MOCK_HEROI_ATUALIZAR = {
  name: "Batman",
  poder: "Dinheiro",
};
let context = {};

describe.skip("Postgres Strategy", function () {
  before(async () => {
    const connection = Postgres.connect();
    const model = await Postgres.defineModel(connection, HeroiSchema);
    context = new ContextStrategy(new Postgres(connection, model));

    await context.delete();
    await context.create(MOCK_HEROI_CADASTRAR);
    await context.create(MOCK_HEROI_ATUALIZAR);
  });
  it("Postgres deve conectar", async () => {
    const result = await context.authenticate();
    assert.equal(result, true);
  });

  it("Postgres deve cadastrar", async function () {
    const result = await context.create(MOCK_HEROI_CADASTRAR);
    delete result.id;
    assert.deepEqual(result, MOCK_HEROI_CADASTRAR);
  });
  it("listar", async function () {
    const [result] = await context.read({ name: MOCK_HEROI_CADASTRAR.name });
    delete result.id;
    assert.deepEqual(result, MOCK_HEROI_CADASTRAR);
  });
  it("update", async function () {
    const [itemAtt] = await context.read({ name: MOCK_HEROI_ATUALIZAR.name });
    const novoItem = {
      ...MOCK_HEROI_ATUALIZAR,
      name: "Mulher Maravilha",
    };
    const [result] = await context.update(itemAtt.id, novoItem);
    const [itemAtualizado] = await context.read({ id: itemAtt.id });
    assert.deepEqual(result, 1);
    assert.deepEqual(itemAtualizado.name, novoItem.name);
  });
  it("deletar", async function () {
    const [item] = await context.read({});
    const result = await context.delete(item.id);
    assert.deepEqual(result, 1);
  });
});

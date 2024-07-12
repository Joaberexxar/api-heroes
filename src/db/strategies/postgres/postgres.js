const ICrud = require('../interfaces/Icrud');
const Sequelize = require('sequelize');


class Postgres extends ICrud {
  constructor(connection, schema) {
    super();
    this.connection = connection;
    this._schema = schema;

  }
  static async defineModel(connection, schema) {
    const model = connection.define(
      schema.name, schema.schema, schema.options
    );
    await model.sync();
    return model;
  }
  async isConnected() {
    try {
      await this._connection.authenticate();
      return true
    } catch (error) {
      console.log('fail!', error);
      return false
    }
  }
  static async connect() {
    const sequelize = new Sequelize(process.env.POSTGRES_URL,{
      quoteIdentifiers: false,
      operatorsAliases: false,
      logging: false,
      ssl: process.env.SSL_DB,
      dialectOtions: {
        ssl: process.env.SSL_DB
      }
    });
    return sequelize;
  }
  async create(item) {
    const {dataValues } = await this._schema.create(item);
    return dataValues;
  }
  async read(query = {}) {
    return await this._schema.findAll({ where: query, raw: true })
  }
  async update(id, item) {
    const result = await this._schema.update(item, { where: {id : id} });
    return result;


  }
  async delete(id) {
    const query = id ? { id } : {};
    const deleted = await this._schema.destroy({ where: query });
    return deleted;
  }
}

module.exports = Postgres;
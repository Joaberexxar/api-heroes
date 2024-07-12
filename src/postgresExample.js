const sequelize = require('sequelize');
const driver = new sequelize('heroes', 'joabe', '123456', {
  host: 'localhost',
  dialect: 'postgres',
  quoteIdentifiers: false,
  operatorsAliases: false
});

async function main() {
  const herois = await driver.define('heroes', {
    id: {
      type: sequelize.INTEGER,
      required: true,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: sequelize.STRING,
      required: true
    },
    poder: {
      type: sequelize.STRING,
      required: true
    }
  }, {

    tableName: 'TB_HEROES',
    freezeTableName: false,
    timestamps: false,
  })

  await herois.sync();
  await herois.create({
    name: 'Lanterna Verde',
    poder: 'Anel'
  })
  const result = await herois.findAll({
    raw: true});
    console.log('result', result);
}


main();

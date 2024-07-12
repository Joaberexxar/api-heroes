const ContextStrategy = require('./db/strategies/base/contextStrategy');
const MongoDb = require('./db/strategies/mongodb');
const Postgres = require('./db/strategies/postgres')

// const contextMongo = new ContextStrategy(new MongoDb());
// contextMongo.create({ name: 'Goku', poder: 'kamehameha' });
// contextMongo.read({ name: 'Goku' });
// contextMongo.update(1, { name: 'Goku', poder: 'Super kamehameha' });

const contexPostgres = new ContextStrategy(new Postgres());
contexPostgres.create({ name: 'Goku', poder: 'kamehameha' });
contexPostgres.read({ name: 'Goku' });
contexPostgres.update(1, { name: 'Goku', poder: 'Super kamehameha' });
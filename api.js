const { config } = require('dotenv');
const { join } = require('path')
const { ok } = require('assert')
const env = process.env.NODE_ENV || "dev"
ok(env === "prod" || "dev", "a env é inválida, ou dev ou prod")

const configPath = join( __dirname ,'./config', `.env.${env}`);
config({
  path: configPath
})
console.log('MONGO', process.env.MONGODB_URL)

const hapi = require('hapi');
const MongoDb = require('./src/db/strategies/mongodb/mongodb')
const Context = require('./src/db/strategies/base/contextStrategy')
const HeroRoutes = require('./src/routes/heroRoutes')
const AuthRoutes = require('./src/routes/authRoutes')
const HeroiSchema = require('./src/db/strategies/mongodb/schemas/heroiSchema')
const portfinder = require('portfinder')
const DEFAULT_PORT = process.env.PORT;
const HapiSwagger = require('hapi-swagger');
const Vision = require('vision');
const inert = require('inert');
const JWT_SECRET = process.env.JWT_KEY;
const HapiJwt = require('hapi-auth-jwt2');
const userSchema = require('././src/db/strategies/mongodb/schemas/userSchema')

function mapRoutes(instance, methods) {
  return methods.map(method => instance[method]());
};

async function main() {

  portfinder.basePort = DEFAULT_PORT;
  const port = await portfinder.getPortPromise();

  const app =  await new hapi.Server({
    port
  })

  const connection = MongoDb.connect();
  const context = new Context(new MongoDb(connection, HeroiSchema));
  const contextSecond = new Context(new MongoDb(connection, userSchema ))
  const swaggerOptions = {
    info: {
      title: 'API HEROES',
      version: 'v1.0',
    },
    lang: 'pt'
  }

  await app.register([
    Vision, inert, HapiJwt,
    {
      plugin: HapiSwagger,
      options: swaggerOptions
    }
  ])
  app.auth.strategy('jwt', 'jwt', {
    key: JWT_SECRET,
    // options: {
    //   expiresIn: 20
    // },
    validate: (dado, request) => {

      return {
        isValid: true
      }
    }
  })
  app.auth.default('jwt')
  app.route([
    ...mapRoutes(new HeroRoutes(context), HeroRoutes.methods()),
    ...mapRoutes(new AuthRoutes(JWT_SECRET, contextSecond), AuthRoutes.methods())
  ])
  await app.start()
  console.log(`Server running on ${app.info.port}`)

  return app;
}

module.exports = main()

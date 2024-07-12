const BaseRoute = require("./base/baseRoute");
const joi = require("joi");
const boom = require("boom");
const jwt = require('jsonwebtoken');
const PasswordHelper = require('./../db/helpers/passwordHelper')

const USER = {
  username: "xuxadasilva",
  password: "123",
};
class AuthRoutes extends BaseRoute {
  constructor(secret, db) {
    super();
    this.secret = secret;
    this.db = db;
  }
  login() {
    return {
      path: "/login",
      method: "POST",
      config: {
        auth: false,
        tags: ["api"],
        description: "Obter token",
        notes: "faz login com user e senha do banco",
        validate: {
          payload: {
            username: joi.string().required(),
            password: joi.string().required(),
          },
        },
      },
      handler: async (request) => {
        const { username, password } = request.payload;

        const [usuario] = this.db.read({
          username: username.toLowerCase()
        })
        if(!usuario) return boom.unauthorized('O usuario informado nao existe');

        const match = await PasswordHelper.comparePassword(password, usuario.password);

        if (!match) return boom.unauthorized('O usuario ou senha são inválidos!')
        // if (
        //   username.toLowerCase() !== USER.username ||
        //   password !== USER.password
        // )
        //   return boom.unauthorized();

          const token = jwt.sign({
            username: username,
            id: usuario.id,
          }, this.secret)
          return {
            token
          }
      },
    };
  }
}

module.exports = AuthRoutes;

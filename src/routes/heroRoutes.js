const { validate, tags } = require("joi/lib/types/lazy");
const BaseRoute = require("./base/baseRoute");
const joi = require("joi");
const boom = require('boom');

const headers = joi.object({
  authorization: joi.string().required()
}).unknown()
class HeroRoutes extends BaseRoute {
  constructor(db) {
    super();
    this.db = db;
  }

  list() {
    return {
      path: "/heroes",
      method: "GET",
      config: {
        tags: ['api'],
        description: 'Deve listar herois',
        notes: 'pode paginar resultados e filtrar por nome',
        validate: {
          query: {
            skip: joi.number().integer().default(0),
            limit: joi.number().integer().default(10),
            nome: joi.string().min(3).max(100),
          },
          headers,
        },
      },
      handler: (request) => {
        try {
          const { skip, limit, nome } = request.query;
          const query = nome ? { nome: { $regex: `.*${nome}*.` } } : {};

          return this.db.read(query, parseInt(skip), parseInt(limit));
        } catch (error) {
          console.log("error", error);
          return boom.internal()
        }
      },
    };
  }

  create() {
    return {
      path: "/heroes",
      method: "POST",
      config: {
        tags: ['api'],
        description: 'Deve criar herois',
        notes: 'pode criar herois',
        validate: {
          failAction: (request, headers, error) => {
            console.log("deu ruim po", error);
          },
          headers,
          payload: {
            nome: joi.string().required().min(3).max(100),
            poder: joi.string().required().min(2).max(100),
          },
        },
      },
      handler: async (request) => {
        try {
          const { nome, poder } = request.payload;
          const result = await this.db.create({ nome, poder });
          // console.log("result", result);
          return {
            message: "Heroi cadastrado com sucesso",
            _id: result._id,
          };
        } catch (error) {
          console.log("error", error);
          return boom.internal();
        }
      },
    };
  }

  update() {
    return {
      path: "/heroes/{id}",
      method: "PATCH",
      config: {
        tags: ['api'],
        description: 'Pode atualizar um heroi por id',
        validate: {
          params: {
            id: joi.string().required(),
          },
          headers,
          payload: {
            nome: joi.string().min(3).max(100),
            poder: joi.string().min(2).max(100),
          },
        },
      },
      handler: async (request) => {
        try {
          const { id } = request.params;
          const { payload } = request;
          const dadosString = JSON.stringify(payload);
          const dados = JSON.parse(dadosString);
          const result = await this.db.update(id, dados);
          if (result.nModified !== 1) {
            return {
              message: "Heroi nao atualizado",
              _id: id,
            };
          }
          console.log("result", result);
          return {
            message: "Heroi atualizado com sucesso",
            _id: result._id,
          };
        } catch (error) {
          console.log("error", error);
          return boom.internal();
        }
      },
    };
  }

  delete() {
    return {
      path: "/heroes/{id}",
      method: "DELETE",
      config: {
        tags: ['api'],
        description: 'Pode deletar um heroi por ID',
        validate: {
          params: {
            id: joi.string().required(),
          },
          headers,
        },
      },
      handler: async (request) => {
        try {
          const { id } = request.params;
          const resultado = await this.db.delete(id);
          if (resultado.n !== 1) {
            return "Não foi possivel remover o item";
          }
          return {
            message: "Heroi removido com sucesso",
          };
        } catch (error) {
          console.log("deu ruim", error);
          return boom.internal();
        }
      },
    };
  }
}

module.exports = HeroRoutes;

const Sequelize = require("sequelize");
const HeroiSchema = {
  schema: {
    id: {
      type: Sequelize.INTEGER,
      required: true,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
      required: true,
    },
    poder: {
      type: Sequelize.STRING,
      required: true,
    },
    options: {
      tableName: "TB_HEROES",
      freezeTableName: false,
      timestamps: false,
    },
  },
};

module.exports = HeroiSchema;

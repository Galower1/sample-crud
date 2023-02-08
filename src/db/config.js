const { Sequelize, DataTypes } = require("sequelize");

const config = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "root",
  DB: "todos",
  dialect: "mysql",
};

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  logging: false,
});

const Todo = sequelize.define("todo", {
  todoId: {
    field: "todo_id",
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

const setupDB = async () => {
  await sequelize.sync({ force: true });
  await sequelize.authenticate();
};

module.exports = { sequelize, setupDB, Todo };

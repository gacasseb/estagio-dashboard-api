const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Trap = require("./Trap");

const MetaData = sequelize.define(
  "MetaData",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    longitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    latitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    metadata: {
      type: DataTypes.JSON,
      allowNull: true,
    },
  },
  {
    // Model options
  }
);

module.exports = MetaData;

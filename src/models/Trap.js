const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Trap = sequelize.define(
  "Trap",
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
    }
  },
);

const MetaData = sequelize.define(
  "MetaData",
  {
    metadata: {
      type: DataTypes.JSON,
      allowNull: true,
    },
  },
);

Trap.hasMany(MetaData, {
  foreignKey: "trapId",
  onDelete: "CASCADE",
});

MetaData.belongsTo(Trap, {
  foreignKey: "trapId",
})

module.exports = {Trap, MetaData};

const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/connection");

class Guest extends Model {}

Guest.init(
    {
      attending: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      guest_id: {
        type: DataTypes.INTEGER,
        references: {
            model: "user",
            key: "id",
        },
      },
      event_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "event",
          key: "id",
        },
      },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: "guest",
      }
);

module.exports = Guest;
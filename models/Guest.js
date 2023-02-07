const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/connection");

class Guest extends Model {}

Guest.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      attending: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: [['Yes', 'No', 'Maybe']],
        }
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
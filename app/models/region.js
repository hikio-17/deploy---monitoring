/* eslint-disable no-unused-vars */
const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Region extends Model {
    static associate(models) {
      // define association here
      Region.belongsTo(models.Device, {
        foreignKey: 'id',
        onDelete: 'CASCADE',
      });
    }
  }
  Region.init({
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Region',
  });
  return Region;
};

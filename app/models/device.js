const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Device extends Model {
    static associate(models) {
      Device.belongsTo(models.Region, {
        foreignKey: 'regionId',
        onDelete: 'CASCADE',
      });

      Device.belongsTo(models.Report, {
        foreignKey: 'id',
        onDelete: 'CASCADE',
      });
    }
  }
  Device.init({
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    max: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    regionId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Device',
  });
  return Device;
};

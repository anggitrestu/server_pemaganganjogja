'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Admin.hasOne(models.Company, {
        foreignKey: {
          name: 'admin_id',
          allowNull: false,
        },
        as: 'companies',
      });
    }
  }
  Admin.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.ENUM(['admin', 'hrd']),
    },
    {
      sequelize,
      paranoid: true,
      modelName: 'Admin',
    }
  );
  return Admin;
};

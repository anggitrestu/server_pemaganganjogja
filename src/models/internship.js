'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Internship extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Internship.hasOne(models.Regulation, {
        foreignKey: {
          name: 'internship_id',
          allowNull: false,
        },
        as: 'regulation',
      });

      Internship.belongsTo(models.Company, {
        foreignKey: {
          name: 'company_id',
          allowNull: false,
        },
        as: 'company',
      });
    }
  }
  Internship.init(
    {
      company_id: DataTypes.INTEGER,
      name_program: DataTypes.STRING,
      quota: DataTypes.INTEGER,
      industrial_field: DataTypes.STRING,
    },
    {
      sequelize,
      paranoid: true,
      modelName: 'Internship',
    }
  );
  return Internship;
};

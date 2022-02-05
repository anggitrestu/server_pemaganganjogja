'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Regulation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Regulation.belongsTo(models.Internship, {
        foreignKey: {
          name: 'internship_id',
          allowNull: false,
        },
        as: 'company',
      });
    }
  }
  Regulation.init(
    {
      internship_id: DataTypes.INTEGER,
      education: DataTypes.STRING,
      age: DataTypes.INTEGER,
      gender: DataTypes.STRING,
      experience: DataTypes.STRING,
      certificate: DataTypes.STRING,
      other_condition: DataTypes.TEXT,
    },
    {
      sequelize,
      paranoid: true,
      modelName: 'Regulation',
    }
  );
  return Regulation;
};

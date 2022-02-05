'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Survey extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Survey.hasMany(models.AnswerSurvey, {
        foreignKey: {
          name: 'survei_id',
          allowNull: false,
        },
        as: 'answers',
      });
    }
  }
  Survey.init(
    {
      question: DataTypes.STRING,
      type: DataTypes.ENUM(['radio-button', 'checkbox', 'textarea']),
    },
    {
      sequelize,
      paranoid: true,
      modelName: 'Survey',
    }
  );
  return Survey;
};

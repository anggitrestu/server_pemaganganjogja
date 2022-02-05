'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AnswerQuestionnaire extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  AnswerQuestionnaire.init(
    {
      questionnaire_id: DataTypes.INTEGER,
      answer: DataTypes.STRING,
    },
    {
      sequelize,
      paranoid: true,
      modelName: 'AnswerQuestionnaire',
    }
  );
  return AnswerQuestionnaire;
};

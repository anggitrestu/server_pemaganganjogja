'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Questionnaire extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Questionnaire.hasMany(models.AnswerQuestionnaire, {
        foreignKey: {
          name: 'questionnaire_id',
          allowNull: false,
        },
        as: 'answers',
      });

      Questionnaire.hasMany(models.UserQuestionnare, {
        foreignKey: {
          name: 'questionnaire_id',
          allowNull: false,
        },
        as: 'user_answers',
      });
    }
  }
  Questionnaire.init(
    {
      question: DataTypes.STRING,
      type: DataTypes.ENUM(['radio-button', 'checkbox', 'textarea']),
    },
    {
      sequelize,
      paranoid: true,
      modelName: 'Questionnaire',
    }
  );
  return Questionnaire;
};

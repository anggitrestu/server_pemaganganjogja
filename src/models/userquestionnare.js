'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserQuestionnare extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserQuestionnare.belongsTo(models.Questionnaire, {
        foreignKey: {
          name: 'questionnaire_id',
          allowNull: false,
        },
        as: 'question',
      });
    }
  }
  UserQuestionnare.init(
    {
      user_id: DataTypes.INTEGER,
      user_id_hl: DataTypes.INTEGER,
      questionnaire_id: DataTypes.INTEGER,
      answer: DataTypes.STRING,
    },
    {
      sequelize,
      paranoid: true,
      modelName: 'UserQuestionnare',
    }
  );
  return UserQuestionnare;
};

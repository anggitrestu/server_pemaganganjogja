'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserSurvey extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserSurvey.init(
    {
      user_id: DataTypes.INTEGER,
      user_id_hl: DataTypes.INTEGER,
      survey_id: DataTypes.INTEGER,
      answer: DataTypes.STRING,
    },
    {
      sequelize,
      paranoid: true,
      modelName: 'UserSurvey',
    }
  );
  return UserSurvey;
};

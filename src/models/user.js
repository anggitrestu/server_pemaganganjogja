'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      user_id_hl: DataTypes.INTEGER,
      fullname: DataTypes.STRING,
      province: DataTypes.STRING,
      city: DataTypes.STRING,
      marital_status: DataTypes.STRING,
      about_you: DataTypes.STRING,
      work_experience: DataTypes.STRING,
      educational_background: DataTypes.STRING,
      start_date: DataTypes.DATE,
      end_date: DataTypes.DATE,
      name_edu: DataTypes.STRING,
      level_edu: DataTypes.STRING,
      major_edu: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};

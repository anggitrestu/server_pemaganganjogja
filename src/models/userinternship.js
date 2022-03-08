'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserInternship extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserInternship.belongsTo(models.Internship, {
        foreignKey: {
          name: 'internship_id',
          allowNull: false,
        },
        as: 'internships',
      });

      UserInternship.belongsTo(models.User, {
        foreignKey: {
          name: 'user_id',
          allowNull: false,
        },
        as: 'user',
      });
    }
  }
  UserInternship.init(
    {
      user_id: DataTypes.INTEGER,
      user_id_hl: DataTypes.INTEGER,
      internship_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      paranoid: true,
      modelName: 'UserInternship',
    }
  );
  return UserInternship;
};

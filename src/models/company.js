'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Company.belongsTo(models.Admin, {
        foreignKey: {
          name: 'admin_id',
          allowNull: false,
        },
        as: 'admin',
      });

      Company.hasMany(models.Internship, {
        foreignKey: {
          name: 'company_id',
          allowNull: false,
        },
        as: 'internships',
      });
    }
  }
  Company.init(
    {
      admin_id: DataTypes.INTEGER,
      name: DataTypes.STRING,
      url_profile: DataTypes.STRING,
      url_file: DataTypes.STRING,
      email: DataTypes.STRING,
      address: DataTypes.STRING,
      number: DataTypes.STRING,
      type_of_business: DataTypes.STRING,
      number_of_employee: DataTypes.STRING,
    },
    {
      sequelize,
      paranoid: true,
      modelName: 'Company',
    }
  );
  return Company;
};
6;

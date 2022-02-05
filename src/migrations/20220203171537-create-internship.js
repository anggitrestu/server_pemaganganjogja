'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Internships', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      company_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Companies',
          key: 'id',
          as: 'company_id',
        },
      },
      name_program: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      quota: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      industrial_field: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Internships');
  },
};

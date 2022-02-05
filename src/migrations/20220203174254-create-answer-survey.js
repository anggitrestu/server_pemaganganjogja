'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('AnswerSurveys', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      survei_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Surveys',
          key: 'id',
          as: 'survei_id',
        },
      },
      answer: {
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
    await queryInterface.dropTable('AnswerSurveys');
  },
};

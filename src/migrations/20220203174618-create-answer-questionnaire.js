'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('AnswerQuestionnaires', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      questionnaire_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Questionnaires',
          key: 'id',
          as: 'questionnaire_id',
        },
      },
      answer: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('AnswerQuestionnaires');
  },
};

'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Companies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      admin_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Admins',
          key: 'id',
          as: 'admin_id',
        },
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          isEmail: true,
        },
      },
      address: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      number: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      website: {
        type: Sequelize.STRING,
      },
      type_of_business: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      number_of_employee: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      room_available: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      instructor_available: {
        type: Sequelize.BOOLEAN,
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
    await queryInterface.dropTable('Companies');
  },
};

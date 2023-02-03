'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING(20),
        unique: true,
        allowNull: false
      },
      password: {
        type: Sequelize.STRING.BINARY,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING(80),
        allowNull: false,
        unique: true
      },
      image: {
        type: Sequelize.STRING
      },
      summary: {
        type: Sequelize.STRING(500)
      },
      transactions: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};

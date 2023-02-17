'use strict';

let options = {};
options.tableName = 'Comment'
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Comments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      content: {
        type: Sequelize.STRING(300)
      },
      username: {
        type: Sequelize.STRING(20),
        allowNull: false
      },
      offerId: {
        type: Sequelize.INTEGER,
        references: { model: 'Offers' }
      },
      listingId: {
        type: Sequelize.INTEGER,
        references: { model: 'Listings' }
      },
      seekingId: {
        type: Sequelize.INTEGER,
        references: { model: 'Seekings' }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }, options);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Comments', options);
  }
};

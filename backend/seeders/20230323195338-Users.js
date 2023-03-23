'use strict';
const bcrypt = require('bcryptjs');
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Users'
    await queryInterface.bulkInsert(options, [{
      username: 'BrenL',
      email: 'BrenL@gmail.com',
      password: await bcrypt.hashSync('password'),
      image: null,
      summary: '',
      transactions: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      usernameLower: 'brenl',
      emailLower: 'brenl@gmail.com'
    }, {
      username: 'BrenP',
      email: 'BrenP@gmail.com',
      password: await bcrypt.hashSync('password'),
      image: null,
      summary: '',
      transactions: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      usernameLower: 'brenp',
      emailLower: 'brenp@gmail.com'
    }, {
      username: 'BrenG',
      email: 'BrenG@gmail.com',
      password: await bcrypt.hashSync('password'),
      image: null,
      summary: '',
      transactions: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      usernameLower: 'breng',
      emailLower: 'breng@gmail.com'
    }, {
      username: 'BrenH',
      email: 'BrenH@gmail.com',
      password: await bcrypt.hashSync('password'),
      image: null,
      summary: '',
      transactions: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      usernameLower: 'brenh',
      emailLower: 'brenh@gmail.com'
    }], {});
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Users'
    await queryInterface.bulkDelete(options);
  }
};

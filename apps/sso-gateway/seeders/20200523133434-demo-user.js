'use strict';
var UUID = require('uuid');

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Users', [{
        id: UUID.v4(),
        firstName:  'John',
        lastName:   'Doe',
        status:     'ACTIVE',
        email:      'john@doe.com',
        createdAt:  new Date(),
        removedAt:  new Date(),
        updatedAt:  new Date(),
        role:       'admin',
        password:   'admin',
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Users', null, {});
  }
};

'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id        : { type: Sequelize.STRING, defaultValue: Sequelize.UUIDV4 },
      firstName:  { type: Sequelize.STRING, defaultValue: '' },
      lastName:   { type: Sequelize.STRING, defaultValue: '' },
      status:     { type: Sequelize.ENUM('ACTIVE', 'BLOCKED', 'PENDING'), defaultValue: 'ACTIVE' },
      email:      { type: Sequelize.STRING(128), allowNull: false, unique: true },
      createdAt:  { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
      removedAt:  { type: Sequelize.DATE, defaultValue: null },
      updatedAt:  { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
      role:       { type: Sequelize.STRING, defaultValue: '' },
      password:   { type: Sequelize.STRING, defaultValue: '' },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};

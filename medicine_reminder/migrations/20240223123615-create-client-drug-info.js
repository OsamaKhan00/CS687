'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('client_drug_infos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
      },
      drugName: {
        type: Sequelize.STRING
      },
      drugQuantity: {
        type: Sequelize.STRING
      },
      whenToTake: {
        type: Sequelize.STRING
      },
      message: {
        type: Sequelize.TEXT
      },
      start_date: {
        type: Sequelize.DATE
      },
      end_date: {
        type: Sequelize.DATE
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
    await queryInterface.dropTable('client_drug_infos');
  }
};
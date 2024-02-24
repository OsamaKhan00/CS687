'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('drug_schedules', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
      },
      clientDrugId: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.STRING
      },
      isMorning: {
        type: Sequelize.BOOLEAN
      },
      isEvening: {
        type: Sequelize.BOOLEAN
      },
      isAfternoon: {
        type: Sequelize.BOOLEAN
      },
      scheduleDate: {
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
    await queryInterface.dropTable('drug_schedules');
  }
};
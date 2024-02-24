'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class drug_schedule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  drug_schedule.init({
    userId: DataTypes.INTEGER,
    clientDrugId: DataTypes.INTEGER,
    status: DataTypes.STRING,
    isMorning: DataTypes.BOOLEAN,
    isEvening: DataTypes.BOOLEAN,
    isAfternoon: DataTypes.BOOLEAN,
    scheduleDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'drug_schedule',
  });
  return drug_schedule;
};
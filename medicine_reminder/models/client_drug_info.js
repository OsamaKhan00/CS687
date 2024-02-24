'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class client_drug_info extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  client_drug_info.init({
    userId: DataTypes.INTEGER,
    drugName: DataTypes.STRING,
    drugQuantity: DataTypes.STRING,
    whenToTake: DataTypes.STRING,
    message: DataTypes.TEXT,
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'client_drug_info',
  });
  return client_drug_info;
};
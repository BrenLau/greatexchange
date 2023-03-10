'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Seeking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, { foreignKey: 'userId' })
      this.hasMany(models.Comment, { foreignKey: 'seekingId' })
    }
  }
  Seeking.init({
    name: DataTypes.STRING,
    summary: DataTypes.STRING,
    image: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Seeking',
  });
  return Seeking;
};

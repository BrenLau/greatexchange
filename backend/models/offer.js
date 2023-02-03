'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Offer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Listing)
      this.belongsTo(models.User)
      this.hasMany(models.Comment)
      this.hasMany(models.Item)
    }
  }
  Offer.init({
    userId: DataTypes.INTEGER,
    listingId: DataTypes.INTEGER,
    cash: DataTypes.DECIMAL(0, 2)
  }, {
    sequelize,
    modelName: 'Offer',
  });
  return Offer;
};

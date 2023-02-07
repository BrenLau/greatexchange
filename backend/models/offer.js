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
      this.belongsTo(models.Listing, { foreignKey: 'listingId' })
      this.belongsTo(models.User, { foreignKey: 'userId' })
      this.hasMany(models.Comment, { foreignKey: 'offerId' })
      this.hasMany(models.Item, { foreignKey: 'offerId' })
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

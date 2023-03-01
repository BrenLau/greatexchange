'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Listing extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, { foreignKey: 'userId' })
      this.hasMany(models.Offer, { foreignKey: 'listingId' })
      this.hasMany(models.Comment, { foreignKey: 'listingId' })
      this.hasOne(models.Item, { foreignKey: 'listingId' })
    }
  }
  Listing.init({
    userId: DataTypes.INTEGER,
    request: DataTypes.STRING(500),
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Listing',
  });
  return Listing;
};

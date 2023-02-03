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
      this.belongsTo(models.User)
      this.hasMany(models.Offer)
      this.hasMany(models.Comment)
      this.hasMany(models.Item)
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

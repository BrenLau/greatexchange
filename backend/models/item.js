'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User)
      this.belongsTo(models.Listing)
      this.belongsTo(models.Offer)
    }
  }
  Item.init({
    name: DataTypes.STRING(50),
    image: DataTypes.STRING,
    offerId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    listingId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Item',
  });
  return Item;
};

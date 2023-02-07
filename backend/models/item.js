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
      this.belongsTo(models.User, { foreignKey: 'userId' })
      this.belongsTo(models.Listing, { foreignKey: 'listingId' })
      this.belongsTo(models.Offer, { foreignKey: 'offerId' })
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

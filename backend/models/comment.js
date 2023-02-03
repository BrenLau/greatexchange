'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Listing)
      this.belongsTo(models.Offer)
      this.belongsTo(models.Seeking)
    }
  }
  Comment.init({
    content: DataTypes.STRING,
    username: DataTypes.STRING,
    offerId: DataTypes.INTEGER,
    listingId: DataTypes.INTEGER,
    seekingId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};

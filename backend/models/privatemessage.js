'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PrivateMessage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, { foreignKey: 'senderId', as: 'sender' })
      this.belongsTo(models.User, { foreignKey: 'receiverId', as: 'receiver' })

    }
  }
  PrivateMessage.init({
    senderId: DataTypes.INTEGER,
    receiverId: DataTypes.INTEGER,
    content: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'PrivateMessage',
  });
  return PrivateMessage;
};

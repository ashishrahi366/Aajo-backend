'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tbl_user extends Model {

    static associate(models) {
    }
    static async createUser(payload) {
      try {
        await tbl_user.create(payload);
      } catch (error) {
        return error
      }
    }

  }
  tbl_user.init({
    user_id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    user_fname: DataTypes.STRING(50),
    user_lname: DataTypes.STRING(50),
    user_username: DataTypes.STRING(50),
    user_email: DataTypes.STRING(50),
    user_password: DataTypes.STRING(255),
    user_pnumber: DataTypes.STRING(50),
    user_address: DataTypes.STRING(255),
    user_city: DataTypes.STRING(50),
    user_zipcode: DataTypes.STRING(20),
    user_isActive: DataTypes.TINYINT(1),
    user_isDelete: DataTypes.TINYINT(1),
  }, {
    sequelize,
    modelName: 'tbl_user',
    timestamps: true,
    createdAt: "added_at",
    updatedAt: "updated_at"
  });
  return tbl_user;
};
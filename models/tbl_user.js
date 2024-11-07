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
        const data = await tbl_user.create(payload);
        return data;
      } catch (error) {
        return error
      }
    };

    static async updateUser(payload, id) {
      try {
        await tbl_user.update(payload, { where: { user_id: id } });
      } catch (error) {
        return error
      }
    };

    static async findUser(whereClause) {
      try {
        const data = await tbl_user.findOne({
          raw: true,
          where: whereClause,
          attributes: ["user_email", "user_password", "user_id"]
        });
        return data;
      } catch (error) {
        throw error;
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
    user_fullName: DataTypes.STRING(50),
    user_pnumber: DataTypes.STRING(50),
    user_dob: DataTypes.STRING(20),
    user_address: DataTypes.STRING(255),
    user_city: DataTypes.STRING(50),
    user_zipcode: DataTypes.STRING(20),
    user_isHost: DataTypes.TINYINT(1),
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
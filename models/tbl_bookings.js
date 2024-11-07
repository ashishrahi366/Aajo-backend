'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tbl_bookings extends Model {
    static associate(models) { };


  };
  tbl_bookings.init({
    book_pri_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    book_id: DataTypes.STRING(100),
    book_invoice: DataTypes.STRING(100),
    book_prop_id: DataTypes.INTEGER(11),
    book_prop_type: DataTypes.TEXT(),
    book_user_id: DataTypes.INTEGER(11),
    book_host_id: DataTypes.INTEGER(11),
    book_price: DataTypes.DOUBLE(10, 2),
    book_is_paid: DataTypes.TINYINT(1),
    book_is_cod: DataTypes.TINYINT(1),
    book_status: DataTypes.INTEGER(11),
  }, {
    sequelize,
    modelName: 'tbl_bookings',
    timestamps: true,
    createdAt: "book_added_at",
    updatedAt: "book_updated_at"
  });
  return tbl_bookings;
};
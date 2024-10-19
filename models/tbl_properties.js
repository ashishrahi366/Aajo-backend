'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tbl_properties extends Model {

    static associate(models) { }
  }
  tbl_properties.init({
    property_id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    property_name: DataTypes.STRING(50),
    property_address: DataTypes.STRING(255),
    property_longitude: DataTypes.DECIMAL(11, 8),
    property_latitude: DataTypes.DECIMAL(10, 8),
    property_city: DataTypes.STRING(50),
    property_desc: DataTypes.STRING(200),
    property_price: DataTypes.DECIMAL(10, 2),
    property_mini_price: DataTypes.DECIMAL(10, 2),
    is_active: DataTypes.TINYINT(1),
    is_deleted: DataTypes.TINYINT(1),
  }, {
    sequelize,
    modelName: 'tbl_properties',
    timestamps: true,
    createdAt:"created_at",
    updatedAt:"updated_at"
  });
  return tbl_properties;
};
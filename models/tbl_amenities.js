'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tbl_amenities extends Model {
    static associate(models) { };

  }
  tbl_amenities.init({
    amn_id: {
      type: DataTypes.INTEGER(11),
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    amn_title: DataTypes.STRING(20),
    amn_isActive: DataTypes.TINYINT(1),
    amn_isDelete: DataTypes.TINYINT(1),
  }, {
    sequelize,
    modelName: 'tbl_amenities',
    timestamps: false
  });
  return tbl_amenities;
};
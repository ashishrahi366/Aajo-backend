'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tbl_prop_to_amenities extends Model {
    static associate(models) { }
  }
  tbl_prop_to_amenities.init({
    pa_id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    pa_prop_id: DataTypes.INTEGER(11),
    pa_amn_id: DataTypes.INTEGER(11),
  }, {
    sequelize,
    modelName: 'tbl_prop_to_amenities',
    timestamps:false
  });
  return tbl_prop_to_amenities;
};
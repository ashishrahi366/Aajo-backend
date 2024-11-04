'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tbl_prop_to_cat extends Model {

    static associate(models) {
      // define association here
    }
  }
  tbl_prop_to_cat.init({
    pt_cat_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    pt_cat_cat_id: DataTypes.INTEGER(11),
    pt_cat_prop_id: DataTypes.INTEGER(11),
  }, {
    sequelize,
    modelName: 'tbl_prop_to_cat',
    timestamps: false,
  });
  return tbl_prop_to_cat;
};
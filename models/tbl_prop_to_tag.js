'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tbl_prop_to_tag extends Model {
    static associate(models) {
      // define association here
    }
  }
  tbl_prop_to_tag.init({
    pt_tag_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    pt_tag_tag_id: DataTypes.INTEGER(11),
    pt_tag_prop_id: DataTypes.INTEGER(11),
  }, {
    sequelize,
    modelName: 'tbl_prop_to_tag',
    timestamps: false
  });
  return tbl_prop_to_tag;
};
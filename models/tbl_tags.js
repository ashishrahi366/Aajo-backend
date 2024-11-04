'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tbl_tags extends Model {
    static associate(models) { };
  }
  tbl_tags.init({
    tag_id: {
      type: DataTypes.INTEGER(11),
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    tag_name: DataTypes.STRING(50),
    tag_isActive: DataTypes.TINYINT(1),
    tag_isDelete: DataTypes.TINYINT(1),
  }, {
    sequelize,
    modelName: 'tbl_tags',
    timestamps: false
  });
  return tbl_tags;
};
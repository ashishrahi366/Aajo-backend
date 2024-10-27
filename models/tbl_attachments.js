'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tbl_attachments extends Model {
    static associate(models) {
    }

    static async handleSingle(file, recordId, type) {
      try {
        let payload = {
          afile_type: type,
          afile_record_id: recordId,
          afile_path: file.path,
          afile_name: file.originalname,
        };
        await tbl_attachments.create(payload);
      } catch (error) {
        throw error;
      }
    }
  }
  tbl_attachments.init({
    afile_id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    afile_type: DataTypes.INTEGER(11),
    afile_record_id: DataTypes.INTEGER(11),
    afile_path: DataTypes.STRING(50),
    afile_name: DataTypes.STRING(255),
  }, {
    sequelize,
    modelName: 'tbl_attachments',
    timestamps: false
  });
  return tbl_attachments;
};
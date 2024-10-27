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
    };

    static async deleteAttachment(recordId, type) {
      const fs = require('fs');
      const path = require('path');
      try {
        const findImage = await tbl_attachments.findOne({
          raw: true,
          where: {
            afile_type: type,
            afile_record_id: recordId
          }
        });
        if (findImage == null) {
          throw new Error("no record found");
        }
        const imagePath = path.join(__dirname, '..', findImage.afile_path);
        fs.unlink(imagePath, async (err) => {
          if (err) {
            throw new Error(err);
            return common.response(res, 500, false, 'Error deleting image from system');
          }
          await tbl_attachments.destroy({ where: { afile_type: type, afile_record_id: recordId } });
          // return common.response(res, 200, true, 'Image deleted successfully');
          return true
        });
      } catch (error) {
        console.log(error)
        return error;
      }
    };

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
'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tbl_attachments', {
      afile_id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      afile_type: {
        type: Sequelize.INTEGER(11),
        allowNull: false
      },
      afile_record_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false
      },
      afile_path: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      afile_name: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tbl_attachments');
  }
};
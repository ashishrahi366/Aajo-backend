'use strict';
const { Model, Sequelize } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tbl_properties extends Model {

    static associate(models) { };

    static async getPropertiesBylangLat(userLat, userLng, kmRadius) {
      try {
        const data = await tbl_properties.findAll({
          attributes: [
            "property_id",
            "property_longitude",
            "property_latitude",
            "property_price",
            [
              Sequelize.literal(`(
                6371 * acos(
                  cos(radians(${userLat})) *
                  cos(radians(property_latitude)) *
                  cos(radians(property_longitude) - radians(${userLng})) +
                  sin(radians(${userLat})) *
                  sin(radians(property_latitude))
                )
              )`),
              'distance'
            ]
          ],
          where: Sequelize.where(
            Sequelize.literal(`(
              6371 * acos(
                cos(radians(${userLat})) *
                cos(radians(property_latitude)) *
                cos(radians(property_longitude) - radians(${userLng})) +
                sin(radians(${userLat})) *
                sin(radians(property_latitude))
              )
            )`),
            '<=',
            kmRadius // 5 km radius
          ),
          order: Sequelize.literal('distance ASC') // Order by nearest first
        });

        return data;
      } catch (error) {
        return error;
      }
    };
    static async getSingleProperty(whereClause, attributes) {
      try {
        let att = attributes ?? { exclude: ["is_active", "is_deleted", "created_at", "updated_at"] };
        const data = await tbl_properties.findOne({
          raw: true,
          where: whereClause,
          attributes: att
        });
        return data;
      } catch (error) {
        return error;
      }
    };

  }
  tbl_properties.init({
    property_id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    property_host_id:DataTypes.INTEGER(11),
    property_name: DataTypes.STRING(50),
    property_address: DataTypes.STRING(255),
    property_longitude: DataTypes.DECIMAL(11, 8),
    property_latitude: DataTypes.DECIMAL(10, 8),
    property_desc: DataTypes.TEXT({ length: "long" }),
    property_price: DataTypes.DECIMAL(10, 2),
    property_mini_price: DataTypes.DECIMAL(10, 2),
    property_city: DataTypes.STRING(50),
    property_zip: DataTypes.STRING(20),
    property_state: DataTypes.INTEGER(11),
    property_contry: DataTypes.INTEGER(11),
    property_contact: DataTypes.STRING(20),
    property_email: DataTypes.STRING(50),
    is_active: DataTypes.TINYINT(1),
    is_deleted: DataTypes.TINYINT(1),
  }, {
    sequelize,
    modelName: 'tbl_properties',
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    indexes: [
      {
        fields: ['property_longitude', 'property_latitude'], // Indexing for faster geolocation queries
      }
    ]
  });
  return tbl_properties;
};
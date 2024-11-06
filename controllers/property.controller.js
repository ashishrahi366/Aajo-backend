const model = require("../models");
const common = require("../utils/common");
const methods = require("../utils/methods");
const commonConfig = require("../config/moduleConfigs")



const getProperties = async (req, res) => {
    const { Sequelize } = require('sequelize');
    try {
        const { latitude, longitude } = req.body;
        const userLat = parseFloat(latitude);
        const userLng = parseFloat(longitude);
        const kmRadius = req.body.radius ? req.body.radius : 5
        const data = await model.tbl_properties.getPropertiesBylangLat(latitude, longitude, kmRadius);
        if (data.length == 0) {
            return common.response(res, 200, true, "no record found");
        }
        return common.response(res, 200, true, "successful", data);
    } catch (error) {
        return common.response(res, 400, false, error.message);
    }
};

const getProprty = async (req, res) => {
    try {
        const propId = req.params.propId;
        let whereClause = {
            is_active: 1,
            is_deleted: 0,
            property_id: propId,
        }
        const property = await model.tbl_properties.getSingleProperty(whereClause);
        return common.response(res, 200, true, "success", property);
    } catch (error) {
        console.log(error)
        return common.response(res, 400, false, error.message);
    }
};
//host_cotroller
const addProperty = (req, res) => {
    try {
        const reqData = { ...req.body };

    } catch (error) {
        return common.response(res, 400, false, error.message);
    }
};  




module.exports = {
    // addProperty,
    getProperties,
    getProprty
}
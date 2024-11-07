const model = require("../models");
const common = require("../utils/common");
const methods = require("../utils/methods");
const moduleConfig = require("../config/moduleConfigs");




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
        const payload = {
            property_name: reqData.property_name,
            property_address: reqData.property_address,
            property_longitude: reqData.property_longitude,
            property_latitude: reqData.property_latitude,
            property_city: reqData.property_city,
            property_state: reqData.property_state,
            property_contry: reqData.property_contry,
            property_desc: reqData.property_desc,
            property_price: reqData.property_price,
            property_mini_price: reqData.property_mini_price,
            property_contact: reqData.property_contact,
            property_email: reqData.property_email,
        };
    } catch (error) {
        console.log(error   )
        return common.response(res, 400, false, error.message);
    }
};

//
const countries = async (req, res) => {
    try {
        return common.response(res, 200, true, "success", moduleConfig.countries);
        // const data;
    } catch (error) {
        return common.response(res, 400, false, error.message);
    }
};
const states = async (req, res) => {
    try {
        return common.response(res, 200, true, "success", moduleConfig.state);
    } catch (error) {
        return common.response(res, 400, false, error.message);
    }
}

module.exports = {
    addProperty,
    getProperties,
    getProprty,
    countries,
    states
}
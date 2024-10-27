const model = require("../models");
const common = require("../utils/common");
const methods = require("../utils/methods");
const commonConfig = require("../config/moduleConfigs")


const createUser = async (req, res) => {
    try {
        const reqData = { ...req.body };
        const hashedPassword = await methods.hashPassword(reqData.user_password);
        const payload = {
            user_fname: reqData.user_fname,
            user_lname: reqData.user_lname,
            user_username: reqData.user_username,
            user_email: reqData.user_email,
            user_password: hashedPassword,
            user_pnumber: reqData.user_pnumber,
            user_address: reqData.user_address,
            user_city: reqData.user_city,
            user_zipcode: reqData.user_zipcode,
        };
        let addUser = await model.tbl_user.createUser(payload);
        let userId = addUser.dataValues.user_id;
        if (req.file) {
            await model.tbl_attachments.handleSingle(req.file, userId, commonConfig.user_image_type);
        }
        return common.response(res, 201, true, "success");
    } catch (error) {
        return common.response(res, 400, false, error.message);
    }
};
const updateUser = async (req, res) => {
    try {
        const reqData = { ...req.body };
        const payload = {
            user_fname: reqData.user_fname,
            user_lname: reqData.user_lname,
            user_pnumber: reqData.user_pnumber,
            user_address: reqData.user_address,
            user_city: reqData.user_city,
            user_zipcode: reqData.user_zipcode
        }
        await model.tbl_user.updateUser(payload);
        return common.response(res, 200, true, "success");
    } catch (error) {
        return common.response(res, 400, false, error.message);
    }
};
const loginUser = async (req, res) => {
    const bcrypt = require('bcrypt');
    try {
        const reqData = { ...req.body };
        let whereClause = {
            user_email: reqData.user_email,
            user_isActive: 1,
            user_isDelete: 0,
        }
        let findUser = await model.tbl_user.findUser(whereClause);
        if (findUser === null) {
            return common.response(res, 200, true, "no record found");
        }
        const isMatch = await bcrypt.compare(reqData.user_password, findUser.user_password);
        if (!isMatch) {
            return common.response(res, 400, false, "incorrect password");
        }
        delete findUser.user_password;
        const token = await methods.genrateToken({ userId: findUser.user_id, email: findUser.user_email });
        return common.response(res, 200, true, "success", { user: findUser, token: token });
    } catch (error) {
        return common.response(res, 400, false, error.message);
    }
}

module.exports = {
    createUser,
    updateUser,
    loginUser
}
const model = require("../models");
const common = require("../utils/common");
const methods = require("../utils/methods")


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
        await model.tbl_user.createUser(payload);
        return common.response(res, 201, true, "success");
    } catch (error) {
        return common.response(res, 400, false, error.message);
    }
};

module.exports = {
    createUser
}
const model = require("../models");
const common = require("../utils/common");
const methods = require("../utils/methods");
const commonConfig = require("../config/moduleConfigs")


const createUser = async (req, res) => {
    try {
        const reqData = { ...req.body };
        let findUser;
        let isHost = 0;
        if (reqData.user_isHost == true) {
            isHost = 1;
            findUser = await model.tbl_user_cred.findUser({ cred_user_email: reqData.user_email, cred_user_isHost: isHost });
        } else {
            findUser = await model.tbl_user_cred.findUser({ cred_user_email: reqData.user_email });
        }
        if (findUser !== null) {
            return common.response(res, 400, false, "user already exist");
        };
        if (reqData.user_password !== reqData.user_confirmPassword) {
            return common.response(res, 400, false, "password & confirm password is not match");
        }
        const hashedPassword = await methods.hashPassword(reqData.user_password);
        const payload = {
            user_fullName: reqData.user_fullName,
            user_dob: reqData.user_dob,
            user_pnumber: reqData.user_pnumber,
            user_address: reqData.user_address,
            user_isHost: isHost,
            user_city: reqData.user_city ? reqData.user_city : "null",
            user_zipcode: reqData.user_zipcode ? reqData.user_zipcode : "null",
        };
        let addUser = await model.tbl_user.createUser(payload);
        let userId = addUser.dataValues.user_id;
        let credPayload = {
            cred_user_id: userId,
            cred_username: reqData.user_username,
            cred_user_email: reqData.user_email,
            cred_user_password: hashedPassword,
            cred_user_doc_type: reqData.doc_type,
            cred_user_doc_number: reqData.doc_number,
            cred_user_refrel: reqData.user_ref ? reqData.user_ref : 0,
            cred_user_isHost: isHost
        };
        await model.tbl_user_cred.createCredUser(credPayload);
        if (req.file) {
            await model.tbl_attachments.handleSingle(req.file, userId, commonConfig.id_document_image_type);
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
            user_fullName: reqData.user_fullName,
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
};
const deleteProfilePicture = async (req, res) => {
    try {
        const reqData = { ...req.body };
        const deleteImage = await model.tbl_attachments.deleteAttachment(reqData.user_id, commonConfig.user_image_type);
        return common.response(res, 200, true, "image delete successfully");
    } catch (error) {
        return common.response(res, 400, false, error.message);
    }
};
const addProfilePic = async (req, res) => {
    try {
        const reqData = { ...req.body };
        if (!req.file) {
            return common.response(res, 400, false, "image is required");
        }
        await model.tbl_attachments.handleSingle(req.file, reqData.user_id, commonConfig.user_image_type);
        return common.response(res, 200, true, "success");
    } catch (error) {
        return common.response(res, 400, false, error.message);
    }
};


module.exports = {
    createUser,
    updateUser,
    loginUser,
    deleteProfilePicture,
    addProfilePic
}


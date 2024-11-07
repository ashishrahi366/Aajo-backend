const jwt = require('jsonwebtoken');
const common = require("../utils/common");
const commonConfig = require("../config/commonConfig");

exports.authenticateJWT = async (req, res, next) => {
    try {
        const token = req.headers['authorization'];
        if (!token) {
            return common.response(res, 400, false, "token is required");
        }
        const actualToken = token.split(' ')[1];
        const decoded = jwt.verify(actualToken, commonConfig.JWT_SECRET);
        if (!decoded) {
            return common.response(res, 400, false, "token expired");
        }
        req.user = decoded;
        next();
    } catch (error) {
        return common.response(res, 400, false, error.message, error.errors);
    }
};
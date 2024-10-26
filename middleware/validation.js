const common = require("../utils/common");
const validation = (schema) => {
    return async (req, res, next) => {
        try {
            await schema.validate(req.body, { abortEarly: false });
            next();
        } catch (error) {
            console.log(error)
            return common.response(res, 422 , false, error.message, error.errors);   
        }
    }
};
module.exports = validation;    
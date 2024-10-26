
const response = (res, status, success, message, data = []) => {
    return res.status(status).json({ success: success, message: message, data: data });
};


module.exports = {
    response
}
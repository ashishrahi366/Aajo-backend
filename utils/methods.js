const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    } catch (error) {
        return error;
    }
};
const genrateToken = async (data) => {
    try {
        const token = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '24h' });
        return token;
    } catch (error) {
        return error;
    }
};

module.exports = {
    hashPassword,
    genrateToken
}
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require('path');
const fs = require("fs");
require('dotenv').config();

const app = express();
process.env.TZ = 'Asia/Calcutta';
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("uploads"));
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    methods: "GET,POST,DELETE",
    optionsSuccessStatus: 204,
    maxAge: 10800
}));
// app.use('/uploads/admin_dashboard', express.static(path.join(__dirname, 'uploads')));
var routePath = path.resolve(__dirname) + "/routes/"; //add one folder then put your route files there my router folder name is routers
fs.readdirSync(routePath).forEach(function (file) {
    const route = require(routePath + file);
    app.use(route);
});
app.listen(process.env.PORT, () => {
    console.log(`Server in running on http://localhost:${process.env.PORT}`);
});

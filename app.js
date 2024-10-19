const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require('path');
const fs = require("fs");
const { ApolloServer } = require('apollo-server-express');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const http = require('http');
const WebSocket = require('ws');
require('dotenv').config();

// const db =   

const app = express();
process.env.TZ = 'Asia/Calcutta';
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("uploads"));
app.use(cors({
    origin: "*",
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
const httpServer = http.createServer(app);
const wss = new WebSocket.Server({ server: httpServer });
wss.on('connection', (ws) => {
    console.log('New WebSocket connection');
    
    ws.on('message', (message) => {
        console.log(`Received: ${message}`);
        ws.send('Message received');
    });

    ws.send('Welcome to the WebSocket server');
});
httpServer.listen(process.env.PORT, () => {    
    console.log(`Server in running on http://localhost:${process.env.PORT}`);
});

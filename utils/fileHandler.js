const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {

        const folderName = file.fieldname;
        const dir = `./uploads/${folderName}`;

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        const currentDate = new Date().toISOString().split('T')[0]
        const newFileName = `${currentDate}-${file.originalname}`;
        cb(null, newFileName);
    }
});

exports.upload = multer({ storage: storage });
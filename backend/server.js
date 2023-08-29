require('dotenv').config();
const express = require("express");
const mongoose = require('mongoose');


const app = express();

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})

// Routes
 

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('db online on port', process.env.PORT)
        })
    })
    .catch(e => {
        console.log(e);
    })
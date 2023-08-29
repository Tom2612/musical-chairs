require('dotenv').config();
const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');
const concertRouter = require('./routes/concerts');


const app = express();

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})

// Routes
app.use('/api/concerts', concertRouter);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('db online on port', process.env.PORT)
        })
    })
    .catch(e => {
        console.log(e);
    })
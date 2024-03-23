import 'dotenv/config';
import express from "express";
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

app.use('*', (req, res) => {
    res.json({ error: "Not found" }).status(400)
})

export default app
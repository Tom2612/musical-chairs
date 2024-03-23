import 'dotenv/config';
import express from "express";
const cors = require('cors');
import router from './routes/api';

const app = express();

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
    console.log(req.method, req.path);
    next();
})

// Routes
app.use('/api', router);

app.use('*', (req, res) => {
    res.json({ error: "Not found" }).status(404)
})

export default app
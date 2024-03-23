import 'dotenv/config';
import express from "express";
const cors = require('cors');
import router from './routes/api';

const app = express();

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})

// Routes
app.use('/api', router);

app.use('*', (req, res) => {
    res.json({ error: "Not found" }).status(400)
})

export default app
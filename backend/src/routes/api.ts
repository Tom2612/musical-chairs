import { Router } from "express";
import concertRouter from "./concertRouter";
import chairRouter from "./chairRouter";
const router = Router();

router.use('/concerts', concertRouter);
router.use('/chair', chairRouter);

export default router;
import { Router } from "express";
import concertRouter from "./concertRouter";
const router = Router();

router.use('/concert', concertRouter);
// router.use('/chair', chairRouter);

export default router;
import { Request, Response, Router } from "express";
import { getConcerts } from '../controllers/concertControllers';
const router = Router();

router.route('/')
    .get(getConcerts)

export default router
import { Request, Response, Router } from "express";
const router = Router();

router.route('/')
    .get(getConcerts)

export default router
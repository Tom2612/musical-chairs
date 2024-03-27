import { Router } from "express";
import { createConcert, deleteConcert, getConcert, getConcerts } from '../controllers/concertControllers';

const router = Router();

router.route('/')
    .get(getConcerts)
    
router.route('/:id')
    .get(getConcert)
    .post(createConcert) // update concert details
    .delete(deleteConcert)

// router.get('/:id/edit', getConcert)
export default router
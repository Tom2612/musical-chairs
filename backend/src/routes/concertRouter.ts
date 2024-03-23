import { Router } from "express";
import { createConcert, deleteConcert, getConcert, getConcerts } from '../controllers/concertControllers';
const router = Router();

router.route('/')
    .get(getConcerts)
    .post(createConcert)
    
router.route('/:id')
    .get(getConcert)
    // .post(updateConcert) // update concert details
    .delete(deleteConcert)

router.get('/:id/edit', getConcert)
export default router
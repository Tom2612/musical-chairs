import { Router } from "express";
import { createChair, deleteChair, getChair, getChairs } from '../controllers/chairController';

const router = Router();

router.route('/')
    .get(getChairs)
    
router.route('/:id')
    .get(getChair)
    .post(createChair)
    .delete(deleteChair)

export default router
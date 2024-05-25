import { Request, Response } from 'express'
import mongoose from "mongoose";
import Chair from '../models/chair.model'

// get all chairs
export const getChairs = async (req:Request, res:Response) => {
    const chairs = await Chair.find();

    res.status(200).json(chairs);
}

// get one chair
export const getChair = async (req:Request, res:Response) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        console.log('Not a valid ID');
        return res.status(404).json({error: "No such chair"})
    }

    const chair = await Chair.findById(id);

    if(!chair) {
        res.status(404).json({error: 'Chair not found'})
    }

    res.status(200).json(chair);
}

// create chair
export const createChair = async (req:Request, res:Response) => {
    try {
        console.log(req.body)
        const chair = await Chair.create(req.body);
        res.status(200).json({ message: 'success' });
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}

// update chair

//delete chair
export const deleteChair = async (req:Request, res:Response) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such chair'});
    }

    const chair = await Chair.findByIdAndDelete(id);

    if (!chair) {
        return res.status(404).json({error: 'No such chair'});
    }

    res.status(200).json(chair);
}
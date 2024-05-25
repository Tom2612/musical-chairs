import { Request, Response } from 'express'
import mongoose from "mongoose";
import Concert from '../models/concert.model'
import Chair from '../models/chair.model';

// get all concerts
export const getConcerts = async (req:Request, res:Response) => {
    const concerts = await Concert.find();
    res.status(200).json(concerts);
}

// get one concert
export const getConcert = async (req:Request, res:Response) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        console.log('Not a valid ID');
        return res.status(404).json({error: "No such concert"})
    }

    const concert = await Concert.findById(id);
    const chairs = await Chair.find({ concert: id })

    if(!concert) {
        res.status(404).json({error: 'Concert not found'})
    }

    res.status(200).json({ concert, chairs });
}

// create concert
export const createConcert = async (req:Request, res:Response) => {
    console.log(req.params.id, req.body)
    if (req.params.id === 'new') {
        try {
            const concert = await Concert.create(req.body.concert);
            return res.status(200).json({ message: concert._id });
        } catch (error) {
            return res.status(400).json({error: error.message})
        }
    } else {
        try {
            await Concert.findByIdAndUpdate(req.params.id, req.body);
            return res.status(200).json({ message: 'success' })
        } catch (error) {
            return res.status(400).json({error: error.message})
        }
    }

}

// update concert

//delete concert
export const deleteConcert = async (req:Request, res:Response) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such concert'});
    }

    const concert = await Concert.findByIdAndDelete(id);

    if (!concert) {
        return res.status(404).json({error: 'No such concert'});
    }

    res.status(200).json(concert);
}
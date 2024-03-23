import mongoose from "mongoose";
import Concert from '../models/concert.model'

// get all concerts
export const getConcerts = async (req, res) => {
    const concerts = await Concert.find();

    res.status(200).json(concerts);
}

// get one concert
export const getConcert = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        console.log('Not a valid ID');
        return res.status(404).json({error: "No such concert"})
    }

    const concert = await Concert.findById(id);

    if(!concert) {
        res.status(404).json({error: 'Concert not found'})
    }

    res.status(200).json(concert);
}

// create concert
export const createConcert = async (req, res) => {
    try {
        const concert = await Concert.create(req.body);
        res.status(200).json(concert);
    } catch (error) {
        res.status(400).json({error: error.message})
    }

}

// update concert

//delete concert
export const deleteConcert = async (req, res) => {
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
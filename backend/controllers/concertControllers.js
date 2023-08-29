const mongoose = require('mongoose');
const Concert = require('../models/concertModel');

// get all concerts
module.exports.getConcerts = async (req, res) => {
    const concerts = await Concert.find({});

    res.status(200).json(concerts);
}

// get one concert
module.exports.getConcert = async (req, res) => {
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
module.exports.createConcert = async (req, res) => {

    const newConcert = {
        date: new Date(req.body.date),
        location: req.body.location,
        payStatus: req.body.payStatus,
        pieces: req.body.pieces,
        instruments: req.body.instruments
    }

    try {
        const concert = await Concert.create(newConcert);
        res.status(200).json(concert);
    } catch (error) {
        res.status(400).json({error: error.message})
    }

}

// update concert

//delete concert


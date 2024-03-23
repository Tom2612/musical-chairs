const mongoose = require('mongoose');

const Schema = mongoose.Schema;

interface IPieces {
    composer: string
    title: string
}

interface IConcert {
    date: Date
    location: string
    payStatus: boolean
    pieces: IPieces[]
    instruments: string[]
    active: boolean
    createdAt: Date
    updatedAt: Date
    _id: string
}

const concertSchema = new Schema({
    // group: { type: Schema.Types.ObjectId, ref: 'Group' },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    payStatus: { type: Boolean, required: true },
    pieces: [{ composer: String, title: String }],
    instruments: { type: Array },
    active: { type: Boolean, required: true, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Concert', concertSchema);
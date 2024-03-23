import { Schema, Model } from 'mongoose';

interface IChair {
    _id: string
    instrument: string
    level: string
    concert: IConcert
}

const level = ['beginner', 'intermediate', 'advanced', 'semi-professional', 'professional']

const chairSchema = new Schema<IChair>({
    instrument: String,
    level: { type: String, enum: level },
    concert: { type: Schema.Types.ObjectId, ref: 'concert'}
}, { timestamps: true })

const Chair = new Model('Chair', chairSchema)
module.exports = Chair
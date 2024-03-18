import { Schema, Model } from 'mongoose';

enum LEVEL {
    beginner = 'beginner',
    intermediate = 'intermediate',
    advanced = 'advanced',
    semiPro = 'semi-professional',
    pro = 'professional',
}

interface IPiece {
    composer: string
    title: string
}

interface IChair {
    _id: string
    instrument: string
    level: 'beginner' | 'intermediate' | 'advanced' | 'semi-professional' | 'professional'
    pieces: IPiece[]
}

const chairSchema = new Schema<IChair>({
    instrument: String,
    level: { type: String, enum: ['beginner' || 'intermediate' || 'advanced' || 'semi-professional' || 'professional'] },
    pieces: Object,
}, { timestamps: true })

const Chair = new Model('Chair', chairSchema)
module.exports = Chair
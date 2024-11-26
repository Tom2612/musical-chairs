import { Schema, model } from 'mongoose';
import { IConcert } from './concert.model'

export enum Level {
    Beginner = 'beginner',
    Intermediate = 'intermediate',
    Advanced = 'advanced',
    SemiProfessional = 'semi-professional',
    Professional = 'professional'
}

export interface IChair {
    _id: string
    instrument: string
    level?: Level
    grade?: string
    concert: IConcert
}

const chairSchema = new Schema<IChair>({
    instrument: String,
    level: { type: String, enum: Object.values(Level) },
    concert: { type: Schema.Types.ObjectId, ref: 'concert'}
}, { timestamps: true })

const Chair = model<IChair>('Chair', chairSchema)
export default Chair
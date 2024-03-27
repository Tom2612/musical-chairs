import { Schema, model } from "mongoose";
import { IChair } from "./chair.model";

export interface IPiece {
    composer: string
    title: string
}

export interface IConcert {
    date: string
    location: string
    payStatus: string
    pieces: IPiece[]
    instruments: IChair[]
    active: boolean
    createdAt: Date
    updatedAt: Date
    _id: string
}

const concertSchema = new Schema({
    // group: { type: Schema.Types.ObjectId, ref: 'Group' },
    date: { type: String, required: true },
    location: { type: String, required: true },
    payStatus: { type: String, required: true },
    pieces: [{ composer: String, title: String }],
    instruments: [{ type: Schema.Types.ObjectId, ref: 'Chair' }],
    active: { type: Boolean, required: true, default: true }
}, { timestamps: true });

const Concert = model<IConcert>('Concert', concertSchema);

export default Concert;
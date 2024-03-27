import { Schema, model } from "mongoose";
import { IChair } from "./chair.model";

export interface IPieces {
    composer: string
    title: string
}

export interface IConcert {
    date: Date
    location: string
    payStatus: boolean
    pieces: IPieces[]
    instruments: IChair[]
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
    instruments: [{ type: Schema.Types.ObjectId, ref: 'Chair' }],
    active: { type: Boolean, required: true, default: true }
}, { timestamps: true });

const Concert = model<IConcert>('Concert', concertSchema);

export default Concert;
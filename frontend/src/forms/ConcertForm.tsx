import { useEffect, useState } from "react";
import { IConcert } from '../../../backend/src/models/concert.model';
import { useParams } from "react-router-dom";
import { api } from "../utils/api";

export default function ConcertForm() {
    const [concert, setConcert] = useState<Partial<IConcert> | null>({
        date: new Date(),

    });
    const [piece, setPiece] = useState<{composer: '', title: ''}[]>([{
        composer: '',
        title: ''
    }]);
    const params = useParams();
    const id = params.id ?? 'new';

    useEffect(() => {
        id !== 'new' && api<IConcert>(`api/${id}`).then(res => setConcert(res.data ?? null));
    },[id]);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setConcert({
            ...concert,
            [e.target.name]: e.target.value
        })
    };

    const handleChangePiece = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPiece({
            ...piece,
            [e.target.name]: e.target.value
        })
    };

    const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    }

    const handleCreateConcert = () => {
        setConcert({
            ...concert,
            pieces: {...piece},
            instruments: instruments
        })
    }

    return (
        <form>
            <input 
                type='date' 
                name='date'
                value={concert.date}
                min={new Date().toISOString().split('T')[0]}
                onChange={handleChange}
            />
            <input 
                type='text' 
                name='location'
                value={concert.location}
                onChange={handleChange}
            />
            <select
                name='finance'
                value={concert.payStatus}
                onChange={handleChange}
            >
                <option>Paid + Travel</option>
                <option>Paid</option>
                <option>Travel</option>
                <option>Negotiable</option>
                <option>None</option>
            </select>
            <input 
                type='text'
                name='composer'
                value={piece.composer}
                onChange={handleChangePiece}
            />
            <input 
                type='text'
                name='title'
                value={piece.title}
                onChange={handleChangePiece}
            />            
            <button onClick={handleCreateConcert}>Create Concert</button>
        </form>
    )
}
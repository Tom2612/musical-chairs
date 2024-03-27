import { useEffect, useState } from "react";
import { IConcert, IPiece } from '../../../backend/src/models/concert.model';
import { useParams } from "react-router-dom";
import { api } from "../utils/api";

export default function ConcertForm() {
    const [concert, setConcert] = useState<Partial<IConcert>>({
        date: '',
        location: '',
        payStatus: 'none',
        pieces: [],
    });
    const [piece, setPiece] = useState<IPiece>({
        composer: '',
        title: ''
    });
    const [step, setStep] = useState(1);
    const params = useParams();
    const id = params.id ?? 'new';

    useEffect(() => {
        id !== 'new' && api<IConcert>(`api/${id}`).then(res => setConcert(res.data ?? {
        date: '',
        location: '',
        payStatus: 'none',
        pieces: [],
    }));

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

    const handleCreateConcert = () => {
        setConcert({
            ...concert,
            pieces: {...piece},
        })
    }

    return (
        <form>
            {step === 1 && <div>
                <h2>Step 1 - Concert Information</h2>
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
                    <option value='paidAndTravel'>Paid + Travel</option>
                    <option value='paid'>Paid</option>
                    <option value='travel'>Travel</option>
                    <option value='negotiable'>Negotiable</option>
                    <option value='none'>None</option>
                </select>
                <button onClick={() => setStep(2)}>Next step</button>
            </div>}
            {step === 2 && <div>
                <h2>Step 2 - What pieces are being played?</h2>
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
            </div>}
            <button onClick={handleCreateConcert}>Create Concert</button>
        </form>
    )
}
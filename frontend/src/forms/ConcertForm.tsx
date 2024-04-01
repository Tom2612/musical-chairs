import { useEffect, useState } from "react";
import { IConcert, IPiece } from '../../../backend/src/models/concert.model';
import { useNavigate, useParams } from "react-router-dom";
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
    const [pieces, setPieces] = useState<IPiece[]>([]);
    const [step, setStep] = useState(1);
    const navigate = useNavigate();
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

    useEffect(() => {
        console.log(concert)
    }, [concert])

    useEffect(() => {
        console.log(pieces)
    }, [pieces])

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

    const handleAddPiece = () => {
        setPieces(pieces.concat(piece))
        setPiece({ composer: '', title: '' })
    }

    const handleCreateConcert = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        setConcert({
            ...concert,
            pieces,
        })
        api(`concerts/${id}`, concert);
        navigate('/');
    }

    const handleRemovePiece = (index: number) => {
        setPieces(pieces.filter((p, i) => i !== index))
    }

    return (
        <form>
            {step === 1 && <div>
                <h2>Step 1 - Concert Information</h2>
                <label htmlFor="date">Date of concert</label>
                <input 
                    type='date' 
                    name='date'
                    value={concert.date}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={handleChange}
                />
                <label htmlFor="location">Location of concert</label>
                <input 
                    type='text' 
                    name='location'
                    value={concert.location}
                    onChange={handleChange}
                />
                <label htmlFor="payStatus">Financial</label>
                <select
                    name='payStatus'
                    value={concert.payStatus}
                    onChange={handleChange}
                >
                    <option value='paidAndTravel'>Paid + Travel</option>
                    <option value='paid'>Paid</option>
                    <option value='travel'>Travel</option>
                    <option value='negotiable'>Negotiable</option>
                    <option value='none'>None</option>
                </select>
                <button type="button" onClick={() => setStep(2)}>Next</button>
            </div>}

            {step === 2 && 
                <div>
                    <h2>Step 2 - What pieces are being played?</h2>
                    <label htmlFor="composer">Composer</label>
                    <input 
                        type='text'
                        name='composer'
                        value={piece.composer}
                        onChange={handleChangePiece}
                    />
                    <label htmlFor="title">Title</label>
                    <input 
                        type='text'
                        name='title'
                        value={piece.title}
                        onChange={handleChangePiece}
                    />
                    <button type="button" onClick={handleAddPiece}>Add piece</button>
                    <div>
                        {pieces.map((piece, index) => (
                            <div key={index}>
                                <h3 className="font-bold">{piece.composer}</h3>
                                <h3>{piece.title}</h3>
                                <p className="underline cursor-pointer" onClick={() => handleRemovePiece(index)}>remove</p>
                            </div>
                        ))}
                    </div>   
                    <button onClick={() => setStep(1)}>Back</button>
                    <button onClick={(e) => handleCreateConcert(e)}>Create Concert</button>
                </div>
            }
        </form>
    )
}
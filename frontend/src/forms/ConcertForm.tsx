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
        <form className="p-10 rounded shadow flex flex-col space-y-5">
            <h1 className="font-bold text-2xl">Create Concert</h1>
            {step === 1 && 
                <>
                    <h2>Step 1 - Concert Information</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="w-full flex flex-col items-start justify-start">
                            <label className="font-semibold text-sm" htmlFor="date">Date of concert</label>
                            <input 
                                className="w-full border rounded p-1 focus-within:outline-blue-500"
                                type='date' 
                                name='date'
                                value={concert.date}
                                min={new Date().toISOString().split('T')[0]}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="w-full flex flex-col items-start justify-start">
                            <label className="font-semibold text-sm" htmlFor="location">Location of concert</label>
                            <input 
                                className="w-full border rounded p-1 focus-within:outline-blue-500"
                                type='text' 
                                name='location'
                                value={concert.location}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="flex justify-between">
                        <div className="flex flex-col items-start justify-start">
                            <label className="font-semibold text-sm" htmlFor="payStatus">Financial</label>
                            <select
                                className="w-full border rounded p-1 focus-within:outline-blue-500"
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
                        </div>
                        <button className="bg-blue-500 px-5 py-1 h-fit self-center hover:bg-blue-600 rounded font-bold text-white" type="button" onClick={() => setStep(2)}>Next</button>
                    </div>
                </>
            }

            {step === 2 && 
                <>
                    <h2>Step 2 - What pieces are being played?</h2>
                    <div className="flex space-x-4 items-end">
                        <div className="flex-1 w-full flex flex-col items-start justify-start">
                            <label className="font-semibold text-sm" htmlFor="composer">Composer</label>
                            <input
                                className="w-full border rounded p-1 focus-within:outline-blue-500"
                                type='text'
                                name='composer'
                                value={piece.composer}
                                onChange={handleChangePiece}
                            />
                        </div>
                        <div className="flex-1 w-full flex flex-col items-start justify-start">
                            <label className="font-semibold text-sm" htmlFor="title">Title</label>
                            <input 
                                className="w-full border rounded p-1 focus-within:outline-blue-500"
                                type='text'
                                name='title'
                                value={piece.title}
                                onChange={handleChangePiece}
                            />
                        </div>
                        <button className="px-5 py-1 rounded h-fit bg-blue-500 text-white font-bold hover:bg-blue-600" type="button" onClick={handleAddPiece}>Add piece</button>
                    </div>
                    <div>
                        {pieces.map((piece, index) => (
                            <div key={index}>
                                <div className="flex space-x-5 items-center">
                                    <h3 className="font-bold">{piece.composer}</h3>
                                    <h3>{piece.title}</h3>
                                    <p className="text-sm hover:font-bold cursor-pointer" onClick={() => handleRemovePiece(index)}>X</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-end space-x-5">
                        <button className="px-5 py-1 rounded h-fit bg-blue-500 text-white font-bold hover:bg-blue-600" onClick={() => setStep(1)}>Back</button>
                        <button className="px-5 py-1 rounded h-fit bg-blue-500 text-white font-bold hover:bg-blue-600" onClick={(e) => handleCreateConcert(e)}>Create Concert</button>
                    </div>
                </>
            }
        </form>
    )
}
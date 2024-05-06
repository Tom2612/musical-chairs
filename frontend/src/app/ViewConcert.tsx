import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import format from 'date-fns/format';
import { IConcert } from '../../../backend/src/models/concert.model';
import { api } from '../utils/api';
import Loading from '../components/Loading';

export default function ViewConcert () {
    const [concert, setConcert] = useState<IConcert | null>();
    const { id } = useParams();
    const navigate = useNavigate();

    const fetchConcert = async () => {
        api<IConcert>(`concerts/${id}`).then(res => {
            setConcert(res.data ?? null);
        })
    }

    useEffect(() => {
        fetchConcert();
        
    }, [id]);

    if (!concert) return <Loading />

    return (
        <div className='border border-black'>
            <div className='grid grid-cols-1 sm:grid-cols-3 gap-5 place-items-center shadow rounded-xl m-5 p-5'>
                <div className='flex space-x-3 items-center'>
                    <span className='material-symbols-outlined flex-shrink-0'>calendar_month</span>
                    <h2 className='flex-1'>{format(new Date(concert.date), 'dd/MM/yyyy')}</h2>
                </div>
                <div className='flex space-x-3 items-center'>
                    <span className='material-symbols-outlined flex-shrink-0'>location_on</span>
                    <h2 className='flex-1'>{concert.location}</h2>
                </div>
                <div className='flex space-x-3 items-center'>
                    <span className='material-symbols-outlined flex-shrink-0'>currency_pound</span>
                    <h2 className='flex-1'>{concert.payStatus}</h2>
                </div>
            </div>
            {/* <h2>{concert.group.name}</h2> */}
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
                <div className='p-5 m-5 shadow rounded-xl'>
                    {/* <h4 className='font-bold'>Playing</h4> */}
                    {concert.pieces.map(piece => {
                        return <p key={piece.composer+piece.title}><span className='font-semibold'>{piece.composer.toUpperCase()}</span> - {piece.title}</p>
                    })}
                </div>
                <div className='p-5 m-5 shadow rounded-xl'>
                    {concert.instruments.length > 0 && 
                        <>
                            <h4>Looking for:</h4>
                            {concert.instruments.map(instrument => {
                                return <li>{instrument}</li>
                            })}
                        </>
                    }
                    <button onClick={() => navigate('/chairs/new')} className='text-white font-bold mx-auto px-5 py-2 rounded bg-blue-500 hover:bg-blue-600'>{concert.instruments.length > 0 ? 'Add Chairs': 'Start adding chairs'}</button>
                </div>
            </div>
        </div>
    )
}
import { useState, useEffect } from 'react';
import ConcertCard from '../components/ConcertCard';
import { IConcert } from '../../../backend/src/models/concert.model';
import { api } from '../utils/api';
import Loading from '../components/Loading';

export default function ViewAllConcerts() {

    const [concerts, setConcerts] = useState<IConcert[]>([]);
    
    const fetchConcerts = async () => {
        api<IConcert[]>('concerts').then(res => {
            setConcerts(res.data ?? []);
        })
    }

    useEffect(() => {
        fetchConcerts();
    }, []);

    if (!concerts) return <Loading />

    return (
        <div>
            <h1 className='text-3xl font-semibold'>Upcoming concerts:</h1>
            <div className='grid grid-cols-3 gap-5 py-10'>
                {concerts.map(concert => (
                    <ConcertCard key={concert._id} concert={concert} />
                ))}
            </div>
        </div>
    )
}

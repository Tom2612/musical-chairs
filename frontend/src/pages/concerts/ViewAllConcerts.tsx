import { useState, useEffect } from 'react';
import ConcertCard from './components/ConcertCard';

export interface IState {
    concerts: {
        _id: string,
        date: string,
        location: string,
        payStatus: boolean,
        pieces: {title: string, composer: string}[],
        instruments: string[],
        createdAt: string
    }[]
}

export default function ViewAllConcerts(): JSX.Element {

    const [concerts, setConcerts] = useState<IState['concerts']>([]);

    useEffect(() => {
        const fetchConcerts = async () => {
            const response = await fetch('http://localhost:3000/api/concerts/');
            const json = await response.json();

            if (response.ok) {
                setConcerts(json);
                console.log(json)
            }
        }

        fetchConcerts();
    }, []);


    return (
        <div>
            <h1>View all concerts:</h1>
            <ConcertCard concerts={concerts}/>
        </div>
    )
}

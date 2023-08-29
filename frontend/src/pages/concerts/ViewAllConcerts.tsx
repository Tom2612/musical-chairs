import { useState, useEffect } from 'react';
import Concert from './components/Concert';

export interface IState {
    concerts: {
        date: string,
        location: string,
        payStatus: boolean,
        pieces: {title: string, composer: string}[],
        instruments: string[]
    }[]
}

export default function ViewAllConcerts(): JSX.Element {

    const [concerts, setConcerts] = useState<IState['concerts']>();

    useEffect(() => {
        const fetchConcerts = async () => {
            const response = await fetch('http://localhost:4000/api/concerts/');
            const json = await response.json();

            if (response.ok) {
                setConcerts(json);
            }
        }

        fetchConcerts();
    }, []);


    return (
        <div>
            View all concerts:
            <Concert concerts={concerts}/>
        </div>
    )
}

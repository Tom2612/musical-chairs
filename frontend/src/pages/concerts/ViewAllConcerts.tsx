import { useState, useEffect } from 'react';

interface IState {
    concert: {
        date: string,
        location: string,
        payStatus: boolean,
        pieces: object[],
        instruments: string[]
    }[]
}

export default function ViewAllConcerts(): JSX.Element {

    const [concerts, setConcerts] = useState<IState>();

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
            View all concerts
        </div>
    )
}

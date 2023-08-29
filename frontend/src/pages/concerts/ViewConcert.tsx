import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { IState as Props } from "./ViewAllConcerts";

interface IProps {
    concerts: Props['concerts']
}

const ViewConcert = (): JSX.Element => {
    const [concert, setConcert] = useState<IProps['concerts']>([]);
    const { id } = useParams();

    useEffect(() => {
        const fetchConcert = async () => {
            const response = await fetch(`http://localhost:4000/api/concerts/${id}`);
            const json = await response.json();

            setConcert(json);
            console.log(json);
        }

        fetchConcert();
        
    }, [id]);

    return (
        <div>
            Hello
        </div>
    )
}

export default ViewConcert
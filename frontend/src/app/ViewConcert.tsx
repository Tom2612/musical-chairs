import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import format from 'date-fns/format';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const ViewConcert = (): JSX.Element => {
    const [concert, setConcert] = useState({createdAt:'',location:'', date:'',pieces:[{composer:'', title:''}],instruments:[]});
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        const fetchConcert = async () => {
            const response = await fetch(`http://localhost:3000/api/concerts/${id}`);
            const json = await response.json();

            setConcert(json);
            setLoading(false);
            console.log(json);
        }

        fetchConcert();
        
    }, [id]);

    return (
        <>
            {!loading && 
                <div>
                    <strong>Posted: </strong><p>{formatDistanceToNow(new Date(concert.createdAt), {addSuffix: true})}</p>
                    {/* <h2>{concert.group.name}</h2> */}
                    <h3>Location: {concert.location}</h3>
                    <h3>Date: {format(new Date(concert.date), 'PP')}</h3>
                    <div>
                        <div>
                            <ul>
                                <h4>Programme:</h4>
                                {concert.pieces.map(piece => {
                                    return <li>{piece.composer}, {piece.title}</li>
                                })}
                            </ul>
                        </div>
                        <div>
                            <ul>
                                <h4>Looking for:</h4>
                                {concert.instruments.map(instrument => {
                                    return <li>{instrument}</li>
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default ViewConcert
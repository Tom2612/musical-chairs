import { useState } from "react";

const NewConcertForm = () => {
    const [concert, setConcert] = useState({
        date: '',
        location: '',
        payStatus: '',
        instruments: []
    });
    const [piece, setPiece] = useState({
        composer: '',
        title: ''
    });
    const [instruments, setInstruments] = useState([]);

    return (
        <div>
            <input 
                type='date' 
                name='date'
                value={concert.date}
                min={new Date().toISOString().split('T')[0]}
            />
            <input 
                type='text' 
                name='location'
                value={concert.location}
            />
            <select
                name='finance'
                value={concert.payStatus}
            >
                <option>Paid + Travel</option>
                <option>Paid</option>
                <option>Travel</option>
                <option>Negotiable</option>
                <option>None</option>
            </select>
            <input 
                type='text'
                name='composer'
                value={piece.composer}
            />
            <input 
                type='text'
                name='title'
                value={piece.title}
            />
            <input 
                type='text'
                name='instruments'
                value={concert.instruments}
            />
        </div>
    )
}

export default NewConcertForm;
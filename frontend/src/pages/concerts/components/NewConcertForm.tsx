import { useState } from "react";

interface concert {
    date: string,
    location: string,
    payStatus: string,
    instruments: string[],
    pieces: {composer: string, title: string}[]
}

const NewConcertForm = () => {
    const [concert, setConcert] = useState<concert>({
        date: '',
        location: '',
        payStatus: '',
        instruments: [],
        pieces: []
    });

    const [piece, setPiece] = useState<{composer: '', title: ''}[]>([{
        composer: '',
        title: ''
    }]);
    const [instruments, setInstruments] = useState<string[]>([]);
    const [value, setValue] = useState('');

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

    const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    }

    const handleAddInstrument = () => {
        setInstruments([
            ...instruments,
            value
        ]);
        setValue('');
    };

    const handleCreateConcert = () => {
        setConcert({
            ...concert,
            pieces: {...piece},
            instruments: instruments
        })
    }

    return (
        <form>
            <input 
                type='date' 
                name='date'
                value={concert.date}
                min={new Date().toISOString().split('T')[0]}
                onChange={handleChange}
            />
            <input 
                type='text' 
                name='location'
                value={concert.location}
                onChange={handleChange}
            />
            <select
                name='finance'
                value={concert.payStatus}
                onChange={handleChange}
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
                onChange={handleChangePiece}
            />
            <input 
                type='text'
                name='title'
                value={piece.title}
                onChange={handleChangePiece}
            />
            <input 
                type='text'
                name='instruments'
                value={value}
                onChange={handleChangeValue}
            />
            <button onClick={handleAddInstrument}>Add</button>
            
            <button onClick={handleCreateConcert}>Create Concert</button>
        </form>
    )
}

export default NewConcertForm;
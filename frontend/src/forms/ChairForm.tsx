import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { IChair } from '../../../backend/src/models/chair.model';

export default function ChairForm() {
    const [chair, setChair] = useState<Partial<IChair>>({
        instrument: '',
        level: '',
        grade: undefined
    });
    const [selectChoice, setSelectChoice] = useState(true);
    const params = useParams();
    const { id } = params;

    const levels = [
      "beginner",
      "intermediate",
      "advanced",
      "semi-professional",
      "professional",
    ];

    useEffect(() => {
        console.log(chair)
    },[chair])

    const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
      setChair({
        ...chair,
        [e.target.name]: e.target.value,
      });
    };

    return (
        <form>
            <h2>{id === 'new' ? 'Add' : 'Edit'} Chair</h2>
            <label htmlFor='instrument'>Instrument</label>
            <input type='text' name='instrument' value={chair.instrument} onChange={handleChange} />
            {selectChoice && 
                <>
                    <label htmlFor='level'>Level</label>
                    <select name='level' value={chair.level} onChange={handleChange}>
                        <option value=''>-----</option>
                        {levels.map(level => (
                            <option value={level}>{level}</option>
                        ))}
                    </select>
                </>
            }
            {!selectChoice && 
                <>
                    <label htmlFor='grade'>Grade</label>
                    <select name='grade' value={chair.grade} onChange={handleChange}>
                        <option value=''>-----</option>
                        {Array.from({ length: 8 }, (_, index) => (
                            <option key={8 - index} value={8 - index}>{8 - index}+</option>
                        ))}
                    </select>
                </>
            }
        </form>
    )
}

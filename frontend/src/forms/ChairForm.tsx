import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { IChair } from '../../../backend/src/models/chair.model';
import { api } from '../utils/api';
import { IConcert } from '../../../backend/src/models/concert.model';

export default function ChairForm({ concert }: { concert: IConcert }) {
    const [chair, setChair] = useState<Partial<IChair>>({
        instrument: '',
        level: '',
        grade: undefined,
        concert: concert._id,
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

    useEffect(() => {
        setChair({ ...chair, grade: undefined, level: ''})
    },[selectChoice])

    const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
      setChair({
        ...chair,
        [e.target.name]: e.target.value,
      });
    };

    const handleSubmit = () => {
        api(`chair/${id}`, chair)
    }

    return (
      <form className='border border-red-500 grid grid-cols-2'>
        <div className='flex flex-col'>
            <label htmlFor="instrument">Instrument</label>
            <input
                type="text"
                name="instrument"
                value={chair.instrument}
                onChange={handleChange}
            />
        </div>
        <div className='flex flex-col'>
          <label
            htmlFor={selectChoice ? "level" : "grade"}
            onClick={() => setSelectChoice(!selectChoice)}
          >
            {selectChoice ? "Level" : "Grade"}
          </label>
          <select
            name={selectChoice ? "level" : "grade"}
            value={selectChoice ? chair.level : chair.grade}
            onChange={handleChange}
          >
            <option value="">-----</option>
            {selectChoice
              ? levels.map((level) => <option key={level} value={level}>{level}</option>)
              : Array.from({ length: 8 }, (_, index) => (
                  <option key={8 - index} value={8 - index}>
                    {8 - index}+
                  </option>
                ))}
          </select>
          <span className='text-xs hover:underline cursor-pointer' onClick={() => setSelectChoice(!selectChoice)}>
            Prefer {selectChoice ? "grades" : "levels"}?
          </span>
        </div>
        <button type='button' onClick={handleSubmit}>Add</button>
      </form>
    );
}

import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { IChair } from '../../../backend/src/models/chair.model';
import { api } from '../utils/api';
import { IConcert } from '../../../backend/src/models/concert.model';
import Button from '../components/Button';

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
      <form className="rounded flex flex-col space-y-5 p-2 sm:p-4">
        <div className="flex flex-col">
          <label className="text-sm" htmlFor="instrument">
            Instrument<span className="text-red-500">*</span>
          </label>
          <input
            className="border border-neutral-300 rounded p-1 focus-within:outline-sky-500"
            type="text"
            name="instrument"
            value={chair.instrument}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor={selectChoice ? "level" : "grade"}
            className="text-sm"
            onClick={() => setSelectChoice(!selectChoice)}
          >
            {selectChoice ? "Level" : "Grade"}
            <span className="text-red-500">*</span>
          </label>
          <select
            className="border border-neutral-300 rounded p-1 focus-within:outline-sky-500"
            name={selectChoice ? "level" : "grade"}
            value={selectChoice ? chair.level : chair.grade}
            onChange={handleChange}
          >
            <option value="">-----</option>
            {selectChoice
              ? levels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))
              : Array.from({ length: 8 }, (_, index) => (
                  <option key={8 - index} value={8 - index}>
                    {8 - index}+
                  </option>
                ))}
          </select>
          <span
            className="text-xs hover:underline cursor-pointer"
            onClick={() => setSelectChoice(!selectChoice)}
          >
            Prefer {selectChoice ? "grades" : "levels"}?
          </span>
        </div>
        <Button type="button" onClick={handleSubmit}>
          Add
        </Button>
      </form>
    );
}

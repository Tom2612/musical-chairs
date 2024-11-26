import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { IChair, Level } from '../../../backend/src/models/chair.model';
import { api } from '../utils/api';
import { IConcert } from '../../../backend/src/models/concert.model';
import Button from '../components/Button';
import SelectField from '../components/SelectField';
import TextField from '../components/TextField';

export default function ChairForm({ concert }: { concert: IConcert }) {
    const [chair, setChair] = useState<IChair>({
        instrument: '',
        level: undefined,
        grade: undefined,
        concert: concert._id,
    });
    const [selectChoice, setSelectChoice] = useState(true);
    const params = useParams();
    const { id } = params;

    const levelOptions = [
      { label: "Select a level", value: null },
      { label: "Beginner", value: Level.Beginner },
      { label: "Intermediate", value: Level.Intermediate },
      { label: "Advanced", value: Level.Advanced },
      { label: "Semi-professional", value: Level.SemiProfessional },
      { label: "Professional", value: Level.Professional },
    ];

    useEffect(() => {
        setChair({ ...chair, grade: undefined, level: undefined })
    },[selectChoice])

    const handleChange = (
      e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
    ) => {
      const { value, name } = e.target
      setChair({
        ...chair,
        [name]: value === "" ? null : value,
      });
    };

    const handleSubmit = () => {
        api(`chair/${id}`, chair)
    }

    return (
      <form className="rounded flex flex-col space-y-5 p-2 sm:p-4">
        <div className="flex flex-col">
          <TextField 
            inputClass="w-full border border-neutral-300 rounded p-1 focus-within:outline-sky-500"
            name='instrument'
            value={chair.instrument}
            onChange={(e) => handleChange(e)}
          />
          {/* <input
            className="border border-neutral-300 rounded p-1 focus-within:outline-sky-500"
            type="text"
            name="instrument"
            value={chair.instrument}
            onChange={(e) => handleChange(e)}
          /> */}
        </div>
        <div className="flex flex-col">
          <SelectField
            name={selectChoice ? "level" : "grade"}
            value={selectChoice ? chair.level || null : chair.grade || null}
            onChange={(e) => handleChange(e)}
            options={
              selectChoice
                ? levelOptions
                : Array.from({ length: 8 }, (_, index) => ({
                    label: String(8 - index),
                    value: String(8 - index),
                  }))
            }
            inputClass="border border-neutral-300 rounded p-1 focus-within:outline-sky-500"
          />
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

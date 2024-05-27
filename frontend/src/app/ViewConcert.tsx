import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import format from 'date-fns/format';
import { IConcert } from '../../../backend/src/models/concert.model';
import { api } from '../utils/api';
import Loading from '../components/Loading';
import ChairForm from '../forms/ChairForm';
import { IChair } from '../../../backend/src/models/chair.model';
import Modal from '../components/Modal';
import Button from '../components/Button';

interface IFullConcert extends IConcert {
    chairs: IChair[]
}

export default function ViewConcert () {
    const [concert, setConcert] = useState<IFullConcert | null>();
    const [chairId, setChairId] = useState<string | null>();
    const { id } = useParams();

    const fetchConcert = async () => {
        api<{ concert: IConcert, chairs: IChair[] }>(`concerts/${id}`).then(res => {
            if (res.data) {
                console.log(res.data)
                setConcert({ ...res.data.concert, chairs: res.data.chairs } ?? null);
            }
        })
    }

    useEffect(() => {
        fetchConcert();
    }, [id]);

    if (!concert) return <Loading />

    return (
      <div className="border border-black">
        <Modal open={!!chairId} onClose={() => setChairId(null)}>
          <ChairForm concert={concert} />
        </Modal>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 place-items-center shadow rounded-xl m-5 p-5">
          <div className="flex space-x-3 items-center">
            <span className="material-symbols-outlined flex-shrink-0">
              calendar_month
            </span>
            <h2 className="flex-1">
              {format(new Date(concert.date), "dd/MM/yyyy")}
            </h2>
          </div>
          <div className="flex space-x-3 items-center">
            <span className="material-symbols-outlined flex-shrink-0">
              location_on
            </span>
            <h2 className="flex-1">{concert.location}</h2>
          </div>
          <div className="flex space-x-3 items-center">
            <span className="material-symbols-outlined flex-shrink-0">
              currency_pound
            </span>
            <h2 className="flex-1">{concert.payStatus}</h2>
          </div>
        </div>
        {/* <h2>{concert.group.name}</h2> */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="p-5 m-5 shadow rounded-xl">
            {/* <h4 className='font-bold'>Playing</h4> */}
            {concert.pieces.map((piece) => {
              return (
                <p key={piece.composer + piece.title}>
                  <span className="font-semibold">
                    {piece.composer.toUpperCase()}
                  </span>{" "}
                  - {piece.title}
                </p>
              );
            })}
          </div>
          <div className="p-5 m-5 shadow rounded-xl">
            <Button onClick={() => setChairId("new")}>Add Chairs</Button>
            {concert.chairs.map((chair) => (
              <div className="flex space-x-4 my-5">
                <h2 className="font-semibold">{chair.instrument}</h2>
                <span className="italic text-neutral-400">
                  {chair.grade || chair.level}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
}
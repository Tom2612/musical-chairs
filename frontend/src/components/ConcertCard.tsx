import format from 'date-fns/format';
import { useNavigate } from 'react-router-dom';
import { IConcert } from '../../../backend/src/models/concert.model';


export default function ConcertCard ({ concert }: { concert: IConcert }) {
    const navigate = useNavigate();

    return (
        <div className='border rounded-xl p-5 cursor-pointer shadow hover:shadow-lg transition-all' onClick={() => navigate(`/concerts/${concert._id}`)}>
            <h2 className='font-bold text-2xl'>SoAndSo Symphony Orchestra</h2>
            <div className='flex flex-col space-y-4 items-start my-2'>
                <div className='flex space-x-3 items-center'>
                    <span className='material-symbols-outlined flex-shrink-0'>calendar_month</span>
                    <h2 className='flex-1'>{format(new Date(concert.date), 'dd/MM/yyyy')}</h2>
                </div>
                <div className='flex space-x-3 items-center'>
                    <span className='material-symbols-outlined flex-shrink-0'>location_on</span>
                    <h2 className='flex-1'>{concert.location}</h2>
                </div>
                <div className='flex space-x-3 items-center'>
                    <span className='material-symbols-outlined flex-shrink-0'>currency_pound</span>
                    <h2 className='flex-1'>{concert.payStatus}</h2>
                </div>
            </div>
            <div>
                {concert.instruments.slice(0, 3).map(inst => (
                    <p>{inst.instrument}</p>
                ))}
            </div>
        </div>
    )
}
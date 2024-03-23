import { IState as Props } from '../app/ViewAllConcerts';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import format from 'date-fns/format';
import { useNavigate } from 'react-router-dom';

interface IProps {
    concerts: Props['concerts']
}

const ConcertCard: React.FC<IProps> = ({ concerts }) => {

    const navigate = useNavigate();

    const renderConcerts = (): JSX.Element[] => {
        return concerts.map(concert => {
            return (
                <div className='concert-card' onClick={() => navigate(`/concerts/${concert._id}`)}>
                    <p>{concert._id}</p>
                    {/* <h4>{concert.group.name}</h4> */}
                    <h3>Date: {format(new Date(concert.date), 'PP')}</h3>
                    <h2>{concert.location}</h2>
                    <p>{concert.payStatus ? 'Paid' : 'Unpaid'}</p>
                    <ul>
                        <h3>Programme:</h3>
                        {renderPieces(concert.pieces)}
                    </ul>
                    <ul>
                        <h3>Looking for:</h3>                       
                        {renderInstruments(concert.instruments)}
                    </ul>
                    <p>Posted: {formatDistanceToNow(new Date(concert.createdAt), {addSuffix: true})}</p>
                </div>
            )
        })
    }

    const renderPieces = (pieces: {title: string, composer: string}[]): JSX.Element[] => {
        return pieces.map(piece => {
            return (
                <li>{piece.composer}, {piece.title}</li>
            )
        })
    }
    const renderInstruments = (instruments: string[]): JSX.Element[] => {
        return instruments.map(instrument => {
            return (
                <li>{instrument}</li>
            )
        })
    }

    return (
        <div>
            {renderConcerts()}
        </div>
    )
}

export default ConcertCard;
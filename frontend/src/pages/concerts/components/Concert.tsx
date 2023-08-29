
import { IState as Props } from '../ViewAllConcerts';

interface IProps {
    concerts: Props['concerts']
}

const Concert: React.FC<IProps> = ({ concerts }) => {

    const renderConcerts = (): JSX.Element[] => {
        return concerts.map(concert => {
            return (
                <div>
                    <h2>{concert.date}</h2>
                    <h2>{concert.location}</h2>
                    <h2>{concert.payStatus ? 'Paid' : 'Unpaid'}</h2>
                    <ul>
                        {renderPieces(concert.pieces)}
                    </ul>
                    <ul>
                        {renderInstruments(concert.instruments)}
                    </ul>
                </div>
            )
        })
    }

    const renderPieces = (pieces: {title: string, composer: string}[]): JSX.Element[] => {
        return pieces.map(piece => {
            return (
                <li>
                    <h3>{piece.title}</h3>
                    <h3>{piece.composer}</h3>
                </li>
            )
        })
    }
    const renderInstruments = (instruments: string[]): JSX.Element[] => {
        return instruments.map(instrument => {
            return (
                <li>
                    <h3>{instrument}</h3>
                </li>
            )
        })
    }

    return (
        <div>
            <h1>All Concerts:</h1>
            {renderConcerts()}
        </div>
    )
}

export default Concert;
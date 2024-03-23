import NewConcertForm from "../forms/NewConcertForm";


const NewConcert = (): JSX.Element => {
    return (
        <div>
            New Concert!
            {<NewConcertForm />}
        </div>
    )
}

export default NewConcert;
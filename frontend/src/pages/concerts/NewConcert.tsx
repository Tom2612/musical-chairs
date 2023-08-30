import NewConcertForm from "./components/NewConcertForm";


const NewConcert = (): JSX.Element => {
    return (
        <div>
            New Concert!
            {<NewConcertForm />}
        </div>
    )
}

export default NewConcert;
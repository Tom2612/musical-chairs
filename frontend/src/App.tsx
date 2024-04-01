import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ViewAllConcerts from './app/ViewAllConcerts';
import ViewConcert from './app/ViewConcert';
import ConcertForm from './forms/ConcertForm';
import Layout from './app/Layout';

function App(): JSX.Element {
  
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index path='/concerts' element={<ViewAllConcerts />}></Route>
          <Route path='/concerts/:id' element={<ViewConcert />}></Route>
          <Route path='/concerts/new' element={<ConcertForm />}></Route>
        </Route>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

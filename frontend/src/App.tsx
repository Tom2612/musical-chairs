import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ViewAllConcerts from './app/ViewAllConcerts';
import ViewConcert from './app/ViewConcert';
import ConcertForm from './forms/ConcertForm';
import Layout from './app/Layout';
import Chairs from './app/Chairs';
import ChairForm from './forms/ChairForm';

function App() {
  
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index path='/concerts' element={<ViewAllConcerts />}></Route>
          <Route path='/concerts/:id' element={<ViewConcert />}></Route>
          <Route path='/concerts/new' element={<ConcertForm />}></Route>
          <Route path='/chairs' element={<Chairs />}></Route>
          <Route path='/chairs/:id' element={<ChairForm />}></Route>
        </Route>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

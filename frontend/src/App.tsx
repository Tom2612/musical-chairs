import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ViewAllConcerts from './app/ViewAllConcerts';
import ViewConcert from './pages/concerts/ViewConcert';
import NewConcert from './app/NewConcert';
import Navbar from './components/Navbar';

function App(): JSX.Element {
  
  return (
    <div>
      <BrowserRouter>
      <Navbar />
      <Routes>
        <Route index path='/'></Route>
        <Route path='/concerts' element={<ViewAllConcerts />}></Route>
        <Route path='/concerts/:id' element={<ViewConcert />}></Route>
        <Route path='/concerts/new' element={<NewConcert />}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

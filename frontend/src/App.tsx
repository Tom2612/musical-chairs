import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ViewAllConcerts from './pages/concerts/ViewAllConcerts';

function App(): JSX.Element {
  
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route index path='/'></Route>
        <Route path='/concerts' element={<ViewAllConcerts />}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

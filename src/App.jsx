import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import PhotoboothPage from './pages/PhotoboothPage';
import ResultPage from './pages/ResultPage';


function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage/>}/>
      <Route path="/photobooth" element={<PhotoboothPage/>}/>
      <Route path="/results" element={<ResultPage/>}/>
      {/* <Route path="*" element={<NoMatch/>}/> */}
    </Routes>
  )
}

export default App
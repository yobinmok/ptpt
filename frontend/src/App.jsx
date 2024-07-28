import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import PracticePage from './pages/PracticePage';
import VoiceTestPage from './pages/VoiceTestPage';
import SoloPage from './pages/SoloPage';
import Nav from './components/organisms/Nav';

function App() {
  return (
    <div className='App' style={{ marginTop: '80px' }}>
      <Nav />
      <Routes>
        <Route exact path='/' element={<MainPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/practice' element={<PracticePage />} />
        {/* <Route path='/solo' element={<SoloPage />} /> */}
        <Route path='/solo' element={<VoiceTestPage />} />
      </Routes>
    </div>
  );
}

export default App;

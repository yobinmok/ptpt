import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import PracticePage from './pages/PracticePage';
import SoloPage from './pages/SoloPage';
import Nav from './components/organisms/Nav';
// import VideoRoomComponent from './components/room/openVidu/VideoRoomComponent';
import CreateRoom from './pages/room/CreateRoom';
import VideoRoomComponent from './pages/room/openVidu/VideoRoomComponent';

function App() {
  return (
    <div className='App' style={{ marginTop: '80px' }}>
      <Nav />
      <Routes>
        <Route exact path='/' element={<MainPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/practice' element={<PracticePage />} />
        <Route path='/solo' element={<SoloPage />} />

        <Route path="/createroom" element={<CreateRoom />} />
        <Route path="/room/detail" element={<VideoRoomComponent />} />
      </Routes>
    </div>
  );
}

export default App;

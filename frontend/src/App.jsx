// import logo from './logo.svg';
import './App.css';
import LoginPage from './components/pages/LoginPage';
import SignupPage from './components/pages/SignupPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div>
      <BrowserRouter>
        <div>
          <LoginPage />
        </div>
        <div>
          <SignupPage />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar'
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';

function App() {
  return (
    <BrowserRouter className="App">
      <NavBar />
      <Routes>
        <Route path='/login' exact={true} element={<LoginForm />} />
        <Route path='/sign-up' exact={true} element={<SignUpForm />} />
        <Route path='/' exact={true} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

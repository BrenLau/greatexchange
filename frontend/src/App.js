import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import * as sessionActions from "./store/session.js";
import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import NavBar from './components/NavBar/NavBar'
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import YourItems from './components/items/yourItems';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);
  return (
    <BrowserRouter className="App">
      <NavBar isLoaded={isLoaded} />
      <Routes>
        <Route exact path='/login' element={<LoginForm />} />
        <Route exact path='/sign-up' element={<SignUpForm />} />
        <Route exact path='/' />
        <Route exact path='/user/:userId' element={<YourItems />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

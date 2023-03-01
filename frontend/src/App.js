import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import * as sessionActions from "./store/session.js";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import NavBar from './components/NavBar/NavBar'
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import YourItems from './components/items/yourItems';
import ListingForm from './components/listing/ListingForm';
import Listings from './components/listing/Listings';

function App() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user)

  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  const [openListingForm, setOpenListingForm] = useState(false)

  return (
    <BrowserRouter className="App">
      <NavBar isLoaded={isLoaded} setOpenListingForm={setOpenListingForm} />
      {openListingForm ? <ListingForm user={user} onClick={(e) => setOpenListingForm(false)} /> : null}
      <Routes>
        <Route exact path='/login' element={<LoginForm />} />
        <Route exact path='/sign-up' element={<SignUpForm />} />
        <Route exact path='/' />
        <Route exact path='/user/:userId' element={<YourItems />} />
        <Route exact path='/marketplace' element={<Listings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

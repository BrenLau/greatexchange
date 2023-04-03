import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import * as sessionActions from "./store/session.js";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import NavBar from './components/NavBar/NavBar'
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import ListingForm from './components/listing/ListingForm';
import Listings from './components/listing/Listings';
import Home from './components/home/Home'
import Seeking from './components/seeking/Seekings';
import { io } from 'socket.io-client'
import GroupChat from './components/groupchat/GroupChat';
import User from './components/user/User';
import Messages from './components/messages/messages';

export const socket = io(process.env.NODE_ENV === 'production' ? 'https://the-great-exchange.onrender.com/' : "http://localhost:7000")
socket.on('connect', () => {
  console.log('you connected with id', socket.id)
})

function App() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user)
  const [messageId, setMessageId] = useState(0)

  const [groupchatopen, setgroupchatopen] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  const [openListingForm, setOpenListingForm] = useState(false)

  return (
    <BrowserRouter className="App">
      <NavBar isLoaded={isLoaded} setOpenListingForm={setOpenListingForm} />
      {openListingForm ? <ListingForm user={user} onClick={(e) => setOpenListingForm(false)} /> : null}
      {groupchatopen ? <GroupChat closeChat={setgroupchatopen} socket={socket} /> : null}
      <button className='buttongroupchat' onClick={(e) => {
        e.preventDefault()
        setgroupchatopen(!groupchatopen)
      }}>Chat</button>
      <Routes>
        <Route exact path='/login' element={<LoginForm />} />
        <Route exact path='/sign-up' element={<SignUpForm />} />
        <Route exact path='/' element={<Home user={user} />} />
        <Route exact path='/user/:userId' element={<User messageId={messageId} setMessageId={setMessageId} />} />
        <Route exact path='/marketplace' element={<Listings />} />
        <Route exact path='/seekings' element={<Seeking />} />
        <Route exact path='/messages' element={<Messages messageId={messageId} setMessageId={setMessageId} />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;

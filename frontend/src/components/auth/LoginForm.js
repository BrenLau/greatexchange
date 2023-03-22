import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../store/session';
import { useNavigate } from 'react-router';
import './logout.css'

const LoginForm = () => {
  const navigate = useNavigate()
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const newErrors = []
    if (password.trim().length < 5) {
      newErrors.push('Password must be at least 5 characters')
    }
    if (email.trim().length < 5) {
      newErrors.push('Email/User must be at least 5 characters')
    }
    setErrors(newErrors)
    if (errors.length) return

    const data = await dispatch(login(email, password));
    console.log(data)
    if (data === 'Login failed') {
      newErrors.push(data)
      setErrors(newErrors);
      // navigate('/', { replace: true })
    }
    setEmail('')
    setPassword('')
    return
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return navigate('/', { replace: true });
  }

  return (
    <div className='coverall'>

      <form className='loginform' onSubmit={onLogin}>
        <h2 className='logintitle'>Login</h2>
        <div>
          {errors.map((error, ind) => (
            <div className='errors' key={ind}>{error}</div>
          ))}
        </div>
        <div>
          <label htmlFor='email'>Username/Email</label>
          <input
            name='email'
            type='text'
            placeholder='Email'
            value={email}
            onChange={updateEmail}
          />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input
            name='password'
            type='password'
            placeholder='Password'
            value={password}
            onChange={updatePassword}
          />
          <button type='submit'>Login</button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;

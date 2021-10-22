import { useHistory } from 'react-router-dom';
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { loginContext, loginProfileContext } from '../../context.jsx';

export default function FormLogin() {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, setLogin } = useContext(loginContext);
  const { loginIdx, setLoginIdx } = useContext(loginProfileContext);
  const [generalMsg, setGeneralMsg] = useState(null);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const formData = {
      email,
      password,
    };

    axios.post('/api/user/login', formData)
      .then((loginResponse) => {
        console.log('Successful login');
        return axios.get('/api/me');
      })
      .then((res) => {
        if (res.data !== null) {
          setLogin(true);
          setLoginIdx(res.data.profile_id);
        }
      })
      .then(() => axios.get('/api/allOfferings'))
      .then((res) => {
        const offerLeng = [];
        res.data.forEach((element, index) => {
          offerLeng.push(index);
        });
        history.push('/offerings', { detail: offerLeng });
      })
      .catch((err) => {
        console.log('Error logging in: ', err);
        setGeneralMsg('Incorrect username or password');
      });
    setEmail('');
    setPassword('');
  };

  return (
    <div className="container-form">
      <form>
        <label htmlFor="input-email">
          Email:&nbsp;
          <input id="input-email" name="email" type="email" placeholder="Enter your email address" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <br />
        <label htmlFor="input-password">
          Password:&nbsp;
          <input id="input-password" name="password" type="password" placeholder="Create a password" value={password} onChange={(e) => setPassword(e.target.value)} minLength="8" required />
        </label>
        <br />
        <button id="button-formsubmit" type="submit" onClick={formSubmitHandler}>Submit</button>
      </form>
      {generalMsg ? (<p>{generalMsg}</p>) : null}
    </div>
  );
}

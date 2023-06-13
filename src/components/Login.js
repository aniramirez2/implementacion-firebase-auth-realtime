import React, {useState, useEffect} from 'react'
import { useDispatch } from 'react-redux';
import { login, loginGoogle, loginWithPhone, verifyCode } from '../redux/actions/authActions';
import {createUser} from '../services/api';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    createUser();
  }, [])
  

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  }

  const handleGoogleLogin = () => {
    dispatch(loginGoogle());
    console.log("el formulario fue enviado con google")
  }

  const handlePhoneLogin = () => {
    dispatch(loginWithPhone(phoneNumber));
    console.log("el formulario fue enviado con telefono")
  }

  const handleCode = () => {
    dispatch(verifyCode(verificationCode));
    console.log("eenvio de verification code")
  }
  return (
    <>
      <form onSubmit={handleLogin}>
        <h1>LOGIN</h1>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>
      <br/>
      <button type="button" onClick={() => handleGoogleLogin()}>ENTRAR CON GOOGLE</button>
      <br/><br/>
      <input type="text" placeholder="Phone" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
      <button type="button" onClick={() => handlePhoneLogin()}>Login with phone</button>
      <br/><br/>
      <input type="text" placeholder="Validation Code" value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} />
      <button type="button" onClick={() => handleCode()}>Send verification code</button>
    </>
  )
}

export default Login
import React from 'react'
import { loginGoogle} from '../redux/actions/authActions';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const handleGoogleLogin = () => {
        dispatch(loginGoogle());
        navigate('/')
    }

  return (
    <>
    
    <div>NotFound</div>
    <button type="button" onClick={() => handleGoogleLogin()}>ENTRAR CON GOOGLE</button>
    </>
  )
}

export default NotFound
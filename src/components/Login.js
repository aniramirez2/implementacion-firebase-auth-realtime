import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { login, logout} from '../redux/actions/authActions';
import { createUser, listUsers, updateUser, delUser, searchUserByName } from '../redux/actions/userActions';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [edituser, setEdituser] = useState('');
  const [search, setSearch] = useState('');
  const [listausuarios, setListaUsuarios]   = useState([]);
  const users2 = useSelector((store) => store.authReducer.usuarios);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const getUsers = () => {    
    dispatch(listUsers());
  }

  useEffect(() => {
    if (search) {      
      setListaUsuarios(users2)
    } else {
      getUsers();    
      setListaUsuarios(users2)
    }
  },[users2])
  

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  }

  const handleNewUser = () => {
    dispatch(createUser({name, email, password, phone: phoneNumber}));
    getUsers();
  }

  const handleEdit = (user) => {
    setEdituser(user)
    setName(user.name);
    setEmail(user.email);
    setPassword(user.password);
    setPhoneNumber(user.phone)
  }

  const handleUpdateUser = () => {
    dispatch(updateUser({id: edituser.id, name, email, password, phone: phoneNumber}));    
    getUsers();
  }

  const handleRemove = (id) => {
    dispatch(delUser(id));
    getUsers();
  }

  const handleSearch = () => {
    dispatch(searchUserByName(search));
    
    setListaUsuarios(users2)
  }

  const handleLogout = () => {
    dispatch(logout());
    navigate("/notfound")
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
      <button type="button" onClick={() => handleLogout()}>LOG OUT</button>
      <br/><br/>

      <hr/>

      <form>
        <h1>NEW USER</h1>
        
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <input type="text" placeholder="Phone" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
        <button type="button" onClick={() => handleNewUser()}>Create User</button>
        <button type="button" onClick={() => handleUpdateUser()}>Update User</button>
      </form>

      <hr/>
      <h1>USER LIST</h1>
      <input type="text" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />      
      <button type="button" onClick={() => handleSearch()}>Buscar</button>
      <ul>
      {
        listausuarios?.map(item => <li key={item.id}>{item.name} - {item.email} - {item.password} - {item.phone} <button type='button' onClick={()=>handleEdit(item)} >Editar</button><button type='button' onClick={()=>handleRemove(item.id)} >ELIMINAR</button></li>)
      }
      </ul>
    </>
  )
}

export default Login
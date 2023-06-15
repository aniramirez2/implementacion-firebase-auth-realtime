import { createSlice } from '@reduxjs/toolkit';

  const initialState = {
    user: null, // aqui es donde almacenamos el usuario loggeado
    loading: false, // esto es opcional si quieren colocar gifs de loading en la app
    usuarios: [],
    filteredUsers: [] // Este es el array que vamos a utilizar globalmente para almacenar el CRUD todo lo del form
  };
  
  const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
          state.user = action.payload;
        },
        setLoading: (state, action) => {state.loading = action.payload},
        setUsers:{ // viene siendo el modificardor de estado para almacenar el array inicial que viene de firestore
            reducer: (state, action) => {
              state.usuarios = action.payload
          }
        },
        updateU: { // este es el modificador de estado de usuarios que busca un usuario dentro del sarray y lo modifica
          reducer: (state, action) => {
            return{
              ...state,
              usuarios: state.usuarios.map((user)=>user.id === action.payload.id ? {
                  ...action.payload
              }: user)
            }
          }
        },
        addUser: { // este es el modificador de estado que agrega un usuario nuevo del form al array de usuarios
          reducer: (state, action) => {
            return {
              ...state,
              usuarios: [...state.usuarios, action.payload]
            }
          }
        },
        deleteUser: { // este es el modificador de estado que elimina un objeto del array a traves del index del objeto
          reducer: (state, action) => {// el action. payload recibe el id del objeto que quiero eliminar
            const index = state.usuarios.findIndex(item => item.id === action.payload) 
            return {
              ...state,
              usuarios: [...state.usuarios.slice(0, index)]

            }
          }
        }
    }
  });
  
 // esta linea es para exportar todos los modificadores de estado para que puedan ser utilizados por los actions 
  export const { addUser, setLoading, setUsers, setUser, updateU, deleteUser } = authSlice.actions;
  
  export default authSlice.reducer;
  
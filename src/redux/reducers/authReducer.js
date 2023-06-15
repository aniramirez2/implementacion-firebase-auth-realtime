import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    loading: false,
    usuarios: []
  };
  
  const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
          state.user = action.payload;
        },
        setLoading: (state, action) => {state.loading = action.payload},
        setUsers:{
            reducer: (state, action) => {
              state.usuarios = action.payload
          }
        },
        updateU: {
          reducer: (state, action) => {
            console.log("action payload update", action.payload)
            return{
              ...state,
              usuarios: state.usuarios.map((user)=>user.id === action.payload.id ? {
                  ...action.payload
              }: user)

          }
          }
        },
        addUser: {
          reducer: (state, action) => {
            return {
              ...state,
              usuarios: [...state.usuarios, action.payload]

            }
          }
        },
        deleteUser: {
          reducer: (state, action) => {
            const index = state.usuarios.findIndex(item => item.id == action.payload)
            return {
              ...state,
              usuarios: [...state.usuarios.slice(0, index)]

            }
          }
        }
    }
  });
  
  export const { addUser, setLoading, setUsers, setUser, updateU, deleteUser } = authSlice.actions;
  
  export default authSlice.reducer;
  
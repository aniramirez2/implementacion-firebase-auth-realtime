import { collection, addDoc, setDoc, deleteDoc, getDocs, doc, query, where } from "firebase/firestore";
import { firestore } from '../../firebase/firebaseConfig';
import { setLoading, setUsers, updateU, addUser, deleteUser } from '../reducers/authReducer';

const coleccionUsuarios = collection(firestore, "users");

// LOS ACTIONS NOS PERMITEN UNIR, LOS DATOS QUE VIENEN DE FIRESTORE Y GUARDARLOS EN LOS ESTADOS GLOBALES DE LA APP
export const createUser = (user) => {
    return async (dispatch) => {
        try {
            dispatch(setLoading(true));
            const newUser = await addDoc(coleccionUsuarios, user); // aqui guardo el nuevo usuario en la base de datos de firebase
            dispatch(setLoading(false));
            dispatch(addUser(newUser)); // aqui guardo el resultado del guardado de la base de datos en mi estado global state.usuarios
        } catch (error) {
            console.log("error", error);
            dispatch(setLoading(false));
        }
    };
};

export const listUsers = () => {
    return async (dispatch) => {
        try {
            dispatch(setLoading(true));
            let tempArr = [];
            const users = await getDocs(coleccionUsuarios); // trae todos los usuarios del firebase
            users.forEach((doc) => {     
                tempArr.push({ id: doc.id, ...doc.data() })
              });
            dispatch(setLoading(false));
            dispatch(setUsers(tempArr)); // aqui actualizo los usuarios del estado global
        } catch (error) {
            console.log("error", error);
            dispatch(setLoading(false));
        }
    };
}

export const updateUser = (user) => {
    const documentRef = doc(coleccionUsuarios, user.id);
    return async (dispatch) => {
        try {
            dispatch(setLoading(true));
            await setDoc(documentRef, user);
            dispatch(setLoading(false));
            listUsers(); // esta parte la pueden implementar en el resto, lo que hace es que actualizo el array de usuarios desde lo que hay en firebase
        } catch (error) {
            console.log("error", error);
            dispatch(setLoading(false));
        }
    };
}

export const delUser = (id) => {
    const documentRef = doc(coleccionUsuarios, id);
    return (dispatch) => {
        try {
            dispatch(setLoading(true));
            deleteDoc(documentRef);
            dispatch(setLoading(false));
            listUsers()
        } catch (error) {
            console.log("error", error);
            dispatch(setLoading(false));
        }
    };
}

export const searchUserByName = (name) => {
    return async (dispatch) => {
        
        const q = query(coleccionUsuarios, where("name", "==", name));
        const querySnapshot = await getDocs(q);
        const tempArr = [];
        querySnapshot.forEach((doc) => {     
            tempArr.push({ id: doc.id, ...doc.data() })
        });
        try {
            dispatch(setLoading(true));
            dispatch(setUsers(tempArr));
            dispatch(setLoading(false));
        } catch (error) {
            console.log("error", error);
            dispatch(setLoading(false));
        }
    };
}

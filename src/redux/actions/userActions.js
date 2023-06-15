import { collection, addDoc, setDoc, deleteDoc, getDocs, doc, query, where } from "firebase/firestore";
import { firestore } from '../../firebase/firebaseConfig';
import { setLoading, setUsers, updateU, addUser, deleteUser } from '../reducers/authReducer';

const coleccionUsuarios = collection(firestore, "users");

export const createUser = (user) => {
    return async (dispatch) => {
        try {
            dispatch(setLoading(true));
            const newUser = await addDoc(coleccionUsuarios, user);
            console.log("new user", newUser.data())
            dispatch(setLoading(false));
            dispatch(addUser(newUser.data()));
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
            const users = await getDocs(coleccionUsuarios);
            users.forEach((doc) => {     
                tempArr.push({ id: doc.id, ...doc.data() })
              });
            dispatch(setLoading(false));
            dispatch(setUsers(tempArr));
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
            dispatch(updateU(user));
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
            dispatch(deleteUser(id));
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

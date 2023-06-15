import { 
    signInWithEmailAndPassword, 
    signOut, 
    GoogleAuthProvider, 
    signInWithPopup,
} from 'firebase/auth';
import { setLoading, setUser } from '../reducers/authReducer';
import { auth } from '../../firebase/firebaseConfig';


export const login = (email, password) => {
    return async (dispatch) => {
        try {
            dispatch(setLoading(true));
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log("el usuario es ", user)
            dispatch(setLoading(false));
            dispatch(setUser(user));
        } catch (error) {
            console.log("error", error.error);
            dispatch(setLoading(false));
        }
    };
};

export const loginGoogle = () => {
    const provider = new GoogleAuthProvider();
    return async (dispatch) => {
        try {
            dispatch(setLoading(true));
            const userCredential = await signInWithPopup(auth, provider);
            dispatch(setLoading(false));
            dispatch(setUser(userCredential.user));
        }catch(error){
            console.log("error", error);
            dispatch(setLoading(false));
        }
    }
}

export const logout = () => {
    return async (dispatch) => {
        try {
            dispatch(setLoading(true));
            await signOut(auth);
            dispatch(setUser(null));            
            dispatch(setLoading(false));
        } catch (error) {
            console.log("error", error);
            dispatch(setLoading(false));
        }
    };
};
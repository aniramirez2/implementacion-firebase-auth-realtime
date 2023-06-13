import { 
    signInWithEmailAndPassword, 
    signOut, 
    GoogleAuthProvider, 
    signInWithPopup, 
    signInWithPhoneNumber, 
    ConfirmationResult, 
    RecaptchaVerifier,
    PhoneAuthProvider
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
            console.log("el usuario es ", userCredential)
            dispatch(setLoading(false));
            dispatch(setUser(userCredential.user));
        }catch(error){
            console.log("error", error);
            dispatch(setLoading(false));
        }
    }
}

export const loginWithPhone = (telefono) => {
    const provider = new PhoneAuthProvider();
    return async (dispatch) => {
        try {
            dispatch(setLoading(true));
            const userCredential = await signInWithPhoneNumber(auth, telefono);
            console.log("el usuario con telefono es ", userCredential)
            dispatch(setLoading(false));
            dispatch(setUser(userCredential.user));
        }catch(error){
            console.log("error", error);
            dispatch(setLoading(false));
        }
    }
}

export const verifyCode = (codigo) => {
    return async (dispatch) => {
        try {
            dispatch(setLoading(true));
            const userCredential = await confirmationResult.code(codigo);
            console.log("confirmacion de codigo ", userCredential)
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
import { auth } from '../firebase/firebaseConfig';
import { Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';

export const PrivateRoute = ({ children }) => {
    const user =  useSelector((store) => store.authReducer.user);

    if (!user) {
        return <Navigate to={'notfound'} replace />;
    }

    return children;
  };
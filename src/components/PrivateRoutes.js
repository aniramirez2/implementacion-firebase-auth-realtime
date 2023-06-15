import { auth } from '../firebase/firebaseConfig';
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
    const user = auth.currentUser;

    if (!user) {
        return <Navigate to={'notfound'} replace />;
    }

    return children;
  };
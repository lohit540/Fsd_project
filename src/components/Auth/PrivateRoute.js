import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from '../../firebase';
import './Auth.css'; // Use same Auth.css for consistency

export default function PrivateRoute({ children }) {
  const [user, loading] = useAuthState(auth);

  if (loading) 
    return (
      <div className="auth-container">
        <div className="auth-box">
          <p>Loading...</p>
        </div>
      </div>
    );

  return user ? children : <Navigate to="/login" />;
}

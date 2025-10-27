import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const AdminRouter = ({ children }) => {
  const isAuthenticated = Cookies.get('authenticated') === 'true';
  const isAdminOrOwner = Cookies.get('role') === 'admin' || Cookies.get('role') === 'owner';

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return isAdminOrOwner ? children : <Navigate to="/" replace />;
};

export default AdminRouter;

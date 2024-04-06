import { Navigate, Outlet } from 'react-router-dom';
import PropTypes from 'prop-types'

function PrivateRoutesUser({ isUserAuth }) {     
  return isUserAuth ? <Outlet /> : <Navigate to="/login" />;
}

PrivateRoutesUser.propTypes = {
  isUserAuth : PropTypes.bool
}

export default PrivateRoutesUser;
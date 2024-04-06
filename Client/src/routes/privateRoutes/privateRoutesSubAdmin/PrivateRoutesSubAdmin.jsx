import { Navigate, Outlet } from 'react-router-dom';
import PropTypes from 'prop-types'

function PrivateRoutesSubAdmin({ isSubAdminAuth = false }) {
  return isSubAdminAuth ? <Outlet /> : <Navigate to="/login" />;
}

PrivateRoutesSubAdmin.propTypes = {
  isSubAdminAuth : PropTypes.bool
}


export default PrivateRoutesSubAdmin;
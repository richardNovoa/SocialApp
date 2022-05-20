import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Navigate, Outlet } from 'react-router';

//define PrivateRoute component and pass react-props
const PrivateRoute = ({ auth: { isAuthenticated, loading } }) => {
	//show Dashboard or redirect to Login
	return !loading && isAuthenticated ? <Outlet /> : <Navigate to='/login' />;
};
//define react-proptype
PrivateRoute.propTypes = {
	auth: PropTypes.object.isRequired,
};
//map variables from redux state to react-props
const mapStateToProps = (state) => ({
	auth: state.auth,
});
//export component & also connect to redux state
export default connect(mapStateToProps)(PrivateRoute);

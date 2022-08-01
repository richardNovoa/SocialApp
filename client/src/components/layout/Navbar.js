import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
	const authLinks = (
		<ul>
			<li>
				<Link to='/profiles'>Developers</Link>
			</li>
			<li>
				<Link to='/posts'>Posts</Link>
			</li>
			<li>
				<Link to='dashboard'>
					<i className='fas fa-user'></i>{' '}
					<span className='hide-sm'>Dashboard</span>
				</Link>
			</li>

			<li>
				<Link to='/' onClick={logout}>
					<i className='fas fa-sign-out-alt'></i>{' '}
					<span className='hide-sm'>Logout</span>
				</Link>
			</li>
		</ul>
	);
	const guestLinks = (
		<ul>
			<li>
				<a href='/profiles'>Developers</a>
			</li>

			<li>
				<a href='/register'>Register</a>
			</li>
			<li>
				<a href='/login'>Login</a>
			</li>
		</ul>
	);
	return (
		<nav className='navbar bg-dark'>
			<h1>
				<a href='/'>
					<i className='fas fa-code'></i>DevConnector
				</a>
			</h1>
			{!loading && (
				<Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
			)}
		</nav>
	);
};

Navbar.propTypes = {
	logout: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});
export default connect(mapStateToProps, { logout })(Navbar);

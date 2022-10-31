import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';
import { Link, Navigate } from 'react-router-dom';
import Alert from '../layout/Alert';

export const Login = ({ login, isAuthenticated }) => {
	//set initial state
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});
	// deconstruct formData
	const { email, password } = formData;

	//on change
	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	//onsubmit
	const onSubmit = async (e) => {
		e.preventDefault();
		login({ email, password });
	};

	//redirect if logged in
	if (isAuthenticated) {
		return <Navigate to='/dashboard' />;
	}

	return (
		<section className='container'>
			<Alert />
			<h1 className='large text-primary'>Sign In</h1>
			<p className='lead'>
				<i className='fas fa-user' /> Sign Into Your Account
			</p>
			<form className='form' onSubmit={(e) => onSubmit(e)}>
				<div className='form-group'>
					<input
						type='email'
						placeholder='Email Address'
						name='email'
						value={email}
						onChange={(e) => onChange(e)}
						required
					/>
				</div>
				<div className='form-group'>
					<input
						type='password'
						placeholder='Password'
						name='password'
						value={password}
						onChange={(e) => onChange(e)}
						minLength='6'
						required
					/>
				</div>
				<input type='submit' className='btn btn-primary' value='Login' />
			</form>
			<p className='my-1'>
				Don't have an account? <Link to='/register'>Sign Up</Link>
			</p>
		</section>
	);
};

//
Login.propTypes = {
	login: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.auth.isAuthenticated,
	};
};

export default connect(mapStateToProps, { login })(Login);

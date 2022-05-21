import axios from 'axios';
import { setAlert } from './alert';
import { GET_PROFILE, PROFILE_ERROR, UPDATE_PROFILE } from './types';

//Get current user profile
export const getCurrentProfile = () => async (dispatch) => {
	try {
		const res = await axios.get('http://localhost:5001/api/profile/me');
		dispatch({
			type: GET_PROFILE,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

// Create or update profile
export const createProfile =
	(FormData, navigate, edit = false) =>
	async (dispatch) => {
		try {
			const config = {
				headers: {
					'Content-Type': 'application/json',
				},
			};
			const res = await axios.post(
				'http://localhost:5001/api/profile',
				FormData,
				config,
			);
			dispatch({ type: GET_PROFILE, payload: res.data });

			dispatch(
				setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'),
			);

			if (!edit) {
				navigate('/dashboard');
			}
		} catch (err) {
			const errors = err.response.data.errors;
			if (errors) {
				errors.forEach((err) => dispatch(setAlert(err.msg, 'danger')));
			}

			dispatch({
				type: PROFILE_ERROR,
				payload: { msg: err.response.statusText, status: err.response.status },
			});
		}
	};

// Add Experience
export const addExperience = (formData, navigate) => async (dispatch) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		const res = await axios.put(
			'http://localhost:5001/api/profile/experience',
			formData,
			config,
		);
		dispatch({ type: UPDATE_PROFILE, payload: res.data });
		dispatch(setAlert('Experience Added', 'success'));

		navigate('/dashboard');
	} catch (err) {
		const errors = err.response.data.errors;
		if (errors) {
			errors.forEach((err) => dispatch(setAlert(err.msg, 'danger')));
		}

		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

// Add Education
export const addEducation = (formData, navigate) => async (dispatch) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		const res = await axios.put(
			'http://localhost:5001/api/profile/education',
			formData,
			config,
		);
		dispatch({ type: UPDATE_PROFILE, payload: res.data });

		dispatch(setAlert('Education Added', 'success'));

		navigate('/dashboard');
	} catch (err) {
		const errors = err.response.data.errors;
		if (errors) {
			errors.forEach((err) => dispatch(setAlert(err.msg, 'danger')));
		}

		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

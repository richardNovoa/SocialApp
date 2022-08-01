import axios from 'axios';
import { GET_POSTS, POST_ERROR } from './types';
import setAuthToken from '../utils/setAuthToken';

//Get Posts

export const getPosts = () => async (dispatch) => {
	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}
	try {
		const res = await axios.get('http://localhost:5001/api/posts');
		console.log('success');
		dispatch({
			type: GET_POSTS,
			payload: res.data,
		});
	} catch (err) {
		console.log('error');
		dispatch({
			type: POST_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

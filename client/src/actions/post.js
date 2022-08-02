import axios from 'axios';
import { GET_POSTS, POST_ERROR, UPDATE_LIKES } from './types';
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

//Add like

export const addLike = (id) => async (dispatch) => {
	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}
	try {
		const res = await axios.put(`http://localhost:5001/api/posts/like/${id}`);

		dispatch({
			type: UPDATE_LIKES,
			payload: { id, likes: res.data },
		});
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

//Remove like

export const removeLike = (id) => async (dispatch) => {
	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}
	try {
		const res = await axios.put(`http://localhost:5001/api/posts/unlike/${id}`);

		dispatch({
			type: UPDATE_LIKES,
			payload: { id, likes: res.data },
		});
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

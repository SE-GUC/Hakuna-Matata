import { GET_USERS, CREATE_USERS } from './actionTypes';
import axios from 'axios';

export const getUsers= () => dispatch => {
	axios.get('')
		.then(res =>
			dispatch({
				type: GET_USERS,
				payload: res.data.users,
			})
		);
};

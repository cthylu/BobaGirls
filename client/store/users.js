import axios from 'axios';
const FETCH_USERS = 'FETCH_USERS';

export const _fetchUsers = (users) => ({ type: FETCH_USERS, users});

export const fetchUsers = () => {
	return async (dispatch) => {
		try {
			const token = window.localStorage.getItem('token');
			if (token) {
				const { data: users } = await axios.get('/api/users', {
					headers: {
						authorization: token,
					},
				});
				return dispatch(_fetchUsers(users));
			}
		} catch (e) {
			console.log("No users found", e);
		}
	};
};

const user = (state = [], action) => {
    if (action.type === FETCH_USERS){
        state = action.cart
    }
    return state;
}


export default user;
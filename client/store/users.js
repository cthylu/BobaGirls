import axios from "axios";

const SET_USERS = "SET_USERS";

const fetchUsers = () => {
  return async (dispatch) => {
    const response = await axios.get("/api/users");
    dispatch({ type: SET_USERS, users: response.data });
  };
};

const users = (state = [], action) => {
  if (action.type === SET_USERS) {
    return action.users;
  }
  return state;
};

export default users;
export { fetchUsers };

// export const _fetchUsers = (users) => ({ type: FETCH_USERS, users });

// export const fetchUsers = () => {
//   return async (dispatch) => {
//     try {
//       const token = window.localStorage.getItem("token");
//       if (token) {
//         const { data: users } = await axios.get("/api/users", {
//           headers: {
//             authorization: token,
//           },
//         });
//         return dispatch(_fetchUsers(users));
//       }
//     } catch (e) {
//       console.log("No users found", e);
//     }
//   };
// };

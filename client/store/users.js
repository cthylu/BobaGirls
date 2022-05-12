import axios from "axios";
import { me } from "./auth";

const SET_USERS = "SET_USERS";
const UPDATE_USER = "UPDATE_USER";

const _updateUser = (user) => ({
  type: UPDATE_USER,
  user,
});

export const fetchUsers = () => {
  return async (dispatch) => {
    const response = await axios.get("/api/users");
    dispatch({ type: SET_USERS, users: response.data });
  };F
};

export const updateUser = (user, history) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    const information = (await axios.put("/api/users", user, {
      headers: {
        authorization: token,
      },
    })).data;
    dispatch(_updateUser(information));
    dispatch(me());
    history.push(`/profile`);
  };
};

export const updateOrder = (user, history) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    const information = (await axios.put("/api/users", user, {
      headers: {
        authorization: token,
      },
    })).data;
    dispatch(_updateUser(information));
    dispatch(me());
    // history.push(`/orders`);
  };
};

const users = (state = [], action) => {
  if (action.type === SET_USERS) {
    return action.users;
  }
  if (action.type === UPDATE_USER) {
    console.log('state',state);
    return state.map((user) => user.id === action.user.id ? action.user : user
    );
  }
  return state;
};

export default users;


// export { fetchUsers };

// import axios from "axios";

// const UPDATE_INFO = "UPDATE_INFO";

// const _updateInfo = (information) => ({ type: UPDATE_INFO,
//   information,
// });

// export const updateInfo = (user, history) => {
//   return async (dispatch) => {
//     const information = (await axios.put("/api/profile",  user )).data;
//     dispatch(_updateInfo(information));
//       history.push(`/profile`);
//   };
// };

// const updateUser = (state = [], action) => {
//   if (action.type === UPDATE_INFO){
//     return state.map(user => user.id === action.user.id ? action.user : user);
//   }
//   return state;
// };

// export default updateUser;

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

import axios from "axios";
import { GET_PROFILE } from "./type";
import jwt_decode from "jwt-decode";
export const getProfile = () => dispatch => {
  let token = localStorage.jwtToken;
  const decoded = jwt_decode(token);

  axios
    .get("http://localhost:3001/users/profile", {
      params: { email: decoded.email }
    })
    .then(response => {
      dispatch({
        type: GET_PROFILE,
        payload: response.data
      });
    });
};

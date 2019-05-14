import { GET_ERRORS, SET_CURRENT_USER, UPDATE_PROFILE } from "./type";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
export const SET_USER = "SET_USER";

export function loginuser(data) {
  return {
    type: SET_USER,
    payload: data
  };
}
export const signup = (request, history) => dispatch => {
  axios
    .post(window.base_url + "/users/signup", {
      name: request.name,
      email: request.email,
      password: request.password,
      type: request.type,
      gender: request.gender,
      phone: request.phone,
      city: request.city,
      country: request.country,
      school: request.school,
      company: request.company,
      languages: request.languages
    })
    .then(res => history.push("/"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.res.data
      })
    );

  return {
    type: GET_ERRORS,
    payload: request
  };
};

export const login = userData => dispatch => {
  axios
    .post(window.base_url + "/users/login", {
      email: userData.email,
      password: userData.password
    })
    .then(res => {
      //const { token } = res.data;
      console.log(res.data);

      localStorage.setItem("jwtToken", res.data.token);

      //  setAuthToken(res.data.token);
      const decoded = jwt_decode(res.data.token);
      console.log(decoded);
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

export const updateProfile = (request, history) => dispatch => {
  axios
    .post(window.base_url + "users/profile", {
      name: request.name,
      email: request.email,
      password: request.password,
      type: request.type,
      gender: request.gender,
      phone: request.phone,
      city: request.city,
      country: request.country,
      school: request.school,
      company: request.company,
      languages: request.languages
    })
    .then(res => {
      /* const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      setAuthToken(token);
      const decoded = jwt_decode(token); 
      dispatch(setCurrentUser(decoded)); */
      dispatch(setCurrentUser(res.data));
    })

    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );

  return {
    type: SET_CURRENT_USER,
    payload: request
  };
};

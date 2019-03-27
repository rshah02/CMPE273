import axios from "axios";
import setAuthtoken from "../utils/setAuthtoken";
import jwt_decode from "jwt-decode";
import { GET_ERRORS, SET_CURRENT_USER } from "./type";

export const signup = (request, history) => dispatch => {
  axios
    .post("users/signup", {
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
    .then(res => history.push("login"))
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

export const login = user => dispatch => {
  axios
    .post("users/login", {
      email: user.email,
      password: user.password
    })
    .then(res => {
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);

      setAuthtoken(token);
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.res.data
      })
    );
};

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

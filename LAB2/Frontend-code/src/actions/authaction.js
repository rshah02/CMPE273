import { GET_ERRORS } from "./type";
import axios from "axios";
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
export const SET_USER = "SET_USER";

export function login(data) {
  return {
    type: SET_USER,
    payload: data
  };
}

export const increaseCounterType = "askjbkjsfbjak";
export const signupAction = "SIGNUP_CONSTANT";
export const loginAction = "LOGIN_CONSTANT";
export const ProfileAction = "PROFILE_CONSTANT";
const ROOT_URL = "http://localhost:3005";

export function login() {
  return {
    type: loginAction
  };
}

export function signup(values, callback) {
  const request = axios
    .post(`${ROOT_URL}/users/signup`, values)
    .then(() => callback());
  return {
    type: signupAction,
    payload: request
  };
}

export function Profile(values, callback) {
  const request = axios
    .post(`${ROOT_URL}/users/profile`, values)
    .then(() => callback());
  return {
    type: signupAction,
    payload: request
  };
}

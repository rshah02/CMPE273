import { combineReducers } from "redux";
import { increaseCounterType, loginType, logoutType } from "./actions";

function myReducer(counter = 1, action) {
  switch (action.type) {
    case increaseCounterType:
      return counter + 1;
    default:
      return counter;
  }
}

function loginReducer(state = false, action) {
  switch (action.type) {
    case loginType:
      return true;
    case logoutType:
      return false;
    default:
      return false;
  }
}

export default combineReducers({
  counter: myReducer,
  login: loginReducer
});

import * as types from "./../constants/ActionTypes";

var s4 = () => {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
};
var randomId = () => {
  return (
    s4() +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4()
  );
};
var data = JSON.parse(localStorage.getItem("tasks"));
var initialState = data ? data : [];

var myReducer = (state = initialState, action) => {
  switch (action) {
    case types.LIST_ALL:
      return state;
    case types.ADD_TASK:
      console.log(action);
      return state;
    default:
      return state;
  }
};

export default myReducer;

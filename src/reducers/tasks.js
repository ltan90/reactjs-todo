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

// var findIndex = (tasks, id) => {
//   let result = -1;
//   tasks.forEach((task, index) => {
//     if (task.id === id) {
//       result = index;
//     }
//   });
//   return result;
// };
var data = JSON.parse(localStorage.getItem("tasks"));
var initialState = data ? data : [];
// var initialState = [];

var myReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LIST_ALL:
      return [...state];
    case types.ADD_TASK:
      const newTask = {
        id: randomId(),
        name: action.task.name,
        status: action.task.status
      };
      state = [...state, newTask];
      localStorage.setItem("tasks", JSON.stringify(state));
      return [...state];
    case types.UPDATE_STATUS_TASK:
      // let index = findIndex(state, action.task);
      // state[index] = {
      //   ...state[index],
      //   status: !state[index].status
      // };
      console.log(state);
      let taskStatus = action.task;
      let obj = state.find(x => x.id === taskStatus.id);
      obj.status = !taskStatus.status;
      localStorage.setItem("tasks", JSON.stringify(state));
      return [...state];
    case types.DEL_TASK:
      let id = action.id;
      state = state.filter(x => x.id !== id);
      localStorage.setItem("tasks", JSON.stringify(state));
      return [...state];
    default:
      return [...state];
  }
};

export default myReducer;

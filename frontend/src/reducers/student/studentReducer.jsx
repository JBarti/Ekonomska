let stateDefault = {
  id: null,
  gradeId: null,
  firstName: null,
  lastName: null,
  email: null,
  solutions: [],
  fail: false
};

export default function reducer(state = stateDefault, action) {
  let newState = { ...state };
  switch (action.type) {
    case "LOAD_STUDENT_FULFILLED": {
      console.log("OVO JE PAYLOAD");
      console.log(action.payload);
      let user = action.payload.data;
      if (action.payload.data == undefined) {
        user = action.payload;
      }
      console.log(user);
      let {
        id,
        gradeId,
        firstName,
        lastName,
        email,
        solutions,
        notifications
      } = user;
      newState = {
        ...state,
        id,
        gradeId,
        firstName,
        lastName,
        email,
        solutions,
        notifications,
        fail: false
      };
      break;
    }
    case "REGISTER_STUDENT_FULFILLED": {
      let user = action.payload.data;
      let { id, gradeId, firstName, lastName, email, solutions } = user;
      newState = {
        ...state,
        id,
        gradeId,
        firstName,
        lastName,
        email,
        solutions,
        fail: false
      };
      break;
    }
    case "SOLVE_TEST_FULFILLED": {
      let oldSolutions = state.solutions;
      let solutions = action.payload.data;
      oldSolutions.push(solutions);
      console.log(solutions);
      newState = { ...state, solutions: oldSolutions };
      break;
    }
    case "LOAD_STUDENT_REJECTED": {
      newState = { ...state, fail: true };
      break;
    }
    case "LOAD_USER_FAILED": {
      newState = { ...state, fail: true };
      break;
    }
  }

  return newState;
}

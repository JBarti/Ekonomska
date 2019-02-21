let state = {
  id: null,
  gradeId: null,
  firstName: null,
  lastName: null,
  email: null,
  solutions: []
};

export default function reducer(state = state, action) {
  let newState = { ...state };
  switch (action.type) {
    case "LOAD_STUDENT_FULFILLED": {
      console.log("OVO JE PAYLOAD");
      console.log(action.payload.data);
      let user = action.payload.data ? action.payload.data : action.payload;
      let { id, gradeId, firstName, lastName, email, solutions } = user;
      newState = {
        ...state,
        id,
        gradeId,
        firstName,
        lastName,
        email,
        solutions
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
        solutions
      };
      break;
    }
    case "SOLVE_TEST_FULFILLED": {
      let solutions = action.payload.data;
      newState = { ...state, solutions };
    }
  }

  return newState;
}

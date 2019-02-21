let state = {
  id: null,
  gradeId: null,
  firstName: null,
  lastName: null,
  email: null,
  loggingIn: null
};

export default function reducer(state = state, action) {
  let newState = { ...state };
  switch (action.type) {
    case "LOAD_PROFFESOR_PENDING": {
      break;
    }
    case "LOAD_PROFFESOR_FULFILLED": {
      console.log("OVO JE PAYLOAD");
      console.log(action);
      let user = action.payload.data ? action.payload.data : action.payload;
      let { id, firstName, lastName, email } = user;
      newState = { ...state, id, firstName, lastName, email };
      break;
    }
  }

  return newState;
}

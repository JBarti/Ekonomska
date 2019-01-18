let state = {
  id: null,
  gradeId: null,
  firstName: null,
  lastName: null,
  email: null
};

export default function reducer(state = state, action) {
  let newState = { ...state };
  switch (action.type) {
    case "LOAD_STUDENT_FULFILLED": {
      console.log("OVO JE PAYLOAD");
      console.log(action);
      let user = action.payload.data ? action.payload.data : action.payload;
      let { id, gradeId, firstName, lastName, email } = user;
      newState = { ...state, id, gradeId, firstName, lastName, email };
      break;
    }
  }

  return newState;
}

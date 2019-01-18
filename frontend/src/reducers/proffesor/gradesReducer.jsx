let state = {
  all: null
};

export default function reducer(state = state, action) {
  let newState = { ...state };
  switch (action.type) {
    case "LOAD_PROFFESOR_FULFILLED": {
      console.log(action.payload.data);
      let user = action.payload.data ? action.payload.data : action.payload;
      let grades = user.grades;
      newState = { ...state, grades };
      break;
    }
  }

  return newState;
}

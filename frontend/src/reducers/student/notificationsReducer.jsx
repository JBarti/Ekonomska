let state = {
  all: null
};

export default function reducer(state = state, action) {
  let newState = { ...state };

  switch (action.type) {
    case "LOAD_STUDENT_FULFILLED": {
      let user = action.payload.data ? action.payload.data : action.payload;
      let { notifications } = user;
      newState.all = notifications;
      break;
    }
  }

  return newState;
}

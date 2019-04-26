let stateDefault = [];

export default function reducer(state = stateDefault, action) {
  let newState = { ...state };

  switch (action.type) {
    case "LOAD_STUDENT_FULFILLED": {
      let { notifications } = action.payload.data;
      newState = notifications;
      break;
    }
  }

  return newState;
}

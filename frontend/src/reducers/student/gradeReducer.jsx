let state = {
  id: null,
  name: null,
  proffesorId: null,
  folders: null,
  notifications: null
};

export default function reducer(state = state, action) {
  let newState = { ...state };
  switch (action.type) {
    case "LOAD_STUDENT_FULFILLED": {
      console.log(action.payload.data);
      let user = action.payload.data ? action.payload.data : action.payload;
      let { id, name, proffesorId, files, tests, folders } = user.grade;
      newState = { ...state, id, name, proffesorId, files, tests, folders };
      break;
    }
  }

  return newState;
}

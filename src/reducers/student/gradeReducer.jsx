let stateDefault = {
  id: null,
  name: null,
  proffesorId: null,
  folders: null,
  notifications: null,
  financialYear: null
};

export default function reducer(state = stateDefault, action) {
  let newState = { ...state };
  switch (action.type) {
    case "LOAD_STUDENT_FULFILLED": {
      console.log("PLZ RADIIIII");

      let user = action.payload.data;
      if (action.payload.data == undefined) {
        user = action.payload;
      }
      let {
        id,
        name,
        proffesorId,
        files,
        tests,
        folders,
        notifications,
        financialYear
      } = user.grade;
      newState = {
        ...state,
        id,
        name,
        proffesorId,
        files,
        tests,
        folders,
        notifications,
        financialYear
      };
      break;
    }
  }

  return newState;
}

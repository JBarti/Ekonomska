let state = {
  selectedGrade: null,
  all: null
};

export default function reducer(state = state, action) {
  let newState = { ...state };
  switch (action.type) {
    case "LOAD_PROFFESOR_FULFILLED": {
      let user = action.payload.data ? action.payload.data : action.payload;
      let all = user.grades;
      newState = { ...state, all };
      break;
    }
    case "SELECT_GRADE": {
      let { gradeId } = action.payload;
      let selectedGrade = state.all.filter(grade => {
        return grade.id === gradeId;
      })[0];
      newState = { ...state, selectedGrade };
      break;
    }
  }

  return newState;
}

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
    case "ADD_TEST": {
      let { selectedGrade } = state;
      let newGrade = { ...selectedGrade };
      let { test, folderId } = action.payload;
      let folder = newGrade.folders.filter(folder => {
        return folderId === folder.id;
      })[0];
      folder.tests.push(test);
      newState = { ...state, selectedGrade: newGrade };
    }
  }

  return newState;
}

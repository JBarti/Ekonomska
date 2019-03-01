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
      console.log("GRADES");
      console.log(all);
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
    case "ADD_TEST_FULFILLED": {
      let { selectedGrade } = state;
      let newGrade = { ...selectedGrade };
      let { test, folderId, isNew } = action.payload.data;
      let folder = newGrade.folders.filter(folder => {
        return folderId === folder.id;
      })[0];
      console.log(folderId);
      console.log(folder);
      if (isNew) {
        folder.tests.push(test);
      }
      newState = { ...state, selectedGrade: newGrade };
      break;
    }
    case "ADD_FOLDER_FULFILLED": {
      let { selectedGrade } = state;
      let newGrade = { ...selectedGrade };
      let folder = action.payload.data;
      folder.tests = [];
      folder.files = [];
      console.log(action.payload.data);
      newGrade.folders.push(folder);
      newState = { ...state, selectedGrade: newGrade };
      break;
    }
    case "ADD_GRADE_FULFILLED": {
      let { grade } = action.payload.data;
      grade.students = [];
      grade.folders = [];
      let { all } = state;
      all = [...all, grade];
      newState = { ...state, all };
      break;
    }
    case "ADD_STUDENT_FULFILLED": {
      let { user, gradeId } = action.payload.data;
      let all = [...state.all];
      console.log(action.payload.data);
      let grade = all.filter(grade => {
        return grade.id === gradeId;
      })[0];
      grade.students.push(user);
      newState = { ...state, all };
      break;
    }
    case "GET_SOLUTIONS_FULFILLED": {
      let { solutions, gradeId } = action.payload.data;
      console.log(action.payload.data);
      let grades = state.all;
      let grade = grades.filter(grade => grade.id === gradeId)[0];
      grade.students.forEach(student => {
        student.solutions = solutions.filter(
          solution => solution.studentId === student.id
        );
      });
      newState = { ...state, all: grades };
      break;
    }
    case "ADD_NOTIFICATION_FULFILLED": {
      let { notification, gradeId } = action.payload.data;
      let { selectedGrade } = newState;
      let newGrade = { ...selectedGrade };
      newGrade.notifications.push(notification);
      newState = { ...state, selectedGrade: newGrade };
      break;
    }
    case "REMOVE_NOTIFICATION_FULFILLED": {
      let { notificationId } = action.payload.data;
      let { selectedGrade } = newState;
      let newGrade = { ...selectedGrade };
      let { notifications } = newGrade;
      notifications = notifications.filter(notification => {
        console.log(notification.id, notificationId);
        return notification.id != notificationId;
      });
      newGrade.notifications = notifications;
      console.log("NJU");
      console.log(notifications);
      newState = { ...state, selectedGrade: newGrade };
      newState;
      break;
    }
  }

  return newState;
}
import { selectGrade } from "../../actions/proffesorActions";

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
      let { test, folderId, oldId } = action.payload.data;
      let { selectedGrade } = state;
      let newGrade = { ...selectedGrade };
      let folder = newGrade.folders.filter(folder => {
        return folderId === folder.id;
      })[0];
      folder.tests = folder.tests.filter(test => {
        return test.id !== oldId;
      });
      folder.tests.push(test);
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
    case "ADD_PDF_FULFILLED": {
      let { folderId, file } = action.payload.data;
      let { selectedGrade } = state;
      let newGrade = { ...selectedGrade };
      newGrade.folders
        .find(folder => {
          return folder.id === folderId;
        })
        .files.push(file);
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
      let newAll = [...state.all];
      newAll.find(grade => {
        return grade.id == newGrade.id;
      }).notifications = newGrade.notifications;

      newState = { ...state, all: newAll, selectedGrade: newGrade };
      newState;
      break;
    }
    case "UPDATE_STUDENT_FULFILLED": {
      let { id, firstName, lastName, password, email } = action.payload.data;
      console.log("PEJLOD");
      console.log(action.payload.data);
      let { all } = newState;
      all = [...all];
      all.forEach(grade => {
        console.log(grade);
        grade.students.forEach(student => {
          console.log(student);
          console.log(id);
          if (student.id === id) {
            console.log("FOUND");
            student.firstName = firstName;
            student.lastName = lastName;
            student.email = email;
            student.password = password;
          }
        });
      });
      newState = { ...state, all };
      break;
    }
    case "REMOVE_STUDENT_FULFILLED": {
      let { studentId } = action.payload.data;
      console.log(action.payload.data);
      let { all } = newState;
      all = [...all];
      all.forEach(grade => {
        grade.students = grade.students.filter(student => {
          console.log(student.id, studentId);
          return student.id != studentId;
        });
      });
      newState = { ...state, all };
      break;
    }
    case "UPDATE_FOLDER_FULFILLED": {
      let { folderId, name } = action.payload.data;
      let { selectedGrade } = state;
      let { folders } = selectedGrade;
      folders = [...folders];
      let folder = folders.find(folder => {
        return (folder.id = folderId);
      });
      folder.name = name;
      selectedGrade.folders = folders;
      newState = { ...state, selectGrade };
      break;
    }
    case "REMOVE_FILE_FULFILLED": {
      let { folderId, fileId } = action.payload.data;
      let { selectedGrade } = state;
      let { folders } = selectedGrade;
      let folder = folders.find(folder => folder.id === folderId);
      let files = [...folder.files];
      files = files.filter(file => {
        return file.id != fileId;
      });
      folder.files = files;
      newState = { ...state, selectGrade };
      break;
    }
    case "REMOVE_TEST_FULFILLED": {
      let { folderId, testId } = action.payload.data;
      let { selectedGrade } = state;
      let { folders } = selectedGrade;
      let folder = folders.find(folder => folder.id === folderId);
      let tests = [...folder.tests];
      tests = tests.filter(test => {
        return test.id != testId;
      });
      folder.tests = tests;
      newState = { ...state, selectGrade };
      break;
    }
    case "LOCK_TEST_FULFILLED": {
      let { folderId, testId } = action.payload.data;
      let { selectedGrade } = state;
      let { folders } = selectedGrade;
      let folder = folders.find(folder => folder.id === folderId);
      let tests = [...folder.tests];
      tests.find(test => {
        return test.id === testId;
      }).locked = true;
      folder.tests = tests;
      newState = { ...state, selectGrade };
      break;
    }
  }

  return newState;
}

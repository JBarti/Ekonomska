import { combineReducers } from "redux";

import proffesor from "./proffesor/proffesorReducer";
import grades from "./proffesor/gradesReducer";
import student from "./student/studentReducer";
import grade from "./student/gradeReducer";
import notifications from "./student/notificationsReducer";

export default combineReducers({
  proffesor,
  grades,
  student,
  grade,
  notifications
});

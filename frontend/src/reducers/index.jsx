import { combineReducers } from "redux";

import proffesor from "./proffesor/proffesorReducer";
import grades from "./proffesor/gradesReducer";
import student from "./student/studentReducer";
import grade from "./student/gradeReducer";
import notifications from "./student/notificationsReducer";
import finance from "./student/financeReducer";

export default combineReducers({
  proffesor,
  grades,
  student,
  grade,
  notifications,
  finance
});

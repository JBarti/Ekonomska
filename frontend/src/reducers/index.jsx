import { combineReducers } from "redux"

import student from './studentReducer'
import notifications from './notificationsReducer'
import grade from './gradeReducer'

export default combineReducers({ student, notifications, grade })
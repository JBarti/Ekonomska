import axios from "axios";

axios.defaults.withCredentials = true;

const API_ENDPOINT_OLD = "http://localhost:3001";
const API_ENDPOINT = "http://0.0.0.0:3001";

export function loadStudent(email, password) {
  return {
    type: "LOAD_STUDENT",
    payload: axios.post(
      API_ENDPOINT + "/login",
      { email, password },
      {
        Headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }
    )
  };
}

export function loadSession() {
  return {
    type: "LOAD_PROFFESOR",
    payload: axios.get(API_ENDPOINT + "/proffesor/get")
  };
}

export function selectGrade(gradeId) {
  return {
    type: "SELECT_GRADE",
    payload: { gradeId }
  };
}

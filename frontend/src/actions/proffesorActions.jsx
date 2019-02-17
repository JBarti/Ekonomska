import axios from "axios";

axios.defaults.withCredentials = true;

const API_ENDPOINT = "http://0.0.0.0:3001";
const API_ENDPOINT_LOCAL = "https://f-pismenost.herokuapp.com/";

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
    payload: axios.get(API_ENDPOINT + "/proffesor/")
  };
}

export function selectGrade(gradeId) {
  return {
    type: "SELECT_GRADE",
    payload: { gradeId }
  };
}

export function addTest(folderId, { name, active = false, questions = [] }) {
  return {
    type: "ADD_TEST",
    payload: { folderId, test: { name, active, questions } }
  };
}

export function addFolder(gradeId, name, description) {
  console.log(API_ENDPOINT + "/proffesor/folder");
  return {
    type: "ADD_FOLDER",
    payload: axios.post(API_ENDPOINT + "/proffesor/folder", {
      gradeId,
      name,
      description
    })
  };
}

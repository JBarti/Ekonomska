import axios from "axios";

axios.defaults.withCredentials = true;

const API_ENDPOINT_LOCAL = "http://0.0.0.0:3001";
const API_ENDPOINT = "https://f-pismenost.herokuapp.com";

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

export function addTest(folderId, test) {
  return {
    type: "ADD_TEST",
    payload: axios.post(API_ENDPOINT + "/proffesor/test", {
      folderId,
      test: test
    })
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

export function addGrade(name, proffesorId) {
  return {
    type: "ADD_GRADE",
    payload: axios.post(API_ENDPOINT + "/proffesor/grade", {
      name,
      proffesorId
    })
  };
}

export function addStudent(student, gradeId) {
  return {
    type: "ADD_STUDENT",
    payload: axios.post(API_ENDPOINT + "/students/register", {
      student,
      gradeId
    })
  };
}

export function getAllSolutions(students, gradeId) {
  students = students.map(student => student.id);
  return {
    type: "GET_SOLUTIONS",
    payload: axios.post(API_ENDPOINT + "/proffesor/solutions", {
      ids: students,
      gradeId
    })
  };
}

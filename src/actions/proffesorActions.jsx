import axios from "axios";

axios.defaults.withCredentials = true;

const API_ENDPOINT = "http://0.0.0.0:3001";
const API_ENDPOINTG = "https://f-pismenost.herokuapp.com";

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

export function updateStudent(id, firstName, lastName, email, password) {
  return {
    type: "UPDATE_STUDENT",
    payload: axios.post(API_ENDPOINT + "/proffesor/student/update", {
      id,
      firstName,
      lastName,
      email,
      password
    })
  };
}

export function logOut() {
  return {
    type: "LOGOUT_PROFFESOR",
    payload: axios.get(API_ENDPOINT + "/proffesor/logout")
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

export function addPdf(folderId, pdf) {
  return {
    type: "ADD_PDF",
    payload: axios.post(API_ENDPOINT + "/proffesor/file", { folderId, pdf })
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

export function updateFolder(folderId, name) {
  return {
    type: "UPDATE_FOLDER",
    payload: axios.post(API_ENDPOINT + "/proffesor/folder/update", {
      folderId,
      name
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

export function removeStudent(studentId) {
  return {
    type: "REMOVE_STUDENT",
    payload: axios.delete(API_ENDPOINT + "/proffesor/student", {
      data: { studentId }
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

export function createNotification(title, description, gradeId) {
  return {
    type: "ADD_NOTIFICATION",
    payload: axios.post(API_ENDPOINT + "/proffesor/notifications", {
      title,
      description,
      gradeId
    })
  };
}

export function deleteNotification(notificationId) {
  return {
    type: "REMOVE_NOTIFICATION",
    payload: axios.delete(API_ENDPOINT + "/proffesor/notifications", {
      data: { notificationId }
    })
  };
}

export function deleteFile(fileId, folderId) {
  return {
    type: "REMOVE_FILE",
    payload: axios.delete(API_ENDPOINT + "/proffesor/file", {
      data: {
        fileId,
        folderId
      }
    })
  };
}

export function deleteTest(testId, folderId) {
  return {
    type: "REMOVE_TEST",
    payload: axios.delete(API_ENDPOINT + "/proffesor/test", {
      data: {
        testId,
        folderId
      }
    })
  };
}

export function lockTestUp(testId, folderId) {
  return {
    type: "LOCK_TEST",
    payload: axios.post(API_ENDPOINT + "/proffesor/test/lock", {
      testId,
      folderId
    })
  };
}

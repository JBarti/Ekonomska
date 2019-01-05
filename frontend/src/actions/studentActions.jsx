import axios from "axios";

axios.defaults.withCredentials = true;

const API_ENDPOINT = "http://localhost:3001";

export function loadStudent(email, password) {
  console.log(email, password);
  return {
    type: "LOAD_STUDENT",
    payload: axios.post(
      API_ENDPOINT + "/students/login",
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
    type: "LOAD_STUDENT",
    payload: axios.get(API_ENDPOINT + "/students")
  };
}

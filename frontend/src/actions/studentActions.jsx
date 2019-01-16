import axios from "axios";

axios.defaults.withCredentials = true;

const API_ENDPOINT_OLD = "http://localhost:3001";
const API_ENDPOINT = "http://193.198.244.150:3001";

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

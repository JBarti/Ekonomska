import axios from "axios";
import { API_ENDPOINT, PROFFESOR } from "../apiRoutes";

axios.defaults.withCredentials = true;

let proffesorApi = {
  getData: () => {
    return axios.get(API_ENDPOINT + PROFFESOR.get.data);
  },
  addFile: ({ name, url, lesson, gradeId }) => {
    return axios.post(
      API_ENDPOINT + PROFFESOR.post.addFile,
      { name, url, lesson, gradeId },
      {
        Headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }
    );
  },
  addTest: ({ questions, lesson, gradeId, testName, testId = undefined }) => {
    return axios.post(
      API_ENDPOINT + PROFFESOR.post.addTest,
      { questions, testId, lesson, gradeId, testName },
      {
        Headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }
    );
  },
  addStudent: ({ firstName, lastName, email, password, gradeId }) => {
    return axios.post(
      API_ENDPOINT + PROFFESOR.post.addStudent,
      {
        firstName,
        lastName,
        email,
        password,
        gradeId
      },
      {
        Headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }
    );
  }
};

export default proffesorApi;

import axios from "axios";

axios.defaults.withCredentials = true;

const API_ENDPOINTG = "https://f-pismenost.herokuapp.com";
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

export function logOut() {
  return {
    type: "LOGOUT_STUDENT",
    payload: axios.get(API_ENDPOINT + "/students/logout")
  };
}

export function registerStudent(firstName, lastName, email, password, grade) {
  return {
    type: "REGISTER_STUDENT",
    payload: axios.post(API_ENDPOINT + "/students/register", {
      firstName,
      lastName,
      email,
      password,
      grade
    })
  };
}

export function loadSession() {
  return {
    type: "LOAD_STUDENT",
    payload: axios.get(API_ENDPOINT + "/students/")
  };
}

export function solveTest(testId, answers, studentId) {
  return {
    type: "SOLVE_TEST",
    payload: axios.post(API_ENDPOINT + "/students/test/solve", {
      testId,
      answers,
      studentId
    })
  };
}

export function newJob(jobName, jobPayment, jobCredit, studentId) {
  console.log({ jobName, jobPayment, jobCredit, studentId });
  return {
    type: "FIRST_CHOICE",
    payload: axios.post(API_ENDPOINT + "/students/year/1", {
      jobName,
      jobPayment,
      jobCredit,
      studentId
    })
  };
}

export function unexpectedOutcome(studentId, outcome, duration) {
  console.log({ studentId, outcome, duration });
  return {
    type: "SECOND_CHOICE",
    payload: axios.post(API_ENDPOINT + "/students/year/2", {
      studentId,
      outcome,
      duration
    })
  };
}

export function updateOutcomes(studentId, outcomes) {
  return {
    type: "UPDATE_OUTCOMES",
    payload: axios.post(API_ENDPOINT + "/students/outcomes", {
      studentId,
      outcomes
    })
  };
}

export function newInvestment(studentId, totalSavings, interestRate) {
  return {
    type: "THIRD_CHOICE",
    payload: axios.post(API_ENDPOINT + "/students/year/3", {
      studentId,
      totalSavings,
      interestRate
    })
  };
}

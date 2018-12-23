const API_ENDPOINT = "http://localhost:3001";

const UCENIK = {
  post: {
    login: "/students/login",
    register: "/students/register",
    solveTest: "/students/test/solve"
  },
  get: {
    test: "/students/",
    logout: "/students/logout",
    data: "/students/get"
  }
};

const PROFFESOR = {
  post: {
    addFile: "/proffesor/file",
    addTest: "/proffesor/test",
    addStudent: "/proffesor/student"
  },
  get: {
    data: "/proffesor/get"
  }
};

module.exports = { API_ENDPOINT, UCENIK, PROFFESOR };

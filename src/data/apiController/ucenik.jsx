import axios from 'axios'
import { API_ENDPOINT, UCENIK } from '../apiRoutes'

axios.defaults.withCredentials = true

let ucenikApi = {
    login: ({ email, password }) => {
        return axios.post(API_ENDPOINT + UCENIK.post.login,
            { email, password },
            {
                Headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            })
    },
    getData: () => {
        return axios.get(API_ENDPOINT + UCENIK.get.data)
    },
    solveTest: ({ studentId, testId, solution, testPoints, studentsPoints }) => {
        return axios.post(API_ENDPOINT + UCENIK.post.solveTest,
            {
                studentId,
                testId,
                solution,
                testPoints,
                studentsPoints,
            }, {
                Headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            })

    }
}

export default ucenikApi


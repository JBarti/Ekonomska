import axios from "axios"

const API_ENDPOINT = 'http://localhost:3001'

export function loadStudent(email, password) {
    console.log(email, password)
    return {
        type: "LOAD_STUDENT",
        payload: axios.post(
            API_ENDPOINT + '/students/login',
            { email, password },
            {
                Headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            })
    }
}
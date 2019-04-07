let state = {
    id: null,
    gradeId: null,
    firstName: null,
    lastName: null,
    email: null
}


export default function reducer(state = state, action) {
    let newState = { ...state }
    switch (action.type) {
        case "LOAD_STUDENT_FULFILLED": {
            let { id, gradeId, firstName, lastName, email } = action.payload.data
            newState = { ...state, id, gradeId, firstName, lastName, email }
            break;
        }
    }

    return newState
}

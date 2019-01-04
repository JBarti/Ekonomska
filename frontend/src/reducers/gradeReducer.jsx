let state = {
    id: null,
    name: null,
    proffesorId: null,
    folders: null
}


export default function reducer(state = state, action) {
    let newState = { ...state }
    switch (action.type) {
        case "LOAD_STUDENT_FULFILLED": {
            console.log(action.payload.data)
            let { id, name, proffesorId, files, tests, folders } = action.payload.data['grade']
            newState = { ...state, id, name, proffesorId, files, tests, folders }
            break;
        }
    }

    return newState
}

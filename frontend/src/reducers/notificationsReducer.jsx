let state = []


export default function reducer(state = state, action) {
    let newState = { ...state }

    switch (action.type) {
        case "LOAD_STUDENT_FULFILLED": {
            let { notifications } = action.payload.data
            newState = notifications
            break;
        }
    }

    return newState
}
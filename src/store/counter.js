const DEFAULT_STATE = {
    count: 0,
}

export const counterReducer = (state = DEFAULT_STATE, action) => {
    if (action.type === "INCREMENT_COUNT") {
        const dubState = { ...state }

        dubState.count += 1

        return dubState
    } else if (action.type === "DECREMENT_COUNT") {
        const dubState = { ...state }

        dubState.count -= 1

        return dubState
    } else if (action.type === "SET_COUNT") {
        const dubState = { ...state }

        dubState.count =  action.payload.newCount

        return dubState
    }
    return state;
}
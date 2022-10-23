const initialState = {
    items: [],
    user: {}
};

export default function appReducer(state=initialState, action) {
    switch (action.type) {
        case 'GET_ITEMS': {
            return {
                ...state,
                items: [...action.payload]
            }
        }
        default: return state;
    }
}
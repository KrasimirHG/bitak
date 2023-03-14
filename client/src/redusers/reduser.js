const initialState = {
    items: [],
    user: {},
    errors: {},
    shouldRedirect: false
};

export default function appReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_ITEMS':
            return {
                ...state,
                items: [...action.payload]
            };
        case 'ADD_ITEM':
            return {
                ...state,
                items: [...state.items, action.payload],
                shouldRedirect: true
            };
        case 'DELETE_ITEM':
            return {
                ...state,
                items: state.items.filter(el => el._id !== action.payload)
            };
        case 'SET_REDIRECT':
            return {
                ...state,
                shouldRedirect: action.payload
            };
        case 'GET_ERRORS':
            return {
                ...state,
                errors: {...action.payload}
            };
        case 'CLEAR_ERRORS':
            return {
                ...state,
                errors: {}
            };
        default: return state;
    }
}

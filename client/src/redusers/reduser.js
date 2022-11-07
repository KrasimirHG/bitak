const initialState = {
    items: [],
    user: {},
    errors: {},
    selectedItem: {}
};

export default function appReducer(state=initialState, action) {
    switch (action.type) {
        case 'GET_ITEMS': {
            return {
                ...state,
                items: [...action.payload]
            }
        };
        case 'ADD_ITEM': {
            return {
                ...state,
                items: [...state.items, action.payload]
            }
        };
        case 'SELECT_ITEM': {
            return {
                ...state,
                selectedItem: action.payload
            }
        };
        case 'DELETE_ITEM': {
            return {
                ...state,
                items: state.items.filter(el => el._id !== action.payload)
            }
        };
        case 'REGISTER_USER' :
        case 'LOGIN_USER' : {
            return {
                ...state,
                user: action.payload
            }
        }
        case 'GET_ERRORS': {
            return {
                ...state,
                errors: {...action.payload}
            }
        };
        case 'CLEAR_ERRORS': {
            return {
                ...state,
                errors: {}
            }
        };
        default: return state;
    }
}
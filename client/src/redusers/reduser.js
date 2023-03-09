const initialState = {
    items: [],
    itemsByUser: [],
    user: {},
    errors: {},
    selectedItem: {},
    shouldRedirect: false
};

export default function appReducer(state=initialState, action) {
    switch (action.type) {
        case 'GET_ITEMS': {
            return {
                ...state,
                // items: [...action.payload],
                items: [...action.payload.items],
                user: action.payload.user,
                shouldRedirect: false
            }
        };
        case 'GET_ITEMS_BY_USER': {
            return {
                ...state,
                itemsByUser: [...action.payload]
            }
        };
        case 'ADD_ITEM': {
            return {
                ...state,
                items: [...state.items, action.payload],
                shouldRedirect: true
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
                user: action.payload,
                shouldRedirect: true
            }
        }
        case 'LOGOUT_USER' :
            return {
                ...state,
                user: {},
                shouldRedirect: true
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
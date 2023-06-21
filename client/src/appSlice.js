import { createSlice } from '@reduxjs/toolkit';

export const counterSlice = createSlice({
    name: 'app',
    initialState: {
        items: [],
        user: {},
        errors: {},
        shouldRedirect: false
    },
    reducers: {
        getItems: (state, action) => {
            state.items = action.payload;
        },
        addItem: (state, action) => {
            state.items.push(action.payload);
            state.shouldRedirect = true;
        },
        deleteItem: (state, action) => {
            state.items = state.items.filter(el => el._id !== action.payload);
        },
        setRedirect: (state) => {
            state.shouldRedirect = true;
        },
        getErrors: (state, action) => {
            state.errors = action.payload;
        },
        clearErrors: (state) => {
            state.errors = {};
        }
    }
});

export const { getItems, addItem, deleteItem, setRedirect, getErrors, clearErrors } = counterSlice.actions;

export const getItemsAsync = (items) => (dispatch) => {
    dispatch(getItems(items));
};

export const addItemAsync = (item) => (dispatch) => {
    dispatch(addItem(item));
};

export const deleteItemAsync = (item) => (dispatch) => {
    dispatch(deleteItem(item));
};

export const getErrorsAsync = (errors) => (dispatch) => {
    dispatch(getErrors(errors));
};

export const selectApp = (state) => state.app;

export default counterSlice.reducer;

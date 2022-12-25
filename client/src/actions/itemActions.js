import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING, SELECT_ITEM } from "./types";
import axios from "axios";
import { returnErrors } from "./errorActions";
import { loginUser } from './userActions';

export const getItems = () => async (dispatch) => {
	// dispatch(setItemsLoading());
	const result = await axios.get("/api/items")
	.catch((err) =>
			dispatch(returnErrors(err.response.data, err.response.status))
		);
		const fullData = {data: result.data, cookies: document.cookie}
		console.log('DATA+COOKIE', fullData);
		if (fullData.cookies) {
			const cookies = fullData.cookies.split('=');
			dispatch(loginUser(cookies[1].split(';')[0], cookies[2]));
		}
	dispatch({
		type: GET_ITEMS,
		payload: fullData
	})
}

export const deleteItem = (id, token) => async (dispatch) => {
	const config = {
		headers: {
			"x-auth-token": token
		}
	};
	const {success} = await axios.delete(`api/items/${id}`, config)
	.catch((err) =>
			dispatch(returnErrors(err.response.data, err.response.status))
		);
	success && dispatch({
		type: DELETE_ITEM,
		payload: id,
	})	
};

export const selectItem = (item) => (dispatch) => {
	dispatch({
		type: SELECT_ITEM,
		payload: item,
	})	
};

export const setItemsLoading = () => (dispatch) => {
	return {
		type: ITEMS_LOADING,
	};
};

export const addItem = (name, description, img) => async (dispatch) => {
	const formData = new FormData();

		formData.append("itemName", name);
		formData.append("itemDesc", description);
		const files = img;
		for (let i = 0; i < files.length; i++) {
			formData.append("pictures", files[i]);
		}
		const config = {
			headers: {
				"content-type": "multipart/form-data"
			}
		};
		const result = await axios.post("/api/items", formData, config)
	    .catch((err) =>
			dispatch(returnErrors(err.response.data, err.response.status))
		);
			dispatch({
				type: ADD_ITEM,
				payload: result.data,
			})	
};

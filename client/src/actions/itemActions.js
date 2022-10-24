import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from "./types";
import axios from "axios";
import { returnErrors } from "./errorActions";

export const getItems = () => async (dispatch) => {
	// dispatch(setItemsLoading());
	const result = await axios.get("/api/items")
	.catch((err) =>
			dispatch(returnErrors(err.response.data, err.response.status))
		);
	dispatch({
		type: GET_ITEMS,
		payload: result.data,
	})
}
// 	dispatch(setItemsLoading());
// 	axios
// 		.get("/api/items")
// 		.then((res) =>
// 			dispatch({
// 				type: GET_ITEMS,
// 				payload: res.data,
// 			})
// 		)
// 		.catch((err) =>
// 			dispatch(returnErrors(err.response.data, err.response.status))
// 		);
// };

export const deleteItem = (id) => (dispatch) => {
	axios
		.delete(`api/items/${id}`)
		.then((res) =>
			dispatch({
				type: DELETE_ITEM,
				payload: id,
			})
		)
		.catch((err) =>
			dispatch(returnErrors(err.response.data, err.response.status))
		);
};

export const setItemsLoading = () => (dispatch) => {
	return {
		type: ITEMS_LOADING,
	};
};

export const addItem = (item) => async (dispatch) => {
	const result = await axios.post("/api/items", item)
	.catch((err) =>
			dispatch(returnErrors(err.response.data, err.response.status))
		);
			dispatch({
				type: ADD_ITEM,
				payload: result.data,
			})	
};

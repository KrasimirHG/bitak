import { REGISTER_USER, LOGIN_USER, LOGOUT_USER } from "./types";
import axios from "axios";
import { returnErrors } from "./errorActions";

export const registerUser = (firstName, lastName, email, password) => async dispatch => {

    const result = await axios.post('api/users', {firstName, lastName, email, password})
    .catch((err) =>
			dispatch(returnErrors(err.response.data, err.response.status))
		);
			dispatch({
				type: REGISTER_USER,
				payload: result.data,
			})	
}

export const loginUser = (email, password) => async dispatch => {

    const result = await axios.post('api/auth', {email, password})
    .catch((err) =>
			dispatch(returnErrors(err.response.data, err.response.status))
		);
			dispatch({
				type: LOGIN_USER,
				payload: result.data,
			})	
}

export const logoutUser = () => dispatch => {
	dispatch({
		type: LOGOUT_USER
	})
}
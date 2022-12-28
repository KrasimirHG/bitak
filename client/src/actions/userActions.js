import { REGISTER_USER, LOGIN_USER, LOGOUT_USER } from "./types";
import axios from "axios";
import { redirect } from "react-router-dom";
import { returnErrors } from "./errorActions";

const date = new Date();
const futureDate = new Date(date.setDate(date.getDate() + 10));
const expiredDate = new Date(date.setDate(date.getDate() - 11));

export const registerUser = (firstName, lastName, email, password) => async dispatch => {

    const result = await axios.post('api/users', {firstName, lastName, email, password})
    .catch((err) =>
			dispatch(returnErrors(err.response.data, err.response.status))
		);
			dispatch({
				type: REGISTER_USER,
				payload: result.data,
			})
			// document.cookie = `email=${email}; expires=${futureDate}; path=/`;
			// document.cookie = `password=${password}; expires=${futureDate}; path=/`;		
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
			// document.cookie = `email=${email}; expires=${futureDate}; path=/`;
			// document.cookie = `password=${password}; expires=${futureDate}; path=/`;
		}
export const logoutUser = () => async dispatch => {
	const date = new Date();
	date.setDate(date.getDate() - 1);
	// document.cookie = `email=email; expires=${expiredDate}; path=/`;
	// document.cookie = `password=password; expires=${expiredDate}; path=/`;
	await axios.get('api/auth/logout')
	.catch((err) =>
			dispatch(returnErrors(err.response.data, err.response.status))
		);
	dispatch({
		type: LOGOUT_USER
	})
};
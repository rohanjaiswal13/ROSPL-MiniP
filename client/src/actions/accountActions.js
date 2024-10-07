//uses axios in order to make requested changes to the server, dispatches reducer
import { GET_ACCOUNTS, ADD_ACCOUNT, DELETE_ACCOUNT, ACCOUNTS_LOADING } from './types';
import axios from 'axios';

//these return to the reducer, dispath
export const getAccounts=() => dispatch=> {
	dispatch(setAccountsLoading());
	axios
		.get('/api/accounts')
		.then(res => 
			dispatch({
				type: GET_ACCOUNTS,
				payload: res.data
			})
		)
};

export const deleteAccount=(id)=> dispatch => {
	axios.delete(`/api/accounts/${id}`).then(res => dispatch ({
		type: DELETE_ACCOUNT,
		payload: id
	})
	)
	return{
		type: DELETE_ACCOUNT,
		//this is needed to pass the parameter to reducer
		payload: id
	};

};

export const addAccount=(account)=> dispatch => {
	axios
		.post('/api/accounts',account)
		.then(res=> dispatch({
			type: ADD_ACCOUNT,
			payload: res.data
		})
		)
		return{
			type: ADD_ACCOUNT,
			//this is needed to pass the parameter to reducer
			payload: account
		};

};

export const setAccountsLoading=()=> {
	return{
		type: ACCOUNTS_LOADING
	};

};




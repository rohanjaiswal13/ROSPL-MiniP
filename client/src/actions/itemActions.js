//uses axios in order to make requested changes to the server, dispatches reducer
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from './types';
import axios from 'axios';

//these return to the reducer, dispath
export const getItems=() => dispatch=> {
	dispatch(setItemsLoading());
	axios
		.get('/api/items')
		.then(res => 
			dispatch({
				type: GET_ITEMS,
				payload: res.data
			})
		)
};

export const deleteItem=(id)=> dispatch => {
	axios.delete(`/api/items/${id}`).then(res => dispatch ({
		type: DELETE_ITEM,
		payload: id
	})
	)
	return{
		type: DELETE_ITEM,
		//this is needed to pass the parameter to reducer
		payload: id
	};

};

export const addItem=(item)=> dispatch => {
	axios
		.post('/api/items',item)
		.then(res=> dispatch({
			type: ADD_ITEM,
			payload: res.data
		})
		)
		return{
			type: ADD_ITEM,
			//this is needed to pass the parameter to reducer
			payload: item
		};

};

export const setItemsLoading=()=> {
	return{
		type: ITEMS_LOADING
	};

};




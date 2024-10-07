//Makes changes to the data stored in the applications state to match server
//import uuid from 'uuid';
import { GET_ACCOUNTS, ADD_ACCOUNT, DELETE_ACCOUNT, ACCOUNTS_LOADING } from '../actions/types';


const initialState={
	accounts: [],
	loading: false

	/*
			{ id: uuid(), name: 'Eggs' },
			{ id: uuid(), name: 'Milk' },
			{ id: uuid(), name: 'Steak' },
			{ id: uuid(), name: 'Water' }
	*/	

}

export default function(state=initialState, action){
	switch(action.type){
		case GET_ACCOUNTS:
			return {
				...state,
				accounts: action.payload,
				loading: false
			};
		case DELETE_ACCOUNT:
			return {
				...state,
				accounts: state.accounts.filter(account => account._id!==action.payload)
			};
		case ADD_ACCOUNT:
			return {
				...state,
				accounts: [action.payload, ...state.accounts]

			};
		case ACCOUNTS_LOADING:
			return {
				...state,
				loading: true

			};
		 default: 
		 	return state;

	}

}
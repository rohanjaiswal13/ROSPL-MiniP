//root reducer to bring all reducers together
import { combineReducers} from 'redux';
//add reducers here
import itemReducer from './itemReducer';
import accountReducer from './accountReducer';

//can add more reducers
export default combineReducers({
	item: itemReducer,
	account: accountReducer

});
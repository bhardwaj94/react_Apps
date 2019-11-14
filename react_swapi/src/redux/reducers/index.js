
import { combineReducers } from 'redux';
import {itemsBySearchString,searchStr} from './planetReducer';

const userReducer = (state = {}, action) => {
    //console.log("from reducer",action)
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return { login: action.payload };
        case 'LOGIN_FAILURE':
            return { error: action.payload };
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    userReducer,
    itemsBySearchString,
    searchStr
  });

export default rootReducer;